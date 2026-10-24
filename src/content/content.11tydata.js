// Layout and web address for every page in this folder.
// Set here rather than in each page file, so neither editor can change them.
// The address is worked out in code because editor text is never run as
// template code (see markdownTemplateEngine in eleventy.config.js).
export default {
  layout: "page.njk",
  permalink: (data) => `/${data.page.fileSlug}/`,
};
