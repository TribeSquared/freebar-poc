// Settings for every news and events post. Set here, not in the post files,
// so editors can't change the layout or web address.
// Web address = /<file name>/, the same as the old WordPress post URLs.
export default {
  layout: "layouts/post.njk",
  permalink: (data) => `/${data.page.fileSlug}/`,
};
