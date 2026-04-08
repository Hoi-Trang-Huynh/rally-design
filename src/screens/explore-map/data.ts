import {
  MapPin,
  Utensils,
  Coffee,
  Camera,
  Hotel,
} from "lucide-react";
import type {
  MapPlace,
  Category,
  Review,
  ExploreSection,
  SavedCollection,
  RallySession,
  CategoryFilterConfig,
  CommunityCollection,
  EventCard,
} from "./types";

// ─── Categories ─────────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  { id: "all", label: "All", icon: MapPin },
  { id: "restaurant", label: "Restaurants", icon: Utensils },
  { id: "hotel", label: "Hotels", icon: Hotel },
  { id: "cafe", label: "Coffee", icon: Coffee },
  { id: "attraction", label: "Attractions", icon: Camera },
];

// ─── Category pin colors ────────────────────────────────────────────────────
export const CATEGORY_COLORS: Record<string, string> = {
  restaurant: "#ff6733",
  hotel: "#3b82f6",
  cafe: "#8B5E3C",
  attraction: "#7c3aed",
};

// ─── Places ─────────────────────────────────────────────────────────────────
export const PLACES: MapPlace[] = [
  {
    id: "p1",
    name: "Be Man Seafood Restaurant",
    category: "restaurant",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviewCount: 1247,
    address: "216 Vo Nguyen Giap, Son Tra, Da Nang",
    hours: "10:00 AM - 10:00 PM",
    description:
      "Famous seafood restaurant with stunning ocean views. Known for grilled lobster, garlic butter crab, and fresh catches of the day.",
    priceLevel: "$$",
    x: 62,
    y: 35,
    saved: false,
    photos: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "p2",
    name: "Marble Mountains",
    category: "attraction",
    img: "https://images.unsplash.com/photo-1670159379668-64e81tried59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviewCount: 3892,
    address: "Hoa Hai, Ngu Hanh Son, Da Nang",
    hours: "7:00 AM - 5:30 PM",
    description:
      "A cluster of five limestone and marble mountains with caves, temples, and panoramic views of the city and coastline.",
    priceLevel: "$",
    x: 75,
    y: 68,
    saved: true,
    trending: true,
    photos: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "p3",
    name: "43 Factory Coffee Roaster",
    category: "cafe",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviewCount: 687,
    address: "70 Bach Dang, Hai Chau, Da Nang",
    hours: "7:00 AM - 9:00 PM",
    description:
      "Award-winning specialty coffee roaster with minimalist design. Famous for single-origin Vietnamese pour-overs.",
    priceLevel: "$$",
    x: 38,
    y: 48,
    saved: false,
    photos: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "p4",
    name: "My Khe Beach",
    category: "park",
    img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviewCount: 5120,
    address: "Pham Van Dong, Son Tra, Da Nang",
    hours: "Open 24 hours",
    description:
      "One of the most beautiful beaches in Asia, with white sand, gentle waves, and stunning sunrise views.",
    priceLevel: "Free",
    x: 82,
    y: 28,
    saved: true,
    trending: true,
    photos: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "p5",
    name: "Dragon Bridge",
    category: "attraction",
    img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.4,
    reviewCount: 2340,
    address: "Nguyen Van Linh, Hai Chau, Da Nang",
    hours: "Fire show Sat & Sun 9:00 PM",
    description:
      "Iconic bridge shaped like a dragon. On weekends, it breathes fire and water — a spectacular sight.",
    priceLevel: "Free",
    x: 45,
    y: 38,
    saved: false,
    trending: true,
    photos: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "p6",
    name: "Sky Bar Da Nang",
    category: "nightlife",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.3,
    reviewCount: 412,
    address: "36 Bach Dang, Hai Chau, Da Nang",
    hours: "5:00 PM - 2:00 AM",
    description:
      "Rooftop bar with panoramic views of the Han River and city skyline. Live music and craft cocktails nightly.",
    priceLevel: "$$$",
    x: 35,
    y: 55,
    saved: false,
    photos: [
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "p7",
    name: "Han Market",
    category: "shopping",
    img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.2,
    reviewCount: 1890,
    address: "119 Tran Phu, Hai Chau, Da Nang",
    hours: "6:00 AM - 7:00 PM",
    description:
      "Bustling local market with souvenirs, textiles, spices, and fresh produce. A must-visit for authentic Vietnamese shopping.",
    priceLevel: "$",
    x: 28,
    y: 36,
    saved: false,
    photos: [
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "p8",
    name: "Museum of Cham Sculpture",
    category: "museum",
    img: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviewCount: 945,
    address: "02 2 Thang 9, Hai Chau, Da Nang",
    hours: "7:00 AM - 5:00 PM",
    description:
      "The world's largest collection of Cham artifacts. Terracotta and sandstone sculptures spanning centuries of Vietnamese history.",
    priceLevel: "$",
    x: 22,
    y: 60,
    saved: false,
    photos: [
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
];

// ─── Mock Reviews (keyed by place id) ───────────────────────────────────────
export const REVIEWS: Record<string, Review[]> = {
  p1: [
    { id: "r1", author: "Sarah K.", avatar: "#7c3aed", rating: 5, text: "Best seafood in Da Nang! The garlic butter crab was incredible. Ocean view table is a must.", date: "2 weeks ago" },
    { id: "r2", author: "Tom N.", avatar: "#22c55e", rating: 4, text: "Great food, slightly pricey but the portion sizes make up for it. Lobster was fresh.", date: "1 month ago" },
    { id: "r3", author: "Mai L.", avatar: "#ec4899", rating: 5, text: "Came here twice during our trip. The staff is friendly and the sunset views are gorgeous.", date: "3 weeks ago" },
  ],
  p2: [
    { id: "r4", author: "James W.", avatar: "#3b82f6", rating: 5, text: "Absolutely stunning views from the top. The caves and temples are worth the climb.", date: "1 week ago" },
    { id: "r5", author: "Linh T.", avatar: "#ff6733", rating: 4, text: "Beautiful place but can get very hot and crowded. Go early morning for the best experience.", date: "2 months ago" },
  ],
  p3: [
    { id: "r6", author: "Alex M.", avatar: "#8B5E3C", rating: 5, text: "Top-tier specialty coffee. The pour-over is smooth and the space is beautifully designed.", date: "3 days ago" },
    { id: "r7", author: "Yuki H.", avatar: "#eab308", rating: 5, text: "Best coffee shop I've been to in Vietnam. The single-origin beans are exceptional.", date: "1 week ago" },
  ],
  p4: [
    { id: "r8", author: "David R.", avatar: "#22c55e", rating: 4, text: "Beautiful beach, gentle waves perfect for swimming. Sunrise here is unforgettable.", date: "5 days ago" },
    { id: "r9", author: "Hana P.", avatar: "#ec4899", rating: 5, text: "One of the cleanest beaches I've visited. Great for morning jogs and evening walks.", date: "2 weeks ago" },
  ],
  p5: [
    { id: "r10", author: "Chris L.", avatar: "#7c3aed", rating: 5, text: "The fire-breathing show on Saturday night was absolutely spectacular! A must-see.", date: "4 days ago" },
    { id: "r11", author: "Minh D.", avatar: "#ff6733", rating: 4, text: "Iconic landmark. Best viewed at night when the LED lights change color.", date: "1 month ago" },
  ],
};

// ─── Explore Sections (Bottom Sheet Discovery) ────────────────────────────

export const EXPLORE_SECTIONS: ExploreSection[] = [
  {
    id: "trending",
    title: "Trending Places",
    subtitle: "Popular spots this week",
    cards: [
      { id: "e1", name: "Dragon Bridge", category: "Attraction", img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.4, reviewCount: 2340, priceLevel: "Free", distance: "1.2 km", openClose: "Open 24h", saved: false, trending: true },
      { id: "e2", name: "My Khe Beach", category: "Park", img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.5, reviewCount: 5120, priceLevel: "Free", distance: "2.4 km", openClose: "Open 24h", saved: false, trending: true },
      { id: "e3", name: "Marble Mountains", category: "Attraction", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.7, reviewCount: 3892, priceLevel: "$", distance: "5.1 km", openClose: "7AM - 5:30PM", saved: true, trending: true },
      { id: "e4", name: "Ba Na Hills", category: "Attraction", img: "https://images.unsplash.com/photo-1528127269322-539801943592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.6, reviewCount: 4210, priceLevel: "$$", distance: "25 km", openClose: "7AM - 10PM", saved: false, trending: true },
      { id: "e5", name: "Son Tra Peninsula", category: "Park", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.8, reviewCount: 1560, priceLevel: "Free", distance: "8.3 km", openClose: "Open 24h", saved: false, trending: true },
    ],
  },
  {
    id: "eat",
    title: "Where to Eat",
    subtitle: "Top-rated restaurants nearby",
    cards: [
      { id: "e6", name: "Be Man Seafood", category: "Restaurant", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.6, reviewCount: 1247, priceLevel: "$$", distance: "0.8 km", openClose: "10AM - 10PM", saved: false },
      { id: "e7", name: "Mi Quang Ba Mua", category: "Restaurant", img: "https://images.unsplash.com/photo-1555126634-323283e090fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.5, reviewCount: 890, priceLevel: "$", distance: "1.5 km", openClose: "6AM - 9PM", saved: false },
      { id: "e8", name: "Banh Xeo Ba Duong", category: "Restaurant", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.7, reviewCount: 2100, priceLevel: "$", distance: "2.1 km", openClose: "10AM - 9PM", saved: true },
      { id: "e9", name: "Hai San Pho", category: "Restaurant", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.3, reviewCount: 560, priceLevel: "$$", distance: "3.2 km", openClose: "11AM - 11PM", saved: false },
      { id: "e10", name: "Com Ga A Hai", category: "Restaurant", img: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.4, reviewCount: 730, priceLevel: "$", distance: "1.8 km", openClose: "7AM - 8PM", saved: false },
    ],
  },
  {
    id: "play",
    title: "Where to Play",
    subtitle: "Fun activities & entertainment",
    cards: [
      { id: "e11", name: "Asia Park", category: "Attraction", img: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.3, reviewCount: 1890, priceLevel: "$$", distance: "3.5 km", openClose: "3PM - 10PM", saved: false },
      { id: "e12", name: "Surf Shack Da Nang", category: "Park", img: "https://images.unsplash.com/photo-1502680390548-bdbac40b3e1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.6, reviewCount: 340, priceLevel: "$$", distance: "2.8 km", openClose: "6AM - 6PM", saved: false },
      { id: "e13", name: "Hoi An Old Town", category: "Attraction", img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.9, reviewCount: 8200, priceLevel: "$", distance: "30 km", openClose: "Open 24h", saved: true },
      { id: "e14", name: "Cham Islands Diving", category: "Park", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.7, reviewCount: 420, priceLevel: "$$$", distance: "18 km", openClose: "7AM - 4PM", saved: false },
      { id: "e15", name: "Vinpearl Land", category: "Attraction", img: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.2, reviewCount: 3100, priceLevel: "$$$", distance: "12 km", openClose: "9AM - 9PM", saved: false },
    ],
  },
  {
    id: "community",
    title: "Community Recommends",
    subtitle: "Loved by fellow travelers",
    cards: [
      { id: "e16", name: "Lady Buddha Temple", category: "Attraction", img: "https://images.unsplash.com/photo-1528127269322-539801943592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.8, reviewCount: 6700, priceLevel: "Free", distance: "9.2 km", openClose: "5AM - 9PM", saved: false },
      { id: "e17", name: "The Espresso Station", category: "Cafe", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.5, reviewCount: 280, priceLevel: "$", distance: "0.5 km", openClose: "7AM - 10PM", saved: false },
      { id: "e18", name: "Non Nuoc Stone Village", category: "Shopping", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.4, reviewCount: 920, priceLevel: "$", distance: "5.5 km", openClose: "8AM - 5PM", saved: false },
      { id: "e19", name: "Han River Night Market", category: "Shopping", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.3, reviewCount: 1500, priceLevel: "$", distance: "1.1 km", openClose: "6PM - 11PM", saved: true },
      { id: "e20", name: "Pheva Chocolate", category: "Shopping", img: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.6, reviewCount: 380, priceLevel: "$$", distance: "28 km", openClose: "8AM - 9PM", saved: false },
    ],
  },
  {
    id: "stay",
    title: "Where to Stay",
    subtitle: "Best accommodations nearby",
    cards: [
      { id: "e21", name: "Hyatt Regency Da Nang", category: "Hotel", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.7, reviewCount: 2300, priceLevel: "$$$", distance: "4.2 km", openClose: "Check-in 3PM", saved: false, avgPrice: "$180/night" },
      { id: "e22", name: "Naman Retreat", category: "Hotel", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.8, reviewCount: 1450, priceLevel: "$$$$", distance: "7.8 km", openClose: "Check-in 2PM", saved: false, avgPrice: "$320/night" },
      { id: "e23", name: "Fivitel Danang", category: "Hotel", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.5, reviewCount: 870, priceLevel: "$$", distance: "1.5 km", openClose: "Check-in 2PM", saved: false, avgPrice: "$95/night" },
      { id: "e24", name: "Memory Hostel", category: "Hotel", img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.6, reviewCount: 560, priceLevel: "$", distance: "0.9 km", openClose: "Check-in 1PM", saved: false, avgPrice: "$25/night" },
      { id: "e25", name: "Shilla Monogram", category: "Hotel", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.9, reviewCount: 1900, priceLevel: "$$$$", distance: "3.1 km", openClose: "Check-in 3PM", saved: false, avgPrice: "$450/night" },
    ],
  },
];

// ─── Saved Collections ─────────────────────────────────────────────────────

export const SAVED_COLLECTIONS: SavedCollection[] = [
  { id: "c1", name: "Da Nang Favorites", coverImg: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", count: 12, updatedAt: "2 days ago" },
  { id: "c2", name: "Must-Try Food", coverImg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", count: 8, updatedAt: "1 week ago" },
  { id: "c3", name: "Beach Spots", coverImg: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", count: 5, updatedAt: "3 days ago" },
  { id: "c4", name: "Photo Locations", coverImg: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", count: 15, updatedAt: "Yesterday" },
];

// ─── Rally Sessions ────────────────────────────────────────────────────────

const RALLY_AVATARS = [
  "https://images.unsplash.com/photo-1569913486515-b74bf7751574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200",
  "https://images.unsplash.com/photo-1748200100142-e8d4f689acd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200",
  "https://images.unsplash.com/photo-1748344386932-f0b9c7b925e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200",
  "https://images.unsplash.com/photo-1543132220-e7fef0b974e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200",
];

export const RALLY_SESSIONS: RallySession[] = [
  {
    id: "rs1",
    name: "Da Nang Spring Trip",
    coverImg: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
    placeCount: 14,
    members: [
      { id: "m1", name: "You (Linh)", avatar: RALLY_AVATARS[0] },
      { id: "m2", name: "Minh", avatar: RALLY_AVATARS[1] },
      { id: "m3", name: "Hana", avatar: RALLY_AVATARS[2] },
      { id: "m4", name: "Tuan", avatar: RALLY_AVATARS[3] },
    ],
    date: "Apr 5 - Apr 12",
    places: [
      { id: "rp1", name: "Be Man Seafood", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400", category: "Restaurant", rating: 4.6, address: "216 Vo Nguyen Giap", upvotes: ["m1", "m2", "m3"], downvotes: [], comments: [{ memberId: "m2", text: "Their grilled lobster is amazing!", time: "2h ago" }], addedBy: "m1", notes: "Go for dinner on Day 2", tags: ["dinner", "day-2"] },
      { id: "rp2", name: "Marble Mountains", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400", category: "Attraction", rating: 4.7, address: "Hoa Hai, Ngu Hanh Son", upvotes: ["m1", "m3", "m4"], downvotes: ["m2"], comments: [{ memberId: "m3", text: "Let's go early morning!", time: "1h ago" }], addedBy: "m3", notes: "Bring water and sunscreen", tags: ["must-visit", "day-1"] },
      { id: "rp3", name: "My Khe Beach", img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400", category: "Beach", rating: 4.5, address: "Pham Van Dong, Son Tra", upvotes: ["m1", "m2", "m3", "m4"], downvotes: [], comments: [], addedBy: "m1", tags: ["relaxation", "day-3"] },
    ],
  },
  {
    id: "rs2",
    name: "Hoi An Weekend",
    coverImg: "https://images.unsplash.com/photo-1528127269322-539801943592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
    placeCount: 8,
    members: [
      { id: "m1", name: "You (Linh)", avatar: RALLY_AVATARS[0] },
      { id: "m2", name: "Minh", avatar: RALLY_AVATARS[1] },
    ],
    date: "Apr 19 - Apr 20",
    places: [
      { id: "rp4", name: "Hoi An Old Town", img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400", category: "Attraction", rating: 4.9, address: "Old Town, Hoi An", upvotes: ["m1", "m2"], downvotes: [], comments: [{ memberId: "m1", text: "Can't wait to see the lanterns!", time: "5h ago" }], addedBy: "m2", tags: ["must-visit"] },
    ],
  },
  {
    id: "rs3",
    name: "Hue Day Trip",
    coverImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600",
    placeCount: 6,
    members: [
      { id: "m1", name: "You (Linh)", avatar: RALLY_AVATARS[0] },
      { id: "m3", name: "Hana", avatar: RALLY_AVATARS[2] },
      { id: "m4", name: "Tuan", avatar: RALLY_AVATARS[3] },
    ],
    date: "Apr 15",
    places: [],
  },
];

// ─── Category Filters (Explore V2) ───────────────────────────────────────

export const CATEGORY_FILTERS: CategoryFilterConfig[] = [
  {
    categoryId: "restaurant",
    filters: [
      { id: "cuisine", label: "Cuisine", options: ["Vietnamese", "Japanese", "Italian", "Seafood", "Street Food"] },
      { id: "price", label: "Price", options: ["$", "$$", "$$$", "$$$$"] },
      { id: "rating", label: "Rating", options: ["4.5+", "4.0+", "3.5+"] },
    ],
  },
  {
    categoryId: "hotel",
    filters: [
      { id: "stars", label: "Stars", options: ["5-Star", "4-Star", "3-Star", "Budget"] },
      { id: "price", label: "Price", options: ["$", "$$", "$$$", "$$$$"] },
      { id: "amenities", label: "Amenities", options: ["Pool", "Spa", "Gym", "Beach Access"] },
    ],
  },
  {
    categoryId: "cafe",
    filters: [
      { id: "type", label: "Type", options: ["Specialty", "Traditional", "Co-working"] },
      { id: "vibe", label: "Vibe", options: ["Quiet", "Lively", "Outdoor"] },
    ],
  },
  {
    categoryId: "attraction",
    filters: [
      { id: "type", label: "Type", options: ["Nature", "Historical", "Cultural", "Adventure"] },
      { id: "duration", label: "Duration", options: ["< 2h", "Half day", "Full day"] },
    ],
  },
];

// ─── Community Collections (Explore V2) ──────────────────────────────────

export const COMMUNITY_COLLECTIONS: CommunityCollection[] = [
  { id: "cc1", title: "Hidden Gems of Da Nang", coverImg: "https://images.unsplash.com/photo-1528127269322-539801943592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", creatorName: "Trang N.", creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200", placeCount: 8, description: "Off-the-beaten-path spots locals love" },
  { id: "cc2", title: "Best Street Food Trail", coverImg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", creatorName: "Alex M.", creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200", placeCount: 12, description: "A walking food tour through the city" },
  { id: "cc3", title: "Instagram-Worthy Spots", coverImg: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", creatorName: "Sarah K.", creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200", placeCount: 6, description: "Best photo spots for your feed" },
  { id: "cc4", title: "Family-Friendly Day Out", coverImg: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", creatorName: "Minh D.", creatorAvatar: "https://images.unsplash.com/photo-1543132220-e7fef0b974e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200", placeCount: 9, description: "Fun for kids and parents alike" },
  { id: "cc5", title: "Sunset Chasers Guide", coverImg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", creatorName: "Yuki H.", creatorAvatar: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=200", placeCount: 5, description: "The best sunset views in the area" },
];

// ─── Category Detail Cards (Explore V2) ──────────────────────────────────

export const CATEGORY_DETAIL_CARDS: Record<string, EventCard[]> = {
  restaurant: [
    { id: "cd1", name: "Be Man Seafood", category: "Restaurant", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.6, reviewCount: 1247, priceLevel: "$$", distance: "0.8 km", openClose: "10AM - 10PM", saved: false },
    { id: "cd2", name: "Mi Quang Ba Mua", category: "Restaurant", img: "https://images.unsplash.com/photo-1555126634-323283e090fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.5, reviewCount: 890, priceLevel: "$", distance: "1.5 km", openClose: "6AM - 9PM", saved: false },
    { id: "cd3", name: "Banh Xeo Ba Duong", category: "Restaurant", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.7, reviewCount: 2100, priceLevel: "$", distance: "2.1 km", openClose: "10AM - 9PM", saved: true },
    { id: "cd4", name: "Hai San Pho", category: "Restaurant", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.3, reviewCount: 560, priceLevel: "$$", distance: "3.2 km", openClose: "11AM - 11PM", saved: false },
    { id: "cd5", name: "Com Ga A Hai", category: "Restaurant", img: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.4, reviewCount: 730, priceLevel: "$", distance: "1.8 km", openClose: "7AM - 8PM", saved: false },
    { id: "cd6", name: "Madame Lan", category: "Restaurant", img: "https://images.unsplash.com/photo-1555126634-323283e090fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.5, reviewCount: 1340, priceLevel: "$$", distance: "1.1 km", openClose: "10AM - 10PM", saved: false },
    { id: "cd7", name: "Waterfront Restaurant", category: "Restaurant", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.8, reviewCount: 450, priceLevel: "$$$", distance: "0.5 km", openClose: "5PM - 11PM", saved: false },
  ],
  hotel: [
    { id: "cd28", name: "Hyatt Regency Da Nang", category: "Hotel", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.7, reviewCount: 2300, priceLevel: "$$$", distance: "4.2 km", openClose: "Check-in 3PM", saved: false, avgPrice: "$180/night" },
    { id: "cd29", name: "Naman Retreat", category: "Hotel", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.8, reviewCount: 1450, priceLevel: "$$$$", distance: "7.8 km", openClose: "Check-in 2PM", saved: false, avgPrice: "$320/night" },
    { id: "cd30", name: "Fivitel Danang", category: "Hotel", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.5, reviewCount: 870, priceLevel: "$$", distance: "1.5 km", openClose: "Check-in 2PM", saved: false, avgPrice: "$95/night" },
    { id: "cd31", name: "Memory Hostel", category: "Hotel", img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.6, reviewCount: 560, priceLevel: "$", distance: "0.9 km", openClose: "Check-in 1PM", saved: false, avgPrice: "$25/night" },
    { id: "cd32", name: "Shilla Monogram", category: "Hotel", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.9, reviewCount: 1900, priceLevel: "$$$$", distance: "3.1 km", openClose: "Check-in 3PM", saved: false, avgPrice: "$450/night" },
  ],
  cafe: [
    { id: "cd8", name: "43 Factory Coffee", category: "Cafe", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.8, reviewCount: 687, priceLevel: "$$", distance: "1.2 km", openClose: "7AM - 9PM", saved: false },
    { id: "cd9", name: "The Espresso Station", category: "Cafe", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.5, reviewCount: 280, priceLevel: "$", distance: "0.5 km", openClose: "7AM - 10PM", saved: false },
    { id: "cd10", name: "Cong Ca Phe", category: "Cafe", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.3, reviewCount: 920, priceLevel: "$", distance: "0.9 km", openClose: "7AM - 11PM", saved: false },
    { id: "cd11", name: "Nostalife Coffee", category: "Cafe", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.6, reviewCount: 340, priceLevel: "$$", distance: "2.3 km", openClose: "8AM - 10PM", saved: false },
  ],
  attraction: [
    { id: "cd12", name: "Dragon Bridge", category: "Attraction", img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.4, reviewCount: 2340, priceLevel: "Free", distance: "1.2 km", openClose: "Open 24h", saved: false },
    { id: "cd13", name: "Marble Mountains", category: "Attraction", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.7, reviewCount: 3892, priceLevel: "$", distance: "5.1 km", openClose: "7AM - 5:30PM", saved: true },
    { id: "cd14", name: "Ba Na Hills", category: "Attraction", img: "https://images.unsplash.com/photo-1528127269322-539801943592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.6, reviewCount: 4210, priceLevel: "$$", distance: "25 km", openClose: "7AM - 10PM", saved: false },
    { id: "cd15", name: "Lady Buddha Temple", category: "Attraction", img: "https://images.unsplash.com/photo-1528127269322-539801943592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.8, reviewCount: 6700, priceLevel: "Free", distance: "9.2 km", openClose: "5AM - 9PM", saved: false },
    { id: "cd16", name: "Asia Park", category: "Attraction", img: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600", rating: 4.3, reviewCount: 1890, priceLevel: "$$", distance: "3.5 km", openClose: "3PM - 10PM", saved: false },
  ],
};
