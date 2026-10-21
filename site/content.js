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
      tab: "Haldi",
      // Picture on the photo card, chosen by the couple (position = focal point).
      photo: { src: "assets/images/events/haldi.webp", alt: "Family showering the couple with petals at the Haldi (illustration)", position: "50% 45%" },
      name: "Haldi",
      kicker: "Pre-wedding",
      description: "A morning of turmeric blessings, laughter and family warmth.",
      date: "2027-01-24", // Confirmed
      startTime: "11:00", // Confirmed
      endTime: null,
      venueId: "home",
      illustration: "haldi"
    },
    {
      id: "mehendi",
      tab: "Mehendi",
      // Picture on the photo card, chosen by the couple (position = focal point).
      photo: { src: "assets/images/events/mehendi.webp", alt: "A bride's hands with mehendi, pearl bangles and a rosary (illustration)", position: "55% 55%" },
      name: "Mehendi",
      kicker: "Pre-wedding",
      description: "An evening of henna artistry, music and togetherness.",
      date: "2027-01-25", // Confirmed
      startTime: "16:00", // Confirmed
      endTime: null,
      venueId: "home",
      illustration: "mehendi"
    },
    {
      id: "sangeet",
      tab: "Sangeet",
      // Picture on the photo card, chosen by the couple (position = focal point).
      photo: { src: "assets/images/events/sangeet.webp", alt: "A bride and groom dancing, her gown swirling", position: "50% 20%" },
      name: "Sangeet",
      kicker: "Pre-wedding",
      description: "Songs, dance and celebration as two families become one.",
      date: "2027-01-26", // Confirmed
      startTime: "20:00", // Confirmed
      endTime: null,
      venueId: "hotel",
      illustration: "sangeet"
    },
    {
      id: "ceremony",
      tab: "Wedding",
      // Picture on the photo card, chosen by the couple (position = focal point).
      photo: { src: "assets/images/events/ceremony.webp", alt: "A bride reading her vows to the groom", position: "50% 28%" },
      name: "Christian Marriage Ceremony",
      kicker: "The Wedding",
      description:
        "Holy Matrimony, as Angel and David exchange vows before God, family and friends.",
      date: "2027-01-27", // Confirmed
      startTime: "10:30", // Confirmed
      endTime: null,
      venueId: "church",
      illustration: "church",
      featured: true
    },
    {
      id: "reception",
      tab: "Reception",
      // Picture on the photo card, chosen by the couple (position = focal point).
      photo: { src: "assets/images/events/reception.webp", alt: "A bride and groom embracing under chandeliers (illustration)", position: "50% 42%" },
      name: "Reception",
      kicker: "Celebration",
      description: "Dinner and celebration in honour of the newly married couple.",
      date: "2027-01-27", // Confirmed
      startTime: "18:00", // Confirmed
      endTime: null,
      venueId: "hotel",
      illustration: "reception"
    }
  ],

  venues: [
    {
      id: "church",
      label: "Christian Marriage Ceremony",
      // Chosen at the couple's request as Alappuzha's main church (the
      // cathedral of the Diocese of Alleppey) — please confirm the booking.
      name: "Our Lady of Mount Carmel Cathedral",
      address: "Convent Square, Alappuzha, Kerala 688001",
      directions: null,
      parking: null,
      mapUrl: null, // optional exact Google/Apple Maps link (else a search for the name and address)
      photo: null, // e.g. "assets/images/venue-church.webp"
      photoAlt: "Our Lady of Mount Carmel Cathedral, Alappuzha"
    },
    {
      id: "hotel",
      // Not shown in the Venues section (church only, at the couple's request);
      // the event card's "View Location" opens Google Maps directly.
      showInVenues: false,
      label: "Sangeet & Reception",
      // Chosen at the couple's request as a grand Alappuzha hotel with large
      // banquet halls (lakeside, Punnamada) — please confirm the booking and hall.
      name: "Ramada by Wyndham Alleppey",
      address: "Nehru Trophy Finishing Point, Punnamada, Alappuzha, Kerala",
      directions: null,
      parking: null,
      mapUrl: null,
      photo: null,
      photoAlt: "Ramada by Wyndham Alleppey"
    },
    {
      id: "home",
      // Not shown in the Venues section (church only, at the couple's request);
      // the event card's "View Location" opens Google Maps directly.
      showInVenues: false,
      label: "Haldi & Mehendi",
      note: "Celebrated at the bride's and groom's family homes in Alappuzha. Exact addresses will be shared with guests.",
      name: "The Family Homes",
      address: "Alappuzha, Kerala",
      directions: null,
      parking: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Alappuzha%2C%20Kerala",
      photo: null,
      photoAlt: "The family homes in Alappuzha"
    }
  ],

  dressCode: {
    // Black & white, chosen by the couple (no longer a proposal).
    isProposal: false,
    direction: "Black & White",
    summary: "Classic black, white, ivory and pearl tones, echoing the invitation.",
    swatches: [
      { name: "Black", hex: "#121212" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Ivory", hex: "#F3EEE3" },
      { name: "Pearl", hex: "#EEE9E1" }
    ],
    // Outfit inspiration chosen by the couple (photographs supplied; a phone
    // number written on one was painted out).
    outfits: {
      her: [
        { src: "assets/images/dress/her-1.webp", alt: "White satin gown with bows and flowing ribbons" },
        { src: "assets/images/dress/her-2.webp", alt: "Ivory satin off-shoulder gown with a bow and train" }
      ],
      him: [
        { src: "assets/images/dress/him-1.webp", alt: "Black tuxedo with beaded detail and a black bow tie" },
        { src: "assets/images/dress/him-2.webp", alt: "Ivory dinner jacket with black lapels, black waistcoat and bow tie" }
      ]
    }
  },

  gifting: {
    message: "Your presence and blessings are our greatest gift.",
    message2: "If you wish to give, an envelope gift is warmly welcome."
  },

  wishes: {
    nameMax: 60,
    relationMax: 60,
    messageMax: 500,
    // true = new wishes appear only after the couple approves them.
    moderation: true,
    // Sample blessings so the wall is not empty in the design preview. They
    // are hidden automatically as soon as one real wish is on the wall.
    // SAMPLES — not real guests; set showSamples to false to hide them.
    showSamples: true,
    samples: [
      { name: "Anu", relation: "College friend", message: "Angel, from hostel nights to this day — I am so happy for you both. May your home always be full of laughter and prayer." },
      { name: "Joel", relation: "Colleague", message: "David, congratulations! Wishing you both a lifetime of love, patience and adventures together." },
      { name: "Merin", relation: "Church choir", message: "May the Lord bless your marriage and keep you close to Him and to each other, always." },
      { name: "Rahul", relation: "School friend", message: "Two wonderful people, one beautiful journey. See you in Alappuzha!" },
      { name: "Sneha", relation: "Neighbour", message: "Watching you grow up and now getting married — wishing you all the happiness in the world, Angel." },
      { name: "Kevin", relation: "Friend", message: "Cheers to love, faith and many happy years ahead. God bless you both." }
    ]
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
