// Site menus, kept in one place. Editors can't change these; we do, by request.
// "hover" picks the theme's colour for that menu item (green, red or blue).
export default {
  main: [
    {
      label: "About",
      hover: "green",
      children: [
        { label: "About us", url: "/about/" },
        { label: "Who we are", url: "/about/who-we-are/" },
        { label: "Governance", url: "/about/governance/" },
        { label: "Supporters", url: "/about/supporters/" },
      ],
    },
    { label: "The FreeBar Charter", url: "/resources/the-freebar-charter/", hover: "green" },
    { label: "Visibility", url: "/visibility/" },
    { label: "News & Events", url: "/news-events/" },
    { label: "Resources", url: "/resources/", hover: "red" },
    { label: "Contact", url: "/contact/", hover: "blue" },
  ],

  // Left-hand menu on the About section pages
  aboutSidebar: [
    { label: "About", url: "/about/" },
    { label: "Who we are", url: "/about/who-we-are/" },
    { label: "Governance", url: "/about/governance/" },
    { label: "Supporters", url: "/about/supporters/" },
  ],

  footer: [
    { label: "About", url: "/about/" },
    { label: "News & Events", url: "/news-events/" },
    { label: "Contact", url: "/contact/" },
    { label: "Privacy", url: "/gdpr-general-data-protection-regulation/" },
  ],
};
