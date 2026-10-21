# PRD — Angel & David · Pearl White Christian Wedding Invitation

| | |
|---|---|
| Document | Product Requirements Document |
| Product | Mobile-first wedding invitation website |
| Version | 1.0 (first build) |
| Companion | [THEME.md](THEME.md) — visual direction, palette, typography, asset checklist |
| Source code | `site/` — central content file `site/content.js` |

**Conventions used in this document**

- **To be provided** — information the couple has not yet supplied. The website shows a clearly marked placeholder.
- **Proposal** — a suggestion awaiting the couple's review. Nothing marked Proposal is presented to guests as confirmed.
- Names are spelled exactly as supplied: Angel, David, Rajthurai, Jansi Rani, David Raj, Angelo Mary.

---

## 1. Project overview and goals

### 1.1 Overview

A single-page, mobile-first website that acts as the wedding invitation for **Angel & David**, a South Indian Christian wedding on **Wednesday, 27 January 2027**. Guests open the invitation and open their lace-and-pearl envelope by its dove seal and watch their white wedding car drive down the card, then scroll through fourteen sections: the welcome, save the date, countdown, families, events, dress code, gifting, venues, wishing wall, RSVP, travel, contacts and a closing thank-you.

### 1.2 Goals

1. **Delight and dignity** — a premium pearl-white experience with realistic materials (pearls, satin, lace, embossed paper) and a reverent Christian character.
2. **Clarity** — guests can find the date, events, venues and RSVP within seconds on a phone.
3. **Honesty** — only confirmed information is presented as fact; missing details are clearly marked; demo features never pretend to save data.
4. **Action** — guests can add events to their calendar, open directions, RSVP, leave a wish and contact the families.
5. **Easy updates** — every name, date, time, venue, contact and message lives in one file (`site/content.js`).
6. **Inclusive** — touch-first, keyboard-accessible, screen-reader-friendly, and respectful of reduced-motion preferences.

### 1.3 Non-goals (v1)

- Product gift registry (explicitly excluded).
- Guest log-in or personalised invitation links (possible later; see Questions).
- Payments or online money transfer.
- Multiple languages (possible later; see Questions).

### 1.4 Audience

Family and friends of both families, many on mid-range Android phones and iPhones, some older relatives with larger text settings, some guests travelling from other cities or countries.

---

## 2. Confirmed information and missing information

### 2.1 Confirmed

| Item | Value |
|---|---|
| Wedding type | South Indian Christian wedding |
| Bride | Angel |
| Groom | David |
| Wedding date | 27 January 2027 (a Wednesday) |
| Bride's father | Rajthurai |
| Bride's mother | Jansi Rani |
| Groom's father | David Raj |
| Groom's mother | Angelo Mary |
| Requested events (in order) | Haldi, Mehendi, Sangeet, Christian marriage ceremony, Reception |
| Christian marriage ceremony date | 27 January 2027 |
| Gifting wording | "Your presence and blessings are our greatest gift. If you wish to give, an envelope gift is warmly welcome." |

### 2.2 Missing — To be provided

| Area | Missing item |
|---|---|
| Ceremony | Start time, end time, church name, full address, map link, photograph |
| Timezone | Official timezone for all event times (Proposal: Asia/Kolkata, IST, UTC+05:30 — please confirm) |
| Haldi | Date, time, venue, address |
| Mehendi | Date, time, venue, address |
| Sangeet | Date, time, venue, address |
| Reception | Date, time, venue, address, photograph |
| Venues | All venue names, addresses, photographs, directions, map links, parking details |
| Family | Grandparents (both sides, paternal and maternal), siblings, family photographs, optional portraits |
| Dress code | Final attire guidance overall and per event |
| RSVP | Deadline, guest-limit rules, whether children are included, notification email/phone |
| Wishing wall | Moderation owner, whether wishes are public |
| Travel | Travel guidance, parking, pickup/shuttle arrangements, pickup locations and timings, accommodation, booking links, assistance contact |
| Contacts | Bride's family representative (name, relationship, phone, WhatsApp), groom's family representative, event coordinator (if any) |
| Assets | Figma designs (if any), photographs, realistic floral/satin/pearl artwork (see THEME.md §6) |
| Hosting | Domain name, hosting choice, social-share image |
| Bible verse | Confirmation of the proposed verse and translation (see §4.2) |

---

## 3. Final section order and guest journey

### 3.1 Section order (final)

| # | Section | Anchor |
|---|---|---|
| 1 | Splash screen | (overlay, no anchor) |
| 2 | Welcome invitation | `#welcome` |
| 3 | Save the Date | `#save-the-date` |
| 4 | Countdown | `#countdown` |
| 5 | Parents and family | `#family` |
| 6 | Wedding events | `#events` |
| 7 | Dress code | `#dress-code` |
| 8 | Gifting | `#gifting` |
| 9 | Venues and directions | `#venues` |
| 10 | Wishing wall | `#wishes` |
| 11 | RSVP | `#rsvp` |
| 12 | Transportation and accommodation | `#travel` |
| 13 | Contact | `#contact` |
| 14 | Thank you | `#thank-you` |

### 3.2 Guest journey

1. **Arrive** from a WhatsApp or SMS link → a full-screen white lace-and-pearl envelope with a pearl dove seal and "Tap the seal to open".
2. **Open** → light sweeps the envelope and its four flaps fold away to reveal the card; the wedding car drives slowly down it and reveals "The Wedding of Angel & David" and the date; guests scroll on into the welcome. At the very end, after the thank-you, the wedding car drives in and parks on a slant with the couple waving.
3. **Read** the invitation, verse and date → **Add to Calendar** from Save the Date.
4. **Feel the anticipation** in the countdown.
5. **Meet the families** → optionally open either family tree.
6. **Plan** using the events timeline → per-event calendar and location actions → venues section with directions.
7. **Prepare** with dress-code guidance and the gifting note.
8. **Respond** → leave a wish, then RSVP.
9. **Logistics** → travel, accommodation and contacts.
10. **Close** with the thank-you and **Return to Top**.

**Persistent navigation:** after the splash, a slim header shows the "A & D" monogram, an **RSVP** shortcut and a **Menu** button. The menu opens a full-screen overlay listing sections 2–14.

---

## 4. Detailed requirements for every section

Shared rules for all sections:

- Every action is a visible button or link with a text label (icons are supplementary).
- Missing values render as a "To be provided" placeholder chip in the same position the real value will occupy.
- Content is pulled from `site/content.js`; no section hard-codes wedding facts.

### 4.1 Splash screen (opening)

**Purpose:** an opening that follows the couple's two reference videos: (1) a **full-screen envelope** whose four flaps open onto the card (sides first, then top with the seal and bottom); (2) their white vintage **wedding car, seen from above**, that then drives from the **top of the screen to the bottom**, revealing the names behind it.

**Closed envelope:** fills the screen. Four flaps of white tulle meet under the couple's **pearl dove wax seal**. The flaps are dressed with the real material from the couple's lace-and-pearl envelope (gold reduced to white): pearl flower sprays on the side flaps, the embroidered pearl motif on the top and bottom flaps, and the envelope's pearl-beaded border as trim along every flap edge. A small note reads "Tap the seal to open".

**Opening (≈ 3.5 s, starts only when the guest taps the seal):**

| Time | What happens |
|---|---|
| 0–1.3 s | **Light:** a soft glow blooms from the seal across the envelope, a sheen of light sweeps over the lace and the pearls twinkle. |
| 1.25–2.4 s | The left and right flaps fold away. |
| 1.95–3.45 s | The top flap (carrying the seal) and the bottom flap fold away, revealing the card. |

**Card:** pearl-white linen backdrop; down the left and right edges, **fine champagne stems with many small pearl-and-satin flowers**, buds, pearl sprigs and tiny pearls (small, delicate and plentiful, as in the couple's reference image with the car), leaving a clear path in the middle; an "A & D" monogram with "Angel & David" and "27 · 01 · 2027" in the centre; the front of the car peeking in from the top edge. Lettering stays in the original typography (Pinyon Script names, black ink).

**Car drive (≈ 9.5 s, begins automatically ½ s after the envelope opens):**

| Step | What happens |
|---|---|
| 1 | The car glides straight down from the top at **one smooth, steady speed** (no speeding up, slowing down or bouncing). |
| 2 | As the car passes over the monogram, it disappears beneath it. |
| 3 | Behind the car, from the top down, the text is uncovered: **The Wedding of** · **Angel & David** · **Save the Date** · **27.JAN.2027**. Nothing else is shown. |
| 4 | The car drives out at the bottom. The opening stays as the first screen with a "View the invitation" cue; the header stays hidden until guests scroll past it. |

- Tapping the seal (or anywhere on the envelope), or pressing Enter/Space on the focused seal, starts it. Nothing moves before the tap.
- **Reduced motion:** the envelope fades away and the final names screen appears without the car moving.
- **Failure safety:** if the car image fails to load, the final names screen appears without it; the opening always completes within ~15 s of the tap; if the main script fails, the opening is removed after 4 s and a static summary is shown; without JavaScript a `<noscript>` summary is shown.
- The rest of the page is `inert` while the animation plays. Afterwards focus moves to the "View the invitation" cue, or the page scrolls to a section link (e.g. `#rsvp`) if the guest arrived with one.
- Artwork: `site/assets/images/lace-spray-left.webp`, `lace-spray-right.webp`, `lace-motif.webp`, `lace-pearl-trim.webp` (cut from the supplied envelope, whitened), `dove-seal.webp` (supplied seal, background removed), `wedding-car.webp` (the supplied car with the couple, already transparent) and the pearl-flower pieces `pearl-bloom.webp`, `pearl-bud.webp`, `pearl-spray.webp`, `pearl-drops.webp`, `pearl-sprig.webp` (cut from the supplied flower image, gold softened). The couple shown in the car image is illustrative, not a photo of Angel & David.

### 4.1b The page look (whole invitation)

Modelled on the couple's reference videos (a scrolling invitation website, and a photo invitation video). Content of every section is unchanged; only the look and motion follow the videos.

- **Paper:** one continuous pearl-white linen paper behind all sections (no alternating bands).
- **Typography and colour:** unchanged from §5 (black ink; Pinyon Script, Cormorant Garamond, Jost). The small heading lines spell themselves out letter by letter out of a soft blur as they scroll in (from the couple's photo invitation video).
- **Flowers:** small pearl flowers peek in at the section edges and drift slowly as guests scroll; pearl flowers dress the welcome and the thank-you.
- **Reveals:** content rises slightly and comes into focus (soft blur → sharp) as it scrolls in.
- **Reduced motion:** no drifting flowers or travelling car; the car is shown parked at the end.

### 4.2 Welcome invitation

**Content:**

- Small fine-line Christian cross.
- Eyebrow: "Together with their families".
- **Angel & David** in calligraphy (most prominent element on screen).
- Invitation message (**Proposal**, editable): "By the grace of God and with joyful hearts, we invite you to witness and bless our union in Holy Matrimony."
- Date: **Wednesday, 27 January 2027**.
- Bible verse (**Proposal**): "…and a threefold cord is not quickly broken." — **Ecclesiastes 4:12, King James Version (KJV)**. The "threefold cord" stands for husband, wife and God. KJV is in the public domain.
  - Alternatives for review: "What therefore God hath joined together, let not man put asunder." — Mark 10:9 (KJV); "And above all these things put on charity, which is the bond of perfectness." — Colossians 3:14 (KJV).

- Ceremony time: "To be provided" until confirmed.

**Design (modelled on the couple's slideshow reference video):** the couple photograph in **black and white** fills the top of the section (edge to edge on phones). As in the video, when guests scroll down to it after the opening, the photo **slides down from the top into its place**, and only then does the invitation text appear, letter by letter. It then drifts slowly at one steady speed and moving with a gentle **parallax** as guests scroll; it fades into the paper under a soft white haze. The invitation sits over its lighter lower part: the cross, "Together with their families" spelling itself out letter by letter, **Angel & David** (Pinyon Script, black) coming slowly into focus, the message, then the date block as in the video — "JANUARY" above, **WEDNESDAY | 27 | 2027** between fine rules that draw outward — the ceremony time and the verse. Pearl flowers at the top-left and bottom-right of the text. If more photos are added to `content.js → couplePhotos`, they crossfade one after another. Reduced motion: the photo stays still. Photograph: `site/assets/images/couple-bw.webp` — the **sample supplied for the design** (it carries a photographer's "Maab Road" tag); replace it with Angel & David's own photograph before sharing.

### 4.3 Save the Date

- **27** dominates (very large serif), with "January" in calligraphy and "2027" beneath; weekday "Wednesday" as an eyebrow.
- **Add to Calendar** button → a small sheet with two choices: **Google Calendar** and **Apple / Outlook (.ics file)**.

**Calendar behaviour rules:**

| Condition | Calendar entry created |
|---|---|
| Date confirmed, ceremony time **not** confirmed (current state) | All-day event on 27 January 2027 titled "Save the Date — Angel & David's Wedding"; description says "Ceremony time and venue to be announced." No time is invented. |
| Date + start time + timezone confirmed | Timed event using the confirmed start (and end if supplied; otherwise start + 2 hours, labelled in the description as "end time approximate") converted to UTC. |
| Venue confirmed | Location field filled with venue name and full address. |
| Venue not confirmed | Location field left empty. |

- `.ics` files are generated in the browser (RFC 5545, `UID`, `DTSTAMP`, `SUMMARY`, `DESCRIPTION`, `LOCATION`, all-day `VALUE=DATE` or UTC times).

### 4.4 Countdown

- Four pearl tiles: **Days, Hours, Minutes, Seconds**; numbers in charcoal with tabular figures; tiles carry a pearl-dot edge and a soft sheen.
- `aria-live` is **not** applied to the ticking numbers (avoids constant announcements); a hidden summary updates once per minute.

| State | Condition | Display |
|---|---|---|
| Pending | Ceremony time or timezone not confirmed (current state) | Days tile shows calendar days remaining until 27 January 2027 (guest's local date). Hours, minutes and seconds tiles show a pearl placeholder. Note: "The exact countdown will begin once the ceremony time is confirmed." |
| Live | Time and timezone confirmed | Full ticking countdown to the confirmed ceremony start (computed in UTC). |
| Wedding day | Pending state and today is 27 January 2027 | "Today is the day — Angel & David are getting married." |
| Ended | Live countdown reaches zero, or the date has passed | "Angel & David are now joined in Holy Matrimony. Thank you for your prayers and blessings." Tiles are hidden. |

### 4.5 Parents and family

- Two family cards side by side on tablet/desktop, stacked on mobile.
  - **Bride's family:** "Angel, daughter of Rajthurai and Jansi Rani."
  - **Groom's family:** "David, son of David Raj and Angelo Mary."
- Each card has a family-photo frame (4:5) with a "Family photograph — To be provided" placeholder.
- Each card has a **View Our Family Tree** button.

**Family-tree overlay:**

- Native modal `<dialog>` in the browser's top layer, so it appears above the header and all sections and cannot be clipped by any section.
- Structure (top to bottom): Grandparents (paternal pair and maternal pair) → Parents → Angel/David with siblings.
- Confirmed people: parents and the bride/groom. Grandparents and siblings: "To be provided" placeholder nodes.
- Mobile: single column, generations stacked with connector lines, scrolls vertically inside the overlay; no pinch/zoom or horizontal scrolling required.
- Visible **Close** button (top-right, 48 × 48 px), Esc closes, focus returns to the button that opened it, page scroll is locked behind the overlay.
- **Proposal — floral-branch reveal:** an olive branch draws itself down the centre line (stroke animation, ~700 ms), white blooms open at each generation, then each person node fades up in sequence. Reduced motion: no animation.

### 4.6 Wedding events

Events in this order: **Haldi, Mehendi, Sangeet, Christian marriage ceremony, Reception.**

Each event card includes:

| Field | Source | If missing |
|---|---|---|
| Event name | content | — |
| Brief description (Proposal wording) | content | — |
| Date | content | "Date — To be provided" (ceremony: 27 January 2027) |
| Time | content | "Time — To be provided" |
| Venue name and short address | linked venue record | "Venue — To be provided" |
| **View Location** | links to the venue card in §4.9 | Button shown but disabled with the text "Location to be announced" |
| **Add to Calendar** | generated | Disabled "Date to be announced" if no date; all-day entry if date but no time |
| Illustration | SVG line art | — |

Proposal descriptions:

- **Haldi** — "A morning of turmeric blessings, laughter and family warmth."
- **Mehendi** — "An evening of henna artistry, music and togetherness."
- **Sangeet** — "Songs, dance and celebration as two families become one."
- **Christian marriage ceremony** — "Holy Matrimony, as Angel and David exchange vows before God, family and friends."
- **Reception** — "Dinner and celebration in honour of the newly married couple."

Illustrations (charcoal line art + white bloom + olive sprig, no bright yellow or multicolour): Haldi — brass uruli bowl with floating blooms; Mehendi — henna cone with paisley swirl; Sangeet — dholak drum and notes; Ceremony — church with cross and rings; Reception — tiered cake with pearls.

**Proposal — pearl-strand timeline:** events hang from a single vertical strand of pearls. Each event sits on a larger pearl "station"; small pearls run between. As a card scrolls into view its station pearl gains a soft sheen. On desktop the cards alternate left and right of a central strand; on mobile the strand runs down the left edge.

**Incomplete actions:** disabled actions remain visible (so guests know they will exist), use `aria-disabled="true"`, and explain why in their label. They never open an empty map or an invented calendar time.

### 4.7 Dress code

- Separate section; heading "Dress Code".
- **Proposal banner:** "Proposed direction for the couple's review — not yet a guest requirement."
- Proposed direction: **Black & White** — "Classic black, white, ivory and pearl tones." Swatches: black, white, ivory, pearl.
- Event-specific guidance cards (Haldi, Mehendi, Sangeet, Ceremony, Reception) each showing "Guidance — To be provided".
- Illustrations: saree drape and suit line drawings; reference-image placeholders ("Reference image — To be provided").
- When the couple confirms guidance, the proposal banner is turned off in `content.js` (`dressCode.isProposal = false`).

### 4.8 Gifting

- Central visual: a realistic white envelope (paper texture, shaded flaps, satin-and-pearl seal). No registry, no product links.
- Message: "Your presence and blessings are our greatest gift. If you wish to give, an envelope gift is warmly welcome."
- **Proposal — envelope interaction:** guest taps **Open the envelope** → the seal releases, the flap hinges open (3D rotation), and a lace-edged card slides up revealing the message. **Close** reverses it.
- The message is also present in the accessible text (screen readers read it without opening). Reduced motion: card shown open, no movement.

### 4.9 Venues and directions

- Cards: **Church ceremony venue**, **Reception venue**, and **Other event venues** (Haldi, Mehendi, Sangeet — shown only if different from the above once known; shown as placeholders in v1).
- Each card: venue photo (16:10) or placeholder, name, full address, directions notes, **Open in Maps** button, optional **Copy address** button.
- Event cards link here (`#venue-<id>`) instead of repeating full details; venue cards list which events take place there.
- Map URLs: use `mapUrl` from content when supplied; otherwise generate a Google Maps search URL from the full address; if no address, the button is disabled "Map link to be provided".
- No auto-loading map iframes (performance). **Proposal (later):** an embedded map that loads only when tapped.

### 4.10 Wishing wall

- Form: **Your name** (required, ≤ 60 chars), **Your wish** (required, ≤ 500 chars with live counter), **Send wish** button; hidden honeypot field for spam.
- States: idle, validating (inline errors), sending (button busy), saved, saved-pending-approval, error (with retry), demo.
- **View All Wishes** → full-viewport overlay (uses `100dvh`) above the entire page; scrollable list; visible **Close**; Esc closes; focus restored.
- **Proposal — interaction:** wishes appear as white envelope cards with pearl-dot edges; a newly sent wish slides into the stack like a card being placed on a table.

**Demo vs connected** (see §8 for storage):

| Mode | When | What guests see |
|---|---|---|
| Demo | `backend.endpoint` is empty (v1 default) | A visible "Preview mode" note on the form. Wishes are kept only in this browser. Confirmation reads "Preview only — your wish was kept on this device and has not been sent to Angel & David." |
| Connected | `backend.endpoint` configured | Wish sent to the server; success only after the server confirms it saved. If moderation is on: "Thank you! Your wish has been received and will appear once approved." |

### 4.11 RSVP

| Field | Type | Rules |
|---|---|---|
| Guest name | text | Required, 2–80 chars |
| Attendance | radio: "Joyfully accepts" / "Regretfully declines" | Required |
| Number of attendees | number stepper | Required if accepting; min 1; max = `rsvp.maxGuests` (To be provided; v1 cap 10) |
| Events attending | checkboxes (5 events) | At least one if accepting; hidden if declining |
| Dietary requirements | text | Optional, ≤ 200 chars |
| Message | textarea | Optional, ≤ 500 chars |

- Labels always visible (not placeholder-only); errors listed inline under each field and summarised at the top with links to each field; `aria-invalid` and `aria-describedby` set.
- RSVP deadline: "To be provided" (shown under the heading when set).
- Submission feedback: button shows "Sending…" and is disabled; success **only** after the server responds `ok: true`; failure shows an error with retry and contact fallback.
- Demo mode: an information panel (not a success message) — "Preview only — this RSVP was not sent. RSVPs will be collected once the form is connected."
- Duplicate responses (connected): v1 records every submission with a timestamp, so the latest response per guest is the one that counts. **Proposal:** automatic de-duplication by name once guest-list rules are known.

### 4.12 Transportation and accommodation

Placeholder cards for: **Travel guidance, Parking, Pickup and shuttle arrangements, Pickup locations and timings, Suggested accommodation, Booking links, Assistance contact.**

- Each category is either confirmed (shown with details) or shows "To be provided".
- Only confirmed arrangements appear as guest-facing facts; no hotel names, shuttle times or links are invented.

### 4.13 Contact

- Cards: **Bride's family representative**, **Groom's family representative**, **Event coordinator** (only rendered for guests if supplied; shown as an optional placeholder in preview).
- Each card: name, relationship, **Call** (`tel:`) and **WhatsApp** (`https://wa.me/<number>`) buttons, rendered only when a real number exists. Until then: "Phone number — To be provided".
- Numbers stored in international format (e.g. `+91…`); no numbers are invented.

### 4.14 Thank you

- Pearl flowers above the line.
- "Thank you for blessing our journey." — **Proposal:** gentle handwriting reveal (SVG stroke draw ≈ 2.4 s, then the fill fades in). Static readable text is always present for screen readers and reduced-motion users.
- "Angel & David" and the date.
- **Return to Top** button → smooth scroll to the welcome (instant for reduced motion) and focus moves to the top.
- **Parking place** (decorative), at the very end of the page as in the last frame of the reference video: once it comes into view, the wedding car drives in from the left, swings round and stops **on a slant** (about 32°) at the bottom left, partly beyond the page edge, with the couple waving to the guests; then the "A & D" monogram and pearl flowers settle in beside it and a few pearl glints twinkle around the couple. It plays once per visit; reduced motion shows it parked.

---

## 5. Visual system and typography proposals

Full details in [THEME.md](THEME.md). Summary:

- **Palette:** pearl `#F8F6F1`, white `#FFFFFF`, ivory `#F3EEE3`, ink `#121212`, charcoal `#2B2A28`; olive `#6B7445` only within florals.
- **Type:** Cormorant Garamond (display), Pinyon Script (selective calligraphy), Jost (body/UI). Small heading lines appear letter by letter (§4.1b).
- **Layout:** single column on mobile (16–20 px gutters), 2-column grids from 768 px, max content width 1120 px; section padding 5–8 rem.
- **Components:** pill buttons (primary = black fill with white text; secondary = white with charcoal hairline), paper cards with lace edge, pearl dividers, "To be provided" chips (dashed pearl border, italic), "Proposal" banners (ivory with a small leaf icon).

---

## 6. Animation and interaction specifications

| # | Interaction | Trigger | Duration / easing | Reduced motion | Fallback |
|---|---|---|---|---|---|
| A1 | Light effect and four-flap envelope opening (≈ 3.5 s), then the car drive | Tap the seal / Enter / Space | ≈ 9.5 s; one constant, smooth speed top to bottom (no easing); text uncovered from the top down behind the car | Final screen appears instantly | Completes within ~12.5 s; no car image → final screen; script-failure removal at 4 s |
| A2 | Section reveal | Scroll into view (IntersectionObserver) | 1 s fade-up 22 px with a soft focus-pull (blur 5 px → 0) | Instant | Content visible if observer unsupported |
| A2b | Car parks at the end | Parking place 45 % in view (once) | 3.2 s drive-in from the left, turning from 80° to a 32° slant and slowing to a stop; monogram fades in after; glints 3 × 1.4 s | Car shown parked | No car image → monogram and flowers only |
| A2c | Edge flowers drift | Scroll | Linked to the scroll (5–16 % of the scroll distance) | None | Static flowers |
| A2d | Letter-by-letter heading lines | Scroll into view | 55 ms per letter, each fading in out of a 6 px blur | Text shown at once | Plain text for screen readers |
| A2e | Welcome couple photo | Photo 30 % in view (once) | Slides down from the top into place (2 s, slowing to a stop); the text starts 1.5 s in, letter by letter; then drift 16 s linear; parallax at 22 % of the scroll; several photos crossfade every 7 s | Photo and text shown at once | No photo → the welcome shows text only |
| A3 | Countdown tick | Every second | Number change, no motion | Same | Pending/ended states |
| A4 | Family-tree floral reveal | Open overlay | 700 ms branch draw + 60 ms staggered nodes | None | Static tree |
| A5 | Pearl timeline sheen | Event card enters view | 500 ms | None | Static pearls |
| A6 | Envelope opening | Tap button | Seal 200 ms, flap 500 ms, card 600 ms | Card shown open | Message always in DOM |
| A7 | Wish placed | Successful save | 450 ms slide/settle | None | — |
| A8 | Overlay open/close | Button | 250 ms fade + 12 px rise | Instant | `<dialog>` fallback to fixed overlay |
| A9 | Handwriting reveal | Thank-you enters view | 2.4 s stroke + 400 ms fill | Static text | Static text |
| A10 | Return to top | Tap | Native smooth scroll | Instant jump | — |

Interaction rules: no hover-only information; all targets ≥ 44 × 44 px (buttons 48 px tall); visible focus ring; overlays close via button, Esc and backdrop tap (backdrop tap not on forms with unsaved text).

---

## 7. Asset checklist (summary)

Full checklist with sizes and status in [THEME.md §6](THEME.md#6-asset-checklist).

| Should be **SVG** | Should be **realistic transparent PNG/WebP** | Should be **video** |
|---|---|---|
| Cross, monogram, icons, pearl dividers, lace edge pattern, event illustrations, dress-code illustrations, family-tree connectors and branch, handwriting stroke | Floral corners (white flowers + olive leaves + pearls), pearl strands, **wedding car with couple (done)**, **pearl-and-satin flower pieces (done)**, **black-and-white couple photograph (sample supplied; to be replaced)**, **net flower with pearls (done, showcase page)**, envelope (front/back/flap), paper texture, lace strip | None required (the opening animates the car image in code) |
| **Photographs (WebP/AVIF):** family ×2, venues ×2+, dress references, share image (JPG 1200 × 630) | | |

v1 ships SVG/CSS versions of every decoration so the site is complete; realistic raster/video assets are drop-in upgrades configured in `content.js → assets`.

---

## 8. RSVP and wishing-wall storage requirements

### 8.1 Data model

**RSVP**

| Field | Type |
|---|---|
| `id` | server-generated |
| `submittedAt` | ISO timestamp (server) |
| `name` | string |
| `attending` | `"yes"` / `"no"` |
| `guests` | integer |
| `events` | string[] (event ids) |
| `dietary` | string (optional) |
| `message` | string (optional) |
| `userAgent` | string (for troubleshooting, optional) |

**Wish**

| Field | Type |
|---|---|
| `id` | server-generated |
| `submittedAt` | ISO timestamp |
| `name` | string |
| `message` | string |
| `approved` | boolean (default `false` when moderation is on) |

### 8.2 Recommended backend (connected mode)

**Option A — Google Sheets + Google Apps Script (recommended, free).** A ready-made script is included at `backend/google-apps-script.gs`:

- `POST {type:"rsvp"}` → appends a row to the **RSVPs** sheet; optional email notification to the couple (`NOTIFY_EMAIL`).
- `POST {type:"wish"}` → appends a row to the **Wishes** sheet with `Approved = FALSE`.
- `GET ?action=wishes` → returns only approved wishes.
- **Moderation:** the couple (or a delegate) ticks the `Approved` checkbox in the sheet.
- The site sets `backend.endpoint` in `content.js` to the deployed web-app URL.

**Option B — Supabase / Firebase** for real-time display and an admin page (more setup).

**Option C — Form service (Formspree, Getform)** for RSVP only; wishes would then need a separate display solution.

### 8.3 Rules

- The website shows success **only** after the backend responds with `{ ok: true }`.
- Network or server errors show a clear error with **Try again** and the contact section as a fallback.
- Inputs are trimmed and length-limited client-side and server-side; displayed wishes are rendered as text (never as HTML) to prevent script injection.
- A hidden honeypot field rejects simple spam bots (nothing is saved and no success is shown).
- Personal data is stored only in the couple's backend; nothing is sent to analytics.
- Demo mode stores wishes and RSVPs in `localStorage` on the guest's own device, labelled "Preview only".

### 8.4 Notifications (To be provided)

- Email to the couple per RSVP (Apps Script `MailApp`), or a daily digest.
- Optional WhatsApp notifications require a paid provider (e.g. Twilio) — not in v1.

---

## 9. Mobile, accessibility and performance requirements

### 9.1 Mobile and responsive

- Designed first at 360–430 px wide; adapts at 768 px (tablet) and 1100 px (desktop).
- No horizontal page overflow at any width from 320 px (`overflow-x: clip` on the root as a safety net, but layouts must not rely on it).
- Respects safe-area insets (`env(safe-area-inset-*)`) for notched phones.
- Overlays use `100dvh` so mobile browser toolbars never hide the close button.

### 9.2 Accessibility (WCAG 2.2 AA target)

- Text contrast ≥ 4.5:1 (body text ≈ 13:1).
- All functions operable by touch, keyboard and screen reader; no hover-dependent information.
- Skip link to the invitation; landmarks (`header`, `main`, `nav`, `footer`); one `h1` (couple's names), `h2` per section.
- Form fields have visible `<label>`s, `aria-describedby` for hints/errors, error summary on submit, `aria-live="polite"` status regions.
- Overlays: `<dialog>` with `aria-labelledby`, focus moved inside on open, returned on close, Esc closes.
- `prefers-reduced-motion` honoured for all animations; decorative SVG marked `aria-hidden="true"`.
- Images have meaningful `alt`; placeholders announce "To be provided".
- Text resizes to 200% without loss of content.

### 9.3 Performance

| Metric (mid-range Android, 4G) | Target |
|---|---|
| Largest Contentful Paint | ≤ 2.5 s |
| Cumulative Layout Shift | ≤ 0.05 |
| Interaction to Next Paint | ≤ 200 ms |
| Initial transfer (excluding photos below the fold) | ≤ 350 KB |
| Splash video (if used) | ≤ 1.5 MB, loaded only after first paint |

- No framework; plain HTML/CSS/JS, deferred scripts.
- Fonts: 3 families, limited weights, `preconnect` + `display=swap`.
- Photos: WebP/AVIF, `loading="lazy"`, `decoding="async"`, explicit `width`/`height`.
- SVG ornaments generated once and reused.

---

## 10. Acceptance criteria

### Global

- [ ] All 14 sections appear in the final order (§3.1).
- [ ] Every confirmed name and the date match §2.1 exactly.
- [ ] No invented relatives, venues, times, phone numbers, links or arrangements anywhere.
- [ ] Every missing item shows "To be provided"; every suggestion is labelled "Proposal" where shown to the couple.
- [ ] No horizontal scrolling at 320, 375, 414, 768, 1024, 1440 px.
- [ ] Every interaction works by touch and keyboard; no hover-only content.
- [ ] All overlays appear above every page element, scroll internally, close via a visible button and Esc, and restore focus.
- [ ] With reduced motion enabled, no element moves more than a cross-fade.
- [ ] All wedding facts come from `site/content.js`; changing a value there updates every place it appears.

### Per section

1. **Splash** — full-screen lace-and-pearl envelope with the dove seal and "Tap the seal to open" visible at 320 × 640 and up; nothing moves before the tap; light effect, then flaps open in the reference order (sides, then top with seal and bottom) in ≈ 3.5 s; the car then drives top → bottom at a constant speed revealing only The Wedding of · Angel & David · Save the Date · date; reduced motion skips all movement; guests always get in even if an image or script fails.
2. **Welcome** — names most prominent; cross, message, date, verse with reference and translation shown.
3. **Save the Date** — "27" is the focal element; Add to Calendar offers Google and .ics; the entry is all-day while the time is unconfirmed.
4. **Countdown** — pending state shows days + explanation; live state ticks each second once time and timezone are set; ended message appears after the time.
5. **Family** — exact family wording; photo placeholders; both tree overlays open, show parents + placeholders, close cleanly, not clipped.
6. **Events** — five events in order; ceremony shows 27 January 2027; others show placeholders; disabled actions explain why; illustrations consistent and monochrome-plus-olive.
7. **Dress code** — black & white shown as Proposal; per-event guidance placeholders; illustrations present.
8. **Gifting** — envelope opens/closes; message wording exact; no registry.
9. **Venues** — church, reception and other venue placeholders; event cards link to them.
10. **Wishing wall** — validation; demo labelled; View All Wishes overlay full-viewport, scrollable, closable.
11. **RSVP** — all fields; validation; success only when saved; demo clearly not a success.
12. **Travel** — seven placeholder categories; nothing invented.
13. **Contact** — three cards; call/WhatsApp only with real numbers.
14. **Thank you** — exact wording; handwriting reveal with static fallback; Return to Top works.

---

## 11. Phased implementation plan

| Phase | Scope | Output | Status |
|---|---|---|---|
| 0 | PRD + THEME | `PRD.md`, `THEME.md` | Done |
| 1 | Foundation | Content model, tokens, typography, components, SVG ornament system, navigation, dialogs | Done in v1 |
| 2 | Sections 1–7 | Splash animation, welcome, save the date + calendar, countdown, families + trees, events timeline, dress code | Done in v1 |
| 3 | Sections 8–14 | Envelope, venues, wishing wall, RSVP, travel, contact, thank-you | Done in v1 |
| 4 | Content fill | Couple supplies missing information (§2.2) → update `content.js` | Waiting on couple |
| 5 | Realistic assets | Replace SVG decorations with supplied/produced WebP and video (THEME.md §6); apply Figma if provided | Waiting on assets |
| 6 | Connect backend | Deploy Apps Script (or chosen backend), set `backend.endpoint`, test RSVP + wishes + moderation + notifications | Waiting on decision |
| 7 | QA and launch | Device testing (iOS Safari, Android Chrome, desktop), accessibility audit, Lighthouse, domain + hosting, share image | After 4–6 |
| 8 | Post-wedding | Switch countdown to ended state (automatic), optional thank-you photo update, archive wishes | After 27 Jan 2027 |

---

## 12. Questions to answer before development is finalised

1. What time does the Christian marriage ceremony start (and end), and which timezone should be used — is it Asia/Kolkata (IST)?
2. What are the church and reception venue names, full addresses and map links? Are Haldi, Mehendi and Sangeet at different venues?
3. What are the dates and times for Haldi, Mehendi, Sangeet and the Reception?
4. Which grandparents and siblings should appear in each family tree, with exact spellings (and should late relatives be marked, e.g. "Late")?
5. Do you approve the Bible verse (Ecclesiastes 4:12, KJV), or would you prefer another verse or translation (e.g. a Tamil translation)?
6. Do you approve black & white as the guest dress code, and is there specific guidance per event?
7. What is the RSVP deadline, how many guests may each invitation include, and are children invited?
8. Which backend should save RSVPs and wishes (Google Sheets recommended), who receives notifications, and who approves wishes?
9. Who are the bride's and groom's family representatives (names, relationship, phone/WhatsApp numbers), and is there an event coordinator?
10. Will transport, shuttles or accommodation be arranged for guests? If so, please share the details.
11. Do you have Figma designs, photographs, or realistic artwork (florals, a photo of the couple for the opening) to use, and a domain name for the site?
12. Should the invitation also be available in Tamil (or another language)?
