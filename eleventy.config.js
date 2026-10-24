export default function (eleventyConfig) {
  // Files copied as-is: the Decap editor, uploaded PDFs, styles and robots.txt
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/media");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  // The editor page is copied, not run through templates
  eleventyConfig.ignores.add("src/admin/**");

  // Show a friendly file name for a PDF link, e.g. "trustee-report-2025.pdf"
  eleventyConfig.addFilter("filename", (path) => (path || "").split("/").pop());

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    // Editor text is never run as template code, so a stray "{{" can't break the build
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
