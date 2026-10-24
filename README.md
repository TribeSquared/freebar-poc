# FreeBar editor trial

Step 1 of the TribeSquared static rescue proof of concept: a bare Eleventy site with one page (Governance), one text block and one PDF, editable in two editors so we can compare them.

| | Pages CMS | Decap CMS |
|---|---|---|
| Where | app.pagescms.org | `/admin/` on the site |
| Config | `.pages.yml` | `src/admin/config.yml` |
| Editor login | GitHub, or email-only "collaborator" invite | Netlify Identity email and password (Git Gateway) |

Both editors edit the same file, `src/content/governance.md`, and upload PDFs to `src/media/docs`. Layout and web address are set in `src/content/content.11tydata.js`, not in the page file, so neither editor can change them. Editor text is never run as template code, and `scripts/check-output.js` fails the build if a page lands at a broken address.

## Run locally

```
npm install
npm start
```

## Netlify

Build command `npm run build`, publish folder `_site` (set in `netlify.toml`). The site sends `noindex` headers and blocks crawlers, as it's a test copy.
