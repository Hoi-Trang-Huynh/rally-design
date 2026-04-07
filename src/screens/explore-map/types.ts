import type { LucideIcon } from "lucide-react";

export type MapPlace = {
  id: string;
  name: string;
  category: string;
  img: string;
  rating: number;
  reviewCount: number;
  address: string;
  hours: string;
  description: string;
  priceLevel: string;
  x: number; // % position on map
  y: number;
  saved: boolean;
  photos: string[];
  trending?: boolean;
};

export type Category = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type Review = {
  id: string;
  author: string;
  avatar: string; // bg color for initial circle
  rating: number;
  text: string;
  date: string;
};

export type WeatherInfo = {
  temp: number;
  condition: string;
  icon: string; // emoji
};

export type MapLayers = {
  traffic: boolean;
  transit: boolean;
  weather: boolean;
  friends: boolean;
};

export type FriendLocation = {
  id: string;
  name: string;
  avatar: string; // bg color
  initial: string;
  x: number; // % on map
  y: number;
  status: string;
};

// ─── Bottom Sheet Types ────────────────────────────────────────────────────

export type BottomSheetSnap = "collapsed" | "half" | "full";
export type BottomSheetTab = "explore" | "saved" | "add";
export type SavedSubTab = "personal" | "rallies";

export type EventCard = {
  id: string;
  name: string;
  category: string;
  img: string;
  rating: number;
  reviewCount: number;
  priceLevel: string;
  distance: string;
  openClose: string;
  saved: boolean;
  trending?: boolean;
  avgPrice?: string; // for "Where to Stay"
};

export type ExploreSection = {
  id: string;
  title: string;
  subtitle?: string;
  cards: EventCard[];
};

export type SavedCollection = {
  id: string;
  name: string;
  coverImg: string;
  count: number;
  updatedAt: string;
};

export type RallySession = {
  id: string;
  name: string;
  coverImg: string;
  placeCount: number;
  members: { id: string; name: string; avatar: string }[];
  date: string;
  places: RallyPlace[];
};

export type RallyPlace = {
  id: string;
  name: string;
  img: string;
  category: string;
  rating: number;
  address: string;
  upvotes: string[];
  downvotes: string[];
  comments: { memberId: string; text: string; time: string }[];
  addedBy: string;
  notes?: string;
  tags?: string[];
};

export type WeatherForecast = {
  day: string;
  icon: string;
  high: number;
  low: number;
};

export type WeatherDetail = {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
  uvIndex: number;
  feelsLike: number;
  forecast: WeatherForecast[];
};

export type LeaderboardEntry = {
  id: string;
  name: string;
  avatar: string;
  initial: string;
  areaPercent: number;
  rank: number;
  isCurrentUser?: boolean;
};
