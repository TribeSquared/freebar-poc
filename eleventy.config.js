import markdownIt from "markdown-it";

// Dates in front matter are wall-clock UK times (e.g. 2023-02-09T18:30), so read them as UTC
// and never shift them by the server's time zone.
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const pad = (n) => String(n).padStart(2, "0");
// A date without a time zone (from YAML or an editor) is read as UK wall-clock time, stored as UTC
const asDate = (d) => {
  if (d instanceof Date) return d;
  const s = String(d);
  return new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(s) ? s : (s.length === 10 ? s + "T00:00:00Z" : s + "Z"));
};
const ordinal = (n) => {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
const time12 = (d) => {
  const h = d.getUTCHours(), m = d.getUTCMinutes();
  return `${h % 12 || 12}:${pad(m)}${h < 12 ? "am" : "pm"}`;
};
// Events sort by when they happen; news by when it was published
const sortDate = (item) => asDate(item.data.start || item.date);

export default function (eleventyConfig) {
  // Files copied as-is: the Decap editor, uploaded files, the theme, favicons and robots.txt
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/wp-content");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/*.{png,svg,ico}");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  // The editor page is copied, not run through templates
  eleventyConfig.ignores.add("src/admin/**");

  // Editor text fields (home page columns, notes) are Markdown or HTML
  const md = markdownIt({ html: true, linkify: false, typographer: false });
  eleventyConfig.addFilter("markdown", (text) => (text ? md.render(String(text)) : ""));

  // News and events, newest first
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/news/*.md").sort((a, b) => sortDate(b) - sortDate(a))
  );
  eleventyConfig.addCollection("events", (api) =>
    api.getFilteredByGlob("src/news/*.md").filter((p) => p.data.category === "Events" && p.data.start)
  );

  // Date formats used by the FreeBar theme
  eleventyConfig.addFilter("cardDate", (d) => { d = asDate(d); return `${pad(d.getUTCDate())}.${pad(d.getUTCMonth() + 1)}.${String(d.getUTCFullYear()).slice(2)}`; });
  eleventyConfig.addFilter("shortDate", (d) => { d = asDate(d); return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()].slice(0, 3)} ${d.getUTCFullYear()}`; });
  eleventyConfig.addFilter("longDate", (d) => { d = asDate(d); return `${ordinal(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`; });
  eleventyConfig.addFilter("eventDays", (start, end) => {
    const s = asDate(start), e = end ? asDate(end) : null;
    const sameDay = !e || (e.getUTCFullYear() === s.getUTCFullYear() && e.getUTCMonth() === s.getUTCMonth() && e.getUTCDate() === s.getUTCDate());
    if (sameDay) return `${pad(s.getUTCDate())} ${MONTHS[s.getUTCMonth()]}`;
    if (e.getUTCMonth() === s.getUTCMonth()) return `${pad(s.getUTCDate())} - ${pad(e.getUTCDate())} ${MONTHS[s.getUTCMonth()]}`;
    return `${pad(s.getUTCDate())} ${MONTHS[s.getUTCMonth()]} - ${pad(e.getUTCDate())} ${MONTHS[e.getUTCMonth()]}`;
  });
  eleventyConfig.addFilter("eventTimes", (start, end) => end ? `${time12(asDate(start))} - ${time12(asDate(end))}` : time12(asDate(start)));
  eleventyConfig.addFilter("icsDate", (d) => { d = asDate(d); return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00`; });
  eleventyConfig.addFilter("icsText", (s) => String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"));
  eleventyConfig.addFilter("head", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("isoDate", (d) => asDate(d).toISOString());

  // Show a friendly file name for a link, e.g. "trustee-report-2025.pdf"
  eleventyConfig.addFilter("filename", (path) => (path || "").split("/").pop());

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    // Editor text is never run as template code, so a stray "{{" can't break the build
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
