/**
 * ==============================================================================
 * A LITTLE WORLD FOR LILISHA — CENTRALIZED BIRTHDAY CONFIGURATION
 * ==============================================================================
 * 
 * Hey Eyuel! 
 * This file is customized with Lilisha's real photos, her November 2 birthday,
 * your authentic personal message, her journey into becoming a strong mother,
 * and her 6 favorite cakes: Milifoni, Opera, Chocolate Cake, Boxegna, Custard Cake, and Tiramisu!
 */

export interface Wish {
  id: number;
  title: string;
  category: 'Life' | 'Adventure' | 'Joy' | 'Sibling Bond' | 'Dreams' | 'Peace' | 'Motherhood';
  message: string;
  iconName?: string;
}

export interface FlowerData {
  id: string;
  name: string;
  scientificName: string;
  color: string;
  meaning: string;
  message: string;
  bloomed: boolean;
}

export interface CakeItem {
  id: string;
  name: string;
  amharicName?: string;
  tagline: string;
  description: string;
  flavor: string;
  icon: string;
  color: string;
  siblingNote: string;
}

export interface ChocolateItem {
  id: string;
  name: string;
  type: string;
  flavor: string;
  color: string;
  message: string;
  tag: string;
  siblingLaw?: string;
}

export interface ScrapbookMemory {
  id: string;
  title: string;
  category: 'Childhood' | 'Family Moments' | 'Funny Moments' | 'Special Occasions' | 'Adventures';
  date: string;
  caption: string;
  imageUrl: string;
  rotation?: string;
}

export interface BloomingStage {
  id: string;
  chapterNumber: string;
  stageName: string;
  agePeriod: string;
  flowerIcon: string;
  title: string;
  subtitle: string;
  brotherNarrative: string;
  bloomingInsight: string;
  photoUrl: string;
  photoCaption: string;
  accentColor: string;
}

export const BIRTHDAY_DATA = {
  // --- Personal Core Details ---
  sisterName: "Lilisha",
  teaseName: "Eleni",
  brotherName: "Eyuel",
  age: 29,
  birthYear: 1997,
  birthDateFormatted: "November 2",
  tagline: "29 Years of You — A Little World Made Just for Lilisha.",

  // --- Opening Experience ---
  opening: {
    greeting: "endet nesh lishaaaaa! 😉",
    subGreeting: "Someone who loves to tease you has a little surprise for you.",
    fromBrother: "A little world made with love, from your brother Eyuel.",
    openButtonText: "Open Your Birthday Gift",
    skipButtonText: "Skip to Little World",
  },

  // --- Hero Section ---
  hero: {
    heading: "Happy 29th Birthday, Lilisha!",
    teaseSubtitle: "(Yes, your ID says Eleni, but you'll always be my Lilisha! 😉)",
    subtitle: "29 years of laughter, memories, adventures, and blooming into the strongest, most radiant mother.",
    signature: "With endless love & brotherly teasing — Eyuel.",
    explorePrompt: "Tap to begin exploring your world",
  },

  // --- How She Bloomed (Chronological Evolution Celebrating Motherhood) ---
  bloomingJourney: {
    sectionBadge: "29 Years in Bloom",
    title: "How You Bloomed Into Who You Are",
    subtitle: "Aging isn't just counting birthdays. Watching you grow has shown me what aging really means: blooming into grace, wisdom, and becoming a remarkably strong mother.",
    stages: [
      {
        id: "bloom-1",
        chapterNumber: "Chapter I",
        stageName: "The Fresh-Faced Days",
        agePeriod: "Early Youth • Pure Innocence & Sweetness",
        flowerIcon: "🌱",
        title: "The Sprout of Sweetness",
        subtitle: "Hair in a messy bun, effortless smile, and a heart full of warmth",
        brotherNarrative: "Every great bloom begins with effortless charm. Looking at this photo of you, fresh-faced in your Adidas tee with your top bun, reminds me of the sweet, grounded sister who always made home feel brighter. You had this natural, genuine glow that didn't need any filter — sweet, playful, and already showing the pure heart that everyone loves about you today.",
        bloomingInsight: "True beauty never needs to try hard — it shines right out of who you are.",
        photoUrl: "/images/photo1_young_bun.jpg",
        photoCaption: "Fresh-faced, sweet, and always glowing — the beginning of the journey.",
        accentColor: "#A6B59A",
      },
      {
        id: "bloom-2",
        chapterNumber: "Chapter II",
        stageName: "Cozy Curls & Sibling Comfort",
        agePeriod: "Carefree Days • Laughing at Home",
        flowerIcon: "🌿",
        title: "Casual Grace & Warmth",
        subtitle: "Short bouncy curls, relaxing at home with your teddy bear",
        brotherNarrative: "Here you are with your gorgeous short curls, cuddled up on the sofa with your plush teddy bear. There's something so authentic and joyful about this season of your life. You were growing into your own style, rocking those curls, and lighting up our living room with your laughs. Even on the quietest days, having you around turned ordinary moments into happy memories.",
        bloomingInsight: "Your smile has always been the warmest corner of our family home.",
        photoUrl: "/images/photo2_curls_cozy.jpg",
        photoCaption: "Cozy curls and that unmistakable, gentle Lilisha warmth.",
        accentColor: "#D8B978",
      },
      {
        id: "bloom-3",
        chapterNumber: "Chapter III",
        stageName: "Partners in Crime in the Sky",
        agePeriod: "Adventures Together • Eyuel & Lilisha",
        flowerIcon: "✈️",
        title: "Sibling Wings Across the World",
        subtitle: "Sitting side-by-side on airplane flights, laughing at 30,000 feet",
        brotherNarrative: "This photo is one of my absolute favorites because it's us — brother and sister taking on the world together. Sitting next to you on that plane, with our shared jokes and our matching sibling energy, reminded me that no matter where life takes us, you’ll always be my favorite travel companion and partner-in-crime. We might tease each other constantly, but at 30,000 feet or on solid ground, I'll always have your back.",
        bloomingInsight: "Through every flight, every adventure, and every season: siblings forever.",
        photoUrl: "/images/photo3_plane_siblings.jpg",
        photoCaption: "Eyuel & Lilisha — flying high and making unforgettable memories together.",
        accentColor: "#7887AB",
      },
      {
        id: "bloom-4",
        chapterNumber: "Chapter IV",
        stageName: "The Graceful Unfolding",
        agePeriod: "August 2022 • Poise & Independence",
        flowerIcon: "🌷",
        title: "Stepping Into Quiet Confidence",
        subtitle: "Grounded elegance, stylish bangs, and the wisdom of your mid-twenties",
        brotherNarrative: "By August 2022, you were carrying yourself with such effortless poise. Sitting there in your orange wrap and teal purse, you looked so grounded, stylish, and self-assured. Watching you navigate your education, career, and life choices with quiet dignity proved to me that you had bloomed into an independent, deeply respected woman. You proved that real elegance is quiet, steady, and courageous.",
        bloomingInsight: "Elegance isn't loud — it's the quiet peace of knowing your worth.",
        photoUrl: "/images/photo4_orange_elegance.jpg",
        photoCaption: "August 2022 — radiant, calm, and effortlessly graceful.",
        accentColor: "#C98996",
      },
      {
        id: "bloom-5",
        chapterNumber: "Chapter V",
        stageName: "The Queen of Motherhood",
        agePeriod: "Royalty • Carrying Life with Unstoppable Strength",
        flowerIcon: "👑",
        title: "A Queen Embracing Life's Greatest Miracle",
        subtitle: "Crimson gown, golden tiara, floral fan, and holding her baby bump",
        brotherNarrative: "Look at you here. Absolute royalty. In that breathtaking crimson red dress, with a golden crown upon your hair, holding your baby bump with that proud, beaming smile. This was the moment you stepped into your crown as a queen and a mother-to-be. Seeing you carry life with such fierce, unstoppable strength made me realize that my sister had become a force of nature. Watching you embrace motherhood fills me with a pride that words can never capture. You were born to be a queen.",
        bloomingInsight: "You wear your crown not just on your head, but in the fierce, unconditional way you love and protect your child.",
        photoUrl: "/images/photo5_red_dress_queen.jpg",
        photoCaption: "Queen Lilisha — radiant in red, crowned in gold, and embracing motherhood.",
        accentColor: "#672F43",
      },
      {
        id: "bloom-6",
        chapterNumber: "Chapter VI",
        stageName: "The Strong Mother at 29",
        agePeriod: "Turning 29 • Maternal Grace & Full Radiant Bloom",
        flowerIcon: "🌸",
        title: "A Strong Mother — My Greatest Pride",
        subtitle: "Flowing white goddess gown, flower wreath, and supreme maternal grace",
        brotherNarrative: "And now, here is the ultimate masterpiece. Sitting in an enchanted garden in flowing white, with a crown of blooming flowers upon your hair, gently cradling your baby bump. You didn't just grow older over these 29 years, Lilisha — you grew into a loving, selfless, extraordinarily strong MOTHER. I want you to know how genuinely, deeply proud I am of you. Watching you raise and protect your baby with so much patience, warmth, and strength inspires me every single day. 29 looks breathtaking on you. Happy Birthday, my sister, my queen, and the greatest mother.",
        bloomingInsight: "I am genuinely so proud of the strong, incredible mother you have become.",
        photoUrl: "/images/photo6_white_dress_fairytale.jpg",
        photoCaption: "Lilisha at 29 — a fairytale goddess and a strong, beautiful mother.",
        accentColor: "#D8B978",
      },
    ] as BloomingStage[],
  },

  // --- Lilisha's Birthday Patisserie (Her 6 Favorite Cakes!) ---
  pastryCakes: {
    badge: "Lilisha's Birthday Patisserie",
    title: "The Cake & Pastry Boutique",
    subtitle: "Because no 29th birthday is complete without your favorite cakes and pastries! Tap any cake to blow out a candle or take a sweet birthday slice.",
    items: [
      {
        id: "cake-milifoni",
        name: "Milifoni",
        amharicName: "ሚሊፎኒ (Mille-feuille)",
        tagline: "The Ethiopian Pasticceria Classic",
        description: "Crispy, delicate layers of golden puff pastry filled with rich vanilla crème pâtissière, dusted with snowy powdered sugar and feathered chocolate.",
        flavor: "Caramelized Puff Pastry & Bourbon Vanilla Cream",
        icon: "🥐",
        color: "#D8B978",
        siblingNote: "The undisputed royalty of bakery visits! Flaky, crispy, and sweet — the first pastry we'd always fight over.",
      },
      {
        id: "cake-opera",
        name: "Opéra Cake",
        amharicName: "ኦፔራ ኬክ",
        tagline: "Sophisticated Parisienne Luxury",
        description: "Almond Joconde sponge cake infused with aromatic espresso syrup, layered with decadent dark chocolate ganache and French coffee buttercream, topped with a mirror chocolate glaze.",
        flavor: "Rich Dark Chocolate & Roasted Espresso Ganache",
        icon: "☕",
        color: "#493126",
        siblingNote: "Chic, elegant, and timeless. Built for the girl who deserves nothing less than first class.",
      },
      {
        id: "cake-choc",
        name: "Belgian Chocolate Cake",
        amharicName: "ቾኮሌት ኬክ",
        tagline: "Decadent & Irresistible",
        description: "Triple-layer moist dark chocolate fudge cake smothered in velvety chocolate buttercream, garnished with golden chocolate shavings and fresh raspberries.",
        flavor: "70% Dark Cocoa Fudge & Silk Ganache",
        icon: "🍫",
        color: "#2E1C14",
        siblingNote: "Rich, comforting, and guaranteed happiness! Sibling law confirmed: zero calories on your birthday.",
      },
      {
        id: "cake-boxegna",
        name: "Boxegna",
        amharicName: "ቦዜኛ / ቦኜ (Bignè / Cream Puffs)",
        tagline: "Light, Puffy & Nostalgic",
        description: "Golden choux pastry buns generously filled to bursting with silky sweet custard and light chantilly cream, topped with melted dark chocolate or powdered sugar.",
        flavor: "Choux Pastry & Sweet Vanilla Custard",
        icon: "🥯",
        color: "#C98996",
        siblingNote: "Pure childhood nostalgia! That explosive first bite when the cream puffs out. A true bakery treasure.",
      },
      {
        id: "cake-custard",
        name: "Custard Cake",
        amharicName: "ከስተርድ ኬክ",
        tagline: "Velvety, Warm & Gentle",
        description: "Melt-in-your-mouth vanilla sponge filled with velvety baked custard cream, finished with a caramelized amber crust and golden honey glaze.",
        flavor: "Creamy Vanilla Custard & Golden Caramel",
        icon: "🍮",
        color: "#E2BA65",
        siblingNote: "Soft, comforting, and sweet. Exactly like your gentle heart when you're not busy teasing me.",
      },
      {
        id: "cake-tiramisu",
        name: "Classic Tiramisu",
        amharicName: "ቲራሚሱ",
        tagline: "The Queen of Italian Dolci",
        description: "Savoiardi ladyfingers lightly soaked in rich espresso and cocoa, folded into cloud-like whipped mascarpone cream and dusted with Dutch cocoa.",
        flavor: "Espresso Soaked Savoiardi & Whipped Mascarpone",
        icon: "🍰",
        color: "#672F43",
        siblingNote: "'Pick me up' in Italian! Because having Lilisha as my sister picks up my mood every single time.",
      },
    ] as CakeItem[],
  },

  // --- Digital Flower Garden ---
  garden: {
    title: "The Digital Flower Garden",
    subtitle: "A living botanical sanctuary planted in honor of 29 wonderful years. Tap any flower to watch it bloom with a personal brotherly message.",
    growButtonText: "Plant Another Wildflower",
    flowers: [
      {
        id: "rose",
        name: "Vintage English Rose",
        scientificName: "Rosa damascena",
        color: "#C98996",
        meaning: "Grace, gratitude & family love",
        message: "Every family needs someone who makes ordinary days special. That's you, Lilisha (even when you steal my snacks).",
        bloomed: false,
      },
      {
        id: "peony",
        name: "Blush Spring Peony",
        scientificName: "Paeonia lactiflora",
        color: "#F4DCE0",
        meaning: "Prosperity, honor & radiant joy",
        message: "May your 29th year bring you and your growing family the quiet peace and boundless happiness you so effortlessly bring to everyone.",
        bloomed: false,
      },
      {
        id: "tulip",
        name: "Golden Champagne Tulip",
        scientificName: "Tulipa gesneriana",
        color: "#D8B978",
        meaning: "Fresh starts & vibrant energy",
        message: "Keep blooming, Lilisha. Your best chapters, your wildest adventures, and the sweet joys of motherhood are unfolding now.",
        bloomed: false,
      },
      {
        id: "lavender",
        name: "Provence Lavender",
        scientificName: "Lavandula angustifolia",
        color: "#9C7A97",
        meaning: "Serenity, peace & calm wisdom",
        message: "No matter how busy life gets with the baby, I hope you always find moments to breathe, relax, and know how appreciated you are.",
        bloomed: false,
      },
      {
        id: "lily",
        name: "Royal Stargazer Lily",
        scientificName: "Lilium orientalis",
        color: "#E28490",
        meaning: "Confidence, ambition & beauty",
        message: "To my sister who walks into every challenge with quiet strength and dignity. You inspire me more than you know.",
        bloomed: false,
      },
      {
        id: "daisy",
        name: "Meadow Chamomile Daisy",
        scientificName: "Bellis perennis",
        color: "#FFF9F0",
        meaning: "Innocence, childhood & laughter",
        message: "Here's to a lifetime of inside jokes, goofy sibling banter, and laughing until our stomachs hurt. Never lose your humor, Lilisha!",
        bloomed: false,
      },
      {
        id: "wildflower",
        name: "Highland Cornflower",
        scientificName: "Centaurea cyanus",
        color: "#7887AB",
        meaning: "Resilience, uniqueness & adventure",
        message: "Life isn't meant to be lived on a rigid path. May this year take you and your family to exciting new horizons.",
        bloomed: false,
      },
    ] as FlowerData[],
  },

  // --- Chocolate Factory ---
  chocolates: {
    heading: "The Artisan Chocolate Box",
    subheading: "Because Life Is Better With Chocolate.",
    description: "Handcrafted virtual delicacies packed with sweet sibling thoughts, cheeky truths, and emergency happiness. Tap each piece to unwrap it!",
    items: [
      {
        id: "choc-1",
        name: "Royal Hazelnut Praline",
        type: "Crunchy Gianduja",
        flavor: "Caramelized Piedmont Hazelnut & 70% Dark Cocoa",
        color: "#493126",
        tag: "Classic Sibling Law",
        message: "Calories don't count on birthdays (or for loving moms!). That is official sibling constitutional law, signed by Eyuel.",
        siblingLaw: "Article 29: Birthday cake and chocolate are zero-calorie wellness items for Lilisha.",
      },
      {
        id: "choc-2",
        name: "Blush Strawberry Truffle",
        type: "White Chocolate Ganache",
        flavor: "Fresh Alpine Strawberry & Rose Water",
        color: "#C98996",
        tag: "Sweet Truth",
        message: "29 years old and still sweeter than all the chocolate in the world! (Even when you're bossing me around).",
        siblingLaw: "Fact: Having Lilisha as a sister means guaranteed sweetness in life.",
      },
      {
        id: "choc-3",
        name: "Velvet Salted Caramel Dome",
        type: "Milk Chocolate Shell",
        flavor: "Guérande Sea Salt Caramel",
        color: "#672F43",
        tag: "Emergency Supply",
        message: "Emergency happiness supply! Save this virtual truffle for whenever life feels a little hectic and you need a guaranteed smile.",
        siblingLaw: "Prescription: Take with tea and a phone call to your brother.",
      },
      {
        id: "choc-4",
        name: "Espresso Dark Bean Truffle",
        type: "85% Single-Origin Dark",
        flavor: "Arabica Roast & Cocoa Dust",
        color: "#2E1C14",
        tag: "Real Talk",
        message: "One chocolate for every time your brother has annoyed you. Unfortunately, you'll need a lifetime supply shipped every month!",
        siblingLaw: "Warning: Annoying you is part of my lifetime sibling contract.",
      },
      {
        id: "choc-5",
        name: "Champagne Gold Ganache",
        type: "Sparkling Chocolate",
        flavor: "French Sparkling Cider & Vanilla Bean",
        color: "#D8B978",
        tag: "Celebration",
        message: "Here's to celebrating you in style! May your 29th year sparkle with triumphs, new milestones, and endless baby smiles.",
        siblingLaw: "Raise a glass and toast to 29 incredible years of Lilisha!",
      },
      {
        id: "choc-6",
        name: "Pistachio Rose Blossom",
        type: "Delicate White Cream",
        flavor: "Roasted Bronte Pistachio & Wild Honey",
        color: "#A6B59A",
        tag: "Family Heritage",
        message: "Family is forever, and having you as a sister is one of life's greatest blessings. So proud of the woman and mother you are.",
        siblingLaw: "Blood is thick, but chocolate fondue is thicker.",
      },
    ] as ChocolateItem[],
  },

  // --- 29 Wishes for 29 Years ---
  wishes: [
    {
      id: 1,
      title: "Radiant Joy",
      category: "Joy",
      message: "May you wake up each morning with a genuine smile and go to sleep with a grateful, peaceful heart.",
    },
    {
      id: 2,
      title: "Vibrant Health",
      category: "Life",
      message: "Wishing you boundless energy, wellness, and vitality for you and your beautiful baby.",
    },
    {
      id: 3,
      title: "Unstoppable Confidence",
      category: "Dreams",
      message: "May you always walk into any room knowing your worth, your beauty, your intellect, and your queenly magic.",
    },
    {
      id: 4,
      title: "Wild Adventures",
      category: "Adventure",
      message: "May your 29th year take you to breathtaking new cities and stamp fresh, exciting pages in your passport.",
    },
    {
      id: 5,
      title: "Belly Laughs",
      category: "Joy",
      message: "Here is to those ridiculous, tear-inducing fits of sibling laughter where we can't even breathe.",
    },
    {
      id: 6,
      title: "Inner Serenity",
      category: "Peace",
      message: "May peace guard your mind against stress and remind you that you are doing wonderfully in life.",
    },
    {
      id: 7,
      title: "Dreams Realized",
      category: "Dreams",
      message: "May every goal and prayer you have quietly held in your heart begin unfolding before your eyes this year.",
    },
    {
      id: 8,
      title: "True Friendship",
      category: "Life",
      message: "May you always be surrounded by friends and family who uplift your spirit, celebrate your wins, and love you genuinely.",
    },
    {
      id: 9,
      title: "Unexpected Miracles",
      category: "Joy",
      message: "May sweet, serendipitous moments surprise you on days when you least expect them.",
    },
    {
      id: 10,
      title: "Sibling Immunity",
      category: "Sibling Bond",
      message: "May you gracefully forgive all the times I borrowed things without asking or teased you about being called Eleni!",
    },
    {
      id: 11,
      title: "Motherhood Blessings",
      category: "Motherhood",
      message: "May the journey of motherhood bring you the deepest, purest, most magical fulfillment in the universe. So proud of you!",
    },
    {
      id: 12,
      title: "Delicious Feasts & Cakes",
      category: "Life",
      message: "May you always enjoy Milifoni, Opera, Boxegna, and delicious pastries with happy family table conversations.",
    },
    {
      id: 13,
      title: "Courage Over Fear",
      category: "Dreams",
      message: "Whenever doubt whispers, may your inner courage roar louder. You have what it takes, always.",
    },
    {
      id: 14,
      title: "Sunlit Memories",
      category: "Adventure",
      message: "May your camera roll overflow with golden hour photos, baby smiles, and candid moments of pure bliss.",
    },
    {
      id: 15,
      title: "Everlasting Youth",
      category: "Joy",
      message: "29 is just level 29 of being awesome. May you never lose that childlike wonder and playfulness.",
    },
    {
      id: 16,
      title: "Warm Cozy Evenings",
      category: "Peace",
      message: "Wishing you peaceful evenings curled up with good books, cozy blankets, soft rain, and total comfort.",
    },
    {
      id: 17,
      title: "Wisdom & Clarity",
      category: "Life",
      message: "May life grant you clear intuition and wisdom in every choice you make as you step towards your 30s.",
    },
    {
      id: 18,
      title: "Unconditional Support",
      category: "Sibling Bond",
      message: "Never forget: whatever happens, your brother Eyuel has your back, ready to defend you or cheer you on.",
    },
    {
      id: 19,
      title: "Creative Spark",
      category: "Dreams",
      message: "May your passions, hobbies, and creativity flourish without boundaries or self-judgment.",
    },
    {
      id: 20,
      title: "Road Trips & Flights",
      category: "Adventure",
      message: "Flying side by side on planes, good music, great destinations, and more sibling trips in our future!",
    },
    {
      id: 21,
      title: "Quiet Patience",
      category: "Peace",
      message: "May you trust the timing of your life. Good things take time, and great things are brewing for you.",
    },
    {
      id: 22,
      title: "More Wardrobe Space",
      category: "Sibling Bond",
      message: "May your closet magically expand to fit every royal gown, crown, and outfit you've ever fancied buying!",
    },
    {
      id: 23,
      title: "Boundless Love",
      category: "Life",
      message: "May you feel deeply loved and cherished by your family every single second of every day.",
    },
    {
      id: 24,
      title: "Gentle Blessings",
      category: "Peace",
      message: "May life be gentle with your heart, kind to your soul, and generous with its blessings.",
    },
    {
      id: 25,
      title: "Spontaneous Fun",
      category: "Joy",
      message: "May you say 'yes' to spontaneous pastry runs, late-night chats, and unplanned weekend getaways.",
    },
    {
      id: 26,
      title: "Grace in Growth",
      category: "Life",
      message: "Celebrate how far you have come over the past 29 years. The mother and woman you have grown into is remarkable.",
    },
    {
      id: 27,
      title: "Endless Coffee/Tea",
      category: "Joy",
      message: "May your cup always be warm, your brew always fragrant, and your mornings unhurried and calm.",
    },
    {
      id: 28,
      title: "Strength in Storms",
      category: "Dreams",
      message: "If heavy rain ever falls, may you remember that rainbows only follow storms and you are built of solid steel.",
    },
    {
      id: 29,
      title: "The Best Chapter Yet",
      category: "Life",
      message: "May 29 be the golden threshold to your happiest, most fulfilled, most unforgettable decade yet. Happy Birthday, Lilisha!",
    },
  ] as Wish[],

  // --- Sibling Memory Scrapbook (Using Real Photos) ---
  scrapbook: {
    title: "The Sibling Memory Scrapbook",
    subtitle: "Some memories never get old.",
    description: "Polaroid snapshots, flight tickets, and silly moments etched in time. Tap any photograph to view the memory album.",
    memories: [
      {
        id: "mem-1",
        title: "Airplane Adventures Together",
        category: "Adventures",
        date: "Traveling the World",
        caption: "Flying side-by-side at 30,000 feet. Partners-in-crime since day one!",
        imageUrl: "/images/photo3_plane_siblings.jpg",
        rotation: "-rotate-2",
      },
      {
        id: "mem-2",
        title: "Queen in Crimson",
        category: "Special Occasions",
        date: "Royalty in Red",
        caption: "A golden crown and a heart full of love. Embracing motherhood with true queenly grace.",
        imageUrl: "/images/photo5_red_dress_queen.jpg",
        rotation: "rotate-1",
      },
      {
        id: "mem-3",
        title: "The Fairytale Goddess",
        category: "Special Occasions",
        date: "In Full Bloom",
        caption: "Sitting in an enchanted garden in flowing white, crowning 29 years of beauty and motherhood.",
        imageUrl: "/images/photo6_white_dress_fairytale.jpg",
        rotation: "-rotate-1",
      },
      {
        id: "mem-4",
        title: "August Afternoon Elegance",
        category: "Family Moments",
        date: "Saturday 6 Aug 2022",
        caption: "That calm, poised elegance that makes everyone around you feel at peace.",
        imageUrl: "/images/photo4_orange_elegance.jpg",
        rotation: "rotate-2",
      },
      {
        id: "mem-5",
        title: "Cozy Curls & Laughs at Home",
        category: "Funny Moments",
        date: "Every Weekend",
        caption: "Rocking the curls with the teddy bear. Pure Lilisha warmth and comfort.",
        imageUrl: "/images/photo2_curls_cozy.jpg",
        rotation: "-rotate-2",
      },
      {
        id: "mem-6",
        title: "Fresh-Faced & Full of Sunshine",
        category: "Childhood",
        date: "Sweet Beginnings",
        caption: "Top bun, bright smile, and that unforgettable spark in your eyes.",
        imageUrl: "/images/photo1_young_bun.jpg",
        rotation: "rotate-1",
      },
    ] as ScrapbookMemory[],
  },

  // --- Secret Message (Easter Egg) ---
  secret: {
    clueText: "A tiny shimmering golden star is resting somewhere in your world...",
    foundTitle: "You Found the Sibling Secret!",
    badgeTitle: "Master Sibling Explorer Award",
    message: `endet nesh lishaaaaa!

Congratulations! You've officially explored every corner of this little world.

I hope you know that no matter where life takes us, you'll always have a brother who is endlessly proud of you, supports you, and will always be there to tease you (and love you!).

Love you, Sis!

— Eyuel`,
  },

  // --- The Birthday Letter From Eyuel (EYUEL'S EXACT AUTHENTIC WORDS!) ---
  letter: {
    heading: "A Little Letter From Your Brother",
    subtitle: "Eyuel's authentic birthday letter to Lilisha",
    date: "November 2, 2026",
    salutation: "endet nesh lishaaaaa,",
    paragraphs: [
      "happy birthday belenal! 🎉",
      "yaw yihe selaleke new enji i didnt forget the birthday of the best sister in the whole world ... I would never do that, I was teasing you ... 😉",
      "ena I RLLY wish u a happy birthday lisha! I wish I could have done more fr, I wish demo I will give u the world someday. IDK when, but I know someday I will do that.",
      "ena srry lisha this is all I can get you lahunu.",
      "HBD ehehehe ❤️",
    ],
    closing: "Love you always, Sis!",
    signatureGreeting: "eyuel new yetsafew,",
    signatureName: "Eyuel ❤️",
    englishTranslationTitle: "English Translation & Reflection",
    englishTranslation: `How are you Lishaaaa, happy birthday we say!

It's only because this wasn't finished yet, otherwise I didn't forget the birthday of the best sister in the whole world... I would never do that, I was teasing you!

And I really wish you a happy birthday, Lisha, and I wish I could have done more for real. And I wish that someday I will give you the whole world. I don't know when, but I know that someday I will do that.

So sorry Lisha, this is all I can get you for now.

Happy Birthday ehehehe!

Written with all my heart by Eyuel ❤️`,
  },

  // --- Make a Wish Section ---
  wishingWell: {
    title: "One Wish for Your 29th Year",
    subtitle: "A private moment between you and the cosmos.",
    instructions: "Write down one thing your heart longs to experience, create, or feel in your 29th year. When you are ready, release it into the starlight.",
    placeholder: "My wish for my 29th year is...",
    buttonText: "Send My Wish Into the Universe",
    blessing: "Here's hoping this year brings you, your baby, and your family closer to everything your heart desires.",
    privacyNote: "🔒 Your wish stays entirely private on your phone. It is never sent to any server.",
  },

  // --- Grand Finale ---
  finale: {
    heading: "29 Looks Beautiful on You, Lilisha.",
    teaseNotice: "(Yes, you'll always be my sister Eleni, but you're Lilisha to me ❤️)",
    message: "Here's to more laughter, more adventures, more Milifoni, more cakes, and watching you be the most incredible mother.",
    birthdayWish: "Happy 29th Birthday, Lilisha!",
    loveAlways: "Proud of you always.",
    brotherSignoff: "— Eyuel",
    replayButton: "Explore Your Little World Again",
  },

  // --- Audio / Music Info ---
  audio: {
    trackName: "Warm Spring Breeze & Garden Piano",
    composer: "Dedicated to Lilisha",
    promptNotice: "Tap the music button to begin the ambient acoustic soundtrack.",
  },
};
