import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import svgPaths from "../../imports/svg-bobmtjb1fa";
import {
  MapPin,
  ChevronDown,
  ChevronRight,
  Eye,
  Pencil,
  Calendar,
  Plane,
  Hotel,
  Utensils,
  Paperclip,
  Plus,
  Lock,
  Globe,
  FileText,
  Image as ImageIcon,
  Upload,
  Download,
  Check,
  WifiOff,
  X,
  Bus,
  MoreHorizontal,
  Loader2,
  Folder,
  FolderOpen,
  Trash2,
  Heart,
  Users,
  ArrowUpDown,
  Send,
  CheckCircle,
  XCircle,
  UserPlus,
  Clock,
  Star,
  ChevronLeft,
} from "lucide-react";
import { toast, Toaster } from "sonner";

const FONT = "font-['Inclusive_Sans',sans-serif]";

// ─── Images ───
const COVER_IMG =
  "https://images.unsplash.com/photo-1685345414422-74d065a8ffdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEYSUyMExhdCUyMGNvZmZlZSUyMHNob3AlMjBWaWV0bmFtfGVufDF8fHx8MTc3MTA5NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const MARKET_IMG =
  "https://images.unsplash.com/photo-1770718658869-e45d8f84d408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwbWFya2V0JTIwc3RyZWV0JTIwZm9vZCUyMHN0YWxsfGVufDF8fHx8MTc3MTA5NzExOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const COFFEE_IMG =
  "https://images.unsplash.com/photo-1667624327648-be3161a54dd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEYSUyMExhdCUyMGNvZmZlZSUyMHNob3AlMjBWaWV0bmFtfGVufDF8fHx8MTc3MTA5NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const TEMPLE_IMG =
  "https://images.unsplash.com/photo-1764691596743-bc4641b56ef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwdGVtcGxlJTIwc2NlbmljJTIwbGFuZG1hcmt8ZW58MXx8fHwxNzcxMDk3MTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const LAKE_IMG =
  "https://images.unsplash.com/photo-1741320130811-e8f86f2ea39f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwbGFrZSUyMGdhcmRlbiUyMHNjZW5pY3xlbnwxfHx8fDE3NzEwOTcxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const FLOWER_IMG =
  "https://images.unsplash.com/photo-1654672183842-308db69962a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEYSUyMExhdCUyMGZsb3dlciUyMGdhcmRlbiUyMFZpZXRuYW18ZW58MXx8fHwxNzcxMDk3MTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// ─── Data ───
const MAP_PINS = [
  { id: 1, x: 22, y: 35, name: "Da Lat Market", img: MARKET_IMG, day: 1, address: "12 Nguyen Thi Minh Khai, Ward 1", time: "8:30 AM", duration: "1.5 hrs" },
  { id: 2, x: 52, y: 55, name: "Café de la Poste", img: COFFEE_IMG, day: 1, address: "4 Tran Phu, Ward 3", time: "10:30 AM", duration: "1 hr" },
  { id: 3, x: 78, y: 30, name: "Linh Phuoc Pagoda", img: TEMPLE_IMG, day: 1, address: "120 Tu Phuoc, Ward 11", time: "1:00 PM", duration: "2 hrs" },
  { id: 4, x: 35, y: 68, name: "Xuan Huong Lake", img: LAKE_IMG, day: 2, address: "Tran Quoc Toan, Ward 10", time: "9:00 AM", duration: "2 hrs" },
  { id: 5, x: 65, y: 45, name: "Da Lat Flower Garden", img: FLOWER_IMG, day: 2, address: "2 Phu Dong Thien Vuong", time: "11:30 AM", duration: "1.5 hrs" },
];

const SAVED_PLACES = [
  { 
    id: "sp1", 
    name: "Xuan Huong Lake", 
    img: LAKE_IMG,
    description: "A crescent-shaped lake in the heart of Da Lat, perfect for peaceful walks and enjoying the cool mountain air.",
    address: "Tran Quoc Toan, Ward 10, Da Lat",
    hours: "Open 24 hours",
    rating: "4.6"
  },
  { 
    id: "sp2", 
    name: "Da Lat Flower Garden", 
    img: FLOWER_IMG,
    description: "A stunning botanical garden showcasing hundreds of colorful flower species and ornamental plants.",
    address: "2 Phu Dong Thien Vuong, Ward 8, Da Lat",
    hours: "7:00 AM - 6:00 PM",
    rating: "4.5"
  },
  { 
    id: "sp3", 
    name: "Valley of Love", 
    img: TEMPLE_IMG,
    description: "A romantic valley surrounded by pine forests, featuring a lake, gardens, and scenic walking trails.",
    address: "Phu Dong Thien Vuong, Ward 11, Da Lat",
    hours: "7:00 AM - 5:30 PM",
    rating: "4.4"
  },
];

// ─── Emoji Options ───
const EMOJI_OPTIONS = [
  "📁", "☕️", "🌧️", "⭐️", "🎨", "🎭", "🎪", "🎬", "🎵", "🎸",
  "🍕", "🍜", "🍰", "🍺", "🏛️", "🏰", "🏖️", "🏔️", "🌸", "🌺",
  "🌴", "🌲", "🦋", "🐚", "🎯", "🎮", "🏀", "⚽️", "🎾", "🏊",
  "🚴", "🧘", "📚", "✈️", "🚂", "🚢", "🗺️", "🏕️", "🎒", "📸"
];

// ─── Trip Members ───
type TripMember = {
  id: string;
  name: string;
  avatar: string;
  role: "owner" | "member";
  isFollowing?: boolean;
};

const TRIP_MEMBERS: TripMember[] = [
  { id: "m1", name: "You (Linh)", avatar: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwYXZhdGFyJTIwaGVhZHNob3R8ZW58MXx8fHwxNzczOTQ0Mzg3fDA&ixlib=rb-4.1.0&q=80&w=1080", role: "owner" },
  { id: "m2", name: "Minh", avatar: "https://images.unsplash.com/photo-1748200100142-e8d4f689acd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGF2YXRhciUyMGhlYWRzaG90fGVufDF8fHx8MTc3Mzk0NDM4OHww&ixlib=rb-4.1.0&q=80&w=1080", role: "member", isFollowing: true },
  { id: "m3", name: "Hana", avatar: "https://images.unsplash.com/photo-1748344386932-f0b9c7b925e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mzg3NjEzNHww&ixlib=rb-4.1.0&q=80&w=1080", role: "member", isFollowing: false },
  { id: "m4", name: "Tuan", avatar: "https://images.unsplash.com/photo-1543132220-e7fef0b974e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGNhc3VhbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzkwNTgyNnww&ixlib=rb-4.1.0&q=80&w=1080", role: "member", isFollowing: true },
];

// ─── General Space Place Cards ───
type TimelineEntry = {
  title: string;
  description: string;
  day: string;
  time: string;
};

type GeneralSpaceCard = {
  id: string;
  name: string;
  img: string;
  addedBy: string; // member id
  likes: string[]; // member ids who liked
  addedToTimeline: boolean;
  timelineEntry?: TimelineEntry;
};

const INITIAL_GENERAL_CARDS: GeneralSpaceCard[] = [
  { id: "gc1", name: "Da Lat Night Market", img: "https://images.unsplash.com/photo-1748596161714-4049199ae770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwc3RyZWV0JTIwZm9vZCUyMHN0YWxsJTIwbmlnaHR8ZW58MXx8fHwxNzczOTQ0Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080", addedBy: "m1", likes: ["m2", "m3", "m4"], addedToTimeline: false },
  { id: "gc2", name: "Langbiang Peak Viewpoint", img: "https://images.unsplash.com/photo-1710702418104-6bf5419ab03d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEYSUyMExhdCUyMFZpZXRuYW0lMjBzY2VuaWMlMjB2aWV3cG9pbnR8ZW58MXx8fHwxNzczOTQ0Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080", addedBy: "m1", likes: ["m2", "m4"], addedToTimeline: true },
  { id: "gc3", name: "XQ Art Village", img: "https://images.unsplash.com/photo-1766421687413-e350f7541524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc3Mzk0NDM4N3ww&ixlib=rb-4.1.0&q=80&w=1080", addedBy: "m1", likes: ["m3"], addedToTimeline: false },
  { id: "gc4", name: "Xuan Huong Lake", img: LAKE_IMG, addedBy: "m1", likes: ["m2", "m3", "m4", "m1"], addedToTimeline: true },
  { id: "gc5", name: "Da Lat Flower Garden", img: FLOWER_IMG, addedBy: "m1", likes: ["m2"], addedToTimeline: false },
];

// ─── Personal Space Cards (for current member) ───
type PersonalSpaceCard = {
  id: string;
  name: string;
  img: string;
  recommended: boolean; // has been recommended to owner
  recommendStatus?: "pending" | "accepted" | "rejected";
};

const INITIAL_PERSONAL_CARDS: PersonalSpaceCard[] = [
  { id: "pc1", name: "K'Ho Coffee Farm", img: TEMPLE_IMG, recommended: false },
  { id: "pc2", name: "Datanla Waterfall", img: LAKE_IMG, recommended: true, recommendStatus: "accepted" },
  { id: "pc3", name: "Crazy House", img: FLOWER_IMG, recommended: true, recommendStatus: "pending" },
];

// ─── Saved Collections Structure ───
type SavedPlace = {
  id: string;
  name: string;
  img: string;
  description?: string;
  address?: string;
  hours?: string;
  rating?: string;
};

type SavedCollection = {
  id: string;
  name: string;
  type: "folder" | "place";
  emoji?: string;
  places?: SavedPlace[];
  // For individual places
  place?: SavedPlace;
};

const SAVED_COLLECTIONS: SavedCollection[] = [
  {
    id: "folder-coffee",
    name: "Coffee Spots",
    type: "folder",
    emoji: "☕️",
    places: [
      {
        id: "cf1",
        name: "An Cafe",
        img: LAKE_IMG,
        description: "Cozy café with stunning lake views and excellent Vietnamese coffee.",
        address: "Nguyen Thai Hoc, Ward 4, Da Lat",
        hours: "7:00 AM - 10:00 PM",
        rating: "4.7"
      },
      {
        id: "cf2",
        name: "Maze Bar",
        img: FLOWER_IMG,
        description: "Hidden gem known for artisanal coffee and unique atmosphere.",
        address: "Ngo Quyen, Ward 6, Da Lat",
        hours: "8:00 AM - 11:00 PM",
        rating: "4.8"
      },
      {
        id: "cf3",
        name: "K'Ho Coffee",
        img: TEMPLE_IMG,
        description: "Traditional highland coffee roasted by local K'Ho people.",
        address: "Truong Cong Dinh, Ward 1, Da Lat",
        hours: "6:00 AM - 8:00 PM",
        rating: "4.6"
      },
    ]
  },
  {
    id: "folder-rainy",
    name: "Rainy Day Plans",
    type: "folder",
    emoji: "🌧️",
    places: [
      {
        id: "rd1",
        name: "Crazy House",
        img: TEMPLE_IMG,
        description: "Whimsical architectural marvel perfect for indoor exploration.",
        address: "03 Huynh Thuc Khang, Ward 4, Da Lat",
        hours: "8:30 AM - 7:00 PM",
        rating: "4.5"
      },
      {
        id: "rd2",
        name: "Linh Phuoc Pagoda",
        img: FLOWER_IMG,
        description: "Stunning Buddhist temple with intricate mosaic artwork.",
        address: "Trai Mat, Da Lat",
        hours: "7:00 AM - 5:00 PM",
        rating: "4.7"
      },
      {
        id: "rd3",
        name: "Da Lat Market",
        img: LAKE_IMG,
        description: "Indoor market for local food, crafts, and souvenirs.",
        address: "Nguyen Thi Minh Khai, Ward 1, Da Lat",
        hours: "6:00 AM - 9:00 PM",
        rating: "4.3"
      },
    ]
  },
  {
    id: "folder-must-see",
    name: "Must-See Spots",
    type: "folder",
    emoji: "⭐️",
    places: [
      {
        id: "ms1",
        name: "Datanla Waterfall",
        img: LAKE_IMG,
        description: "Beautiful waterfall with alpine coaster adventure.",
        address: "Pass Prenn, Ward 3, Da Lat",
        hours: "7:00 AM - 5:00 PM",
        rating: "4.6"
      },
      {
        id: "ms2",
        name: "Tuyen Lam Lake",
        img: TEMPLE_IMG,
        description: "Serene lake surrounded by pine forests and mountains.",
        address: "Tuyen Lam, Da Lat",
        hours: "Open 24 hours",
        rating: "4.7"
      },
    ]
  },
  // Unsorted individual places
  {
    id: "unsorted-1",
    name: "Xuan Huong Lake",
    type: "place",
    place: {
      id: "sp1",
      name: "Xuan Huong Lake",
      img: LAKE_IMG,
      description: "A crescent-shaped lake in the heart of Da Lat, perfect for peaceful walks and enjoying the cool mountain air.",
      address: "Tran Quoc Toan, Ward 10, Da Lat",
      hours: "Open 24 hours",
      rating: "4.6"
    }
  },
  {
    id: "unsorted-2",
    name: "Da Lat Flower Garden",
    type: "place",
    place: {
      id: "sp2",
      name: "Da Lat Flower Garden",
      img: FLOWER_IMG,
      description: "A stunning botanical garden showcasing hundreds of colorful flower species and ornamental plants.",
      address: "2 Phu Dong Thien Vuong, Ward 8, Da Lat",
      hours: "7:00 AM - 6:00 PM",
      rating: "4.5"
    }
  },
  {
    id: "unsorted-3",
    name: "Valley of Love",
    type: "place",
    place: {
      id: "sp3",
      name: "Valley of Love",
      img: TEMPLE_IMG,
      description: "A romantic valley surrounded by pine forests, featuring a lake, gardens, and scenic walking trails.",
      address: "Phu Dong Thien Vuong, Ward 11, Da Lat",
      hours: "7:00 AM - 5:30 PM",
      rating: "4.4"
    }
  },
];

// ─── Reservation Files Data ───
type FileItem = {
  id: string;
  name: string;
  type: "pdf" | "image" | "doc";
  size: string;
  synced: boolean;
  date: string;
};

type ReservationCategory = {
  key: string;
  label: string;
  icon: typeof Plane;
  badge?: number;
  files: FileItem[];
};

const RESERVATION_CATEGORIES: ReservationCategory[] = [
  {
    key: "flight",
    label: "Flight",
    icon: Plane,
    badge: 2,
    files: [
      { id: "f1", name: "SGN → DLI Boarding Pass.pdf", type: "pdf", size: "1.2 MB", synced: true, date: "Aug 12" },
      { id: "f2", name: "DLI → SGN Return.pdf", type: "pdf", size: "980 KB", synced: true, date: "Aug 15" },
    ],
  },
  {
    key: "lodging",
    label: "Lodging",
    icon: Hotel,
    files: [
      { id: "l1", name: "Ana Mandara Confirmation.pdf", type: "pdf", size: "2.1 MB", synced: true, date: "Aug 12-15" },
      { id: "l2", name: "Room Photos.jpg", type: "image", size: "4.5 MB", synced: false, date: "Aug 12" },
    ],
  },
  {
    key: "restaurant",
    label: "Restaurant",
    icon: Utensils,
    files: [
      { id: "r1", name: "Le Chalet Reservation.pdf", type: "pdf", size: "340 KB", synced: true, date: "Aug 13" },
    ],
  },
  {
    key: "tickets",
    label: "Tickets",
    icon: Bus,
    files: [
      { id: "t1", name: "Bus Tickets - Saigon Express.pdf", type: "pdf", size: "540 KB", synced: true, date: "Aug 12" },
    ],
  },
  {
    key: "attachments",
    label: "Attachments",
    icon: Paperclip,
    files: [
      { id: "a1", name: "Travel Insurance.pdf", type: "pdf", size: "3.2 MB", synced: true, date: "Aug 10" },
      { id: "a2", name: "Itinerary Map.jpg", type: "image", size: "1.8 MB", synced: false, date: "Aug 11" },
      { id: "a3", name: "Packing Checklist.doc", type: "doc", size: "120 KB", synced: true, date: "Aug 9" },
    ],
  },
  {
    key: "others",
    label: "Others",
    icon: MoreHorizontal,
    files: [
      { id: "o1", name: "Emergency Contacts.pdf", type: "pdf", size: "220 KB", synced: true, date: "Aug 9" },
    ],
  },
];

// ─── Reusable sub-components ───
function Notch() {
  return (
    <div
      className="absolute left-1/2 top-0 h-[32px] w-[172px] -translate-x-1/2"
      data-name="Notch"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 172 32"
      >
        <path d={svgPaths.p29d69840} fill="black" />
      </svg>
    </div>
  );
}

function StatusBar() {
  return (
    <div
      className="relative h-[47px] w-full shrink-0 overflow-clip"
      data-name="StatusBar"
    >
      <Notch />
      <p
        className={`absolute left-[27px] top-[15px] ${FONT} text-[16px] leading-[21px] tracking-[-0.32px] text-black`}
      >
        9:41
      </p>
      <div className="absolute right-[14px] top-[19px] h-[13px] w-[77px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 77.4012 13"
        >
          <path d={svgPaths.p26f34780} opacity="0.35" stroke="black" />
          <path d={svgPaths.p4c0c710} fill="black" opacity="0.4" />
          <path d={svgPaths.p22239c00} fill="black" />
          <path d={svgPaths.p17d55700} fill="black" />
          <path d={svgPaths.p16816b00} fill="black" />
          <path d={svgPaths.p18ef7a00} fill="black" />
          <path d={svgPaths.p2262f080} fill="black" />
          <path d={svgPaths.pc5da680} fill="black" />
        </svg>
      </div>
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="relative h-[34px] w-full shrink-0" data-name="HomeIndicator">
      <div className="absolute bottom-[8px] left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-[100px] bg-black opacity-40" />
    </div>
  );
}

// ─── iOS-style Toggle Switch ───
function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[32px] w-[52px] rounded-full transition-all duration-300 ${
        checked ? "bg-[#34c759]" : "bg-[#79747e]/30"
      }`}
    >
      <div
        className={`absolute top-[3px] size-[26px] rounded-full transition-all duration-300 ${
          checked ? "translate-x-[23px] bg-white" : "translate-x-[3px] bg-[#79747e]"
        }`}
        style={{
          boxShadow: checked
            ? "0 2px 4px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)"
            : "0 1px 3px rgba(0,0,0,0.1)",
        }}
      />
    </button>
  );
}

// ═══════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════
export default function SessionOverview() {
  const navigate = useNavigate();
  const [activePin, setActivePin] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [allowInvites, setAllowInvites] = useState(true);
  const [visiblePublic, setVisiblePublic] = useState(false);
  const [dayOpen, setDayOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0); // 0 = all days, 1+ = specific day
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [pinsVisible, setPinsVisible] = useState(true);
  const [mapTransform, setMapTransform] = useState({ scale: 1, translateX: 0, translateY: 0 });
  const [addedPlaces, setAddedPlaces] = useState<Set<string>>(new Set());
  const [selectedPlace, setSelectedPlace] = useState<{ id: string; name: string; img: string } | null>(null);
  const [placeDetails, setPlaceDetails] = useState<any>(null);
  const [loadingPlaceDetails, setLoadingPlaceDetails] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionEmoji, setNewCollectionEmoji] = useState("📁");
  const [userCollections, setUserCollections] = useState<SavedCollection[]>([]);
  const [editingFolder, setEditingFolder] = useState<SavedCollection | null>(null);
  const [coverImage, setCoverImage] = useState(COVER_IMG);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const [editFolderName, setEditFolderName] = useState("");
  const [editFolderEmoji, setEditFolderEmoji] = useState("");
  const [addingToFolder, setAddingToFolder] = useState<SavedCollection | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [defaultCollections, setDefaultCollections] = useState<SavedCollection[]>(SAVED_COLLECTIONS);
  
  // ─── Saved Places: General / Personal Space State ───
  const [savedPlacesSpace, setSavedPlacesSpace] = useState<"general" | "personal">("general");
  const [generalCards, setGeneralCards] = useState<GeneralSpaceCard[]>(INITIAL_GENERAL_CARDS);
  const [personalCards, setPersonalCards] = useState<PersonalSpaceCard[]>(INITIAL_PERSONAL_CARDS);
  const [sortByLikes, setSortByLikes] = useState(false);
  const [showLikesSheet, setShowLikesSheet] = useState<GeneralSpaceCard | null>(null);
  const [showTimelineModal, setShowTimelineModal] = useState<GeneralSpaceCard | null>(null);
  const [timelineFormTitle, setTimelineFormTitle] = useState("");
  const [timelineFormDesc, setTimelineFormDesc] = useState("");
  const [timelineFormDay, setTimelineFormDay] = useState("");
  const [timelineFormTime, setTimelineFormTime] = useState("");
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<GeneralSpaceCard | null>(null);
  const [pendingRecommendations, setPendingRecommendations] = useState<Array<{ id: string; name: string; img: string; fromMember: string }>>([
    { id: "rec1", name: "Crazy House", img: FLOWER_IMG, fromMember: "m3" },
  ]);
  const [memberFollowing, setMemberFollowing] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    TRIP_MEMBERS.forEach(m => { if (m.isFollowing !== undefined) map[m.id] = m.isFollowing; });
    return map;
  });
  const lastTapRef = useRef<{ id: string; time: number } | null>(null);
  const [doubleTapHeart, setDoubleTapHeart] = useState<string | null>(null);
  const [selectedGeneralCard, setSelectedGeneralCard] = useState<GeneralSpaceCard | null>(null);
  const singleTapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Current user role - toggle for demo (owner sees general space add, member sees personal space)
  const [currentUserRole] = useState<"owner" | "member">("owner");
  const currentUserId = "m1";

  // Add reservation state
  const [showAddPlaceSheet, setShowAddPlaceSheet] = useState(false);
  const [showAddReservationModal, setShowAddReservationModal] = useState(false);
  const [newReservationType, setNewReservationType] = useState("");
  const [newReservationName, setNewReservationName] = useState("");
  const [newReservationDate, setNewReservationDate] = useState("");
  const [newReservationConfirmation, setNewReservationConfirmation] = useState("");
  const [newReservationNotes, setNewReservationNotes] = useState("");
  
  // Swipe-to-delete state
  const [swipedItem, setSwipedItem] = useState<string | null>(null);
  const [swipeX, setSwipeX] = useState(0);
  const [deleteConfirmFolder, setDeleteConfirmFolder] = useState<SavedCollection | null>(null);
  const touchStartX = useRef<number>(0);
  const currentSwipedItem = useRef<string | null>(null);

  // Edit mode fields
  const [editTitle, setEditTitle] = useState("Weekend in Da Lat");
  const [editDateStart, setEditDateStart] = useState("2026-08-12");
  const [editDateEnd, setEditDateEnd] = useState("2026-08-15");

  const [editDescription, setEditDescription] = useState(
    "Explore the enchanting highland city of Da Lat, Vietnam. Visit the vibrant local markets, enjoy world-class coffee, and discover the stunning Linh Phuoc Pagoda with its intricate mosaic architecture."
  );

  const carouselRef = useRef<HTMLDivElement>(null);

  // ─── Google Places API Integration ───
  // NOTE: For production, move API calls to a secure backend
  // Google Places API Key (replace with your own)
  const GOOGLE_PLACES_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY_HERE";

  // Fetch place details when a place is selected
  useEffect(() => {
    if (!selectedPlace) {
      setPlaceDetails(null);
      return;
    }

    const fetchPlaceDetails = async () => {
      setLoadingPlaceDetails(true);
      
      try {
        // In production, this should be a backend API call to keep your API key secure
        // For now, we'll create mock data that simulates Google Places API response
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock Google Places API response
        // In production, you would make this call:
        // const response = await fetch(
        //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${selectedPlace.id}&fields=name,rating,formatted_address,opening_hours,photos,editorial_summary,geometry&key=${GOOGLE_PLACES_API_KEY}`
        // );
        // const data = await response.json();
        
        // Mock data structure matching Google Places API
        const mockPlaceDetails = {
          name: selectedPlace.name,
          rating: selectedPlace.name.includes("Lake") ? 4.6 : 
                  selectedPlace.name.includes("Garden") ? 4.5 : 4.4,
          user_ratings_total: Math.floor(Math.random() * 5000) + 1000,
          formatted_address: selectedPlace.name.includes("Lake") 
            ? "Tran Quoc Toan, Ward 10, Da Lat, Lam Dong, Vietnam"
            : selectedPlace.name.includes("Garden")
            ? "2 Phu Dong Thien Vuong, Ward 8, Da Lat, Lam Dong, Vietnam"
            : "Phu Dong Thien Vuong, Ward 11, Da Lat, Lam Dong, Vietnam",
          opening_hours: {
            open_now: true,
            weekday_text: selectedPlace.name.includes("Lake")
              ? ["Open 24 hours"]
              : ["Monday: 7:00 AM – 6:00 PM",
                 "Tuesday: 7:00 AM – 6:00 PM",
                 "Wednesday: 7:00 AM – 6:00 PM",
                 "Thursday: 7:00 AM – 6:00 PM",
                 "Friday: 7:00 AM – 6:00 PM",
                 "Saturday: 7:00 AM – 6:00 PM",
                 "Sunday: 7:00 AM – 6:00 PM"]
          },
          editorial_summary: {
            overview: selectedPlace.name.includes("Lake")
              ? "A crescent-shaped lake in the heart of Da Lat, perfect for peaceful walks and enjoying the cool mountain air. Popular spot for morning jogs and evening strolls."
              : selectedPlace.name.includes("Garden")
              ? "A stunning botanical garden showcasing hundreds of colorful flower species and ornamental plants. Features beautiful landscaping and seasonal flower displays."
              : "A romantic valley surrounded by pine forests, featuring a lake, gardens, and scenic walking trails. Popular destination for couples and nature lovers."
          },
          geometry: {
            location: {
              lat: 11.9404 + (Math.random() - 0.5) * 0.01,
              lng: 108.4583 + (Math.random() - 0.5) * 0.01
            }
          },
          price_level: 1, // 0-4 scale
          website: `https://example.com/${selectedPlace.id}`,
          phone_number: "+84 263 xxx xxxx"
        };

        setPlaceDetails(mockPlaceDetails);
      } catch (error) {
        console.error("Error fetching place details:", error);
        // Fallback to basic info if API fails
        setPlaceDetails(null);
      } finally {
        setLoadingPlaceDetails(false);
      }
    };

    fetchPlaceDetails();
  }, [selectedPlace]);

  // Filter pins by selected day
  const filteredPins = selectedDay === 0 ? MAP_PINS : MAP_PINS.filter(p => p.day === selectedDay);

  // ─── Bottom Sheet State ───
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetTopRef = useRef(0);
  const [sheetTop, setSheetTop] = useState(0);
  const [isSheetAnimating, setIsSheetAnimating] = useState(false);
  const [sheetReady, setSheetReady] = useState(false);

  const dragRef = useRef({
    active: false,
    startY: 0,
    startTop: 0,
    prevY: 0,
    prevTime: 0,
    velocity: 0,
  });

  const getSnaps = () => {
    const h = containerRef.current?.clientHeight || 500;
    return {
      full: 8,
      half: Math.round(h * 0.4),
      peek: h - 60,
    };
  };

  // Initialize sheet at half position after mount
  useEffect(() => {
    const initSheet = () => {
      if (containerRef.current) {
        const snaps = getSnaps();
        sheetTopRef.current = snaps.half;
        setSheetTop(snaps.half);
        setSheetReady(true);
      }
    };
    const raf = requestAnimationFrame(initSheet);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doSnap = (velocity: number) => {
    const snaps = getSnaps();
    const current = sheetTopRef.current;
    let target: "peek" | "half" | "full";

    if (Math.abs(velocity) > 0.4) {
      if (velocity < 0) {
        target = current > snaps.half ? "half" : "full";
      } else {
        target = current < snaps.half ? "half" : "peek";
      }
    } else {
      const dists: ["peek" | "half" | "full", number][] = [
        ["full", Math.abs(current - snaps.full)],
        ["half", Math.abs(current - snaps.half)],
        ["peek", Math.abs(current - snaps.peek)],
      ];
      dists.sort((a, b) => a[1] - b[1]);
      target = dists[0][0];
    }

    const newTop = snaps[target];
    sheetTopRef.current = newTop;
    setSheetTop(newTop);
    setIsSheetAnimating(true);
  };

  // Window-level move/up handlers for reliable drag tracking
  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      e.preventDefault();
      const now = Date.now();
      const dt = now - dragRef.current.prevTime;
      if (dt > 0) {
        const instantV = (e.clientY - dragRef.current.prevY) / dt;
        dragRef.current.velocity = dragRef.current.velocity * 0.4 + instantV * 0.6;
      }
      dragRef.current.prevY = e.clientY;
      dragRef.current.prevTime = now;

      const delta = e.clientY - dragRef.current.startY;
      const snaps = getSnaps();
      const newTop = Math.max(
        snaps.full,
        Math.min(snaps.peek, dragRef.current.startTop + delta)
      );
      sheetTopRef.current = newTop;
      setSheetTop(newTop);
    };

    const handleUp = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      doSnap(dragRef.current.velocity);
    };

    window.addEventListener("pointermove", handleMove, { passive: false });
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandlePointerDown = (e: React.PointerEvent) => {
    if (dragRef.current.active) return;
    e.preventDefault();
    setIsSheetAnimating(false);
    dragRef.current = {
      active: true,
      startY: e.clientY,
      startTop: sheetTopRef.current,
      prevY: e.clientY,
      prevTime: Date.now(),
      velocity: 0,
    };
  };

  const onSheetTransitionEnd = () => {
    setIsSheetAnimating(false);
  };

  const scrollToCard = (index: number) => {
    setActivePin(index);
    if (carouselRef.current) {
      const card = carouselRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  // Handle day change with map zoom/pan
  const handleDayChange = (day: number) => {
    setSelectedDay(day);
    setDayOpen(false);
    setActivePin(0);
    
    // Trigger pin fade animation
    setPinsVisible(false);
    setTimeout(() => setPinsVisible(true), 150);

    // Calculate map transform for selected day
    if (day === 0) {
      // All days - reset to default view
      setMapTransform({ scale: 1, translateX: 0, translateY: 0 });
    } else {
      // Specific day - zoom to bounding box
      const dayPins = MAP_PINS.filter(p => p.day === day);
      if (dayPins.length > 0) {
        const xs = dayPins.map(p => p.x);
        const ys = dayPins.map(p => p.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        
        // Calculate zoom level based on spread
        const spreadX = maxX - minX;
        const spreadY = maxY - minY;
        const maxSpread = Math.max(spreadX, spreadY);
        const scale = maxSpread < 30 ? 1.4 : maxSpread < 50 ? 1.2 : 1;
        
        // Calculate translation to center the group
        const translateX = (50 - centerX) * 0.8;
        const translateY = (50 - centerY) * 0.6;
        
        setMapTransform({ scale, translateX, translateY });
      }
    }
    
    // Scroll carousel to first card
    setTimeout(() => {
      if (carouselRef.current && carouselRef.current.children[0]) {
        (carouselRef.current.children[0] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }, 100);
  };

  // Carousel scroll snap detection
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const containerRect = carousel.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        Array.from(carousel.children).forEach((child, index) => {
          const cardRect = child.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(cardCenter - containerCenter);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });
        
        if (closestIndex !== activePin) {
          setActivePin(closestIndex);
        }
      }, 100);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activePin, filteredPins]);

  // Handle toggling a saved place to/from schedule
  const handleAddPlace = (placeId: string) => {
    setAddedPlaces(prev => {
      const newSet = new Set(prev);
      if (newSet.has(placeId)) {
        newSet.delete(placeId);
      } else {
        newSet.add(placeId);
      }
      return newSet;
    });
  };

  // Handle adding all places from a folder
  const handleAddAllFromFolder = (folderId: string) => {
    const folder = allCollections.find(c => c.id === folderId && c.type === "folder");
    if (folder?.places) {
      setAddedPlaces(prev => {
        const newSet = new Set(prev);
        folder.places!.forEach(place => newSet.add(place.id));
        return newSet;
      });
    }
  };

  // Toggle folder expansion
  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  // Handle creating a new collection
  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection: SavedCollection = {
        id: `user-folder-${Date.now()}`,
        name: newCollectionName.trim(),
        type: "folder",
        emoji: newCollectionEmoji,
        places: []
      };
      setUserCollections(prev => [...prev, newCollection]);
      setNewCollectionName("");
      setNewCollectionEmoji("📁");
      setShowNewCollectionModal(false);
      // Auto-expand the new folder
      setExpandedFolders(prev => new Set([...prev, newCollection.id]));
    }
  };

  // Handle editing a folder
  const handleEditFolder = (folder: SavedCollection) => {
    setEditingFolder(folder);
    setEditFolderName(folder.name);
    setEditFolderEmoji(folder.emoji || "📁");
  };

  // Handle saving folder edits
  const handleSaveEditFolder = () => {
    if (editingFolder && editFolderName.trim()) {
      // Update user collections
      setUserCollections(prev => 
        prev.map(c => 
          c.id === editingFolder.id 
            ? { ...c, name: editFolderName.trim(), emoji: editFolderEmoji }
            : c
        )
      );
      setEditingFolder(null);
      setEditFolderName("");
      setEditFolderEmoji("");
    }
  };

  // Handle searching for places to add to folder
  const handleSearchPlaces = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Mock search results - in production, this would call Google Places API
    const mockResults = [
      {
        id: `search-${Date.now()}-1`,
        name: "The Coffee House",
        description: "Popular coffee chain with specialty drinks",
        address: "123 Main St, Da Lat",
        img: LAKE_IMG,
      },
      {
        id: `search-${Date.now()}-2`,
        name: "Brew & Bean",
        description: "Artisanal coffee roastery and café",
        address: "456 Highland Ave, Da Lat",
        img: FLOWER_IMG,
      },
      {
        id: `search-${Date.now()}-3`,
        name: "Mountain View Café",
        description: "Café with panoramic mountain views",
        address: "789 Peak Rd, Da Lat",
        img: TEMPLE_IMG,
      },
    ];

    // Filter based on query
    const filtered = mockResults.filter(r => 
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
  };

  // Handle adding a place to a specific folder
  const handleAddPlaceToFolder = (place: any) => {
    if (!addingToFolder) return;

    const newPlace: SavedPlace = {
      id: place.id,
      name: place.name,
      img: place.img,
      description: place.description,
      address: place.address,
      rating: "4.5",
    };

    // Update user collections or default collections
    if (addingToFolder.id.startsWith('user-folder-')) {
      setUserCollections(prev =>
        prev.map(c =>
          c.id === addingToFolder.id
            ? { ...c, places: [...(c.places || []), newPlace] }
            : c
        )
      );
    } else {
      // Update default collections
      setDefaultCollections(prev =>
        prev.map(c =>
          c.id === addingToFolder.id
            ? { ...c, places: [...(c.places || []), newPlace] }
            : c
        )
      );
    }

    // Auto-expand the folder to show the newly added place
    setExpandedFolders(prev => new Set([...prev, addingToFolder.id]));

    // Close modal and reset
    setAddingToFolder(null);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Handle adding a searched place to the General Space
  const handleAddSearchedPlaceToGeneral = (place: any) => {
    const newCard: GeneralSpaceCard = {
      id: `gc-${Date.now()}`,
      name: place.name,
      img: place.img,
      addedBy: currentUserId,
      likes: [],
      addedToTimeline: false,
    };
    setGeneralCards(prev => [...prev, newCard]);
    setShowAddPlaceSheet(false);
    setSearchQuery("");
    setSearchResults([]);
    toast.success(`"${place.name}" added to Saved Places`);
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent, itemId: string) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    currentSwipedItem.current = itemId;
    setSwipedItem(itemId);
    setSwipeX(0); // Reset swipe position
  };

  const handleTouchMove = (e: React.TouchEvent, itemId: string) => {
    if (currentSwipedItem.current !== itemId) return;
    
    const touch = e.touches[0];
    const currentX = touch.clientX;
    const deltaX = currentX - touchStartX.current;
    
    // Only allow left swipe (negative values)
    if (deltaX < 0 && deltaX > -100) {
      setSwipeX(deltaX);
    } else if (deltaX < -100) {
      setSwipeX(-100);
    } else if (deltaX > 0) {
      setSwipeX(0);
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(swipeX) < 50) {
      // Snap back if swipe is too small
      setSwipeX(0);
      setSwipedItem(null);
      currentSwipedItem.current = null;
    } else {
      // Lock in the swipe at -80px to show delete button
      setSwipeX(-80);
    }
  };

  // Delete handlers
  const handleDeleteFolder = (folderId: string) => {
    // Find the folder
    const folder = allCollections.find(c => c.id === folderId && c.isFolder);
    if (!folder) return;
    
    // Show confirmation modal
    setDeleteConfirmFolder(folder);
    setSwipedItem(null);
    setSwipeX(0);
  };

  const confirmDeleteFolder = () => {
    if (!deleteConfirmFolder) return;

    // Remove from user collections or default collections
    if (deleteConfirmFolder.id.startsWith('user-folder-')) {
      setUserCollections(prev => prev.filter(c => c.id !== deleteConfirmFolder.id));
    } else {
      setDefaultCollections(prev => prev.filter(c => c.id !== deleteConfirmFolder.id));
    }

    setDeleteConfirmFolder(null);
    toast.success(`Deleted "${deleteConfirmFolder.name}"`);
  };

  const handleDeleteEvent = (eventId: string) => {
    // For now, just show undo toast (events would be in a separate state in production)
    setSwipedItem(null);
    setSwipeX(0);
    
    toast.success("Event deleted", {
      action: {
        label: "Undo",
        onClick: () => {
          // Restore event logic here
          toast.success("Event restored");
        },
      },
      duration: 5000,
    });
  };

  // Handle cover image change
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle add reservation
  const handleAddReservation = () => {
    if (!newReservationName.trim() || !newReservationType) {
      toast.error("Please fill in required fields");
      return;
    }

    // In a real app, this would save to backend/state
    toast.success("Reservation added successfully");
    
    // Reset form and close modal
    setNewReservationType("");
    setNewReservationName("");
    setNewReservationDate("");
    setNewReservationConfirmation("");
    setNewReservationNotes("");
    setShowAddReservationModal(false);
  };

  // Combine user collections with default collections
  const allCollections = [...userCollections, ...defaultCollections];

  return (
    <div
      className={`session-overview-root relative flex w-full h-full flex-col bg-white ${FONT}`}
    >
      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />

      {/* Header */}
      <div className="shrink-0">
        <div className="flex items-center gap-[12px] px-[16px] pb-[12px] pt-[16px]">
          {/* Back */}
          <button
            aria-label="Back to session overview"
            onClick={() => window.history.back()}
            className="flex size-[44px] shrink-0 items-center justify-center transition-transform duration-200 active:scale-90"
          >
            <ChevronLeft size={24} className="text-[#292827]" strokeWidth={2} />
          </button>
          {/* Title */}
          <div className="min-w-0 flex-1">
            <p className="text-[20px] font-medium leading-[28px] text-[#292827]">
              Tour: Thai Lan
            </p>
            <p className="text-[14px] leading-[24px] text-[#949493]">
              14 Jun - 26 Jun 2026
            </p>
          </div>
          {/* Badge */}
          <div className="shrink-0 rounded-[28px] bg-[#34c759] px-[16px] py-[8px] shadow-sm">
            <p
              className="text-[14px] font-medium leading-[16px] text-white"
              style={{ fontFeatureSettings: "'ss01'" }}
            >
              Active
            </p>
          </div>
          {/* More */}
          <button
            aria-label="More options"
            onClick={() => toast("More options coming soon")}
            className="flex size-[44px] shrink-0 items-center justify-center transition-transform duration-200 active:scale-90"
          >
            <MoreHorizontal size={22} className="text-[#292827]" strokeWidth={2} />
          </button>
        </div>
        {/* Horizontal Tabs */}
        <div className="relative w-full" role="tablist" aria-label="Session sections">
          <div
            className="flex overflow-x-auto p-[0px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {["Overview", "Timeline", "Participants", "Media", "Template", "Budget"].map(
              (tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={tab === "Overview"}
                  onClick={() => {
                    if (tab === "Timeline") navigate("/session-overview/timeline");
                    else if (tab !== "Overview") toast(`${tab} tab coming soon`);
                  }}
                  className={`relative shrink-0 px-[12px] pb-[10px] pt-[8px] text-[14px] leading-[20px] transition-all duration-200 ${
                    tab === "Overview"
                      ? "text-[#292827] font-medium"
                      : "text-[#696968] hover:text-[#545352]"
                  }`}
                  style={{ fontFeatureSettings: "'ss01'" }}
                >
                  {tab}
                  {tab === "Overview" && (
                    <span
                      className="absolute bottom-[-1px] left-[12px] right-[12px] h-[2px] rounded-full bg-[#ff6733]"
                      style={{ boxShadow: "0 0 8px rgba(255, 103, 51, 0.4)" }}
                    />
                  )}
                </button>
              )
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[0.6px] bg-[#eaeae9]" />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CONTENT AREA — Map fills background, Bottom Sheet overlays
          ══════════════════════════════════════════════════════ */}
      <div ref={containerRef} className="relative flex-1 overflow-hidden">
        {/* ═══════════ MAP (fills entire background) ═══════════ */}
        <div className="absolute inset-0 overflow-hidden bg-[#e8e4df]">
          {/* Map background with transform */}
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{
              transform: `scale(${mapTransform.scale}) translate(${mapTransform.translateX}%, ${mapTransform.translateY}%)`,
            }}
          >
            <svg className="size-full" viewBox="0 0 390 350" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="mapGrad" x1="0" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#f0ece6" />
                  <stop offset="50%" stopColor="#eae5dd" />
                  <stop offset="100%" stopColor="#e5e0d9" />
                </linearGradient>
                <linearGradient id="waterGrad" x1="0" y1="0" x2="0.3" y2="1">
                  <stop offset="0%" stopColor="#bbd8ea" />
                  <stop offset="100%" stopColor="#a6cce0" />
                </linearGradient>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c5ddb0" />
                  <stop offset="100%" stopColor="#b3d19a" />
                </linearGradient>
                <filter id="softBlur"><feGaussianBlur stdDeviation="3" /></filter>
                <filter id="tinyBlur"><feGaussianBlur stdDeviation="1.5" /></filter>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d8d3cb" strokeWidth="0.3" />
                </pattern>
              </defs>

              {/* Base terrain */}
              <rect fill="url(#mapGrad)" width="390" height="350" />
              <rect fill="url(#grid)" width="390" height="350" opacity="0.4" />

              {/* Water — lake */}
              <ellipse cx="305" cy="240" rx="60" ry="38" fill="url(#waterGrad)" opacity="0.5" filter="url(#softBlur)" />
              <ellipse cx="305" cy="240" rx="48" ry="28" fill="#b0d4e8" opacity="0.3" />
              {/* Water — river */}
              <path d="M370 0 C355 50, 365 100, 350 150 C338 190, 345 220, 360 280 L390 280 L390 0 Z" fill="url(#waterGrad)" opacity="0.25" />
              <path d="M0 290 C40 275, 75 285, 110 270" fill="none" stroke="#a6cce0" strokeWidth="12" opacity="0.25" strokeLinecap="round" filter="url(#tinyBlur)" />

              {/* Parks & green zones */}
              <ellipse cx="80" cy="120" rx="50" ry="35" fill="url(#greenGrad)" opacity="0.3" filter="url(#tinyBlur)" />
              <ellipse cx="275" cy="60" rx="40" ry="30" fill="url(#greenGrad)" opacity="0.25" filter="url(#tinyBlur)" />
              <ellipse cx="200" cy="280" rx="45" ry="20" fill="url(#greenGrad)" opacity="0.2" filter="url(#tinyBlur)" />
              <ellipse cx="140" cy="200" rx="22" ry="15" fill="#c0d8a8" opacity="0.2" />
              {/* Tree dots */}
              <g fill="#9ec082" opacity="0.35">
                <circle cx="60" cy="110" r="3.5" /><circle cx="75" cy="125" r="3" /><circle cx="90" cy="112" r="2.5" />
                <circle cx="265" cy="55" r="3" /><circle cx="280" cy="68" r="2.5" /><circle cx="290" cy="52" r="2" />
                <circle cx="195" cy="275" r="2.5" /><circle cx="210" cy="282" r="2" />
              </g>

              {/* Main roads — white border + warm fill */}
              <path d="M0 155 Q95 140, 195 170 Q280 200, 390 120" stroke="#fff" strokeWidth="11" fill="none" opacity="0.5" strokeLinecap="round" />
              <path d="M0 155 Q95 140, 195 170 Q280 200, 390 120" stroke="#ddd7ce" strokeWidth="9" fill="none" opacity="0.55" strokeLinecap="round" />
              <path d="M65 0 Q90 85, 135 180 Q165 265, 210 350" stroke="#fff" strokeWidth="8" fill="none" opacity="0.45" strokeLinecap="round" />
              <path d="M65 0 Q90 85, 135 180 Q165 265, 210 350" stroke="#ddd7ce" strokeWidth="6" fill="none" opacity="0.5" strokeLinecap="round" />

              {/* Secondary roads */}
              <path d="M280 0 Q270 60, 300 130 Q330 210, 320 350" stroke="#ddd7ce" strokeWidth="4" fill="none" opacity="0.35" strokeLinecap="round" />
              <path d="M0 260 Q90 245, 190 270 Q290 295, 390 255" stroke="#ddd7ce" strokeWidth="3.5" fill="none" opacity="0.3" strokeLinecap="round" />
              <path d="M155 0 Q170 55, 200 100 Q235 165, 250 220" stroke="#e0dbd3" strokeWidth="3" fill="none" opacity="0.3" strokeLinecap="round" />
              <path d="M0 80 Q50 75, 100 95 Q150 115, 200 100" stroke="#e0dbd3" strokeWidth="2.5" fill="none" opacity="0.25" strokeLinecap="round" />

              {/* Road center dashes */}
              <path d="M0 155 Q95 140, 195 170 Q280 200, 390 120" stroke="#fff" strokeWidth="0.8" strokeDasharray="5 6" fill="none" opacity="0.4" />
              <path d="M65 0 Q90 85, 135 180 Q165 265, 210 350" stroke="#fff" strokeWidth="0.7" strokeDasharray="4 6" fill="none" opacity="0.35" />

              {/* Building clusters */}
              <g opacity="0.18" fill="#c9c2b8">
                <rect x="78" y="95" width="14" height="9" rx="1.5" /><rect x="95" y="92" width="10" height="13" rx="1.5" />
                <rect x="80" y="108" width="9" height="11" rx="1.5" /><rect x="94" y="109" width="15" height="8" rx="1.5" />
                <rect x="195" y="155" width="15" height="10" rx="1.5" /><rect x="213" y="153" width="11" height="14" rx="1.5" />
                <rect x="200" y="170" width="12" height="9" rx="1.5" /><rect x="216" y="172" width="9" height="11" rx="1.5" />
                <rect x="290" y="78" width="12" height="15" rx="1.5" /><rect x="305" y="82" width="15" height="9" rx="1.5" />
                <rect x="295" y="98" width="10" height="11" rx="1.5" /><rect x="310" y="96" width="13" height="8" rx="1.5" />
              </g>
              <g opacity="0.1" fill="#bab3a8">
                <rect x="160" y="50" width="9" height="7" rx="1" /><rect x="173" y="48" width="7" height="11" rx="1" />
                <rect x="240" y="128" width="11" height="8" rx="1" /><rect x="130" y="230" width="10" height="9" rx="1" />
                <rect x="335" y="140" width="8" height="12" rx="1" /><rect x="48" y="200" width="7" height="9" rx="1" />
                <rect x="170" y="130" width="8" height="6" rx="1" /><rect x="115" y="55" width="6" height="9" rx="1" />
              </g>
            </svg>
          </div>

          {/* Route lines connecting pins — uses viewBox matching percentage-to-pixel */}
          <svg
            className="absolute inset-0 size-full transition-opacity duration-300"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            style={{ zIndex: 1, opacity: pinsVisible ? 1 : 0 }}
          >
            <defs>
              <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff551d" />
                <stop offset="50%" stopColor="#ff6733" />
                <stop offset="100%" stopColor="#ff8f66" />
              </linearGradient>
              <filter id="routeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
              </filter>
            </defs>
            {filteredPins.length > 1 && (() => {
              // Build path through pin centers (percentage coords)
              const pathD = filteredPins.map((pin, i) => {
                if (i === 0) return `M${pin.x},${pin.y}`;
                const prev = filteredPins[i - 1];
                const cx = (prev.x + pin.x) / 2;
                const cy = (prev.y + pin.y) / 2 + (i % 2 === 0 ? 6 : -6);
                return `Q${cx},${cy} ${pin.x},${pin.y}`;
              }).join(' ');
              return (
                <>
                  {/* Glow */}
                  <path d={pathD} stroke="#ff6733" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" filter="url(#routeGlow)" />
                  {/* White border */}
                  <path d={pathD} stroke="#fff" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
                  {/* Dashed route */}
                  <path d={pathD} stroke="url(#routeGrad)" strokeWidth="0.55" strokeDasharray="2 1.2" strokeLinecap="round" />
                </>
              );
            })()}
            {/* Waypoint dots at each pin */}
            {filteredPins.map((pin) => (
              <g key={pin.id}>
                <circle cx={pin.x} cy={pin.y} r="1.2" fill="white" stroke="#ff6733" strokeWidth="0.4" />
                <circle cx={pin.x} cy={pin.y} r="0.45" fill="#ff6733" />
              </g>
            ))}
          </svg>

          {/* Map Pins */}
          <div
            className="transition-opacity duration-300"
            style={{ opacity: pinsVisible ? 1 : 0 }}
          >
          {filteredPins.map((pin, i) => (
            <button
              key={pin.id}
              aria-label={`${pin.name}, ${pin.time}`}
              onClick={() => scrollToCard(i)}
              className="absolute flex flex-col items-center transition-all duration-300 active:scale-110"
              style={{
                left: `${pin.x}%`,
                top: `${pin.y}%`,
                transform:
                  activePin === i
                    ? "translate(-50%, -100%) scale(1.15)"
                    : "translate(-50%, -100%) scale(1)",
                zIndex: activePin === i ? 10 : 2,
                filter: activePin === i 
                  ? "drop-shadow(0 6px 16px rgba(255,103,51,0.4)) drop-shadow(0 2px 8px rgba(255,103,51,0.3))" 
                  : "drop-shadow(0 3px 8px rgba(0,0,0,0.2)) drop-shadow(0 1px 3px rgba(0,0,0,0.15))",
              }}
            >
              {/* Pulse ring for active pin */}
              {activePin === i && (
                <div
                  className="absolute left-1/2 top-1/2 size-[56px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(255,103,51,0.3) 0%, rgba(255,103,51,0.1) 50%, transparent 70%)",
                    animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                  }}
                />
              )}
              <div
                className={`flex size-[36px] items-center justify-center rounded-full transition-all duration-300 ${
                  activePin === i
                    ? "bg-[#ff6733] text-white ring-[3px] ring-white"
                    : "bg-white text-[#545352] ring-[1.5px] ring-black/10"
                }`}
                style={{
                  boxShadow: activePin === i 
                    ? "0 4px 12px rgba(255,103,51,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)" 
                    : "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                <span className="text-[14px] font-semibold" style={{ fontFeatureSettings: "'ss01'" }}>
                  {pin.id}
                </span>
              </div>
              <svg width="14" height="8" viewBox="0 0 14 8" className="-mt-[1px]">
                <path
                  d="M7 8 L0 0 L14 0 Z"
                  fill={activePin === i ? "#ff6733" : "white"}
                  className="transition-colors duration-300"
                  style={{
                    filter: activePin === i ? "none" : "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                  }}
                />
              </svg>
            </button>
          ))}
          </div>

          {/* Day Selector Dropdown */}
          <div className="absolute left-[16px] top-[12px]" style={{ zIndex: 20 }}>
            <button
              aria-label="Select day filter"
              aria-expanded={dayOpen}
              aria-haspopup="listbox"
              onClick={() => setDayOpen(!dayOpen)}
              className="flex items-center gap-[6px] rounded-[28px] border border-white/60 px-[16px] py-[8px] backdrop-blur-md transition-all duration-200 active:scale-95"
              style={{ 
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="size-[6px] rounded-full bg-[#ff6733]" style={{ boxShadow: "0 0 6px rgba(255,103,51,0.5)" }} />
              <p
                className="text-[14px] font-medium leading-[20px] text-[#3e3e3d]"
                style={{ fontFeatureSettings: "'ss01'" }}
              >
                {selectedDay === 0 ? "All Days" : `Day ${selectedDay}`}
              </p>
              <ChevronDown
                size={16}
                className={`text-[#545352] transition-transform duration-300 ${dayOpen ? "rotate-180" : ""}`}
                strokeWidth={2}
              />
            </button>
            {dayOpen && (
              <div className="absolute left-0 top-[48px] min-w-[140px] overflow-hidden rounded-[16px] border border-white/60 py-[6px] backdrop-blur-md"
                style={{ 
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                <button
                  onClick={() => handleDayChange(0)}
                  className={`block w-full px-[16px] py-[10px] text-left text-[14px] font-medium leading-[20px] transition-all duration-200 ${
                    selectedDay === 0
                      ? "bg-[#ffeee8] text-[#ff6733]"
                      : "text-[#545352] hover:bg-[#f5f5f5] active:bg-[#eaeae9]"
                  }`}
                >
                  All Days
                </button>
                {[1, 2].map((d) => (
                  <button
                    key={d}
                    onClick={() => handleDayChange(d)}
                    className={`block w-full px-[16px] py-[10px] text-left text-[14px] font-medium leading-[20px] transition-all duration-200 ${
                      selectedDay === d
                        ? "bg-[#ffeee8] text-[#ff6733]"
                        : "text-[#545352] hover:bg-[#f5f5f5] active:bg-[#eaeae9]"
                    }`}
                  >
                    Day {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Map vignette edge */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: "inset 0 0 60px rgba(0,0,0,0.08), inset 0 -20px 40px rgba(0,0,0,0.03)",
              zIndex: 11,
            }}
          />
        </div>
        {/* end of MAP div */}

        {/* ═══════════ CAROUSEL (sticky above sheet) ═══════════ */}
        <div
          className="absolute left-0 right-0 flex gap-[10px] overflow-x-auto px-[16px] pb-[2px]"
          ref={carouselRef}
          style={{
            top: sheetReady
              ? `${Math.max(0, sheetTop - 134)}px`
              : "calc(40% - 134px)",
            opacity: Math.min(1, Math.max(0, (sheetTop - 134) / 60)),
            transition: isSheetAnimating
              ? "top 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.35s cubic-bezier(0.32, 0.72, 0, 1)"
              : "none",
            zIndex: 26,
            scrollSnapType: "x mandatory",
            pointerEvents: sheetTop - 134 > 10 ? "auto" : "none",
          }}
        >
          {filteredPins.map((pin, i) => {
            const isStart = i === 0;
            const isEnd = i === filteredPins.length - 1;
            const orderLabel = isStart ? "Start" : isEnd ? "End" : `Stop ${i}`;
            
            return (
            <button
              key={pin.id}
              onClick={() => scrollToCard(i)}
              aria-label={`${pin.name}, ${orderLabel}`}
              className={`flex w-[220px] shrink-0 flex-col rounded-[16px] transition-all duration-300 ${
                activePin === i
                  ? "bg-[#ffeee8] ring-2 ring-[#ff6733]/60"
                  : "bg-white hover:bg-[#fafafa]"
              } mx-[0px] my-[1px] p-[12px]`}
              style={{ 
                scrollSnapAlign: "center",
                boxShadow: activePin === i 
                  ? "0 8px 24px rgba(255,103,51,0.2), 0 4px 12px rgba(255,103,51,0.12)" 
                  : "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex w-full items-center gap-[10px]">
                <div className="relative">
                  <img
                    src={pin.img}
                    alt={pin.name}
                    className="size-[44px] shrink-0 rounded-[10px] object-cover"
                    style={{
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  {/* Order Badge */}
                  <div className={`absolute -right-[4px] -top-[4px] rounded-full px-[7px] py-[3px] text-[11px] font-bold leading-[1.1] shadow-md ${
                    isStart ? "bg-[#34c759] text-white" : 
                    isEnd ? "bg-[#ff6733] text-white" : 
                    "bg-[#545352] text-white"
                  }`}>
                    {orderLabel}
                  </div>
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p
                    className={`text-[12px] font-medium leading-[16px] ${
                      activePin === i ? "text-[#ff6733]" : "text-[#949493]"
                    }`}
                    style={{ fontFeatureSettings: "'ss01'" }}
                  >
                    {orderLabel}
                  </p>
                  <p className="truncate text-[14px] font-medium leading-[20px] text-[#292827]">
                    {pin.name}
                  </p>
                </div>
              </div>
              {activePin === i && (
                <div className="mt-[10px] flex w-full flex-col gap-[8px] border-t border-[#ff6733]/20 pt-[10px]">
                  <div className="flex items-center gap-[6px]">
                    <MapPin size={13} className="shrink-0 text-[#ff6733]" />
                    <p className="truncate text-[12px] leading-[16px] text-[#696968]">
                      {pin.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <div className="flex items-center gap-[5px]">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff6733"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <p className="text-[12px] font-medium leading-[16px] text-[#696968]">
                        {pin.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#949493"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                      <p className="text-[12px] font-medium leading-[16px] text-[#696968]">
                        {pin.duration}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </button>
            );
          })}
        </div>

        {/* ═══════════ BOTTOM SHEET ═══════════ */}
        <div
          className="absolute bottom-0 left-0 right-0 flex flex-col rounded-t-[20px] bg-white"
          style={{
            top: sheetReady ? `${sheetTop}px` : "40%",
            transition: isSheetAnimating
              ? "top 0.35s cubic-bezier(0.32, 0.72, 0, 1)"
              : "none",
            boxShadow: "0 -6px 32px rgba(0,0,0,0.12), 0 -2px 12px rgba(0,0,0,0.08)",
            zIndex: 25,
          }}
          onTransitionEnd={onSheetTransitionEnd}
        >
          {/* ── Drag Handle ─ */}
          <div
            className="shrink-0 cursor-grab touch-none select-none active:cursor-grabbing"
            onPointerDown={onHandlePointerDown}
          >
            {/* Pill */}
            <div className="flex justify-center pb-[6px] pt-[12px]">
              <div className="h-[5px] w-[48px] rounded-full bg-[#adadad] transition-all duration-200 active:w-[56px] active:bg-[#999]" />
            </div>
            {/* Section header */}
            <div className="flex items-center justify-between px-[16px] pb-[12px] pt-[8px]">
              <p className="text-[18px] font-medium leading-[24px] text-[#292827]">
                Trip Overview
              </p>
              <button
                onPointerDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onPointerUp={(e) => {
                  e.stopPropagation();
                  setIsEditMode(!isEditMode);
                }}
                className={`relative z-10 flex size-[40px] touch-auto items-center justify-center rounded-[8px] transition-all duration-200 active:scale-95 ${
                  isEditMode ? "bg-[#ffeee8] ring-2 ring-[#ff6733]/30" : "bg-[#f5f5f5] hover:bg-[#eaeae9]"
                }`}
                style={{
                  boxShadow: isEditMode ? "0 2px 8px rgba(255,103,51,0.15)" : "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                {isEditMode ? (
                  <Pencil size={16} className="text-[#ff6733]" strokeWidth={2} />
                ) : (
                  <Eye size={16} className="text-[#545352]" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>

          {/* ── Scrollable Sheet Content ── */}
          <div 
            className="flex-1 overflow-x-hidden overflow-y-auto"
            onClick={() => {
              // Close any open swiped items when clicking on the sheet
              if (swipedItem) {
                setSwipedItem(null);
                setSwipeX(0);
              }
            }}
          >
            {/* Trip Overview body */}
            <div className="px-[16px]">
              {/* Cover Image - Above Title */}
              <div className="relative -mx-[16px] mb-[20px] aspect-video w-[calc(100%+32px)] overflow-hidden rounded-[16px]" style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }}>
                <img
                  src={coverImage}
                  alt="Trip cover"
                  className="size-full object-cover"
                />
                {isEditMode && (
                  <>
                    <button
                      onClick={() => coverImageInputRef.current?.click()}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 hover:opacity-100 active:opacity-100"
                    >
                      <div className="flex flex-col items-center gap-[8px]">
                        <div className="flex size-[52px] items-center justify-center rounded-full bg-white/95 shadow-lg">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ff6733"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                        <p className="text-[13px] font-semibold text-white drop-shadow-lg">
                          Change Cover
                        </p>
                      </div>
                    </button>
                    <input
                      ref={coverImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              {/* Title */}
              {isEditMode ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mb-[10px] w-full rounded-[12px] border-2 border-[#eaeae9] bg-[#f5f5f5] px-[16px] py-[12px] text-[20px] font-medium leading-[28px] text-[#292827] outline-none transition-all duration-200 focus:border-[#ff6733] focus:bg-white focus:shadow-md focus:ring-2 focus:ring-[#ff6733]/20"
                />
              ) : (
                <h1 className="pb-[10px] text-[20px] font-medium leading-[28px] text-[#292827]">
                  {editTitle}
                </h1>
              )}

              {/* Date */}
              {isEditMode ? (
                <div className="mb-[12px] flex items-center gap-[8px]">
                  <Calendar size={19} className="shrink-0 text-[#949493]" />
                  <input
                    type="date"
                    value={editDateStart}
                    onChange={(e) => setEditDateStart(e.target.value)}
                    className="flex-1 rounded-[10px] border-2 border-[#eaeae9] bg-[#f5f5f5] px-[12px] py-[9px] text-[14px] text-[#545352] outline-none transition-all duration-200 focus:border-[#ff6733] focus:bg-white focus:ring-2 focus:ring-[#ff6733]/20"
                  />
                  <span className="text-[14px] font-medium text-[#949493]">to</span>
                  <input
                    type="date"
                    value={editDateEnd}
                    onChange={(e) => setEditDateEnd(e.target.value)}
                    className="flex-1 rounded-[10px] border-2 border-[#eaeae9] bg-[#f5f5f5] px-[12px] py-[9px] text-[14px] text-[#545352] outline-none transition-all duration-200 focus:border-[#ff6733] focus:bg-white focus:ring-2 focus:ring-[#ff6733]/20"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-[8px] pb-[12px]">
                  <Calendar size={16} className="text-[#949493]" />
                  <p className="text-[14px] font-normal leading-[20px] text-[#545352]">
                    Aug 12 - Aug 15
                  </p>
                </div>
              )}

              {/* Status Badge */}
              <div className="flex items-center gap-[8px] pb-[14px]">
                
              </div>

              {/* Description */}
              <div className="pb-[20px]">
                {isEditMode ? (
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={4}
                    className="w-full resize-none rounded-[8px] border-2 border-[#eaeae9] bg-[#f5f5f5] px-[16px] py-[12px] text-[16px] font-normal leading-[24px] text-[#3e3e3d] outline-none transition-all duration-200 focus:border-[#ff6733] focus:bg-white focus:shadow-md focus:ring-2 focus:ring-[#ff6733]/20"
                  />
                ) : (
                  <>
                    <p
                      className={`text-[16px] font-normal leading-[24px] text-[#545352] ${
                        !showFullDesc ? "line-clamp-3" : ""
                      }`}
                    >
                      {editDescription}
                    </p>
                    <button
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      className="mt-[8px] text-[14px] font-medium leading-[20px] text-[#ff6733] transition-colors duration-200 hover:text-[#ff551d]"
                    >
                      {showFullDesc ? "Show less" : "Read more"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* ═══════════ RESERVATIONS GRID ═══════════ */}
            <div className="px-[16px] pb-[32px]">
              <div className="flex items-center justify-between pb-[16px]">
                <p className="text-[18px] font-medium leading-[24px] text-[#292827]">
                  Reservations
                </p>
                {isEditMode && (
                  <button
                    onClick={() => setShowAddReservationModal(true)}
                    className="flex items-center gap-[6px] rounded-[28px] bg-[#ff6733] px-[16px] py-[8px] transition-all duration-200 active:scale-95"
                    style={{ boxShadow: "0 2px 8px rgba(255,103,51,0.25)" }}
                  >
                    <Plus size={16} className="text-white" strokeWidth={2.5} />
                    <span className="text-[14px] font-medium text-white">Add</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-[14px]">{RESERVATION_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isOpen = expandedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() =>
                        setExpandedCategory(isOpen ? null : cat.key)
                      }
                      className="flex flex-col items-center gap-[10px] transition-transform duration-200 active:scale-95"
                    >
                      <div className="relative">
                        <div
                          className={`flex size-[64px] items-center justify-center rounded-[10px] transition-all duration-300 ${
                            isOpen
                              ? "bg-[#ffeee8] ring-2 ring-[#ff6733]/40"
                              : "bg-[#f5f5f5] hover:bg-[#eaeae9]"
                          }`}
                          style={{
                            boxShadow: isOpen 
                              ? "0 4px 12px rgba(255,103,51,0.15)" 
                              : "0 2px 6px rgba(0,0,0,0.04)",
                          }}
                        >
                          <Icon
                            size={24}
                            className={
                              isOpen ? "text-[#ff6733]" : "text-[#545352]"
                            }
                            strokeWidth={2}
                          />
                        </div>
                        {cat.badge && (
                          <div className="absolute -right-[4px] -top-[4px] flex size-[20px] items-center justify-center rounded-full bg-[#ff3b30]" style={{ boxShadow: "0 2px 6px rgba(255, 59, 48, 0.35)" }}>
                            <span className="text-[11px] font-bold leading-[1] text-white">
                              {cat.badge}
                            </span>
                          </div>
                        )}
                      </div>
                      <p
                        className={`text-[12px] font-medium leading-[16px] ${
                          isOpen ? "text-[#3e3e3d]" : "text-[#949493]"
                        }`}
                      >
                        {cat.label}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* ── Accordion File List ── */}
              {RESERVATION_CATEGORIES.map((cat) => {
                const isOpen = expandedCategory === cat.key;
                return (
                  <div
                    key={cat.key}
                    className="overflow-hidden transition-all duration-400 ease-out"
                    style={{
                      maxHeight: isOpen
                        ? `${cat.files.length * 64 + (isEditMode ? 56 : 0) + 24}px`
                        : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="mt-[16px] rounded-[12px] border border-[#eaeae9] bg-white" style={{ boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)" }}>
                      {cat.files.map((file, fi) => {
                        const FileIcon =
                          file.type === "pdf"
                            ? FileText
                            : file.type === "image"
                              ? ImageIcon
                              : FileText;
                        return (
                          <div key={file.id}>
                            <button
                              onClick={() => setPreviewFile(file)}
                              className="flex w-full items-center gap-[12px] px-[14px] py-[12px] text-left transition-all duration-200 hover:bg-[#f0efee] active:bg-[#e8e7e6]"
                            >
                              <div
                                className={`flex size-[40px] shrink-0 items-center justify-center rounded-[10px] ${
                                  file.type === "pdf"
                                    ? "bg-[#fee2e2]"
                                    : file.type === "image"
                                      ? "bg-[#dbeafe]"
                                      : "bg-[#f3f4f6]"
                                }`}
                                style={{
                                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
                                }}
                              >
                                <FileIcon
                                  size={19}
                                  className={
                                    file.type === "pdf"
                                      ? "text-[#ef4444]"
                                      : file.type === "image"
                                        ? "text-[#3b82f6]"
                                        : "text-[#545352]"
                                  }
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-medium leading-[19px] text-[#292827]">
                                  {file.name}
                                </p>
                                <div className="flex items-center gap-[6px]">
                                  <span className="text-[11px] leading-[16px] text-[#949493]">
                                    {file.size}
                                  </span>
                                  <span className="text-[11px] text-[#d4d4d4]">
                                    ·
                                  </span>
                                  <span className="text-[11px] leading-[16px] text-[#949493]">
                                    {file.date}
                                  </span>
                                </div>
                              </div>
                              {/* Sync status */}
                              <div className="flex shrink-0 items-center gap-[8px]">
                                {file.synced ? (
                                  <div className="flex items-center gap-[4px] rounded-full bg-[#dcfce7] px-[8px] py-[3px]">
                                    <Check size={11} className="text-[#22c55e]" />
                                    <span className="text-[11px] font-semibold text-[#22c55e]">Synced</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-[4px] rounded-full bg-[#fef3c7] px-[8px] py-[3px]">
                                    <WifiOff size={11} className="text-[#f59e0b]" />
                                    <span className="text-[11px] font-semibold text-[#f59e0b]">Offline</span>
                                  </div>
                                )}
                                <ChevronRight size={15} className="text-[#d4d4d4]" />
                              </div>
                            </button>
                            {fi < cat.files.length - 1 && (
                              <div className="mx-[14px] h-[0.5px] bg-[#eaeae9]" />
                            )}
                          </div>
                        );
                      })}
                      {/* Upload button — edit mode only */}
                      {isEditMode && (
                        <>
                          <div className="mx-[14px] h-[0.5px] bg-[#eaeae9]" />
                          <button className="flex w-full items-center gap-[12px] px-[14px] py-[12px] text-left transition-all duration-200 hover:bg-[#f0efee] active:bg-[#e8e7e6]">
                            <div className="flex size-[40px] shrink-0 items-center justify-center rounded-[10px] bg-[#ffeee8]" style={{ boxShadow: "0 2px 6px rgba(255,103,51,0.1)" }}>
                              <Upload size={19} className="text-[#ff6733]" />
                            </div>
                            <p className="text-[13px] font-semibold leading-[19px] text-[#ff6733]">
                              Attach photos, videos, and files
                            </p>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="mx-[16px] h-[1px] bg-gradient-to-r from-transparent via-[#eaeae9] to-transparent" />

            {/* ═══════════ SAVED PLACES ═══════════ */}
            <div className="px-[16px] pb-[28px] pt-[24px]">
              {/* Header */}
              <div className="flex items-center justify-between pb-[16px]">
                <div className="flex items-center gap-[10px]">
                  <div className="flex size-[32px] items-center justify-center rounded-[10px] bg-gradient-to-br from-[#ff6733] to-[#ff8f66]" style={{ boxShadow: "0 2px 8px rgba(255,103,51,0.25)" }}>
                    <Heart size={16} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[17px] font-semibold leading-[22px] tracking-[-0.2px] text-[#292827]">Saved Places</p>
                    <p className="mt-[1px] text-[12px] font-normal leading-[16px] text-[#949493]">
                      {generalCards.length} place{generalCards.length !== 1 ? "s" : ""} saved
                    </p>
                  </div>
                </div>
                {/* Sort filter - only in General space */}
                {savedPlacesSpace === "general" && (
                  <button
                    aria-label={sortByLikes ? "Sort by most liked" : "Sort places"}
                    onClick={() => setSortByLikes(prev => !prev)}
                    className={`flex items-center gap-[5px] rounded-full border px-[12px] py-[6px] transition-all duration-200 active:scale-95 ${
                      sortByLikes
                        ? "border-[#ff6733]/30 bg-[#fff4ef] text-[#ff6733]"
                        : "border-[#eaeae9] bg-white text-[#545352]"
                    }`}
                    style={{ boxShadow: sortByLikes ? "0 2px 8px rgba(255,103,51,0.12)" : "0 1px 3px rgba(0,0,0,0.04)" }}
                  >
                    <ArrowUpDown size={12} strokeWidth={2.5} />
                    <p className="text-[12px] font-medium leading-[16px]">
                      {sortByLikes ? "Most Liked" : "Sort"}
                    </p>
                  </button>
                )}
              </div>

              {/* Space Toggle Tabs */}
              <div className="mb-[12px] flex rounded-[10px] bg-[#f5f5f5] p-[3px]" role="tablist" aria-label="Saved places space">
                {(["general", "personal"] as const).map((space) => {
                  const isActive = savedPlacesSpace === space;
                  return (
                    <button
                      key={space}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSavedPlacesSpace(space)}
                      className={`flex-1 rounded-[8px] py-[7px] text-center text-[13px] font-semibold transition-all duration-200 ${
                        isActive ? "bg-white text-[#292827]" : "text-[#949493]"
                      }`}
                      style={isActive ? { boxShadow: "0 1px 3px rgba(0,0,0,0.08)" } : undefined}
                    >
                      {space === "general" ? "General" : "Personal"}
                    </button>
                  );
                })}
              </div>

              {/* ─── GENERAL SPACE ─── */}
              {savedPlacesSpace === "general" && (
                <div className="flex flex-col gap-[10px]">
                  {/* Pending Recommendations (Owner only) */}
                  {currentUserRole === "owner" && pendingRecommendations.length > 0 && (
                    null
                  )}

                  {/* Add New Card (Owner only) */}
                  {currentUserRole === "owner" && (
                    <button
                      onClick={() => setShowAddPlaceSheet(true)}
                      className="group flex w-full items-center justify-center gap-[8px] rounded-[14px] border-[1.5px] border-dashed border-[#d4d4d4] bg-[#fafafa] px-[14px] py-[16px] transition-all duration-200 hover:border-[#ff6733] hover:bg-[#fff7f4] active:scale-[0.98]"
                    >
                      <div className="flex size-[28px] items-center justify-center rounded-full bg-[#eaeae9] transition-colors duration-200 group-hover:bg-[#ff6733]/15">
                        <Plus size={15} className="text-[#949493] transition-colors duration-200 group-hover:text-[#ff6733]" strokeWidth={2.5} />
                      </div>
                      <p className="text-[13px] font-medium text-[#949493] transition-colors duration-200 group-hover:text-[#ff6733]">Add a new place</p>
                    </button>
                  )}

                  {/* General Space Cards */}
                  {[...generalCards]
                    .sort((a, b) => sortByLikes ? b.likes.length - a.likes.length : 0)
                    .map((card) => {
                      const isLiked = card.likes.includes(currentUserId);
                      const likedMembers = TRIP_MEMBERS.filter(m => card.likes.includes(m.id));
                      return (
                        <div
                          key={card.id}
                          className="relative overflow-hidden rounded-[14px] bg-white transition-all duration-200 hover:shadow-md"
                          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)" }}
                          onClick={() => {
                            if ('ontouchstart' in window) return;
                            setSelectedGeneralCard(card);
                          }}
                          onDoubleClick={() => {
                            if ('ontouchstart' in window) return;
                            if (!isLiked) {
                              setGeneralCards(prev => prev.map(c => c.id === card.id ? { ...c, likes: [...c.likes, currentUserId] } : c));
                            }
                            setDoubleTapHeart(card.id);
                            setTimeout(() => setDoubleTapHeart(null), 800);
                          }}
                          onTouchEnd={(e) => {
                            const now = Date.now();
                            if (lastTapRef.current && lastTapRef.current.id === card.id && now - lastTapRef.current.time < 300) {
                              if (singleTapTimerRef.current) { clearTimeout(singleTapTimerRef.current); singleTapTimerRef.current = null; }
                              if (!isLiked) {
                                setGeneralCards(prev => prev.map(c => c.id === card.id ? { ...c, likes: [...c.likes, currentUserId] } : c));
                              }
                              setDoubleTapHeart(card.id);
                              setTimeout(() => setDoubleTapHeart(null), 800);
                              lastTapRef.current = null;
                            } else {
                              lastTapRef.current = { id: card.id, time: now };
                              singleTapTimerRef.current = setTimeout(() => {
                                singleTapTimerRef.current = null;
                                setSelectedGeneralCard(card);
                              }, 320);
                            }
                          }}
                        >
                          {/* Double-tap heart animation */}
                          {doubleTapHeart === card.id && (
                            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                              <Heart
                                size={56}
                                className="animate-ping text-[#ff3b30]"
                                fill="#ff3b30"
                                strokeWidth={0}
                                style={{ animationDuration: "0.6s", animationIterationCount: 1 }}
                              />
                            </div>
                          )}

                          {/* Card Image */}
                          <div className="relative h-[120px] w-full overflow-hidden">
                            <img src={card.img} alt={card.name} className="size-full object-cover transition-transform duration-300 hover:scale-105" />
                            {/* Bottom gradient overlay */}
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48px] bg-gradient-to-t from-black/30 to-transparent" />
                            {/* Owner delete button */}
                            {currentUserRole === "owner" && (
                              <button
                                aria-label={`Remove ${card.name}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setGeneralCards(prev => prev.filter(c => c.id !== card.id));
                                  toast("Place removed from General Space", { icon: "🗑️" });
                                }}
                                className="absolute left-[6px] top-[6px] flex size-[36px] items-center justify-center rounded-full bg-black/30 backdrop-blur-md transition-all hover:bg-black/50 active:scale-95"
                              >
                                <Trash2 size={14} className="text-white/90" strokeWidth={2.5} />
                              </button>
                            )}
                            {card.addedToTimeline && (
                              <div className="absolute top-[8px] right-[8px] flex items-center gap-[4px] rounded-full bg-[#34c759]/90 px-[8px] py-[4px] backdrop-blur-sm">
                                <Check size={10} className="text-white" strokeWidth={3} />
                                <p className="text-[11px] font-semibold tracking-[0.2px] text-white">
                                  {card.timelineEntry
                                    ? `${card.timelineEntry.day.split(" — ")[0]} · ${card.timelineEntry.time}`
                                    : "In Timeline"}
                                </p>
                              </div>
                            )}
                            {/* Place name overlay on image */}
                            <p className="absolute bottom-[8px] left-[12px] text-[15px] font-semibold leading-[20px] tracking-[-0.1px] text-white drop-shadow-sm">{card.name}</p>
                          </div>

                          {/* Card Body */}
                          <div className="flex items-center gap-[10px] px-[12px] py-[10px]">
                            <div className="min-w-0 flex-1">
                              {/* Voting row */}
                              <div className="flex items-center gap-[8px]">
                                {/* Heart toggle */}
                                <button
                                  aria-label={isLiked ? `Unlike ${card.name}` : `Like ${card.name}`}
                                  aria-pressed={isLiked}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setGeneralCards(prev => prev.map(c => {
                                      if (c.id !== card.id) return c;
                                      return isLiked
                                        ? { ...c, likes: c.likes.filter(id => id !== currentUserId) }
                                        : { ...c, likes: [...c.likes, currentUserId] };
                                    }));
                                  }}
                                  className="flex size-[36px] items-center justify-center transition-transform duration-200 active:scale-125"
                                >
                                  <Heart
                                    size={17}
                                    className={`transition-colors duration-200 ${isLiked ? "text-[#ff3b30]" : "text-[#b4b4b3] hover:text-[#ff3b30]/60"}`}
                                    fill={isLiked ? "#ff3b30" : "none"}
                                    strokeWidth={2}
                                  />
                                </button>
                                {/* Like count + mini profiles */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowLikesSheet(card);
                                  }}
                                  className="flex items-center gap-[6px]"
                                >
                                  <p className={`text-[13px] font-semibold leading-[18px] tabular-nums ${card.likes.length > 0 ? "text-[#3e3e3d]" : "text-[#b4b4b3]"}`}>
                                    {card.likes.length}
                                  </p>
                                  {/* Mini stack avatars */}
                                  {likedMembers.length > 0 && (
                                    <div className="flex -space-x-[5px]">
                                      {likedMembers.slice(0, 3).map((m) => (
                                        <img
                                          key={m.id}
                                          src={m.avatar}
                                          alt={m.name}
                                          className="size-[18px] rounded-full border-[1.5px] border-white object-cover"
                                        />
                                      ))}
                                      {likedMembers.length > 3 && (
                                        <div className="flex size-[18px] items-center justify-center rounded-full border-[1.5px] border-white bg-[#eaeae9]">
                                          <p className="text-[11px] font-semibold text-[#545352]">+{likedMembers.length - 3}</p>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Add to Timeline button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (card.addedToTimeline) {
                                  setShowRemoveConfirm(card);
                                } else {
                                  setTimelineFormTitle(card.name);
                                  setTimelineFormDesc("");
                                  setTimelineFormDay("");
                                  setTimelineFormTime("");
                                  setShowTimelineModal(card);
                                }
                              }}
                              className={`flex shrink-0 items-center gap-[5px] rounded-[10px] px-[10px] py-[7px] transition-all duration-200 active:scale-95 ${
                                card.addedToTimeline
                                  ? "bg-[#34c759]/10"
                                  : "bg-[#ff6733]"
                              }`}
                              style={{
                                boxShadow: card.addedToTimeline
                                  ? "none"
                                  : "0 2px 8px rgba(255,103,51,0.3)",
                              }}
                            >
                              {card.addedToTimeline ? (
                                <>
                                  <Check size={13} className="text-[#34c759]" strokeWidth={3} />
                                  <p className="text-[11px] font-semibold text-[#34c759]">Added</p>
                                </>
                              ) : (
                                <>
                                  <Plus size={13} className="text-white" strokeWidth={3} />
                                  <p className="text-[11px] font-semibold text-white">Timeline</p>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}

              {/* ─── PERSONAL SPACE ─── */}
              {savedPlacesSpace === "personal" && (
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center gap-[8px] rounded-[10px] bg-[#f5f5f4] px-[12px] py-[10px]">
                    <Lock size={13} className="shrink-0 text-[#949493]" strokeWidth={2.5} />
                    <p className="text-[12px] font-normal leading-[16px] text-[#949493]">
                      {currentUserRole === "owner"
                        ? "Your private space. Only you can see these."
                        : "Save places here and recommend them to the trip owner."}
                    </p>
                  </div>

                  {/* Personal Cards */}
                  {personalCards.map((card) => (
                    <div
                      key={card.id}
                      className="relative overflow-hidden rounded-[14px] bg-white transition-all duration-200"
                      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)" }}
                    >
                      <div className="flex items-center gap-[12px] p-[12px]">
                        <div className="relative size-[52px] shrink-0 overflow-hidden rounded-[10px]" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
                          <img
                            src={card.img}
                            alt={card.name}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] font-semibold leading-[20px] text-[#3e3e3d]">{card.name}</p>
                          {card.recommended ? (
                            <div className="mt-[3px] flex items-center gap-[5px]">
                              <div className={`size-[6px] rounded-full ${
                                card.recommendStatus === "accepted" ? "bg-[#34c759]"
                                  : card.recommendStatus === "rejected" ? "bg-[#ff3b30]"
                                  : "bg-[#ffb830]"
                              }`} />
                              <p className={`text-[12px] font-medium leading-[16px] ${
                                card.recommendStatus === "accepted" ? "text-[#34c759]"
                                  : card.recommendStatus === "rejected" ? "text-[#ff3b30]"
                                  : "text-[#949493]"
                              }`}>
                                {card.recommendStatus === "accepted" ? "Approved"
                                  : card.recommendStatus === "rejected" ? "Rejected"
                                  : "Pending review"}
                              </p>
                            </div>
                          ) : (
                            <p className="mt-[3px] text-[12px] font-normal leading-[16px] text-[#b4b4b3]">Not yet recommended</p>
                          )}
                        </div>
                        {/* Recommend button (for members) or delete (for owner) */}
                        {!card.recommended ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPersonalCards(prev => prev.map(c =>
                                c.id === card.id ? { ...c, recommended: true, recommendStatus: "pending" } : c
                              ));
                              toast.success(`"${card.name}" recommended to trip owner!`);
                            }}
                            className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#ff6733] transition-all duration-200 active:scale-110"
                            style={{ boxShadow: "0 2px 8px rgba(255,103,51,0.3)" }}
                          >
                            <Send size={14} className="text-white" strokeWidth={2.5} />
                          </button>
                        ) : (
                          <div className={`flex size-[36px] shrink-0 items-center justify-center rounded-[10px] ${
                            card.recommendStatus === "accepted" ? "bg-[#34c759]/10"
                              : card.recommendStatus === "rejected" ? "bg-[#ff3b30]/10"
                              : "bg-[#f5f5f4]"
                          }`}>
                            {card.recommendStatus === "accepted" ? <Check size={15} className="text-[#34c759]" strokeWidth={3} />
                              : card.recommendStatus === "rejected" ? <X size={15} className="text-[#ff3b30]" strokeWidth={3} />
                              : <Loader2 size={15} className="animate-spin text-[#b4b4b3]" strokeWidth={2.5} />}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add to Personal Space */}
                  <button
                    onClick={() => setShowAddPlaceSheet(true)}
                    className="group mt-[4px] flex w-full items-center justify-center gap-[8px] rounded-[14px] border-[1.5px] border-dashed border-[#d4d4d4] bg-[#fafafa] px-[14px] py-[16px] transition-all duration-200 hover:border-[#ff6733] hover:bg-[#fff7f4] active:scale-[0.98]"
                  >
                    <div className="flex size-[28px] items-center justify-center rounded-full bg-[#eaeae9] transition-colors duration-200 group-hover:bg-[#ff6733]/15">
                      <Plus size={15} className="text-[#949493] transition-colors duration-200 group-hover:text-[#ff6733]" strokeWidth={2.5} />
                    </div>
                    <p className="text-[13px] font-medium text-[#949493] transition-colors duration-200 group-hover:text-[#ff6733]">Save a place</p>
                  </button>
                </div>
              )}
            </div>

            {/* ─── Likes Bottom Sheet ─── */}
            {showLikesSheet && (
              <div className="absolute inset-0 z-50 flex items-end justify-center">
                <div className="absolute inset-0 bg-black/40" onClick={() => setShowLikesSheet(null)} />
                <div className="relative w-full rounded-t-[16px] bg-white pb-[34px]" style={{ maxHeight: "50vh" }}>
                  <div className="flex items-center justify-between p-[16px] pb-[12px]">
                    <p className="text-[16px] font-medium leading-[24px] text-[#292827]">
                      Likes · {showLikesSheet.likes.length}
                    </p>
                    <button aria-label="Close likes" onClick={() => setShowLikesSheet(null)} className="flex size-[44px] items-center justify-center rounded-full bg-[#f5f5f5]">
                      <X size={16} className="text-[#545352]" strokeWidth={2.5} />
                    </button>
                  </div>
                  <div className="flex flex-col px-[16px]">
                    {TRIP_MEMBERS.filter(m => showLikesSheet.likes.includes(m.id)).map((member) => (
                      <div key={member.id} className="flex items-center gap-[12px] py-[10px] border-b border-[#f5f5f5] last:border-0">
                        <img src={member.avatar} alt={member.name} className="size-[40px] rounded-full object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[14px] font-medium leading-[20px] text-[#3e3e3d]">{member.name}</p>
                          <p className="text-[12px] font-normal leading-[16px] text-[#949493]">{member.role === "owner" ? "Organizer" : "Member"}</p>
                        </div>
                        {member.id !== currentUserId && (
                          <button
                            onClick={() => setMemberFollowing(prev => ({ ...prev, [member.id]: !prev[member.id] }))}
                            className={`rounded-full px-[14px] py-[6px] text-[12px] font-medium transition-all duration-200 active:scale-95 ${
                              memberFollowing[member.id]
                                ? "bg-[#f5f5f5] text-[#545352]"
                                : "bg-[#ff6733] text-white"
                            }`}
                          >
                            {memberFollowing[member.id] ? "Following" : "Follow"}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── Add to Timeline Popup ─── */}
            {showTimelineModal && (() => {
              const TRIP_DAYS = [
                "Day 1 — Aug 12", "Day 2 — Aug 13", "Day 3 — Aug 14",
                "Day 4 — Aug 15", "Day 5 — Aug 16",
              ];
              const TIME_PERIODS: { label: string; times: string[] }[] = [
                { label: "Morning", times: ["7 AM", "8 AM", "9 AM", "10 AM", "11 AM"] },
                { label: "Afternoon", times: ["12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"] },
                { label: "Evening", times: ["6 PM", "7 PM", "8 PM", "9 PM"] },
              ];
              const activePeriod = TIME_PERIODS.find((p) => p.times.includes(timelineFormTime)) || TIME_PERIODS[0];
              const [selectedPeriod, setSelectedPeriodLocal] = [
                activePeriod.label,
                (label: string) => {
                  // If current time isn't in the new period, clear it
                  const newPeriod = TIME_PERIODS.find((p) => p.label === label);
                  if (newPeriod && !newPeriod.times.includes(timelineFormTime)) {
                    setTimelineFormTime("");
                  }
                },
              ];
              const currentPeriod = TIME_PERIODS.find((p) =>
                timelineFormTime ? p.times.includes(timelineFormTime) : p.label === "Morning"
              ) || TIME_PERIODS[0];

              // Occupied slots for selected day
              const occupiedSlots = new Map<string, string>();
              generalCards.forEach((c) => {
                if (c.addedToTimeline && c.timelineEntry && c.id !== showTimelineModal.id && c.timelineEntry.day === timelineFormDay) {
                  occupiedSlots.set(c.timelineEntry.time, c.timelineEntry.title);
                }
              });

              return (
              <div
                className="absolute inset-0 z-50 flex items-center justify-center px-[16px]"
                onClick={() => setShowTimelineModal(null)}
              >
                <div className="absolute inset-0 bg-black/50" />
                <div
                  className="relative z-10 w-full overflow-hidden rounded-[20px] bg-white"
                  style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.04)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header with image */}
                  <div className="flex items-center gap-[10px] border-b border-[#f0f0ef] px-[16px] py-[12px]">
                    <img
                      src={showTimelineModal.img}
                      alt=""
                      className="size-[34px] shrink-0 rounded-[8px] object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-bold leading-[18px] text-[#292827]">Add to Timeline</p>
                      <p className="mt-[1px] truncate text-[11px] text-[#949493]">{showTimelineModal.name}</p>
                    </div>
                    <button
                      onClick={() => setShowTimelineModal(null)}
                      aria-label="Close"
                      className="flex size-[44px] items-center justify-center rounded-full bg-[#f5f5f5] active:scale-95"
                    >
                      <X size={14} className="text-[#545352]" strokeWidth={2.5} />
                    </button>
                  </div>

                  <div className="px-[16px] pb-[16px] pt-[12px]">
                    {/* Title + Notes */}
                    <div className="mb-[12px] flex gap-[6px]">
                      <input
                        type="text"
                        value={timelineFormTitle}
                        onChange={(e) => setTimelineFormTitle(e.target.value)}
                        placeholder="Event title"
                        className="min-w-0 flex-[1.2] rounded-[8px] border-[1.5px] border-[#eaeae9] bg-[#fafafa] px-[10px] py-[7px] text-[12px] text-[#292827] outline-none placeholder:text-[#b4b4b3] focus:border-[#ff6733] focus:bg-white"
                      />
                      <input
                        type="text"
                        value={timelineFormDesc}
                        onChange={(e) => setTimelineFormDesc(e.target.value)}
                        placeholder="Notes"
                        className="min-w-0 flex-1 rounded-[8px] border-[1.5px] border-[#eaeae9] bg-[#fafafa] px-[10px] py-[7px] text-[12px] text-[#292827] outline-none placeholder:text-[#b4b4b3] focus:border-[#ff6733] focus:bg-white"
                      />
                    </div>

                    {/* Day Carousel */}
                    <p className="mb-[5px] text-[11px] font-bold uppercase tracking-[0.5px] text-[#b4b4b3]">Date</p>
                    <div className="scrollbar-hide mb-[12px] flex gap-[5px] overflow-x-auto">
                      {TRIP_DAYS.map((day) => {
                        const isSelected = timelineFormDay === day;
                        return (
                          <button
                            key={day}
                            onClick={() => {
                              setTimelineFormDay(day);
                              if (timelineFormTime) {
                                const conflict = generalCards.some(
                                  (c) => c.addedToTimeline && c.timelineEntry && c.id !== showTimelineModal.id && c.timelineEntry.day === day && c.timelineEntry.time === timelineFormTime
                                );
                                if (conflict) setTimelineFormTime("");
                              }
                            }}
                            className={`flex shrink-0 flex-col items-center rounded-[8px] px-[12px] py-[6px] transition-all active:scale-[0.96] ${
                              isSelected ? "bg-[#ff6733]" : "bg-[#f5f5f5]"
                            }`}
                            style={isSelected ? { boxShadow: "0 2px 6px rgba(255,103,51,0.3)" } : undefined}
                          >
                            <p className={`text-[11px] font-bold leading-[14px] ${isSelected ? "text-white" : "text-[#292827]"}`}>
                              {day.split(" — ")[0]}
                            </p>
                            <p className={`text-[11px] ${isSelected ? "text-white/70" : "text-[#949493]"}`}>
                              {day.split(" — ")[1]}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    {/* Time — Period Tabs + Slots */}
                    <p className="mb-[5px] text-[11px] font-bold uppercase tracking-[0.5px] text-[#b4b4b3]">Time</p>
                    {/* Period selector */}
                    <div className="mb-[6px] flex rounded-[8px] bg-[#f5f5f5] p-[3px]">
                      {TIME_PERIODS.map((period) => {
                        const isActive = currentPeriod.label === period.label;
                        return (
                          <button
                            key={period.label}
                            onClick={() => {
                              // Select first available time in this period
                              if (!period.times.includes(timelineFormTime)) {
                                const firstAvailable = period.times.find((t) => !occupiedSlots.has(t));
                                setTimelineFormTime(firstAvailable || "");
                              }
                            }}
                            className={`flex-1 rounded-[6px] py-[5px] text-[11px] font-semibold transition-all ${
                              isActive ? "bg-white text-[#292827]" : "text-[#949493]"
                            }`}
                            style={isActive ? { boxShadow: "0 1px 3px rgba(0,0,0,0.08)" } : undefined}
                          >
                            {period.label}
                          </button>
                        );
                      })}
                    </div>
                    {/* Time chips for active period */}
                    <div className="mb-[14px] flex flex-wrap gap-[5px]">
                      {currentPeriod.times.map((time) => {
                        const isSelected = timelineFormTime === time;
                        const conflictName = occupiedSlots.get(time);
                        const isOccupied = !!conflictName;
                        return (
                          <button
                            key={time}
                            onClick={() => { if (!isOccupied) setTimelineFormTime(time); }}
                            disabled={isOccupied}
                            className={`relative rounded-[6px] px-[10px] py-[6px] text-[11px] font-semibold transition-all ${
                              isOccupied
                                ? "cursor-not-allowed bg-[#fef2f2] text-[#ccc] line-through"
                                : isSelected
                                ? "bg-[#ff6733] text-white"
                                : "bg-[#f5f5f5] text-[#545352] active:scale-[0.96]"
                            }`}
                            style={isSelected ? { boxShadow: "0 2px 6px rgba(255,103,51,0.25)" } : undefined}
                          >
                            {time}
                            {isOccupied && (
                              <div className="absolute -right-[2px] -top-[2px] size-[8px] rounded-full border-[1.5px] border-white bg-[#ff3b30]" />
                            )}
                            {isOccupied && <span className="sr-only">(taken)</span>}
                          </button>
                        );
                      })}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => {
                        if (!timelineFormDay) { toast.error("Pick a date"); return; }
                        if (!timelineFormTime) { toast.error("Pick a time"); return; }
                        setGeneralCards((prev) => prev.map((c) =>
                          c.id === showTimelineModal.id
                            ? { ...c, addedToTimeline: true, timelineEntry: { title: timelineFormTitle || showTimelineModal.name, description: timelineFormDesc, day: timelineFormDay, time: timelineFormTime } }
                            : c
                        ));
                        setShowTimelineModal(null);
                        toast.success(`${timelineFormDay.split(" — ")[0]} · ${timelineFormTime}`);
                      }}
                      className="w-full rounded-[10px] bg-gradient-to-r from-[#ff6733] to-[#ff8f66] py-[11px] text-[13px] font-bold text-white transition-all active:scale-[0.98]"
                      style={{ boxShadow: "0 3px 10px rgba(255,103,51,0.3)" }}
                    >
                      Add to Timeline
                    </button>
                  </div>
                </div>
              </div>
              );
            })()}

            {/* ─── Remove from Timeline Confirm ─── */}
            {showRemoveConfirm && (
              <div
                className="absolute inset-0 z-50 flex items-center justify-center"
                onClick={() => setShowRemoveConfirm(null)}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div
                  className="relative z-10 mx-[24px] w-full max-w-[300px] overflow-hidden rounded-[18px] bg-white"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-[10px] bg-[#f8f7f5] px-[16px] py-[12px]">
                    <img
                      src={showRemoveConfirm.img}
                      alt={showRemoveConfirm.name}
                      className="size-[38px] shrink-0 rounded-[8px] object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-[#292827]">
                        {showRemoveConfirm.timelineEntry?.title || showRemoveConfirm.name}
                      </p>
                      {showRemoveConfirm.timelineEntry && (
                        <p className="text-[11px] text-[#949493]">
                          {showRemoveConfirm.timelineEntry.day.split(" — ")[0]} · {showRemoveConfirm.timelineEntry.time}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="px-[16px] pb-[16px] pt-[12px]">
                    <p className="text-[14px] font-semibold text-[#292827]">Remove from Timeline?</p>
                    <p className="mt-[3px] text-[12px] leading-[16px] text-[#949493]">
                      The place stays in Saved Places.
                    </p>
                    <div className="mt-[12px] flex gap-[8px]">
                      <button
                        onClick={() => setShowRemoveConfirm(null)}
                        className="flex-1 rounded-[10px] bg-[#f5f5f5] py-[10px] text-[13px] font-semibold text-[#545352] active:bg-[#eaeae9]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setGeneralCards(prev => prev.map(c =>
                            c.id === showRemoveConfirm.id
                              ? { ...c, addedToTimeline: false, timelineEntry: undefined }
                              : c
                          ));
                          setShowRemoveConfirm(null);
                          toast(`"${showRemoveConfirm.name}" removed from Timeline`, { icon: "🗓️" });
                        }}
                        className="flex-1 rounded-[10px] bg-[#ff3b30] py-[10px] text-[13px] font-bold text-white active:bg-[#e0352b]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="mx-[16px] h-[1px] bg-gradient-to-r from-transparent via-[#eaeae9] to-transparent" />

            {/* ═══════════ PRIVACY & SETTINGS ═══════════ */}
            <div className="px-[16px] py-[28px]">
              <p className="pb-[16px] text-[18px] font-medium leading-[24px] text-[#292827]">
                Privacy & Settings
              </p>
              <div className="flex items-center justify-between py-[14px]">
                <div className="flex items-center gap-[12px]">
                  <div className="flex size-[40px] items-center justify-center rounded-[8px] bg-[#f5f5f5]" style={{ boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)" }}>
                    <Lock size={16} className="text-[#545352]" strokeWidth={2} />
                  </div>
                  <p className="text-[16px] font-normal leading-[24px] text-[#3e3e3d]">
                    Allow Participant Invites
                  </p>
                </div>
                <ToggleSwitch checked={allowInvites} onChange={setAllowInvites} label="Allow participant invites" />
              </div>
              <div className="h-[0.5px] bg-[#eaeae9]" />
              <div className="flex items-center justify-between py-[14px]">
                <div className="flex items-center gap-[12px]">
                  <div className="flex size-[40px] items-center justify-center rounded-[8px] bg-[#f5f5f5]" style={{ boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)" }}>
                    <Globe size={16} className="text-[#545352]" strokeWidth={2} />
                  </div>
                  <p className="text-[16px] font-normal leading-[24px] text-[#3e3e3d]">
                    Visible to Public
                  </p>
                </div>
                <ToggleSwitch checked={visiblePublic} onChange={setVisiblePublic} label="Visible to public" />
              </div>
            </div>

            {/* Bottom spacer for CTA overlay */}
            <div className="h-[104px]" />
          </div>
        </div>
      </div>

      {/* ═══════════ BOTTOM BAR ═══════════ */}
      {(() => {
        const snaps = getSnaps();
        const showButtons = sheetTop <= snaps.half;
        return (
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-[16px] pt-[16px]"
            style={{
              backgroundImage:
                "linear-gradient(to top, white 75%, rgba(255, 255, 255, 0.95) 90%, transparent 100%)",
              zIndex: 30,
              transform: showButtons ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
              pointerEvents: showButtons ? "auto" : "none",
            }}
          >
            <div className="w-full px-[20px]">
              <div className="flex w-full gap-[12px]">
                <button
                  className="flex flex-1 items-center justify-center rounded-[28px] border-2 border-[#eaeae9] bg-white px-[24px] py-[14px] transition-all duration-200 active:scale-95 active:bg-[#f5f5f5]"
                  style={{
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <span
                    className="text-[16px] font-medium leading-[24px] text-[#545352]"
                    style={{ fontFeatureSettings: "'ss01'" }}
                  >
                    Cancel
                  </span>
                </button>
                <button
                  className="flex flex-1 items-center justify-center rounded-[28px] px-[24px] py-[14px] text-white transition-all duration-200 active:scale-95"
                  style={{
                    backgroundImage:
                      "linear-gradient(94.82deg, #FF551D 0%, #FF6A9F 100%)",
                    boxShadow: "0 4px 16px rgba(255, 103, 51, 0.3)",
                  }}
                >
                  <span
                    className="text-[16px] font-medium leading-[24px] text-white"
                    style={{ fontFeatureSettings: "'ss01'" }}
                  >
                    Save
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ═══════════ FILE PREVIEW MODAL ═══════════ */}
      {previewFile && (
        <div
          className="absolute inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-md"
          onClick={() => setPreviewFile(null)}
        >
          <div
            className="mx-[20px] mt-auto mb-[40px] overflow-hidden rounded-[20px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-[#eaeae9] px-[18px] py-[16px] bg-[#fafafa]">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold leading-[20px] text-[#292827]">
                  {previewFile.name}
                </p>
                <p className="text-[12px] leading-[16px] text-[#949493]">
                  {previewFile.size} · {previewFile.date}
                </p>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="ml-[12px] flex size-[34px] shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] transition-all duration-200 hover:bg-[#eaeae9] active:scale-95"
              >
                <X size={17} className="text-[#545352]" />
              </button>
            </div>

            {/* Preview content */}
            <div className="flex flex-col items-center justify-center gap-[18px] px-[24px] py-[36px]">
              <div
                className={`flex size-[72px] items-center justify-center rounded-[18px] ${
                  previewFile.type === "pdf"
                    ? "bg-[#fee2e2]"
                    : previewFile.type === "image"
                      ? "bg-[#dbeafe]"
                      : "bg-[#f3f4f6]"
                }`}
                style={{
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                }}
              >
                {previewFile.type === "pdf" ? (
                  <FileText size={36} className="text-[#ef4444]" />
                ) : previewFile.type === "image" ? (
                  <ImageIcon size={36} className="text-[#3b82f6]" />
                ) : (
                  <FileText size={36} className="text-[#545352]" />
                )}
              </div>
              <p className="text-center text-[13px] leading-[19px] text-[#949493]">
                Tap below to open in your device's file viewer
              </p>
              {/* Sync indicator */}
              <div
                className={`flex items-center gap-[8px] rounded-full px-[14px] py-[6px] ${
                  previewFile.synced ? "bg-[#dcfce7]" : "bg-[#fef3c7]"
                }`}
              >
                {previewFile.synced ? (
                  <>
                    <Check size={13} className="text-[#22c55e]" />
                    <span className="text-[12px] font-semibold text-[#22c55e]">Available offline</span>
                  </>
                ) : (
                  <>
                    <WifiOff size={13} className="text-[#f59e0b]" />
                    <span className="text-[12px] font-semibold text-[#f59e0b]">Requires internet</span>
                  </>
                )}
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex gap-[12px] border-t border-[#eaeae9] bg-[#fafafa] px-[18px] py-[14px]">
              <button className="flex flex-1 items-center justify-center gap-[8px] rounded-[28px] border-2 border-[#eaeae9] bg-white py-[12px] transition-all duration-200 hover:bg-[#f5f5f5] active:scale-98">
                <Download size={17} className="text-[#545352]" />
                <span className="text-[14px] font-semibold text-[#545352]">
                  {previewFile.synced ? "Saved" : "Download"}
                </span>
              </button>
              <button
                className="flex flex-1 items-center justify-center gap-[8px] rounded-[28px] py-[12px] text-white transition-all duration-200 active:scale-98"
                style={{
                  backgroundImage: "linear-gradient(121.6deg, #ff551d 0%, #ff6a9f 100%)",
                  boxShadow: "0 4px 16px rgba(255, 103, 51, 0.3)",
                }}
              >
                <Eye size={17} className="text-white" />
                <span className="text-[14px] font-semibold text-white">Open File</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ GENERAL CARD DETAIL VIEW ═══════════ */}
      {selectedGeneralCard && (() => {
        const card = generalCards.find(c => c.id === selectedGeneralCard.id) || selectedGeneralCard;
        const isLiked = card.likes.includes(currentUserId);
        const likedMembers = TRIP_MEMBERS.filter(m => card.likes.includes(m.id));
        const addedByMember = TRIP_MEMBERS.find(m => m.id === card.addedBy);

        return (
          <div
            className="absolute inset-0 z-50 flex flex-col bg-white"
            style={{ fontFamily: "'Inclusive Sans', sans-serif" }}
          >
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Hero Image */}
              <div className="relative h-[240px] w-full overflow-hidden">
                <img
                  src={card.img}
                  alt={card.name}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                {/* Back button */}
                <button
                  onClick={() => setSelectedGeneralCard(null)}
                  className="absolute left-[16px] top-[16px] flex size-[36px] items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-200 active:scale-95"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                >
                  <ChevronLeft size={20} className="text-[#292827]" strokeWidth={2.5} />
                </button>

                {/* Timeline badge */}
                {card.addedToTimeline && (
                  <div className="absolute right-[16px] top-[16px] flex items-center gap-[4px] rounded-full bg-[#34c759] px-[10px] py-[5px]">
                    <Check size={12} className="text-white" strokeWidth={3} />
                    <span className="text-[12px] font-medium text-white">In Timeline</span>
                  </div>
                )}

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-[16px]">
                  <h2 className="text-[22px] font-medium leading-[28px] text-white" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                    {card.name}
                  </h2>
                </div>
              </div>

              {/* Body Content */}
              <div className="flex flex-col gap-[20px] p-[16px]">

                {/* Added By */}
                {addedByMember && (
                  <div className="flex items-center gap-[10px]">
                    <img
                      src={addedByMember.avatar}
                      alt={addedByMember.name}
                      className="size-[32px] rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[13px] font-normal leading-[18px] text-[#949493]">
                        Added by <span className="font-medium text-[#3e3e3d]">{addedByMember.name}</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="h-[1px] bg-[#eaeae9]" />

                {/* Voting Section */}
                <div className="flex flex-col gap-[12px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[12px]">
                      <button
                        onClick={() => {
                          setGeneralCards(prev => prev.map(c => {
                            if (c.id !== card.id) return c;
                            return isLiked
                              ? { ...c, likes: c.likes.filter(id => id !== currentUserId) }
                              : { ...c, likes: [...c.likes, currentUserId] };
                          }));
                        }}
                        className={`flex items-center gap-[8px] rounded-full px-[16px] py-[8px] transition-all duration-200 active:scale-95 ${
                          isLiked
                            ? "bg-[#ffeee8]"
                            : "bg-[#f5f5f5]"
                        }`}
                      >
                        <Heart
                          size={18}
                          className={isLiked ? "text-[#ff6733]" : "text-[#949493]"}
                          fill={isLiked ? "#ff6733" : "none"}
                          strokeWidth={2}
                        />
                        <span className={`text-[14px] font-medium leading-[20px] ${isLiked ? "text-[#ff6733]" : "text-[#545352]"}`}>
                          {isLiked ? "Liked" : "Like"}
                        </span>
                      </button>
                      <span className="text-[14px] font-medium leading-[20px] text-[#545352]">
                        {card.likes.length} {card.likes.length === 1 ? "like" : "likes"}
                      </span>
                    </div>
                  </div>

                  {/* Liked by members */}
                  {likedMembers.length > 0 && (
                    <div className="flex flex-col gap-[8px]">
                      <p className="text-[13px] font-normal leading-[18px] text-[#949493]">Liked by</p>
                      <div className="flex flex-wrap gap-[8px]">
                        {likedMembers.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-[8px] rounded-full bg-[#f5f5f5] px-[10px] py-[6px]"
                          >
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="size-[22px] rounded-full object-cover"
                            />
                            <span className="text-[13px] font-medium leading-[18px] text-[#3e3e3d]">
                              {member.id === currentUserId ? "You" : member.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-[#eaeae9]" />

                {/* Mock Location Info */}
                <div className="flex flex-col gap-[12px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="flex size-[36px] items-center justify-center rounded-[8px] bg-[#f5f5f5]">
                      <MapPin size={16} className="text-[#ff6733]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-medium leading-[20px] text-[#3e3e3d]">Location</p>
                      <p className="text-[13px] font-normal leading-[18px] text-[#949493]">
                        {card.name.includes("Market") ? "Night Market Square, Ward 1, Da Lat"
                         : card.name.includes("Peak") ? "Lac Duong District, Lam Dong"
                         : card.name.includes("XQ") ? "80 Tran Phu, Ward 3, Da Lat"
                         : card.name.includes("Lake") ? "Tran Quoc Toan, Ward 10, Da Lat"
                         : card.name.includes("Flower") ? "2 Phu Dong Thien Vuong, Ward 8, Da Lat"
                         : "Da Lat, Lam Dong, Vietnam"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-[10px]">
                    <div className="flex size-[36px] items-center justify-center rounded-[8px] bg-[#f5f5f5]">
                      <Clock size={16} className="text-[#ff6733]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-medium leading-[20px] text-[#3e3e3d]">Hours</p>
                      <p className="text-[13px] font-normal leading-[18px] text-[#949493]">
                        {card.name.includes("Market") ? "5:00 PM – 11:00 PM"
                         : card.name.includes("Lake") ? "Open 24 hours"
                         : "7:00 AM – 5:30 PM"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-[10px]">
                    <div className="flex size-[36px] items-center justify-center rounded-[8px] bg-[#f5f5f5]">
                      <Star size={16} className="text-[#ff6733]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-medium leading-[20px] text-[#3e3e3d]">Rating</p>
                      <p className="text-[13px] font-normal leading-[18px] text-[#949493]">
                        {card.name.includes("Market") ? "4.3 · 3,200 reviews"
                         : card.name.includes("Peak") ? "4.7 · 5,100 reviews"
                         : card.name.includes("Lake") ? "4.6 · 4,800 reviews"
                         : "4.4 · 2,100 reviews"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-[#eaeae9]" />

                {/* Description */}
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[14px] font-medium leading-[20px] text-[#292827]">About</p>
                  <p className="text-[14px] font-normal leading-[22px] text-[#545352]">
                    {card.name.includes("Market")
                      ? "Da Lat Night Market is a vibrant destination in the heart of the city, famous for street food, fresh produce, and local handicrafts. Perfect for an evening stroll with delicious local treats."
                      : card.name.includes("Peak")
                      ? "Langbiang Peak offers breathtaking panoramic views of Da Lat and the surrounding highlands. A popular hiking destination with trails suitable for various skill levels."
                      : card.name.includes("XQ")
                      ? "XQ Art Village showcases exquisite Vietnamese hand-embroidered artworks in a serene garden setting. A unique cultural experience combining traditional craftsmanship with modern artistry."
                      : card.name.includes("Lake")
                      ? "A crescent-shaped lake in the heart of Da Lat, perfect for peaceful walks and enjoying the cool mountain air. Popular spot for morning jogs and evening strolls."
                      : card.name.includes("Flower")
                      ? "A stunning botanical garden showcasing hundreds of colorful flower species and ornamental plants. Features beautiful landscaping and seasonal flower displays."
                      : "A beautiful destination in Da Lat, known for its scenic views and relaxing atmosphere."}
                  </p>
                </div>

                {/* Map Preview Placeholder */}
                <div className="overflow-hidden rounded-[12px] border border-[#eaeae9]">
                  <div className="flex h-[140px] items-center justify-center bg-[#f5f5f5]">
                    <div className="flex flex-col items-center gap-[8px]">
                      <MapPin size={24} className="text-[#949493]" strokeWidth={1.5} />
                      <p className="text-[13px] font-normal text-[#949493]">Map preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Bottom Actions */}
            <div className="flex gap-[12px] border-t border-[#eaeae9] bg-white px-[16px] py-[14px] pb-[34px]">
              <button
                onClick={() => {
                  setGeneralCards(prev => prev.map(c => {
                    if (c.id !== card.id) return c;
                    return isLiked
                      ? { ...c, likes: c.likes.filter(id => id !== currentUserId) }
                      : { ...c, likes: [...c.likes, currentUserId] };
                  }));
                }}
                className={`flex flex-1 items-center justify-center gap-[8px] rounded-[28px] py-[12px] transition-all duration-200 active:scale-95 ${
                  isLiked
                    ? "bg-[#ffeee8]"
                    : "border-2 border-[#eaeae9] bg-white"
                }`}
              >
                <Heart
                  size={18}
                  className={isLiked ? "text-[#ff6733]" : "text-[#545352]"}
                  fill={isLiked ? "#ff6733" : "none"}
                  strokeWidth={2}
                />
                <span className={`text-[14px] font-medium leading-[20px] ${isLiked ? "text-[#ff6733]" : "text-[#545352]"}`}>
                  {isLiked ? "Liked" : "Like"}
                </span>
              </button>
              <button
                onClick={() => {
                  setShowTimelineModal(card);
                }}
                className="flex flex-1 items-center justify-center gap-[8px] rounded-[28px] py-[12px] transition-all duration-200 active:scale-95"
                style={{
                  background: card.addedToTimeline
                    ? "#34c759"
                    : "linear-gradient(94.82deg, #FF551D 0%, #FF6A9F 100%)",
                  boxShadow: "0 4px 12px rgba(255,85,29,0.3)",
                }}
              >
                {card.addedToTimeline ? (
                  <Check size={18} className="text-white" strokeWidth={2.5} />
                ) : (
                  <Plus size={18} className="text-white" strokeWidth={2.5} />
                )}
                <span className="text-[14px] font-medium leading-[20px] text-white">
                  {card.addedToTimeline ? "In Timeline" : "Add to Timeline"}
                </span>
              </button>
            </div>
          </div>
        );
      })()}

      {/* ═══════════ PLACE DETAIL MODAL ═══════════ */}
      {selectedPlace && (
        <div
          className="absolute inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-md"
          onClick={() => setSelectedPlace(null)}
        >
          <div
            className="mx-[20px] mt-auto mb-[40px] overflow-hidden rounded-[20px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Hero Image */}
            <div className="relative h-[200px] w-full overflow-hidden">
              <img
                src={selectedPlace.img}
                alt={selectedPlace.name}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute right-[16px] top-[16px] flex size-[36px] items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white active:scale-95"
                style={{
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
              >
                <X size={18} className="text-[#545352]" />
              </button>
            </div>

            {/* Content */}
            <div className="px-[20px] py-[20px]">
              {loadingPlaceDetails ? (
                <div className="flex flex-col items-center justify-center py-[40px]">
                  <Loader2 size={32} className="animate-spin text-[#ff6733]" />
                  <p className="mt-[12px] text-[14px] text-[#949493]">Loading details...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-[12px]">
                    <div className="flex-1">
                      <h2 className="text-[22px] font-bold leading-[28px] text-[#292827]">
                        {placeDetails?.name || selectedPlace.name}
                      </h2>
                      {placeDetails?.rating && (
                        <div className="mt-[6px] flex items-center gap-[6px]">
                          <div className="flex items-center gap-[2px]">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill={i < Math.floor(Number(placeDetails.rating)) ? "#fbbf24" : "#e5e7eb"}
                                className="shrink-0"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-[14px] font-semibold text-[#545352]">
                            {placeDetails.rating}
                          </span>
                          {placeDetails?.user_ratings_total && (
                            <span className="text-[13px] text-[#949493]">
                              ({placeDetails.user_ratings_total.toLocaleString()})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {placeDetails?.editorial_summary?.overview && (
                    <p className="mt-[14px] text-[14px] leading-[22px] text-[#696968]">
                      {placeDetails.editorial_summary.overview}
                    </p>
                  )}

                  {/* Location & Hours */}
                  <div className="mt-[18px] space-y-[12px]">
                    {placeDetails?.formatted_address && (
                      <div className="flex items-start gap-[12px]">
                        <div className="mt-[2px] flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#ffeee8]">
                          <MapPin size={18} className="text-[#ff6733]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#949493]">
                            Location
                          </p>
                          <p className="mt-[2px] text-[14px] leading-[20px] text-[#3e3e3d]">
                            {placeDetails.formatted_address}
                          </p>
                        </div>
                      </div>
                    )}

                    {placeDetails?.opening_hours && (
                      <div className="flex items-start gap-[12px]">
                        <div className="mt-[2px] flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#f0f9ff]">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-[8px]">
                            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#949493]">
                              Hours
                            </p>
                            {placeDetails.opening_hours.open_now && (
                              <span className="rounded-full bg-[#dcfce7] px-[8px] py-[2px] text-[11px] font-semibold text-[#22c55e]">
                                Open now
                              </span>
                            )}
                          </div>
                          <p className="mt-[2px] text-[14px] leading-[20px] text-[#3e3e3d]">
                            {placeDetails.opening_hours.weekday_text?.[0] || "See hours"}
                          </p>
                        </div>
                      </div>
                    )}

                    {placeDetails?.phone_number && (
                      <div className="flex items-start gap-[12px]">
                        <div className="mt-[2px] flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#f0fdf4]">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#22c55e"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#949493]">
                            Phone
                          </p>
                          <p className="mt-[2px] text-[14px] leading-[20px] text-[#3e3e3d]">
                            {placeDetails.phone_number}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-[12px] border-t border-[#eaeae9] bg-[#fafafa] px-[18px] py-[14px]">
              <button
                onClick={() => setSelectedPlace(null)}
                className="flex flex-1 items-center justify-center gap-[8px] rounded-[28px] border-2 border-[#eaeae9] bg-white py-[12px] transition-all duration-200 hover:bg-[#f5f5f5] active:scale-98"
              >
                <span className="text-[14px] font-semibold text-[#545352]">
                  Close
                </span>
              </button>
              <button
                onClick={() => {
                  handleAddPlace(selectedPlace.id);
                  setSelectedPlace(null);
                }}
                className="flex flex-1 items-center justify-center gap-[8px] rounded-[28px] py-[12px] text-white transition-all duration-200 active:scale-98"
                style={{
                  backgroundImage: "linear-gradient(121.6deg, #ff551d 0%, #ff6a9f 100%)",
                  boxShadow: "0 4px 16px rgba(255, 103, 51, 0.3)",
                }}
              >
                <Plus size={17} className="text-white" strokeWidth={3} />
                <span className="text-[14px] font-semibold text-white">Add to Trip</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ NEW COLLECTION MODAL ═══════════ */}
      {showNewCollectionModal && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={() => {
            setShowNewCollectionModal(false);
            setNewCollectionName("");
            setNewCollectionEmoji("📁");
          }}
        >
          <div
            className="mx-[20px] w-full max-w-[350px] overflow-hidden rounded-[20px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#ff6733] to-[#ff8c5e] px-[24px] py-[20px]">
              <div className="flex items-center gap-[12px]">
                <div className="flex size-[48px] items-center justify-center rounded-[14px] bg-white/20 backdrop-blur-sm">
                  <Folder size={24} className="text-white" strokeWidth={2} />
                </div>
                <h2 className="text-[20px] font-bold leading-[26px] text-white">
                  New Collection
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="px-[24px] py-[20px]">
              <p className="mb-[14px] text-[14px] leading-[20px] text-[#696968]">
                Create a new collection to organize your saved places
              </p>
              
              {/* Emoji Picker */}
              <div className="mb-[16px]">
                <p className="mb-[8px] text-[12px] font-semibold uppercase tracking-wide text-[#949493]">
                  Choose Icon
                </p>
                <div className="grid grid-cols-10 gap-[6px] max-h-[120px] overflow-y-auto rounded-[12px] border-[1.5px] border-[#eaeae9] bg-[#fafafa] p-[8px]">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNewCollectionEmoji(emoji)}
                      className={`flex size-[32px] items-center justify-center rounded-[8px] text-[20px] transition-all duration-200 hover:bg-[#fff4f0] ${
                        newCollectionEmoji === emoji
                          ? 'bg-[#ff6733] scale-110'
                          : 'bg-white'
                      }`}
                      style={{
                        boxShadow: newCollectionEmoji === emoji ? "0 2px 8px rgba(255, 103, 51, 0.3)" : "none",
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newCollectionName.trim()) {
                    handleCreateCollection();
                  }
                }}
                placeholder="e.g., Coffee Shops, Museums, Nightlife"
                autoFocus
                className="w-full rounded-[12px] border-[1.5px] border-[#eaeae9] bg-[#fafafa] px-[16px] py-[12px] text-[14px] leading-[20px] text-[#292827] outline-none transition-all duration-200 placeholder:text-[#b4b4b3] focus:border-[#ff6733] focus:bg-white"
                style={{
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-[12px] border-t border-[#eaeae9] px-[24px] py-[16px]">
              <button
                onClick={() => {
                  setShowNewCollectionModal(false);
                  setNewCollectionName("");
                  setNewCollectionEmoji("📁");
                }}
                className="flex flex-1 items-center justify-center rounded-[28px] bg-[#f5f5f5] py-[11px] text-[14px] font-semibold text-[#545352] transition-all duration-200 hover:bg-[#eaeae9] active:scale-98"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCollection}
                disabled={!newCollectionName.trim()}
                className="flex flex-1 items-center justify-center gap-[6px] rounded-[28px] py-[11px] text-[14px] font-semibold text-white transition-all duration-200 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundImage: newCollectionName.trim()
                    ? "linear-gradient(121.6deg, #ff551d 0%, #ff6a9f 100%)"
                    : "none",
                  backgroundColor: newCollectionName.trim() ? "transparent" : "#d4d4d4",
                  boxShadow: newCollectionName.trim()
                    ? "0 4px 16px rgba(255, 103, 51, 0.3)"
                    : "none",
                }}
              >
                <Plus size={16} className="text-white" strokeWidth={2.5} />
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ EDIT FOLDER MODAL ═══════════ */}
      {editingFolder && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={() => {
            setEditingFolder(null);
            setEditFolderName("");
            setEditFolderEmoji("");
          }}
        >
          <div
            className="mx-[20px] w-full max-w-[350px] overflow-hidden rounded-[20px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#ff6733] to-[#ff8c5e] px-[24px] py-[20px]">
              <div className="flex items-center gap-[12px]">
                <div className="flex size-[48px] items-center justify-center rounded-[14px] bg-white/20 backdrop-blur-sm">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <h2 className="text-[20px] font-bold leading-[26px] text-white">
                  Edit Collection
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="px-[24px] py-[20px]">
              <p className="mb-[14px] text-[14px] leading-[20px] text-[#696968]">
                Customize your collection's name and icon
              </p>
              
              {/* Emoji Picker */}
              <div className="mb-[16px]">
                <p className="mb-[8px] text-[12px] font-semibold uppercase tracking-wide text-[#949493]">
                  Choose Icon
                </p>
                <div className="grid grid-cols-10 gap-[6px] max-h-[120px] overflow-y-auto rounded-[12px] border-[1.5px] border-[#eaeae9] bg-[#fafafa] p-[8px]">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setEditFolderEmoji(emoji)}
                      className={`flex size-[32px] items-center justify-center rounded-[8px] text-[20px] transition-all duration-200 hover:bg-[#fff4f0] ${
                        editFolderEmoji === emoji
                          ? 'bg-[#ff6733] scale-110'
                          : 'bg-white'
                      }`}
                      style={{
                        boxShadow: editFolderEmoji === emoji ? "0 2px 8px rgba(255, 103, 51, 0.3)" : "none",
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                value={editFolderName}
                onChange={(e) => setEditFolderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && editFolderName.trim()) {
                    handleSaveEditFolder();
                  }
                }}
                placeholder="Collection name"
                autoFocus
                className="w-full rounded-[12px] border-[1.5px] border-[#eaeae9] bg-[#fafafa] px-[16px] py-[12px] text-[14px] leading-[20px] text-[#292827] outline-none transition-all duration-200 placeholder:text-[#b4b4b3] focus:border-[#ff6733] focus:bg-white"
                style={{
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-[12px] border-t border-[#eaeae9] px-[24px] py-[16px]">
              <button
                onClick={() => {
                  setEditingFolder(null);
                  setEditFolderName("");
                  setEditFolderEmoji("");
                }}
                className="flex flex-1 items-center justify-center rounded-[28px] bg-[#f5f5f5] py-[11px] text-[14px] font-semibold text-[#545352] transition-all duration-200 hover:bg-[#eaeae9] active:scale-98"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditFolder}
                disabled={!editFolderName.trim()}
                className="flex flex-1 items-center justify-center gap-[6px] rounded-[28px] py-[11px] text-[14px] font-semibold text-white transition-all duration-200 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundImage: editFolderName.trim()
                    ? "linear-gradient(121.6deg, #ff551d 0%, #ff6a9f 100%)"
                    : "none",
                  backgroundColor: editFolderName.trim() ? "transparent" : "#d4d4d4",
                  boxShadow: editFolderName.trim()
                    ? "0 4px 16px rgba(255, 103, 51, 0.3)"
                    : "none",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ ADD PLACE SEARCH SHEET ═══════════ */}
      {showAddPlaceSheet && (
        <div
          className="absolute inset-0 z-50 flex items-end bg-black/70 backdrop-blur-md"
          onClick={() => {
            setShowAddPlaceSheet(false);
            setSearchQuery("");
            setSearchResults([]);
          }}
        >
          <div
            className="w-full overflow-hidden rounded-t-[24px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: "85vh",
              boxShadow: "0 -10px 60px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-[12px] pb-[4px]">
              <div className="h-[4px] w-[36px] rounded-full bg-[#d4d4d4]" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-[24px] pb-[16px] pt-[8px]">
              <div>
                <h2 className="text-[20px] font-bold leading-[26px] tracking-[-0.3px] text-[#292827]">
                  Add a Place
                </h2>
                <p className="mt-[2px] text-[13px] leading-[18px] text-[#949493]">
                  Search for a destination to save
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAddPlaceSheet(false);
                  setSearchQuery("");
                  setSearchResults([]);
                }}
                className="flex size-[36px] items-center justify-center rounded-full bg-[#f5f5f5] transition-all duration-200 hover:bg-[#eaeae9] active:scale-95"
              >
                <X size={18} className="text-[#545352]" strokeWidth={2.5} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="border-b border-[#eaeae9] px-[24px] pb-[20px]">
              <div className="relative">
                <svg
                  className="absolute left-[14px] top-1/2 -translate-y-1/2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#949493"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchPlaces(e.target.value)}
                  placeholder="Search Google Maps or type address"
                  autoFocus
                  className="w-full rounded-[12px] border-[1.5px] border-[#eaeae9] bg-[#fafafa] py-[12px] pl-[44px] pr-[16px] text-[14px] leading-[20px] text-[#292827] outline-none transition-all duration-200 placeholder:text-[#b4b4b3] focus:border-[#ff6733] focus:bg-white"
                  style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)" }}
                />
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto px-[24px] py-[16px]">
              {searchQuery && searchResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-[40px]">
                  <div className="mb-[12px] flex size-[64px] items-center justify-center rounded-full bg-[#f5f5f5]">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#949493" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <p className="text-[14px] font-semibold text-[#545352]">No results found</p>
                  <p className="mt-[4px] text-[13px] text-[#949493]">Try a different search term</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="flex flex-col gap-[8px]">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleAddSearchedPlaceToGeneral(result)}
                      className="flex w-full items-center gap-[12px] rounded-[14px] bg-white p-[12px] text-left transition-all duration-200 hover:bg-[#f9f9f9] active:bg-[#f0f0f0]"
                      style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)" }}
                    >
                      <img
                        src={result.img}
                        alt={result.name}
                        className="size-[52px] shrink-0 rounded-[10px] object-cover"
                        style={{ boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)" }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-semibold leading-[20px] text-[#292827]">
                          {result.name}
                        </p>
                        <p className="mt-[2px] truncate text-[12px] leading-[16px] text-[#949493]">
                          {result.address}
                        </p>
                      </div>
                      <div
                        className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#ff6733] transition-all duration-200 active:scale-110"
                        style={{ boxShadow: "0 2px 8px rgba(255, 103, 51, 0.3)" }}
                      >
                        <Plus size={16} className="text-white" strokeWidth={3} />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-[40px]">
                  <div className="mb-[12px] flex size-[64px] items-center justify-center rounded-full bg-gradient-to-br from-[#ff6733]/10 to-[#ff8c5e]/10">
                    <MapPin size={28} className="text-[#ff6733]" strokeWidth={2} />
                  </div>
                  <p className="text-[14px] font-semibold text-[#545352]">Search for a destination</p>
                  <p className="mt-[4px] text-center text-[13px] leading-[18px] text-[#949493]">
                    Find restaurants, attractions, hotels,<br />and more to add to your trip
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ ADD TO FOLDER MODAL ═══════════ */}
      {addingToFolder && (
        <div
          className="absolute inset-0 z-50 flex items-end bg-black/70 backdrop-blur-md"
          onClick={() => {
            setAddingToFolder(null);
            setSearchQuery("");
            setSearchResults([]);
          }}
        >
          <div
            className="w-full overflow-hidden rounded-t-[24px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: "70vh",
              boxShadow: "0 -10px 60px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#ff6733] to-[#ff8c5e] px-[24px] py-[20px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[12px]">
                  <div className="flex size-[48px] items-center justify-center rounded-[14px] bg-white/20 backdrop-blur-sm">
                    {addingToFolder.emoji ? (
                      <span className="text-[24px] leading-none">{addingToFolder.emoji}</span>
                    ) : (
                      <Folder size={24} className="text-white" strokeWidth={2} />
                    )}
                  </div>
                  <h2 className="text-[20px] font-bold leading-[26px] text-white">
                    Add to {addingToFolder.name}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setAddingToFolder(null);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="flex size-[36px] items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-white/30 active:scale-95"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="border-b border-[#eaeae9] px-[24px] py-[20px]">
              <div className="relative">
                <svg
                  className="absolute left-[14px] top-1/2 -translate-y-1/2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#949493"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchPlaces(e.target.value)}
                  placeholder="Search Google Maps or type address"
                  autoFocus
                  className="w-full rounded-[12px] border-[1.5px] border-[#eaeae9] bg-[#fafafa] py-[12px] pl-[44px] pr-[16px] text-[14px] leading-[20px] text-[#292827] outline-none transition-all duration-200 placeholder:text-[#b4b4b3] focus:border-[#ff6733] focus:bg-white"
                  style={{
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  }}
                />
              </div>
              <button
                onClick={() => {
                  // Handle manual creation
                  console.log("Create custom location manually");
                }}
                className="mt-[12px] text-[13px] font-semibold text-[#ff6733] transition-all duration-200 hover:text-[#ff551d] active:scale-98"
              >
                Create custom location manually
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-[400px] overflow-y-auto px-[24px] py-[16px]">
              {searchQuery && searchResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-[40px]">
                  <div className="mb-[12px] flex size-[64px] items-center justify-center rounded-full bg-[#f5f5f5]">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#949493"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <p className="text-[14px] font-semibold text-[#545352]">No results found</p>
                  <p className="mt-[4px] text-[13px] text-[#949493]">Try a different search term</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="flex flex-col gap-[8px]">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleAddPlaceToFolder(result)}
                      className="flex w-full items-center gap-[12px] rounded-[12px] bg-white p-[12px] text-left transition-all duration-200 hover:bg-[#f9f9f9] active:bg-[#f0f0f0]"
                      style={{
                        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
                      }}
                    >
                      <img
                        src={result.img}
                        alt={result.name}
                        className="size-[48px] shrink-0 rounded-[10px] object-cover"
                        style={{
                          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-semibold leading-[20px] text-[#292827] truncate">
                          {result.name}
                        </p>
                        <p className="text-[12px] leading-[16px] text-[#949493] truncate">
                          {result.address}
                        </p>
                      </div>
                      <div className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-[#ff6733] transition-all duration-200 active:scale-110"
                        style={{
                          boxShadow: "0 3px 10px rgba(255, 103, 51, 0.3)",
                        }}
                      >
                        <Plus size={16} className="text-white" strokeWidth={3} />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-[40px]">
                  <div className="mb-[12px] flex size-[64px] items-center justify-center rounded-full bg-gradient-to-br from-[#ff6733]/10 to-[#ff8c5e]/10">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ff6733"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <p className="text-[14px] font-semibold text-[#545352]">Search for a place</p>
                  <p className="mt-[4px] text-center text-[13px] text-[#949493]">
                    Type a name or address to find places
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ DELETE FOLDER CONFIRMATION MODAL ═══════════ */}
      {deleteConfirmFolder && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={() => setDeleteConfirmFolder(null)}
        >
          <div
            className="mx-[32px] w-full max-w-[300px] overflow-hidden rounded-[16px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Header */}
            <div className="px-[20px] pt-[24px] pb-[16px] text-center">
              <div className="mb-[12px] flex justify-center">
                <div className="flex size-[56px] items-center justify-center rounded-full bg-gradient-to-br from-[#ff3b30] to-[#ff6347]"
                  style={{
                    boxShadow: "0 4px 16px rgba(255, 59, 48, 0.3)",
                  }}
                >
                  <Trash2 size={26} className="text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="text-[18px] font-bold leading-[24px] text-[#292827]">
                Delete Folder?
              </h3>
              <p className="mt-[8px] text-[14px] leading-[20px] text-[#696968]">
                Delete "{deleteConfirmFolder.name}" and its contents? This action cannot be undone.
              </p>
            </div>

            {/* Actions */}
            <div className="flex border-t border-[#eaeae9]">
              <button
                onClick={() => setDeleteConfirmFolder(null)}
                className="flex-1 border-r border-[#eaeae9] py-[14px] text-[16px] font-semibold text-[#007aff] transition-all duration-200 hover:bg-[#f5f5f5] active:bg-[#eaeae9]"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteFolder}
                className="flex-1 py-[14px] text-[16px] font-semibold text-[#ff3b30] transition-all duration-200 hover:bg-[#fff5f5] active:bg-[#ffe6e6]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ ADD RESERVATION MODAL ═══════════ */}
      {showAddReservationModal && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={() => setShowAddReservationModal(false)}
        >
          <div
            className="mx-[24px] w-full max-w-[340px] overflow-hidden rounded-[20px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#eaeae9] px-[20px] py-[16px]">
              <h3 className="text-[18px] font-bold leading-[24px] text-[#292827]">
                Add Reservation
              </h3>
              <button
                onClick={() => setShowAddReservationModal(false)}
                className="flex size-[32px] items-center justify-center rounded-full bg-[#f5f5f5] transition-all duration-200 hover:bg-[#eaeae9] active:scale-95"
              >
                <X size={18} className="text-[#545352]" />
              </button>
            </div>

            {/* Form */}
            <div className="max-h-[480px] overflow-y-auto px-[20px] py-[20px]">
              {/* Type */}
              <div className="mb-[16px]">
                <label className="mb-[8px] block text-[13px] font-semibold text-[#545352]">
                  Type <span className="text-[#ff6733]">*</span>
                </label>
                <select
                  value={newReservationType}
                  onChange={(e) => setNewReservationType(e.target.value)}
                  className="w-full rounded-[12px] border-2 border-[#eaeae9] bg-white px-[14px] py-[12px] text-[14px] text-[#292827] outline-none transition-all duration-200 focus:border-[#ff6733] focus:ring-2 focus:ring-[#ff6733]/20"
                >
                  <option value="">Select type</option>
                  <option value="lodging">🏨 Lodging</option>
                  <option value="transport">✈️ Transport</option>
                  <option value="dining">🍽️ Dining</option>
                  <option value="activity">🎭 Activity</option>
                  <option value="other">📋 Other</option>
                </select>
              </div>

              {/* Name */}
              <div className="mb-[16px]">
                <label className="mb-[8px] block text-[13px] font-semibold text-[#545352]">
                  Name <span className="text-[#ff6733]">*</span>
                </label>
                <input
                  type="text"
                  value={newReservationName}
                  onChange={(e) => setNewReservationName(e.target.value)}
                  placeholder="e.g., Hilton Hotel, Flight AA123"
                  className="w-full rounded-[12px] border-2 border-[#eaeae9] bg-white px-[14px] py-[12px] text-[14px] text-[#292827] placeholder-[#949493] outline-none transition-all duration-200 focus:border-[#ff6733] focus:ring-2 focus:ring-[#ff6733]/20"
                />
              </div>

              {/* Date */}
              <div className="mb-[16px]">
                <label className="mb-[8px] block text-[13px] font-semibold text-[#545352]">
                  Date
                </label>
                <input
                  type="date"
                  value={newReservationDate}
                  onChange={(e) => setNewReservationDate(e.target.value)}
                  className="w-full rounded-[12px] border-2 border-[#eaeae9] bg-white px-[14px] py-[12px] text-[14px] text-[#292827] outline-none transition-all duration-200 focus:border-[#ff6733] focus:ring-2 focus:ring-[#ff6733]/20"
                />
              </div>

              {/* Confirmation Number */}
              <div className="mb-[16px]">
                <label className="mb-[8px] block text-[13px] font-semibold text-[#545352]">
                  Confirmation #
                </label>
                <input
                  type="text"
                  value={newReservationConfirmation}
                  onChange={(e) => setNewReservationConfirmation(e.target.value)}
                  placeholder="e.g., ABC123456"
                  className="w-full rounded-[12px] border-2 border-[#eaeae9] bg-white px-[14px] py-[12px] text-[14px] text-[#292827] placeholder-[#949493] outline-none transition-all duration-200 focus:border-[#ff6733] focus:ring-2 focus:ring-[#ff6733]/20"
                />
              </div>

              {/* Notes */}
              <div className="mb-[16px]">
                <label className="mb-[8px] block text-[13px] font-semibold text-[#545352]">
                  Notes
                </label>
                <textarea
                  value={newReservationNotes}
                  onChange={(e) => setNewReservationNotes(e.target.value)}
                  placeholder="Add additional details..."
                  rows={3}
                  className="w-full resize-none rounded-[12px] border-2 border-[#eaeae9] bg-white px-[14px] py-[12px] text-[14px] text-[#292827] placeholder-[#949493] outline-none transition-all duration-200 focus:border-[#ff6733] focus:ring-2 focus:ring-[#ff6733]/20"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-[12px] border-t border-[#eaeae9] px-[20px] py-[16px]">
              <button
                onClick={() => setShowAddReservationModal(false)}
                className="flex-1 rounded-[28px] border-2 border-[#eaeae9] bg-white px-[20px] py-[12px] text-[14px] font-semibold text-[#545352] transition-all duration-200 hover:bg-[#f5f5f5] active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReservation}
                className="flex-1 rounded-[28px] bg-[#ff6733] px-[20px] py-[12px] text-[14px] font-semibold text-white transition-all duration-200 active:scale-95"
                style={{ boxShadow: "0 4px 12px rgba(255,103,51,0.3)" }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
