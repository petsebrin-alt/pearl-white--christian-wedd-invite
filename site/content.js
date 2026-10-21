/* =============================================================================
   ANGEL & DAVID — CENTRAL CONTENT FILE
   -----------------------------------------------------------------------------
   Every wedding detail shown on the website lives in this one file.
   Edit a value here and every section that uses it updates automatically.

   Rules
   • null or "" means "To be provided" — the site shows a clearly marked
     placeholder in that spot.
   • Only enter confirmed details. Do not enter guesses.
   • Dates use "YYYY-MM-DD". Times use 24-hour "HH:MM" (e.g. "16:30").
   • Phone numbers use international format, e.g. "+91 98765 43210".
   ========================================================================== */

window.WEDDING = {
  site: {
    title: "Angel & David · Wedding Invitation",
    // Slim notice explaining placeholders (removed at the couple's request;
    // set to true to show it again). The RSVP and wishing-wall forms still say
    // when they are in preview mode.
    previewNotice: false,
    // Shows "Proposal" labels on suggestions awaiting the couple's review.
    showProposalLabels: true
  },

  couple: {
    bride: "Angel",
    groom: "David",
    monogram: "A & D"
  },

  wedding: {
    date: "2027-01-27" // Confirmed
  },

  // Black-and-white couple photographs for the Welcome section (section 2).
  // The photo drifts slowly with a gentle parallax; add more entries and they
  // crossfade one after another. Photos are shown in black and white
  // automatically.
  // NOTE: the current photo is the sample supplied for the design (it carries a
  // photographer's "Maab Road" tag) — replace it with Angel & David's own
  // photograph before sharing the invitation.
  couplePhotos: [
    { src: "assets/images/couple-bw.webp", alt: "A bride in white lace and a groom in a black suit, cheek to cheek (sample photograph)" }
  ],

  // Timezone for every event time (used by the live countdown and timed
  // calendar entries). India Standard Time, as the wedding is in South India —
  // please confirm.
  timezone: {
    iana: "Asia/Kolkata",
    utcOffset: "+05:30",
    label: "IST"
  },

  invitation: {
    eyebrow: "Together with their families",
    // Proposal wording — edit freely.
    message:
      "By the grace of God and with joyful hearts, we invite you to witness and bless our union in Holy Matrimony.",
    // Proposal verse — public-domain King James Version.
    verse: {
      text: "…and a threefold cord is not quickly broken.",
      reference: "Ecclesiastes 4:12",
      translation: "King James Version (KJV)"
    }
  },

  // Couple gallery (section 4b, before the families): the photos make up a
  // glass cube that opens into a photo wall as guests scroll. The first 14
  // fill the wall (with an "A & D" tile and a date tile); every photo can be
  // opened full size. "tile" is the square crop, "src" the full photo.
  // SAMPLE photographs supplied for the design (watermarks painted out) —
  // replace them with Angel & David's own photographs before sharing.
  gallery: {
    eyebrow: "Our Journey",
    title: "Moments Together",
    photos: [
      { tile: "assets/images/gallery/g01-tile.webp", src: "assets/images/gallery/g01.webp", alt: "A couple, forehead to forehead, in black and white" },
      { tile: "assets/images/gallery/g02-tile.webp", src: "assets/images/gallery/g02.webp", alt: "A couple touching noses in the sunlight" },
      { tile: "assets/images/gallery/g03-tile.webp", src: "assets/images/gallery/g03.webp", alt: "A couple smiling through a heart made with their hands" },
      { tile: "assets/images/gallery/g04-tile.webp", src: "assets/images/gallery/g04.webp", alt: "He holds a camera while she smiles against his cheek" },
      { tile: "assets/images/gallery/g05-tile.webp", src: "assets/images/gallery/g05.webp", alt: "A couple embracing on the beach at sunset" },
      { tile: "assets/images/gallery/g06-tile.webp", src: "assets/images/gallery/g06.webp", alt: "A bride and groom walking hand in hand along the shore" },
      { tile: "assets/images/gallery/g07-tile.webp", src: "assets/images/gallery/g07.webp", alt: "A couple dancing under a burst of sparkling water at night" },
      { tile: "assets/images/gallery/g08-tile.webp", src: "assets/images/gallery/g08.webp", alt: "A bride and groom, backlit, forehead to forehead" },
      { tile: "assets/images/gallery/g09-tile.webp", src: "assets/images/gallery/g09.webp", alt: "Hands held together, wrapped in fairy lights" },
      { tile: "assets/images/gallery/g10-tile.webp", src: "assets/images/gallery/g10.webp", alt: "He kisses her hand, showing the engagement ring" },
      { tile: "assets/images/gallery/g11-tile.webp", src: "assets/images/gallery/g11.webp", alt: "A couple dancing in a field at golden hour" },
      { tile: "assets/images/gallery/g12-tile.webp", src: "assets/images/gallery/g12.webp", alt: "Holding hands among wild flowers" },
      { tile: "assets/images/gallery/g13-tile.webp", src: "assets/images/gallery/g13.webp", alt: "A couple's silhouette kissing in the rain" },
      { tile: "assets/images/gallery/g14-tile.webp", src: "assets/images/gallery/g14.webp", alt: "A couple laughing as they dance in the rain" }
    ]
  },

  families: {
    bride: {
      heading: "The Bride's Family",
      person: "Angel",
      relation: "daughter",
      father: "Rajthurai",
      mother: "Jansi Rani",
      // Two photographs: the first is shown, the second appears with the pixel
      // effect when guests hover over or tap it. SAMPLE photographs supplied for
      // the design — replace with Angel's family (parents first, then the
      // family with siblings).
      photos: [
        { src: "assets/images/family-bride-1.webp", alt: "Sample photograph: a bride laughing with her mother and father", posY: 0.42 },
        { src: "assets/images/family-bride-2.webp", alt: "Sample photograph: a bride embracing her father", posY: 0.3 }
      ],
      grandparents: {
        paternal: { grandfather: null, grandmother: null },
        maternal: { grandfather: null, grandmother: null }
      },
      // e.g. [{ name: "…", relation: "Brother" }]
      siblings: []
    },
    groom: {
      heading: "The Groom's Family",
      person: "David",
      relation: "son",
      father: "David Raj",
      mother: "Angelo Mary",
      // SAMPLE photographs supplied for the design — replace with David's
      // family (parents first, then the family with siblings).
      photos: [
        { src: "assets/images/family-groom-1.webp", alt: "Sample photograph: a groom with his mother and father", posY: 0.3 },
        { src: "assets/images/family-groom-2.webp", alt: "Sample photograph: the couple with both families", posY: 0.5 }
      ],
      grandparents: {
        paternal: { grandfather: null, grandmother: null },
        maternal: { grandfather: null, grandmother: null }
      },
      siblings: []
    }
  },

  // Requested events, in order. venueId links to an entry in `venues` below.
  events: [
    {
      id: "haldi",
      name: "Haldi",
      kicker: "Pre-wedding",
      description: "A morning of turmeric blessings, laughter and family warmth.",
      date: null,
      startTime: null,
      endTime: null,
      venueId: "other",
      illustration: "haldi"
    },
    {
      id: "mehendi",
      name: "Mehendi",
      kicker: "Pre-wedding",
      description: "An evening of henna artistry, music and togetherness.",
      date: null,
      startTime: null,
      endTime: null,
      venueId: "other",
      illustration: "mehendi"
    },
    {
      id: "sangeet",
      name: "Sangeet",
      kicker: "Pre-wedding",
      description: "Songs, dance and celebration as two families become one.",
      date: null,
      startTime: null,
      endTime: null,
      venueId: "other",
      illustration: "sangeet"
    },
    {
      id: "ceremony",
      name: "Christian Marriage Ceremony",
      kicker: "The Wedding",
      description:
        "Holy Matrimony, as Angel and David exchange vows before God, family and friends.",
      date: "2027-01-27", // Confirmed
      startTime: "10:30", // Confirmed: 10:30 in the morning
      endTime: null,
      venueId: "church",
      illustration: "church",
      featured: true
    },
    {
      id: "reception",
      name: "Reception",
      kicker: "Celebration",
      description: "Dinner and celebration in honour of the newly married couple.",
      date: null,
      startTime: null,
      endTime: null,
      venueId: "reception",
      illustration: "reception"
    }
  ],

  venues: [
    {
      id: "church",
      label: "Church Ceremony Venue",
      name: null,
      address: null,
      directions: null,
      parking: null,
      mapUrl: null, // optional exact Google/Apple Maps link
      photo: null, // e.g. "assets/images/venue-church.webp"
      photoAlt: "The church"
    },
    {
      id: "reception",
      label: "Reception Venue",
      name: null,
      address: null,
      directions: null,
      parking: null,
      mapUrl: null,
      photo: null,
      photoAlt: "The reception venue"
    },
    {
      id: "other",
      label: "Other Event Venues",
      note: "Haldi, Mehendi and Sangeet — shown here if different from the venues above.",
      name: null,
      address: null,
      directions: null,
      parking: null,
      mapUrl: null,
      photo: null,
      photoAlt: "Pre-wedding event venue"
    }
  ],

  dressCode: {
    // true = shown as a proposal for the couple's review, not a guest requirement.
    isProposal: true,
    direction: "Black & White",
    summary: "Classic black, white, ivory and pearl tones, echoing the invitation.",
    swatches: [
      { name: "Black", hex: "#121212" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Ivory", hex: "#F3EEE3" },
      { name: "Pearl", hex: "#EEE9E1" }
    ],
    // Event-specific guidance. null = To be provided.
    byEvent: {
      haldi: null,
      mehendi: null,
      sangeet: null,
      ceremony: null,
      reception: null
    },
    referenceImages: [
      { src: null, alt: "Attire reference for her" },
      { src: null, alt: "Attire reference for him" }
    ]
  },

  gifting: {
    message: "Your presence and blessings are our greatest gift.",
    message2: "If you wish to give, an envelope gift is warmly welcome."
  },

  wishes: {
    nameMax: 60,
    messageMax: 500,
    // true = new wishes appear only after the couple approves them.
    moderation: true
  },

  rsvp: {
    deadline: null, // e.g. "2026-12-31"
    maxGuestsPerInvite: null, // e.g. 4. While null the form allows up to 10.
    guestRulesNote: null // e.g. "Kindly note that our celebration is adults only."
  },

  // Display only confirmed arrangements. null = To be provided.
  travel: {
    guidance: null,
    parking: null,
    shuttle: null,
    pickupPoints: [], // e.g. [{ place: "…", time: "…" }]
    accommodation: [], // e.g. [{ name: "…", note: "…", url: "…" }]
    bookingLinks: [], // e.g. [{ label: "…", url: "…" }]
    assistance: { name: null, phone: null }
  },

  contacts: [
    { role: "Bride's Family Representative", name: null, relationship: null, phone: null, whatsapp: null },
    { role: "Groom's Family Representative", name: null, relationship: null, phone: null, whatsapp: null },
    // Shown to guests only if supplied (shown as optional placeholder in preview).
    { role: "Event Coordinator", name: null, relationship: null, phone: null, whatsapp: null, optional: true }
  ],

  thankYou: {
    line: "Thank you for blessing our journey."
  },

  // Connected storage for RSVPs and wishes.
  // Empty endpoint = preview (demo) mode: nothing is sent anywhere.
  // See backend/google-apps-script.gs and README.md to connect Google Sheets.
  backend: {
    endpoint: ""
  },

  // The opening uses assets/images/wedding-car.webp and the pearl-flower pieces
  // assets/images/pearl-*.webp (replace the files to change the artwork).
  assets: {}
};
