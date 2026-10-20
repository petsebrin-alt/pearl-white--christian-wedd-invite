# Angel & David — Pearl White Wedding Invitation

A mobile-first wedding invitation website built from [PRD.md](PRD.md) and [THEME.md](THEME.md). Plain HTML, CSS and JavaScript with no build step and no dependencies.

## Run it

From this folder:

```bash
python3 -m http.server 8080 --directory site
```

Then open <http://localhost:8080>. To check it on your phone, connect it to the same Wi-Fi and open `http://<your-computer's-IP>:8080`.

You can also double-click `site/index.html`, but a local server is closer to how the live site behaves.

## iPhone showcase

The showcase pages use the invitation's own background: the pearl-white linen paper with the pearl flowers and pearl strands.

- `mockup.html` shows the invitation running live inside a centred iPhone 17 Pro Max (screen 440 × 956). It has no text or buttons. Tap the seal and scroll inside the phone; refresh to replay the opening. Add `?section=rsvp` (any section id, `names` for the names screen, or `end` for the parked car) to open the phone on one section.
- `showcase.html` shows **every section at once**, each in its own iPhone 17 Pro Max, in page order with a small caption. Each phone is live and can be scrolled.
- Both open sections with `index.html?still#section-id`: the opening is skipped and everything is shown at rest. Guests never see this view.
- `showcase-images/` (outside the website) holds ready-to-share pictures: `00-all-sections.jpg` (the whole board, 2400 × 3345) and one 4:5 picture per section (`01-opening.jpg` … `15-thank-you.jpg`, 2160 × 2700).

To make the pictures again after a change, start the local server and run headless Chrome on each page, for example:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1080,1350 --force-device-scale-factor=2 --virtual-time-budget=12000 --run-all-compositor-stages-before-draw --screenshot=rsvp.png "http://localhost:8080/mockup.html?section=rsvp"
```

## Edit wedding details

Every name, date, time, venue, contact and message lives in **`site/content.js`**.

- `null` or `""` means **To be provided**, and the site shows a placeholder in that spot.
- Dates use `"YYYY-MM-DD"` and times use 24-hour `"HH:MM"`.
- Set `timezone.utcOffset` (for example `"+05:30"`) and the ceremony `startTime` to switch on the live countdown and timed calendar entries.
- Before sharing with guests, set `site.previewNotice` to `false`. When the dress code is confirmed, set `dressCode.isProposal` to `false`.
- The Welcome section shows the photos in `couplePhotos` (in black and white automatically, with a slow drift and parallax; several photos crossfade). The current photo is a sample supplied for the design: replace it with Angel & David's own photograph before sharing.

Two things are not in `content.js` because they must load before any script runs. If the names or date ever change, update them in `site/index.html` too:

- the `<title>` and `<meta>` tags, which WhatsApp and other apps use for link previews
- the static fallback and `<noscript>` text

## Add photographs and artwork

Put files in `site/assets/images/` (or `site/assets/video/`) and reference them from `content.js`, for example `families.bride.photo: "assets/images/family-bride.webp"`. Sizes and formats are listed in [THEME.md §6](THEME.md#6-asset-checklist). The opening uses `site/assets/images/lace-spray-left.webp`, `lace-spray-right.webp`, `lace-motif.webp`, `lace-pearl-trim.webp`, `dove-seal.webp` and `wedding-car.webp`. The pearl flowers (opening columns, section edges, welcome, thank-you and the car's parking place at the end) use `pearl-bloom.webp`, `pearl-bud.webp`, `pearl-spray.webp`, `pearl-drops.webp` and `pearl-sprig.webp`. Replace those files (same names, transparent WebP) to change the artwork. After changing any file, bump the `?v=` tag in `site/index.html` so phones load the new version.

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
vercel.json               tells Vercel to publish only site/
site/
  index.html              page shell + static splash markup
  mockup.html             showcase: the live invitation inside a centred iPhone 17 Pro Max
  showcase.html           every section, each in its own iPhone 17 Pro Max
  css/iphone.css          the iPhone frame and pearl background for both showcase pages
  content.js              ← all wedding details (edit here)
  css/base.css            tokens, typography, layout
  css/components.css      buttons, placeholders, dialogs, forms
  css/sections.css        one block per section, in page order
  css/page.css            page-wide look: linen paper, pressed lettering, edge flowers
  js/core.js              helpers, dialogs, calendar, storage
  js/ornaments.js         generated SVG pearls, florals, illustrations
  js/florals.js           the pearl-flower pieces (shared by every section)
  js/decor.js             pearl flowers at the section edges, drifting with the scroll
  js/sections/01–14       one file per section
  js/main.js              renders sections, header and menu
backend/google-apps-script.gs   optional RSVP + wishes storage
```

Each section has its own script (`js/sections/NN-name.js`) and its own block in `css/sections.css`, so you can change one section without touching the others.

## Deploy

The website lives in `site/`, so the host must serve that folder as the site root.

- **Vercel** (connected to this GitHub repo): `vercel.json` sets the output directory to `site`, so every push redeploys automatically and only the website is published. Planning files such as PRD.md stay private. Leave the Vercel project's Root Directory empty and its Framework Preset on "Other".
- **Other static hosts** (Netlify, Cloudflare Pages, GitHub Pages): set the publish or output directory to `site`, or upload the contents of `site/`.
