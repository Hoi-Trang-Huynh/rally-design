import {
  MapPin,
  Flame,
  Utensils,
  Coffee,
  Camera,
  TreePine,
  Wine,
  ShoppingBag,
  Building2,
} from "lucide-react";
import type { MapPlace, Category, Review, WeatherInfo, FriendLocation } from "./types";

// ─── Categories ─────────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  { id: "all", label: "All", icon: MapPin },
  { id: "trending", label: "Trending", icon: Flame },
  { id: "restaurant", label: "Restaurants", icon: Utensils },
  { id: "cafe", label: "Cafes", icon: Coffee },
  { id: "attraction", label: "Attractions", icon: Camera },
  { id: "park", label: "Parks", icon: TreePine },
  { id: "nightlife", label: "Nightlife", icon: Wine },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "museum", label: "Museums", icon: Building2 },
];

// ─── Category pin colors ────────────────────────────────────────────────────
export const CATEGORY_COLORS: Record<string, string> = {
  restaurant: "#ff6733",
  cafe: "#8B5E3C",
  attraction: "#7c3aed",
  park: "#22c55e",
  nightlife: "#ec4899",
  shopping: "#3b82f6",
  museum: "#eab308",
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

// ─── Weather (mock, keyed by place id) ──────────────────────────────────────
export const WEATHER: Record<string, WeatherInfo> = {
  p1: { temp: 29, condition: "Partly Cloudy", icon: "⛅" },
  p2: { temp: 26, condition: "Sunny", icon: "☀️" },
  p3: { temp: 28, condition: "Sunny", icon: "☀️" },
  p4: { temp: 30, condition: "Sunny", icon: "☀️" },
  p5: { temp: 27, condition: "Clear", icon: "🌤️" },
  p6: { temp: 26, condition: "Clear Night", icon: "🌙" },
  p7: { temp: 29, condition: "Humid", icon: "🌥️" },
  p8: { temp: 28, condition: "Sunny", icon: "☀️" },
};

// ─── Friend locations ───────────────────────────────────────────────────────
export const FRIENDS: FriendLocation[] = [
  { id: "f1", name: "Sarah", avatar: "#7c3aed", initial: "S", x: 55, y: 42, status: "Exploring nearby" },
  { id: "f2", name: "Tom", avatar: "#22c55e", initial: "T", x: 30, y: 30, status: "At hotel" },
  { id: "f3", name: "Mai", avatar: "#ec4899", initial: "M", x: 70, y: 55, status: "Having lunch" },
];
