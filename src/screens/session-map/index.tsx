import { useState } from "react";
import { useNavigate } from "react-router";
import {
  MapPin,
  Navigation,
  ChevronLeft,
  Star,
  Radio,
  Check,
  List,
  Eye,
} from "lucide-react";
import PhoneFrame from "../../app/components/layout/phone-frame";
import AndroidFrame from "../../app/components/layout/android-frame";
import { toast } from "sonner";

// ─── Trip Pin Data ───
type TripPin = {
  id: string;
  name: string;
  img: string;
  day: number;
  order: number;
  category: string;
  x: number; // percentage
  y: number;
  time: string;
  duration: string;
};

const TRIP_PINS: TripPin[] = [
  // Day 1
  {
    id: "tp1",
    name: "My Khe Beach",
    img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    day: 1,
    order: 1,
    category: "Beach",
    x: 75,
    y: 22,
    time: "7:00 AM",
    duration: "2 hrs",
  },
  {
    id: "tp2",
    name: "43 Factory Coffee",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    day: 1,
    order: 2,
    category: "Cafe",
    x: 40,
    y: 40,
    time: "9:30 AM",
    duration: "1 hr",
  },
  {
    id: "tp3",
    name: "Marble Mountains",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    day: 1,
    order: 3,
    category: "Attraction",
    x: 68,
    y: 62,
    time: "11:00 AM",
    duration: "2.5 hrs",
  },
  {
    id: "tp4",
    name: "Be Man Seafood",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    day: 1,
    order: 4,
    category: "Restaurant",
    x: 55,
    y: 35,
    time: "6:00 PM",
    duration: "1.5 hrs",
  },
  // Day 2
  {
    id: "tp5",
    name: "Dragon Bridge",
    img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    day: 2,
    order: 1,
    category: "Attraction",
    x: 42,
    y: 38,
    time: "9:00 AM",
    duration: "1 hr",
  },
  {
    id: "tp6",
    name: "Han Market",
    img: "https://images.unsplash.com/photo-1748596161714-4049199ae770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    day: 2,
    order: 2,
    category: "Shopping",
    x: 35,
    y: 50,
    time: "10:30 AM",
    duration: "1.5 hrs",
  },
  {
    id: "tp7",
    name: "Sky Bar Da Nang",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    day: 2,
    order: 3,
    category: "Nightlife",
    x: 38,
    y: 58,
    time: "7:00 PM",
    duration: "2 hrs",
  },
  // Day 3
  {
    id: "tp8",
    name: "Ba Na Hills",
    img: "https://images.unsplash.com/photo-1535538561842-2048e2a61a2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    day: 3,
    order: 1,
    category: "Attraction",
    x: 25,
    y: 30,
    time: "8:00 AM",
    duration: "Full day",
  },
];

const DAYS = [
  { id: 0, label: "All Days" },
  { id: 1, label: "Day 1", date: "Mar 29" },
  { id: 2, label: "Day 2", date: "Mar 30" },
  { id: 3, label: "Day 3", date: "Mar 31" },
];

const DAY_COLORS = ["#ff6733", "#3b82f6", "#8b5cf6", "#22c55e"];

// ─── Main Screen ───
export default function SessionMapScreen() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedPin, setSelectedPin] = useState<TripPin | null>(null);
  const [shareLocation, setShareLocation] = useState(false);
  const [showList, setShowList] = useState(false);

  const filteredPins =
    selectedDay === 0
      ? TRIP_PINS
      : TRIP_PINS.filter((p) => p.day === selectedDay);

  // Group by consecutive pins for route lines
  const routeSegments: { from: TripPin; to: TripPin; day: number }[] = [];
  const dayGroups = new Map<number, TripPin[]>();
  filteredPins.forEach((pin) => {
    const arr = dayGroups.get(pin.day) || [];
    arr.push(pin);
    dayGroups.set(pin.day, arr);
  });
  dayGroups.forEach((pins, day) => {
    const sorted = [...pins].sort((a, b) => a.order - b.order);
    for (let i = 0; i < sorted.length - 1; i++) {
      routeSegments.push({ from: sorted[i], to: sorted[i + 1], day });
    }
  });

  return (
    <AndroidFrame>
      <PhoneFrame showHeader={false} showBottomNav={false}>
        <div className="relative size-full">
          {/* ═══════════ MAP ═══════════ */}
          <div className="absolute inset-0 bg-[#e8e4df]">
            <svg className="size-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sessionMapGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#eee9e2" />
                  <stop offset="100%" stopColor="#e2ddd6" />
                </linearGradient>
                <pattern id="sessionGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4d0ca" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect fill="url(#sessionMapGrad)" width="100%" height="100%" />
              <rect fill="url(#sessionGrid)" width="100%" height="100%" opacity="0.4" />
              {/* Roads */}
              <path d="M 0 160 Q 130 180 195 140 T 390 180" stroke="#cec9c2" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M 80 0 Q 110 100 140 200 T 180 500" stroke="#cec9c2" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M 260 0 Q 280 130 290 260 T 320 500" stroke="#cec9c2" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M 0 320 Q 100 310 200 340 T 390 320" stroke="#cec9c2" strokeWidth="7" fill="none" strokeLinecap="round" />
              {/* Water */}
              <ellipse cx="340" cy="120" rx="60" ry="35" fill="#c4d8e5" opacity="0.35" />
              <ellipse cx="70" cy="380" rx="50" ry="25" fill="#c4d8e5" opacity="0.25" />

              {/* Route Lines */}
              {routeSegments.map((seg, i) => {
                const color = DAY_COLORS[seg.day] || "#ff6733";
                const fromX = (seg.from.x / 100) * 390;
                const fromY = (seg.from.y / 100) * 600;
                const toX = (seg.to.x / 100) * 390;
                const toY = (seg.to.y / 100) * 600;
                const midX = (fromX + toX) / 2;
                const midY = (fromY + toY) / 2 - 20;
                return (
                  <g key={i}>
                    <path
                      d={`M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`}
                      stroke={color}
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="8 4"
                      opacity="0.6"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Pins */}
            {filteredPins.map((pin) => {
              const isSelected = selectedPin?.id === pin.id;
              const color = DAY_COLORS[pin.day] || "#ff6733";
              return (
                <button
                  key={pin.id}
                  onClick={() => setSelectedPin(isSelected ? null : pin)}
                  className="absolute transition-all duration-300"
                  style={{
                    left: `${pin.x}%`,
                    top: `${pin.y}%`,
                    transform: `translate(-50%, -100%) ${isSelected ? "scale(1.3)" : "scale(1)"}`,
                    zIndex: isSelected ? 20 : 10,
                  }}
                >
                  <div
                    className="flex flex-col items-center"
                    style={{ filter: isSelected ? `drop-shadow(0 4px 12px ${color}50)` : "drop-shadow(0 2px 6px rgba(0,0,0,0.2))" }}
                  >
                    <div
                      className="flex size-[38px] items-center justify-center rounded-full border-[2.5px] border-white"
                      style={{ backgroundColor: color }}
                    >
                      <p className="text-[14px] font-bold text-white">{pin.order}</p>
                    </div>
                    <div className="h-[8px] w-[3px] rounded-b-full" style={{ backgroundColor: color }} />
                  </div>
                </button>
              );
            })}

            {/* User location indicator */}
            {shareLocation && (
              <div
                className="absolute z-30"
                style={{ left: "50%", top: "45%", transform: "translate(-50%, -50%)" }}
              >
                <div className="relative">
                  <div className="absolute inset-[-8px] animate-ping rounded-full bg-[#3b82f6]/20" />
                  <div className="size-[16px] rounded-full border-[3px] border-white bg-[#3b82f6]" style={{ boxShadow: "0 2px 8px rgba(59,130,246,0.4)" }} />
                </div>
              </div>
            )}
          </div>

          {/* ═══════════ TOP UI ═══════════ */}
          {/* Back + Title Bar */}
          <div className="absolute left-0 right-0 top-0 z-20">
            <div className="flex items-center justify-between px-[12px] pt-[8px]">
              <button
                onClick={() => navigate("/session/active/library")}
                className="flex size-[38px] items-center justify-center rounded-full bg-white transition-all active:scale-95"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
              >
                <ChevronLeft size={20} className="text-[#292827]" strokeWidth={2.5} />
              </button>
              <div
                className="rounded-[12px] bg-white/95 px-[14px] py-[7px] backdrop-blur-sm"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
              >
                <p className="text-[13px] font-semibold text-[#292827]">Da Nang Trip</p>
              </div>
              <button
                onClick={() => setShowList(!showList)}
                className="flex size-[38px] items-center justify-center rounded-full bg-white transition-all active:scale-95"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
              >
                <List size={18} className="text-[#292827]" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Day Filter Tabs */}
          <div className="absolute left-0 right-0 top-[52px] z-20">
            <div className="scrollbar-hide flex gap-[6px] overflow-x-auto px-[14px] py-[4px]">
              {DAYS.map((day) => {
                const isActive = selectedDay === day.id;
                const color = day.id === 0 ? "#292827" : DAY_COLORS[day.id];
                return (
                  <button
                    key={day.id}
                    onClick={() => {
                      setSelectedDay(day.id);
                      setSelectedPin(null);
                    }}
                    className={`flex shrink-0 items-center gap-[6px] rounded-full px-[14px] py-[8px] text-[12px] font-semibold transition-all duration-200 active:scale-95`}
                    style={{
                      backgroundColor: isActive ? color : "white",
                      color: isActive ? "white" : "#545352",
                      boxShadow: isActive
                        ? `0 2px 10px ${color}40`
                        : "0 1px 4px rgba(0,0,0,0.08)",
                    }}
                  >
                    {day.label}
                    {day.date && (
                      <span className={isActive ? "text-white/70" : "text-[#b4b4b3]"}>
                        {day.date}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ═══════════ BOTTOM UI ═══════════ */}
          {/* Real-Time Toggle */}
          <div className="absolute bottom-[16px] left-[16px] right-[16px] z-20">
            {/* Selected Pin Card */}
            {selectedPin && (
              <div
                className="mb-[10px] flex items-center gap-[12px] rounded-[16px] bg-white p-[12px]"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
              >
                <img
                  src={selectedPin.img}
                  alt={selectedPin.name}
                  className="size-[56px] shrink-0 rounded-[12px] object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-[6px]">
                    <div
                      className="flex size-[20px] items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ backgroundColor: DAY_COLORS[selectedPin.day] }}
                    >
                      {selectedPin.order}
                    </div>
                    <p className="truncate text-[14px] font-bold leading-[18px] text-[#292827]">
                      {selectedPin.name}
                    </p>
                  </div>
                  <div className="mt-[4px] flex items-center gap-[8px] text-[12px] text-[#949493]">
                    <span className="font-medium">{selectedPin.time}</span>
                    <span className="text-[#d4d4d4]">|</span>
                    <span>{selectedPin.duration}</span>
                    <span className="text-[#d4d4d4]">|</span>
                    <span>{selectedPin.category}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Location Toggle Bar */}
            <div
              className="flex items-center justify-between rounded-[14px] bg-white px-[16px] py-[12px]"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-[10px]">
                <Radio
                  size={18}
                  className={shareLocation ? "text-[#3b82f6]" : "text-[#b4b4b3]"}
                  strokeWidth={2}
                />
                <div>
                  <p className="text-[13px] font-semibold leading-[16px] text-[#292827]">
                    Share Real-Time Location
                  </p>
                  <p className="text-[11px] text-[#949493]">
                    {shareLocation ? "Visible to group members" : "Off"}
                  </p>
                </div>
              </div>
              {/* Toggle Switch */}
              <button
                onClick={() => {
                  setShareLocation(!shareLocation);
                  toast(
                    shareLocation
                      ? "Location sharing stopped"
                      : "Sharing your location with the group"
                  );
                }}
                className={`relative h-[28px] w-[48px] rounded-full transition-all duration-300 ${
                  shareLocation ? "bg-[#3b82f6]" : "bg-[#d4d4d4]"
                }`}
              >
                <div
                  className={`absolute top-[2px] size-[24px] rounded-full bg-white transition-all duration-300 ${
                    shareLocation ? "left-[22px]" : "left-[2px]"
                  }`}
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}
                />
              </button>
            </div>
          </div>

          {/* ═══════════ ITINERARY LIST OVERLAY ═══════════ */}
          {showList && (
            <div
              className="absolute inset-0 z-40 flex items-end bg-black/50 backdrop-blur-sm"
              onClick={() => setShowList(false)}
            >
              <div
                className="max-h-[65vh] w-full overflow-y-auto rounded-t-[24px] bg-white"
                onClick={(e) => e.stopPropagation()}
                style={{ boxShadow: "0 -8px 40px rgba(0,0,0,0.15)" }}
              >
                <div className="sticky top-0 z-10 bg-white px-[20px] pb-[12px] pt-[16px]">
                  <div className="mb-[12px] flex justify-center">
                    <div className="h-[4px] w-[36px] rounded-full bg-[#d4d4d4]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-[18px] font-bold text-[#292827]">Itinerary</h2>
                    <button
                      onClick={() => setShowList(false)}
                      className="text-[13px] font-semibold text-[#ff6733]"
                    >
                      Done
                    </button>
                  </div>
                </div>
                <div className="px-[20px] pb-[32px]">
                  {[1, 2, 3].map((day) => {
                    const dayPins = TRIP_PINS.filter((p) => p.day === day).sort(
                      (a, b) => a.order - b.order
                    );
                    if (dayPins.length === 0) return null;
                    const color = DAY_COLORS[day];
                    return (
                      <div key={day} className="mb-[16px]">
                        <div className="mb-[8px] flex items-center gap-[8px]">
                          <div
                            className="size-[8px] rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <p className="text-[14px] font-bold text-[#292827]">
                            Day {day}
                          </p>
                          <p className="text-[12px] text-[#949493]">
                            {DAYS[day]?.date}
                          </p>
                        </div>
                        <div className="ml-[3px] flex flex-col border-l-[2px] border-dashed pl-[16px]" style={{ borderColor: `${color}40` }}>
                          {dayPins.map((pin, i) => (
                            <button
                              key={pin.id}
                              onClick={() => {
                                setSelectedPin(pin);
                                setSelectedDay(pin.day);
                                setShowList(false);
                              }}
                              className="flex items-center gap-[10px] rounded-[10px] py-[8px] transition-all active:bg-[#f5f5f5]"
                            >
                              <div
                                className="flex size-[28px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                                style={{ backgroundColor: color }}
                              >
                                {pin.order}
                              </div>
                              <div className="min-w-0 flex-1 text-left">
                                <p className="truncate text-[13px] font-semibold text-[#292827]">
                                  {pin.name}
                                </p>
                                <p className="text-[11px] text-[#949493]">
                                  {pin.time} · {pin.duration}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </PhoneFrame>
    </AndroidFrame>
  );
}
