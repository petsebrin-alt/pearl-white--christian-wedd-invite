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
| Christian marriage ceremony start time | 10:30 in the morning |
| Haldi | Sunday 24 January 2027, 11:00 am — the bride's and groom's family homes, Alappuzha, Kerala |
| Mehendi | Monday 25 January 2027, 4:00 pm — the family homes, Alappuzha |
| Sangeet | Tuesday 26 January 2027, 8:00 pm — a grand hotel hall in Alappuzha |
| Christian marriage ceremony | Wednesday 27 January 2027, 10:30 am — the main church of Alappuzha |
| Reception | 6:00 pm, at the same hotel as the Sangeet (date taken as 27 January 2027, the wedding evening — please confirm) |
| Hotel and church chosen at the couple's request | Hotel: **Ramada by Wyndham Alleppey**, Nehru Trophy Finishing Point, Punnamada, Alappuzha (lakeside; large banquet halls). Church: **Our Lady of Mount Carmel Cathedral**, Convent Square, Alappuzha, Kerala 688001 (cathedral of the Diocese of Alleppey). Both picked from public listings — **please confirm the bookings** before sharing. |
| Gifting wording | "Your presence and blessings are our greatest gift. If you wish to give, an envelope gift is warmly welcome." |

### 2.2 Missing — To be provided

| Area | Missing item |
|---|---|
| Ceremony | End time; confirmation of the church booking; church photograph |
| Timezone | Set to India Standard Time (Asia/Kolkata, UTC+05:30) for the South Indian wedding — please confirm |
| Haldi & Mehendi | Exact addresses of the bride's and groom's family homes (the map link opens Alappuzha until then) |
| Sangeet & Reception | Confirmation of the hotel booking and hall; reception date confirmation |
| Venues | Photographs, directions and parking details for each venue |
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
| 4b | Couple gallery — "Moments Together" (added at the couple's request) | `#gallery` |
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

1. **Arrive** from a WhatsApp or SMS link → a full-screen white lace-and-pearl envelope with a pearl dove seal and "Your invitation is opening…"; no tap is needed.
2. **Open** → light sweeps the envelope and its four flaps fold away to reveal the card; the wedding car drives slowly down it and reveals "The Wedding of Angel & David" and the date; guests scroll on into the welcome. At the very end, after the thank-you, the wedding car drives in and parks on a slant with the couple waving.
3. **Read** the invitation, verse and date → **Add to Calendar** from Save the Date.
4. **Feel the anticipation** in the countdown, then **see the couple's moments together** in the gallery.
5. **Meet the families** → optionally open either family tree.
6. **Plan** using the events timeline → per-event calendar and location actions → venues section with directions.
7. **Prepare** with dress-code guidance and the gifting note.
8. **Respond** → leave a wish, then tap RSVP on the dove's envelope.
9. **Logistics** → travel, accommodation and contacts.
10. **Close** with the thank-you, the parked car and **Return to Top**.

**Persistent navigation:** after the splash, a slim header shows the "A & D" monogram, an **RSVP** shortcut and a **Menu** button. The menu opens a full-screen overlay listing sections 2–14.

---

## 4. Detailed requirements for every section

Shared rules for all sections:

- Every action is a visible button or link with a text label (icons are supplementary).
- Missing values render as a "To be provided" placeholder chip in the same position the real value will occupy.
- Content is pulled from `site/content.js`; no section hard-codes wedding facts.

### 4.1 Splash screen (opening)

**Purpose:** an opening that follows the couple's two reference videos: (1) a **full-screen envelope** whose four flaps open onto the card (sides first, then top with the seal and bottom); (2) their white vintage **wedding car, seen from above**, that then drives from the **top of the screen to the bottom**, revealing the names behind it.

**Closed envelope:** fills the screen. Four flaps of white tulle meet under the couple's **pearl dove wax seal**. The flaps are dressed with the real material from the couple's lace-and-pearl envelope (gold reduced to white): pearl flower sprays on the side flaps, the embroidered pearl motif on the top and bottom flaps, and the envelope's pearl-beaded border as trim along every flap edge. A small note reads "Your invitation is opening…" with softly blinking dots.

**Opening (by itself, 5 s after the page appears — no tap needed; tapping the seal opens it sooner):** in the last 1.6 s before it opens, light gathers at the seal and the seal brightens; then:

| Time | What happens |
|---|---|
| 0–1.3 s | **Light:** a soft glow blooms from the seal across the envelope, a sheen of light sweeps over the lace and the pearls twinkle. |
| 1.25–2.4 s | The left and right flaps fold away. |
| 1.95–3.45 s | The top flap (carrying the seal) and the bottom flap fold away, revealing the card. |

**Card:** pearl-white linen backdrop; down the left and right edges, **fine champagne stems with many small pearl-and-satin flowers**, buds, pearl sprigs and tiny pearls (small, delicate and plentiful, as in the couple's reference image with the car), leaving a clear path in the middle; an "A & D" monogram with "Angel & David" and "27 · 01 · 2027" in the centre; the front of the car peeking in from the top edge. Lettering stays in the original typography (Pinyon Script names, black ink).

**Car drive (≈ 9.5 s, sets off 0.15 s after the flaps start to open — no waiting; it comes out from under the top flap as it lifts):** the car moves on the graphics card (Web Animations), so a busy moment on the phone cannot make it stutter; the text reveal follows the animation's own clock. The car picture is decoded before the drive.

| Step | What happens |
|---|---|
| 1 | The car glides straight down from the top at **one smooth, steady speed** (no speeding up, slowing down or bouncing). |
| 2 | As the car passes over the monogram, it disappears beneath it. |
| 3 | Behind the car, from the top down, the text is uncovered: **The Wedding of** · **Angel & David** · **Save the Date** · **27.JAN.2027**. Nothing else is shown. |
| 4 | The car drives out at the bottom. The opening stays as the first screen with a "View the invitation" cue; the header stays hidden until guests scroll past it. |

- It opens by itself 5 s after the page appears (a moment longer only if the car picture is still loading, at most 3 s). Tapping the seal (or anywhere on the envelope), or Enter/Space on the focused seal, opens it sooner.
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

- Ceremony time: **10:30 am IST**.

**Design (modelled on the couple's slideshow reference video):** the couple photograph in **black and white** fills the top of the section (edge to edge on phones). As in the video, when guests scroll down to it after the opening, the photo **slides down from the top into its place**, and only then does the invitation text appear, letter by letter. It then drifts slowly at one steady speed and moving with a gentle **parallax** as guests scroll; it fades into the paper under a soft white haze. The invitation sits over its lighter lower part: the cross, "Together with their families" spelling itself out letter by letter, **Angel & David** (Pinyon Script, black) coming slowly into focus, the message, then the date block as in the video — "JANUARY" above, **WEDNESDAY | 27 | 2027** between fine rules that draw outward — the ceremony time and the verse. Pearl flowers at the top-left and bottom-right of the text. If more photos are added to `content.js → couplePhotos`, they crossfade one after another. Reduced motion: the photo stays still. Photograph: `site/assets/images/couple-bw.webp` — the **sample supplied for the design** (it carries a photographer's "Maab Road" tag); replace it with Angel & David's own photograph before sharing.

### 4.3 Save the Date

- **"Save the Date"** in tall brush lettering (Comforter) as in the couple's reference: in the same black ink as the couple's names, "the" tucked inside a hand-drawn loop, a small pearl flower beside "Save".
- A **ring of real pearls and crystals** (cut from the couple's pearl image): a chain of large, medium and small pearls over sparkling crystals, with a cluster of pearls at the bottom.
- Inside it, **27** dominates (very large serif), with "January" in calligraphy and "2027" beneath; weekday "Wednesday" above.
- **Tap to reveal** (modelled on the couple's petal video): at first the date is covered by a pile of satin pearl-white petals with a "Tap the petals" hint. One tap and the petals burst away from the finger, swirl round the centre and settle into a wreath tucked inside the pearl ring (≈ 2.5 s) while the date comes into focus; then real white rose petals shower down over the whole screen for about 8 s. Tapping again sends another shower. Reduced motion: the wreath and date are shown at once, no shower. The date is always available to screen readers.
- **Add to Calendar** button → a small sheet with two choices: **Google Calendar** and **Apple / Outlook (.ics file)**.

**Calendar behaviour rules:**

| Condition | Calendar entry created |
|---|---|
| Date confirmed, ceremony time **not** confirmed | All-day event on 27 January 2027 titled "Save the Date — Angel & David's Wedding"; description says "Ceremony time and venue to be announced." No time is invented. |
| Date + start time + timezone confirmed (current state: 10:30 am IST) | Timed event using the confirmed start (and end if supplied; otherwise start + 2 hours, labelled in the description as "end time approximate") converted to UTC. |
| Venue confirmed | Location field filled with venue name and full address. |
| Venue not confirmed | Location field left empty. |

- `.ics` files are generated in the browser (RFC 5545, `UID`, `DTSTAMP`, `SUMMARY`, `DESCRIPTION`, `LOCATION`, all-day `VALUE=DATE` or UTC times).

### 4.4 Countdown

- **Days, Hours, Minutes, Seconds**, each number in the frosted centre of a **beaded pearl flower** (modelled on the couple's reference: frosted petals, loops of white pearls and silver seed beads). The four flowers hang as a draped garland, alternately high and low, each linked to the next by a **chain of white pearls and silver seed beads**. As the section scrolls in, the flowers open one after another and the chain is strung between them; each number fades softly as it changes. Numbers in charcoal with tabular figures.
- `aria-live` is **not** applied to the ticking numbers (avoids constant announcements); a hidden summary updates once per minute.

| State | Condition | Display |
|---|---|---|
| Pending | Ceremony time or timezone not confirmed | Days tile shows calendar days remaining until 27 January 2027 (guest's local date). Hours, minutes and seconds tiles show a pearl placeholder. Note: "The exact countdown will begin once the ceremony time is confirmed." |
| Live | Time and timezone confirmed (current state) | Full ticking countdown to the confirmed ceremony start (computed in UTC). |
| Wedding day | Pending state and today is 27 January 2027 | "Today is the day — Angel & David are getting married." |
| Ended | Live countdown reaches zero, or the date has passed | "Angel & David are now joined in Holy Matrimony. Thank you for your prayers and blessings." Tiles are hidden. |

### 4.4b Couple gallery ("Moments Together")

Modelled on the couple's "glass gallery cube" reference video. Placed between the countdown and the families.

- **Cube:** a glass cube whose four sides are made of 16 square tiles (2 × 2 per side) — 14 photographs plus a pearl "A & D" tile and a pearl date tile ("27 January 2027"); a frosted glass lid with the "A & D" monogram on top and a soft shadow beneath. It turns slowly by itself. "Scroll to open our gallery" beneath.
- **Scroll-driven (sticky stage, ≈ 2.7 screens of scrolling):** as guests scroll, the cube turns further, the lid fades, the tiles fly apart on curved paths and wrap into a two-row curved band that turns like a carousel; the band then settles into a **flat photo wall** (4 × 4 on phones, 8 × 2 on wider screens). Scrolling back up reverses it and rebuilds the cube.
- **Photos:** tapping a photo on the wall opens it full size in a viewer (all photos, Previous / Next, arrow keys, swipe on phones, counter "3 / 14"). Tapping the cube, or tabbing to a photo with the keyboard, first scrolls to the wall.
- **Reduced motion / showcase view:** the wall is shown straight away, without the long scroll.
- **Content:** `content.js → gallery` (eyebrow "Our Journey", title "Moments Together", `photos` with a square `tile` crop and the full `src`). The first 14 fill the wall; all can be opened. The current 14 are **samples supplied for the design** (watermarks painted out, one screenshot trimmed) — replace them with Angel & David's own photographs before sharing.

### 4.5 Parents and family

- Two family cards side by side on tablet/desktop, stacked on mobile.
  - **Bride's family:** "Angel, daughter of Rajthurai and Jansi Rani."
  - **Groom's family:** "David, son of David Raj and Angelo Mary."
- Each card has a pearl-edged photo frame (4:5) with **two black-and-white photographs**: the parents first, then the family with siblings. Modelled on the couple's reference video: when the cursor rests on the photo it breaks into a grid of square tiles (9 across) that flash grey and flip, in random order, to the second photo in about 0.7 s, with a faint grid over it; moving away flips them back. Tap or Enter/Space toggles it; on touch screens (no cursor) the two photos take turns every ≈ 4 s while the photo is on screen, until the guest taps it. Reduced motion: a quick fade instead. With no photos, a "Family photograph — To be provided" placeholder is shown.
- Photographs are set in `content.js → families.bride.photos` / `families.groom.photos`. The current four are **samples supplied for the design** (`family-bride-1/2.webp`, `family-groom-1/2.webp`; the group photo's app arrows and page dots were painted out) — replace them with Angel's and David's own family photographs before sharing.
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
| Photo (back card) | `events[].photo` (picture, description, focal point) chosen by the couple | — |

Proposal descriptions:

- **Haldi** — "A morning of turmeric blessings, laughter and family warmth."
- **Mehendi** — "An evening of henna artistry, music and togetherness."
- **Sangeet** — "Songs, dance and celebration as two families become one."
- **Christian marriage ceremony** — "Holy Matrimony, as Angel and David exchange vows before God, family and friends."
- **Reception** — "Dinner and celebration in honour of the newly married couple."

**Layout — switching tabs card (modelled on the couple's reference video):**

- A **menu of the five events** (Haldi · Mehendi · Sangeet · Wedding · Reception) runs along the top of the **detail card**, with a fine underline that slides to the chosen event. The detail card shows the number and kind ("04 · The Wedding"), name, description, Date / Time / Venue, a **View Location** button and an **Add to Calendar** link.
- Behind it, the **photo card** shows the picture the couple chose for each event, in black and white: Haldi — family showering the couple with petals (illustration); Mehendi — the bride's mehendi hands with pearl bangles and a rosary (illustration); Sangeet — the couple dancing; Wedding — the bride reading her vows; Reception — the couple embracing under chandeliers (illustration). Each is centred on its subject (`photo.position`).
- Choosing an event — a tab, the ‹ › arrows (with a "04 / 05" counter beneath), a swipe on phones, or the arrow / Home / End keys on the menu — blurs the old details out and blurs the new ones in line by line (≈ 0.5 s), while the new photo fades in over the old with a soft zoom (≈ 1 s).
- Phones: the photo card on top and the detail card overlapping its lower part, all five menu items fitting on screens from 360 px. Wider screens: the detail card overlaps the left of a wide photo card, as in the video.
- As the section scrolls in, the photo card slides in from the right and the detail card from the left. Links to `#event-<id>` (from the venues) open that event.
- Accessible as a tab list (`role="tablist"`, roving focus, `aria-selected`, one tab panel).

**Incomplete actions:** disabled actions remain visible (so guests know they will exist), use `aria-disabled="true"`, and explain why in their label. They never open an empty map or an invented calendar time.

### 4.7 Dress code

- Separate section; heading "Dress Code".
- Direction: **Black & White** — "Classic black, white, ivory and pearl tones." Swatches: black, white, ivory, pearl. Chosen by the couple, so the proposal banner is off (`dressCode.isProposal = false`).
- **Outfit photographs chosen by the couple** in pearl frames: two for her (a white satin gown with bows and ribbons; an ivory off-shoulder satin gown with a bow and train) and two for him (a black beaded tuxedo; an ivory dinner jacket with black lapels). They rise in one after another as the section scrolls in. Set in `content.js → dressCode.outfits` (a phone number written on one photo was painted out).
- Removed at the couple's request: the proposal note, the line illustrations, "Guidance by event" and "Reference images".

### 4.8 Gifting

- Central visual: a pearl-ivory envelope modelled on the couple's reference photo — a row of real pearls along both edges of the flap, a sprig of baby's breath rising from the seal, and the ivory pearl dove wax seal from the opening; paper texture and soft folds (rendered images `envelope-front.webp`, `envelope-flap.webp`). No registry, no product links.
- Message: "Your presence and blessings are our greatest gift. If you wish to give, an envelope gift is warmly welcome."
- **Proposal — envelope interaction:** guest taps **Open the envelope** → the seal releases, the flap hinges open (3D rotation), and a lace-edged card slides up revealing the message. **Close** reverses it.
- The message is also present in the accessible text (screen readers read it without opening). Reduced motion: card shown open, no movement.

### 4.9 The venue

At the couple's request, **only the church** of the Christian marriage ceremony is shown here, styled after their "Audio Guest Book" reference, all in black and white:

- Heading: **"We are gathered"** in black script over **"HERE TOGETHER"** in outlined (engraved) capitals. The script writes itself in when the heading comes into view, then the capitals settle in.
- A line illustration of a **Kerala church** between palms on the backwaters, in black lines on white, that **draws itself as guests scroll** (each line in turn, the whole drawing rising slightly); fills appear once it is complete. It is an illustration, not a drawing of the actual cathedral (the couple may send reference illustrations).
- One small block of details: **Our Lady of Mount Carmel Cathedral**, "Convent Square, Alappuzha, Kerala 688001", "Wednesday, 27 January 2027 · 10:30 am IST", and a **Get Directions** button (Google Maps).
- The hotel and the family homes (`showInVenues: false`) are not shown here: their events' **View Location** opens Google Maps directly. The Wedding event's View Location links to this section.
- Reduced motion: the drawing and heading are shown complete.

### 4.10 Wishing wall

Modelled on the couple's "arc dial" reference video, in black and white:

- **The ring:** the guests' faces sit on a large ring, like a turning globe. The face at the top is the wish being read; it is larger, with ‹ › arrows and a counter ("03 / 08") just under it.
- **It moves by itself:** every few seconds (long enough to read the wish, 5–11 s) the ring turns and brings the next face up to the top. No tapping is needed. Faces further round are smaller and fade away, as if going round the far side.
- **The wish, no card:** a quotation mark, the wish in small type (appearing word by word out of a soft blur), the guest's name in small capitals and how they know the couple. Long wishes show six lines and a **Read more** link.
- **Faces are always black and white:** a guest's own photo (made black and white in their browser before it is sent) or a black or white monogram.
- **Background:** white roses that sway gently and shift, like the flower video behind "Order of the Day" in the couple's reference. They stay in view while the section scrolls.
- **The form:** on frosted paper over the roses, with a fine double frame and a pearl at each corner. **Your name** (required, ≤ 60); **How do you know the couple?** — a list of choices (`wishes.relations`) and **Other**, which opens one more box for the guest's own answer (≤ 60); **Your wish** (required, ≤ 500 with live counter); **Your photo** (optional: square, black and white, ≤ 45 KB); **Send wish**; hidden honeypot field.
- **A new wish joins at the top:** after sending, the page scrolls to the ring, which spins round and brings the new wish up to the top.
- **Sample blessings:** six sample wishes (`wishes.samples`, clearly marked in `content.js`, attributed to friends — no relatives), with free Unsplash portraits made black and white. They fill the wall until a real wish is saved; `showSamples: false` hides them. **Turn them off before sharing.**
- States: idle, validating (inline errors), sending (button busy), saved, saved-pending-approval, error (with retry).

**Demo vs connected** (see §8 for storage):

| Mode | When | What guests see |
|---|---|---|
| Demo | `backend.endpoint` is empty (v1 default) | No preview note (at the couple's request). Wishes are kept only in this browser and appear at the top of the wall there. **Connect the backend before sharing**, or wishes will not reach the couple. |
| Connected | `backend.endpoint` configured | Saved on the server; success only after it confirms. With moderation, the guest sees their wish at the top at once ("Awaiting approval"); everyone sees it after approval. |

### 4.11 RSVP

The dove brings the invitation, as in the couple's dove pictures:

- **Fly-in:** when the section scrolls into view, a white dove flies in from the left, wings beating, and settles in the middle holding the envelope ("Please join us… Angel & David · Kindly RSVP · RSVP"). A soft pulse around **RSVP** and "Tap RSVP to accept the invitation" invite the tap.
- **Tap RSVP:**
  - the dove takes off and flies up over the page;
  - a flock of doves (from the couple's flock picture, plus doves with beating wings) rises from below and flies over every section to the top;
  - the sound of their wings plays (made in the browser, no sound file) and fades as soon as the guest scrolls;
  - the envelope straightens, its top opens, a card marked "Accepted" slides out and it all turns to light.
- **The board:** a satin-draped frame (the couple's picture) appears; the satin gently waves. The couple's black-and-white photo (the Welcome photo) develops on it, then "Thank you for accepting our invitation" writes itself, with "We can't wait to celebrate with you.", Angel & David, the date and time, and the church. Below: **Add to Calendar**, **Get Directions** and "See the invitation again".
- **Personal links:** `?guest=Anu%20Thomas` greets the guest ("Dear Anu Thomas,") and saves the acceptance under that name. Without it the RSVP sheet records "Guest (name not given)".
- The acceptance is remembered on the device: a later visit shows the board; "See the invitation again" brings the dove back.
- There is no decline button. Guests who cannot come use the Contact section. **Proposal:** add a small "Regretfully decline" link if the couple wants one.
- Success shows **only** after the save is confirmed; a failure brings the dove back with an error and the contact fallback.
- Reduced motion: the dove is already sitting; a tap shows the board at once (no flock, no sound, still satin).

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
- **Parking place** (decorative), as in the last frame of the reference video: once it comes into view, the wedding car drives in from the left, swings round and stops **on a slant** (about 32°) at the left, fully in view, with the couple waving to the guests; then the "A & D" monogram and pearl flowers settle in beside it and a few pearl glints twinkle around the couple. It plays once per visit; reduced motion shows it parked.
- **Return to Top** button at the very end, after the parked car → smooth scroll to the welcome (instant for reduced motion) and focus moves to the top.

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
| A1 | Light effect and four-flap envelope opening (≈ 3.5 s), with the car setting off as the flaps open | Automatically 5 s after the page appears (or a tap / Enter / Space) | ≈ 9.5 s; one constant, smooth speed top to bottom (no easing); text uncovered from the top down behind the car | Final screen appears instantly | Completes within ~12.5 s; no car image → final screen; script-failure removal at 4 s |
| A2 | Section reveal | Scroll into view (IntersectionObserver) | 1 s fade-up 22 px with a soft focus-pull (blur 5 px → 0) | Instant | Content visible if observer unsupported |
| A2b | Car parks at the end | Parking place 45 % in view (once) | 3.2 s drive-in from the left, turning from 80° to a 32° slant and slowing to a stop; monogram fades in after; glints 3 × 1.4 s | Car shown parked | No car image → monogram and flowers only |
| A2c | Edge flowers drift | Scroll | Linked to the scroll (5–16 % of the scroll distance) | None | Static flowers |
| A2d | Letter-by-letter heading lines | Scroll into view | 55 ms per letter, each fading in out of a 6 px blur | Text shown at once | Plain text for screen readers |
| A2f | Save the Date petals | Tap / Enter on the petal pile | Burst 0.7 s, swirl and settle ≈ 2.4 s (each petal 2.3–2.6 s, staggered from the tap point); date fades in from 0.8 s; rose-petal shower from 1.5 s, 30–46 petals, 5–8 s each | Wreath and date shown at once | Date in the heading for screen readers |
| A2g | Gallery cube → band → wall | Scroll through the gallery (sticky) | Linked to the scroll: cube 0–16 %, burst to band 16–42 % (staggered per tile), band to wall 50–76 % (staggered per column); cube idles at ≈ 12°/s | Wall shown at once | No photos → section hidden |
| A2e | Welcome couple photo | Photo 40 % in view, after the opening has finished; plays again each time guests scroll back down to it | Slides down from the top into place (2.4 s, slowing to a stop); the text starts 1.7 s in, letter by letter; then drift 16 s linear; parallax at 22 % of the scroll; several photos crossfade every 7 s | Photo and text shown at once | No photo → the welcome shows text only |
| A3 | Countdown tick | Every second | Number change, no motion | Same | Pending/ended states |
| A4 | Family-tree floral reveal | Open overlay | 700 ms branch draw + 60 ms staggered nodes | None | Static tree |
| A5 | Pearl timeline sheen | Event card enters view | 500 ms | None | Static pearls |
| A6 | Envelope opening | Tap button | Seal 200 ms, flap 500 ms, card 600 ms | Card shown open | Message always in DOM |
| A7 | Wishing wall ring turns | Automatically while on screen (5–11 s per wish), or ‹ › / swipe | 1.3 s ease-in-out turn along the ring; the old wish blurs out, the new one appears word by word (45 ms per word) | No automatic turn; arrows change the wish at once | Text always in the DOM |
| A7b | New wish joins | Successful save | Scroll to the ring, then it spins up to 3 places to bring the new wish to the top, with a soft glow | Shown at the top at once | — |
| A7c | Roses sway | While the section is on screen | Two rose layers drift and sway (11 s and 15 s, alternating) with a light 5 s breeze | Still roses | Plain linen if the image fails |
| A7d | Dove flies in | RSVP stage 45 % in view (once per visit) | 2.7 s flight from the left, wings beating every 0.17 s; wings fold, it turns and settles holding the envelope (0.4 s cross-fade) | Dove shown sitting | Envelope picture only |
| A7e | RSVP accepted | Tap **RSVP** on the envelope | Dove takes off 2.1 s; 15–22 doves rise 2.3–4.2 s each over 2 s; wing sound 4.6 s (fades on scroll); envelope straightens 0.7 s, opens 0.7 s, card rises 0.7 s, light 0.9 s; board appears, photo develops 2 s, thank-you written in 2.4 s, details and buttons by ≈ 6 s | Board shown at once, no sound | Board shown if animations are unsupported |
| A7f | Satin waves | Board on screen | Continuous WebGL ripple and moving light on the satin only (frame, spray and pen still) | Still picture | Still picture without WebGL |
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
| `name` | string (from the `?guest=` link; "Guest (name not given)" without one) |
| `attending` | `"yes"` (the card only accepts) |
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
- Demo mode stores wishes and RSVPs in `localStorage` on the guest's own device. At the couple's request no preview note is shown, so the backend must be connected before the invitation is shared.

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

1. **Splash** — full-screen lace-and-pearl envelope with the dove seal and "Your invitation is opening…" visible at 320 × 640 and up; it opens by itself after 5 s with no tap; light effect, then flaps open in the reference order (sides, then top with seal and bottom) in ≈ 3.5 s; the car then drives top → bottom at a constant speed revealing only The Wedding of · Angel & David · Save the Date · date; reduced motion skips all movement; guests always get in even if an image or script fails.
2. **Welcome** — names most prominent; cross, message, date, verse with reference and translation shown.
3. **Save the Date** — "27" is the focal element; Add to Calendar offers Google and .ics; the entry is all-day while the time is unconfirmed.
4. **Countdown** — pending state shows days + explanation; live state ticks each second once time and timezone are set; ended message appears after the time.
5. **Family** — exact family wording; photo placeholders; both tree overlays open, show parents + placeholders, close cleanly, not clipped.
6. **Events** — five events in order; ceremony shows 27 January 2027; others show placeholders; disabled actions explain why; illustrations consistent and monochrome-plus-olive.
7. **Dress code** — black & white shown as Proposal; per-event guidance placeholders; illustrations present.
8. **Gifting** — envelope opens/closes; message wording exact; no registry.
9. **Venues** — church, reception and other venue placeholders; event cards link to them.
10. **Wishing wall** — the ring turns by itself; no card; "Other" opens its own box; a new wish appears at the top; validation works.
11. **RSVP** — the dove flies in with the envelope; tapping RSVP sends the dove and a flock up the page with wing sound (stops on scroll); the envelope opens to the satin thank-you board; success only when saved.
12. **Travel** — seven placeholder categories; nothing invented.
13. **Contact** — three cards; call/WhatsApp only with real numbers.
14. **Thank you** — exact wording; handwriting reveal with static fallback; the car parks fully in view; Return to Top comes last and works.

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

1. The ceremony starts at 10:30 am (confirmed). When does it end, and is India Standard Time (Asia/Kolkata) correct?
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
