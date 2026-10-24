# FreeBar static rescue (proof of concept)

Eleventy rebuild of freebar.co.uk, edited with Pages CMS (Decap CMS as fallback). Test copy only: not the live site.

## Where things are

| Path | What it is |
| --- | --- |
| `src/_includes/layouts/base.njk` | Page shell: head, header, footer, search pop-up |
| `src/_includes/layouts/page.njk` | Plain page: coloured title band, then content (Charter, Contact, Privacy) |
| `src/_includes/layouts/about.njk` | About section page: title band, About menu, content |
| `src/_includes/partials/` | Header, footer and search pop-up |
| `src/_data/nav.js` | Main menu, About menu and footer links, in one place |
| `src/_data/site.js` | Site name, tagline, year, `noindex` switch for the test copy |
| `src/pages/` | Page content. A file's place sets its web address, matching the old WordPress URLs |
| `src/pages/pages.11tydata.js`, `src/pages/about/about.11tydata.js` | Layout, title-band colour and address per section, kept out of the page files so editors can't change them |
| `src/assets/theme/` | The original FreeBar theme CSS (unchanged), Bootstrap 4.1.1 CSS, icon font, logos |
| `src/assets/theme/additional.css` | Two rules from WordPress "Additional CSS" that the theme files don't include |
| `src/assets/js/site.js` | Small script for the mobile menu, About dropdown and search pop-up. Replaces jQuery, Popper and Bootstrap JS from outside services |

Editors: Pages CMS reads `.pages.yml`; Decap reads `src/admin/config.yml`. Both only see the fields listed there.

## Notes

- Fonts: Roboto and Roboto Condensed from Google Fonts, as on the live site.
- Editor text is never run as template code, and `scripts/check-output.js` fails the build if a page lands at a broken address or an expected file is missing.
- The live site's crawl is kept off GitHub (it holds Visibility profiles, which are personal data). It lives on Tiki's Mac in `~/Projects/freebar-crawl`.

## Run locally

```
npm install
npm start
```
