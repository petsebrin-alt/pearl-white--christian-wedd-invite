# Angel & David — Pearl White Wedding Invitation

A mobile-first wedding invitation website built from [PRD.md](PRD.md) and [THEME.md](THEME.md). Plain HTML, CSS and JavaScript with no build step and no dependencies.

## Run it

From this folder:

```bash
python3 -m http.server 8080 --directory site
```

Then open <http://localhost:8080>. To check it on your phone, connect it to the same Wi-Fi and open `http://<your-computer's-IP>:8080`.

You can also double-click `site/index.html`, but a local server is closer to how the live site behaves.

## Edit wedding details

Every name, date, time, venue, contact and message lives in **`site/content.js`**.

- `null` or `""` means **To be provided**, and the site shows a placeholder in that spot.
- Dates use `"YYYY-MM-DD"` and times use 24-hour `"HH:MM"`.
- Set `timezone.utcOffset` (for example `"+05:30"`) and the ceremony `startTime` to switch on the live countdown and timed calendar entries.
- Before sharing with guests, set `site.previewNotice` to `false`. When the dress code is confirmed, set `dressCode.isProposal` to `false`.

Two things are not in `content.js` because they must load before any script runs. If the names or date ever change, update them in `site/index.html` too:

- the `<title>` and `<meta>` tags, which WhatsApp and other apps use for link previews
- the static fallback and `<noscript>` text

## Add photographs and artwork

Put files in `site/assets/images/` (or `site/assets/video/`) and reference them from `content.js`, for example `families.bride.photo: "assets/images/family-bride.webp"`. Sizes and formats are listed in [THEME.md §6](THEME.md#6-asset-checklist). The opening uses `site/assets/images/lace-spray-left.webp`, `lace-spray-right.webp`, `lace-motif.webp`, `lace-pearl-trim.webp`, `dove-seal.webp`, `wedding-car.webp` and `net-flower.webp`; replace those files (same names, transparent WebP) to change its artwork. After changing any file, bump the `?v=` tag in `site/index.html` so phones load the new version.

## Connect RSVP and wishes

Until `backend.endpoint` is set, both forms run in **preview mode**: entries stay in the visitor's own browser and are clearly labelled as not sent.

To save entries to a Google Sheet:

1. Create a Google Sheet, then choose **Extensions → Apps Script**.
2. Paste in the contents of `backend/google-apps-script.gs`. Optionally set `NOTIFY_EMAIL`.
3. Choose **Deploy → New deployment → Web app**, with *Execute as: Me* and *Who has access: Anyone*.
4. Copy the web-app URL into `site/content.js` → `backend.endpoint`.
5. Test one RSVP and one wish. To approve a wish, tick **Approved** in the *Wishes* sheet. Only approved wishes appear on the site.

## Project structure

```
PRD.md, THEME.md          requirements and visual direction
site/
  index.html              page shell + static splash markup
  content.js              ← all wedding details (edit here)
  css/base.css            tokens, typography, layout
  css/components.css      buttons, placeholders, dialogs, forms
  css/sections.css        one block per section, in page order
  js/core.js              helpers, dialogs, calendar, storage
  js/ornaments.js         generated SVG pearls, florals, illustrations
  js/sections/01–14       one file per section
  js/main.js              renders sections, header and menu
backend/google-apps-script.gs   optional RSVP + wishes storage
```

Each section has its own script (`js/sections/NN-name.js`) and its own block in `css/sections.css`, so you can change one section without touching the others.

## Deploy

Upload the contents of `site/` to any static host, such as Netlify (drag and drop), GitHub Pages, Cloudflare Pages or Vercel.
