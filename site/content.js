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
    // Slim notice explaining placeholders. Set to false before sharing with guests.
    previewNotice: true,
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

  // Timezone for every event time. Needed before any timed calendar entry or
  // the live countdown is produced.
  // Proposal (please confirm): iana "Asia/Kolkata", utcOffset "+05:30", label "IST".
  timezone: {
    iana: null,
    utcOffset: null,
    label: null
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

  families: {
    bride: {
      heading: "The Bride's Family",
      person: "Angel",
      relation: "daughter",
      father: "Rajthurai",
      mother: "Jansi Rani",
      photo: null, // e.g. "assets/images/family-bride.webp"
      photoAlt: "Angel with her family",
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
      photo: null, // e.g. "assets/images/family-groom.webp"
      photoAlt: "David with his family",
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
      startTime: null,
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
