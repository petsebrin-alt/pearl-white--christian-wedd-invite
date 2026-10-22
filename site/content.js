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
    // true = new wishes appear only after the couple approves them (the
    // guest who sent one still sees it at the top of the wall straight away).
    moderation: true,
    // "How do you know the couple?" choices; "Other" (always last) opens a
    // small box where guests write their own answer.
    relations: ["Bride's family", "Groom's family", "Friend", "College friend", "School friend", "Colleague", "Church family", "Neighbour"],
    // Sample blessings so the wall is not empty in the design preview. They
    // are hidden automatically as soon as one real wish is on the wall.
    // SAMPLES — not real guests; set showSamples to false to hide them.
    // Their faces are free stock portraits from Unsplash (unsplash.com,
    // Unsplash License), made black and white for the wall.
    showSamples: true,
    samples: [
      { name: "Anu", photo: "assets/images/wishes/anu.webp", relation: "College friend", message: "Angel, from hostel nights to this day — I am so happy for you both. May your home always be full of laughter and prayer." },
      { name: "Joel", photo: "assets/images/wishes/joel.webp", relation: "Colleague", message: "David, congratulations! Wishing you both a lifetime of love, patience and adventures together." },
      { name: "Merin", photo: "assets/images/wishes/merin.webp", relation: "Church choir", message: "May the Lord bless your marriage and keep you close to Him and to each other, always." },
      { name: "Rahul", photo: "assets/images/wishes/rahul.webp", relation: "School friend", message: "Two wonderful people, one beautiful journey. See you in Alappuzha!" },
      { name: "Sneha", photo: "assets/images/wishes/sneha.webp", relation: "Neighbour", message: "Watching you grow up and now getting married — wishing you all the happiness in the world, Angel." },
      { name: "Kevin", photo: "assets/images/wishes/kevin.webp", relation: "Friend", message: "Cheers to love, faith and many happy years ahead. God bless you both." }
    ]
  },

  rsvp: {
    deadline: null, // e.g. "2026-12-31"
    maxGuestsPerInvite: null, // e.g. 4. While null the form allows up to 10.
    guestRulesNote: null // e.g. "Kindly note that our celebration is adults only."
  },

  // Display only confirmed arrangements. null = To be provided.
  // Travel & Stay — one card at a time, as in the couple's card video:
  // a large word, a photograph and the details, each with a Location button
  // (opens Google Maps with "map"). Card colours: white, cream, pearl, soft green.
  // PROPOSALS — real places in and around Alappuzha suggested for guests;
  // please confirm before sharing. Photos: free Unsplash photographs
  // (unsplash.com, Unsplash License), made black and white.
  travel: {
    note: "Suggestions for your stay in Alappuzha — please check timings and book ahead.",
    cards: [
      {
        id: "arrive", word: "Arrive", kicker: "Getting to Alappuzha", tone: "white",
        photo: { src: "assets/images/travel/arrive.webp", alt: "A plane on the runway among coconut palms" },
        items: [
          { name: "Cochin International Airport (COK)", note: "About 85 km from Alappuzha — roughly 2 to 2½ hours by road.", map: "Cochin International Airport" },
          { name: "Alappuzha Railway Station", note: "Trains from Ernakulam (Kochi) and Thiruvananthapuram.", map: "Alappuzha Railway Station" },
          { name: "Airport pickup", note: null }
        ]
      },
      {
        id: "stay", word: "Stay", kicker: "Where to stay", tone: "cream",
        photo: { src: "assets/images/travel/stay.webp", alt: "A house among palm trees, reflected in the backwaters" },
        items: [
          { name: "Ramada by Wyndham Alleppey", note: "On Punnamada Lake — also where the Sangeet and Reception are held.", map: "Ramada by Wyndham Alleppey" },
          { name: "Punnamada Resort", note: "A lakeside resort on the backwaters at Punnamada.", map: "Punnamada Resort Alappuzha" },
          { name: "Raheem Residency", note: "A heritage hotel on Beach Road, opposite Alappuzha Beach.", map: "Raheem Residency Alappuzha" }
        ]
      },
      {
        id: "dine", word: "Dine", kicker: "Eating out", tone: "green",
        photo: { src: "assets/images/travel/dine.webp", alt: "A Kerala meal served on a banana leaf" },
        items: [
          { name: "The Harbour Restaurant", note: "Seafood in a lantern-lit garden on Beach Road, opposite the beach.", map: "The Harbour Restaurant Beach Road Alappuzha" },
          { name: "Thaff", note: "Kerala dishes, near YMCA Bridge.", map: "Thaff Restaurant Alappuzha" },
          { name: "Kream Korner Art Café", note: "An art café on Mullakkal Road — known for biryani and parotta.", map: "Kream Korner Art Cafe Alappuzha" }
        ]
      },
      {
        id: "explore", word: "Explore", kicker: "Places to see", tone: "white",
        photo: { src: "assets/images/travel/explore.webp", alt: "The old pier stretching into the sea at Alappuzha Beach" },
        items: [
          { name: "Alappuzha Beach & Lighthouse", note: "The old pier and the lighthouse of 1862.", map: "Alappuzha Lighthouse" },
          { name: "Marari Beach", note: "A quiet, palm-lined beach a short drive north.", map: "Marari Beach Mararikulam" },
          { name: "Krishnapuram Palace", note: "A Travancore palace museum at Kayamkulam, with Kerala’s largest mural.", map: "Krishnapuram Palace Kayamkulam" }
        ]
      },
      {
        id: "cruise", word: "Cruise", kicker: "On the backwaters", tone: "pearl",
        photo: { src: "assets/images/travel/cruise.webp", alt: "A houseboat on the palm-lined backwaters of Alappuzha" },
        items: [
          { name: "Houseboat cruise", note: "Day or overnight kettuvallam cruises from the Finishing Point, Punnamada.", map: "Alappuzha houseboat Finishing Point Punnamada" },
          { name: "Pathiramanal Island", note: "A bird island in Vembanad Lake, reached by boat.", map: "Pathiramanal Island" }
        ]
      }
    ],
    assistance: { name: null, phone: null }
  },

  // Contact: three round buttons on a pearl chain; hovering (or tapping on
  // a phone) opens each one's card with Call and WhatsApp. "label" is the
  // short name on the button; "photo" its picture (a family photograph, or
  // null for a pearl monogram). Names and numbers: To be provided.
  contacts: [
    { role: "Bride's Family Representative", label: "Bride's family", photo: "assets/images/family-bride-1.webp", name: null, relationship: null, phone: null, whatsapp: null },
    { role: "Groom's Family Representative", label: "Groom's family", photo: "assets/images/family-groom-1.webp", name: null, relationship: null, phone: null, whatsapp: null },
    { role: "Event Coordinator", label: "Event coordinator", photo: null, name: null, relationship: null, phone: null, whatsapp: null }
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
