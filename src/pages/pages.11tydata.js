// Settings for every page under src/pages. Set here, not in the page files,
// so neither editor can change the layout, colours or web address.
//
// Web address = the file's place in this folder, so the old WordPress URLs are kept:
//   pages/contact.md          -> /contact/
//   pages/about/index.md      -> /about/
//   pages/about/governance.md -> /about/governance/
export default {
  layout: "layouts/page.njk",
  hero: "bg-danger",
  bodyClass: "page-template-default",
  permalink: (data) => {
    const stem = data.page.filePathStem.replace(/^\/pages/, "").replace(/\/index$/, "");
    return `${stem || ""}/`;
  },
};
