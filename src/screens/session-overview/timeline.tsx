import { useState, useRef, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, MoreHorizontal, Clock, X, MapPin } from "lucide-react";
import { toast, Toaster } from "sonner";
import AndroidFrame from "../../app/components/layout/android-frame";

const FONT = "font-['Inclusive_Sans',sans-serif]";

// ─── Types ─────────────────────────────────────────────────────────────────
type CardState = "active" | "default" | "disabled";

type EventCard = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  state: CardState;
};

type TimePeriod = {
  period: string;
  timeRange: string;
  cards: EventCard[];
};

type DayData = {
  dayNum: number;
  label: string;
  date: number;
  destination: string;
  periods: TimePeriod[];
};

// ─── Data ───────────────────────────────────────────────────────────────────
const DAYS: DayData[] = [
  {
    dayNum: 1,
    label: "Fri",
    date: 14,
    destination: "Vietnam → Bangkok",
    periods: [
      {
        period: "Night",
        timeRange: "24:00 - 5:00",
        cards: [
          {
            id: "d1n1",
            title: "Airport check-in & departure",
            startTime: "3:00 AM",
            endTime: "6:00 AM",
            description: "Lorem ipsum dolor sit amet conse.",
            state: "disabled",
          },
        ],
      },
      {
        period: "Morning",
        timeRange: "5:00 - 12:00",
        cards: [
          {
            id: "d1m1",
            title: "International flight",
            startTime: "6:00 AM",
            endTime: "9:00 AM",
            description: "Lorem ipsum dolor sit amet conse.",
            state: "active",
          },
          {
            id: "d1m2",
            title: "Arrival & hotel check-in",
            startTime: "10:00 AM",
            endTime: "12:00 PM",
            description: "Lorem ipsum dolor sit amet con.",
            state: "default",
          },
        ],
      },
      {
        period: "Evening",
        timeRange: "18:00 - 5:00",
        cards: [
          {
            id: "d1e1",
            title: "Rest & short walk",
            startTime: "18:00 PM",
            endTime: "20:00 PM",
            description:
              "Lorem ipsum dolor sit amet consectetur. Nunc vestibulum suspendisse et non at sollicitudin ut et gravida.",
            state: "default",
          },
        ],
      },
    ],
  },
  {
    dayNum: 2,
    label: "Sat",
    date: 15,
    destination: "Bangkok City",
    periods: [
      {
        period: "Morning",
        timeRange: "5:00 - 12:00",
        cards: [
          {
            id: "d2m1",
            title: "Cultural & city landmarks",
            startTime: "8:00",
            endTime: "11:00",
            description:
              "Lorem ipsum dolor sit amet consectetur. Nunc vestibulum suspendisse et non at sollicitudin ut et gravida.",
            state: "default",
          },
        ],
      },
      {
        period: "Afternoon",
        timeRange: "12:00 - 18:00",
        cards: [
          {
            id: "d2a1",
            title: "History & local life",
            startTime: "13:00",
            endTime: "16:00",
            description:
              "Lorem ipsum dolor sit amet consectetur. Nunc vestibulum suspendisse et non at sollicitudin ut et gravida.",
            state: "default",
          },
        ],
      },
      {
        period: "Evening",
        timeRange: "18:00 - 5:00",
        cards: [
          {
            id: "d2e1",
            title: "Hotel Check-in",
            startTime: "18:00",
            endTime: "21:00",
            description:
              "Lorem ipsum dolor sit amet consectetur. Nunc vestibulum suspendisse et non at sollicitudin ut et gravida.",
            state: "default",
          },
        ],
      },
    ],
  },
  { dayNum: 3, label: "Sun", date: 16, destination: "Bangkok City", periods: [] },
  { dayNum: 4, label: "Mon", date: 17, destination: "Ayutthaya", periods: [] },
  { dayNum: 5, label: "Tue", date: 18, destination: "Ayutthaya", periods: [] },
  { dayNum: 6, label: "Wed", date: 19, destination: "Chiang Mai", periods: [] },
  { dayNum: 7, label: "Thu", date: 20, destination: "Chiang Mai", periods: [] },
  { dayNum: 8, label: "Fri", date: 21, destination: "Chiang Mai", periods: [] },
  { dayNum: 9, label: "Sat", date: 22, destination: "Phuket", periods: [] },
  { dayNum: 10, label: "Sun", date: 23, destination: "Phuket", periods: [] },
  { dayNum: 11, label: "Mon", date: 24, destination: "Phuket", periods: [] },
  { dayNum: 12, label: "Tue", date: 25, destination: "Vietnam", periods: [] },
  { dayNum: 13, label: "Wed", date: 26, destination: "Home", periods: [] },
];

const TABS = ["Overview", "Timeline", "Participants", "Media", "Template", "Budget"];

// ─── Walk person icon (Material Design directions_walk) ─────────────────────
function WalkIcon({ color = "currentColor", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9 1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
    </svg>
  );
}

// ─── Event Card ─────────────────────────────────────────────────────────────
function EventCard({ card, onPress }: { card: EventCard; onPress: () => void }) {
  const isActive = card.state === "active";
  const isDisabled = card.state === "disabled";

  // Icon button colors
  const iconBg = isActive ? "bg-[#ff6733]" : "bg-[#f5f5f5]";
  const iconColor = isActive ? "white" : isDisabled ? "#c8c8c7" : "#a9a9a9";

  // Card content colors
  const cardBg = isActive ? "bg-[#ffeee8]" : "bg-[#f5f5f5]";
  const headingColor = isDisabled ? "text-[#a9a9a9]" : "text-[#3e3e3d]";
  const timeBadgeBg = isActive ? "bg-[#ffccbb]" : "bg-[#eaeae9]";
  const timeColor = isActive ? "text-[#5c1f0a]" : isDisabled ? "text-[#a9a9a9]" : "text-[#545352]";
  const descColor = isDisabled ? "text-[#bfbfbe]" : isActive ? "text-[#696968]" : "text-[#949493]";

  return (
    <button
      onClick={onPress}
      className="flex w-full gap-[10px] items-start text-left cursor-pointer active:opacity-70 transition-opacity duration-150"
    >
      {/* Icon button */}
      <div className="shrink-0 w-[40px] flex flex-col items-center justify-center rounded-[8px]">
        <div className={`flex h-[40px] w-full items-center justify-center rounded-full overflow-clip ${iconBg}`}>
          <WalkIcon color={iconColor} size={20} />
        </div>
      </div>

      {/* Card body */}
      <div className={`flex flex-1 flex-col gap-[4px] rounded-[8px] px-[12px] py-[10px] min-w-0 ${cardBg}`}>
        {/* Title */}
        <p className={`text-[16px] font-medium leading-[24px] truncate ${headingColor}`}>
          {card.title}
        </p>

        {/* Time badge */}
        <div className={`flex items-center gap-[6px] self-start rounded-[8px] px-[8px] py-[6px] ${timeBadgeBg}`}>
          <Clock className={`shrink-0 ${timeColor}`} size={16} strokeWidth={1.5} />
          <span className={`text-[14px] font-medium leading-[20px] whitespace-nowrap ${timeColor}`}>
            {card.startTime} - {card.endTime}
          </span>
        </div>

        {/* Description */}
        <p className={`text-[14px] leading-[18px] line-clamp-2 ${descColor}`}>
          {card.description}
        </p>
      </div>
    </button>
  );
}

// ─── Time Period Group ───────────────────────────────────────────────────────
function TimePeriodGroup({ period }: { period: TimePeriod }) {
  return (
    <div className="flex flex-col gap-[8px] pb-[12px]">
      {/* Header row */}
      <div className="flex items-center justify-between bg-white pl-[10px] pt-[8px] pb-[4px] capitalize">
        <p className="text-[16px] font-normal leading-[24px] text-[#a9a9a9]">{period.period}</p>
        <p className="text-[16px] font-normal leading-[24px] text-[#a9a9a9]">{period.timeRange}</p>
      </div>
      {/* Event cards */}
      {period.cards.map((card) => (
        <EventCard
          key={card.id}
          card={card}
          onPress={() => toast(`${card.title} — tapped`)}
        />
      ))}
    </div>
  );
}

// ─── Form Field Helper ───────────────────────────────────────────────────────
const INPUT_CLASS =
  "w-full rounded-[10px] border-[1.5px] border-[#eaeae9] bg-[#f9f9f9] px-[12px] py-[10px] text-[14px] leading-[20px] text-[#292827] outline-none placeholder:text-[#c4c4c3] transition-colors duration-150 focus:border-[#ff6733] focus:bg-white";

function FormField({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-[6px] ${className ?? ""}`}>
      <div className="flex items-center gap-[3px]">
        <p className="text-[12px] font-medium leading-[16px] text-[#545352]">{label}</p>
        {required && <span className="text-[12px] font-medium text-[#ff6733]">*</span>}
      </div>
      {children}
    </div>
  );
}

// ─── Add Event Bottom Sheet ───────────────────────────────────────────────────
function AddEventModal({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; location: string; description: string; date: string; time: string }) => void;
}) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const now = new Date();
  const timestamp = now.toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  const canSubmit = title.trim() !== "" && date !== "" && time !== "";

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end" onClick={onClose}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      />

      {/* Sheet */}
      <div
        className={`relative z-10 flex max-h-[90%] flex-col rounded-t-[24px] bg-white transition-transform duration-300 ease-out ${visible ? "translate-y-0" : "translate-y-full"}`}
        style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.14)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex shrink-0 justify-center pb-[8px] pt-[12px]">
          <div className="h-[4px] w-[36px] rounded-full bg-[#d4d4d4]" />
        </div>

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between px-[16px] pb-[12px]">
          <p className="text-[18px] font-semibold leading-[24px] text-[#292827]">Add Event</p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex size-[32px] items-center justify-center rounded-full bg-[#f5f5f5] transition-transform duration-150 active:scale-90"
          >
            <X size={14} strokeWidth={2.5} className="text-[#545352]" />
          </button>
        </div>

        <div className="h-[0.6px] w-full shrink-0 bg-[#eaeae9]" />

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto px-[16px] py-[16px]">
          <div className="flex flex-col gap-[14px]">

            {/* Event Title */}
            <FormField label="Event Title" required>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Temple visit, Dinner at riverside"
                className={INPUT_CLASS}
                style={{ fontFeatureSettings: "'ss01'" }}
              />
            </FormField>

            {/* Location */}
            <FormField label="Location">
              <div className="relative">
                <div className="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2">
                  <MapPin size={16} className="text-[#949493]" strokeWidth={1.8} />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Search location..."
                  className={`${INPUT_CLASS} pl-[34px]`}
                  style={{ fontFeatureSettings: "'ss01'" }}
                />
              </div>
              <p className="text-[11px] leading-[14px] text-[#b4b4b3]">Powered by Google</p>
            </FormField>

            {/* Description */}
            <FormField label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional notes or details about this event..."
                rows={3}
                className={`${INPUT_CLASS} resize-none`}
                style={{ fontFeatureSettings: "'ss01'" }}
              />
            </FormField>

            {/* Meet-up Date + Time */}
            <div className="flex gap-[10px]">
              <FormField label="Meet-up Date" required className="flex-1">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={INPUT_CLASS}
                />
              </FormField>
              <FormField label="Meet-up Time" required className="flex-1">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={INPUT_CLASS}
                />
              </FormField>
            </div>

            {/* Metadata card */}
            <div className="flex flex-col gap-[10px] rounded-[12px] bg-[#f9f9f8] px-[12px] py-[12px]">
              {/* Created By */}
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium text-[#949493]">Created By</p>
                <div className="flex items-center gap-[6px]">
                  <div className="flex size-[20px] items-center justify-center rounded-full bg-[#ff6733]">
                    <p className="text-[10px] font-bold leading-none text-white">Y</p>
                  </div>
                  <p className="text-[12px] font-medium text-[#545352]">You</p>
                </div>
              </div>

              <div className="h-[0.6px] bg-[#eaeae9]" />

              {/* Created Date */}
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium text-[#949493]">Created</p>
                <p className="text-[12px] text-[#545352]">{timestamp}</p>
              </div>

              {/* Last Updated */}
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium text-[#949493]">Last Updated</p>
                <p className="text-[12px] text-[#545352]">{timestamp}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Submit */}
        <div className="shrink-0 px-[16px] pb-[20px] pt-[10px]" style={{ boxShadow: "0 -8px 16px rgba(255,255,255,0.95)" }}>
          <button
            disabled={!canSubmit}
            onClick={() => canSubmit && onSubmit({ title, location, description, date, time })}
            className={`flex h-[48px] w-full items-center justify-center rounded-full transition-all duration-150 ${
              canSubmit
                ? "bg-[#ff6733] active:scale-[0.99] active:bg-[#e55a28]"
                : "cursor-not-allowed bg-[#eaeae9]"
            }`}
            style={canSubmit ? { boxShadow: "0 2px 12px rgba(255,103,51,0.35)" } : {}}
          >
            <p
              className={`text-[16px] font-medium leading-[24px] ${canSubmit ? "text-white" : "text-[#b4b4b3]"}`}
              style={{ fontFeatureSettings: "'ss01' 1" }}
            >
              Add Event
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Timeline Content ────────────────────────────────────────────────────────
function TimelineContent() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(1);
  const dayPickerRef = useRef<HTMLDivElement>(null);

  // Add Event Modal state
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [addEventVisible, setAddEventVisible] = useState(false);

  const openAddEvent = () => {
    setShowAddEvent(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setAddEventVisible(true)));
  };

  const closeAddEvent = () => {
    setAddEventVisible(false);
    setTimeout(() => setShowAddEvent(false), 300);
  };

  const currentDay = DAYS.find((d) => d.dayNum === selectedDay) ?? DAYS[0];

  // Scroll the active day tab into view when it changes
  useEffect(() => {
    const container = dayPickerRef.current;
    if (!container) return;
    const activeEl = container.querySelector<HTMLElement>(`[data-day="${selectedDay}"]`);
    if (!activeEl) return;
    activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedDay]);

  return (
    <div className={`relative flex flex-col h-full bg-[#f5f5f5] ${FONT}`}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col shrink-0 bg-white">
        {/* Title row */}
        <div className="flex items-center gap-[12px] w-full px-[16px] pt-[16px] pb-[12px]">
          <button
            onClick={() => navigate("/session-overview")}
            className="flex size-[44px] shrink-0 items-center justify-center text-[#292827] transition-transform duration-200 active:scale-90"
            aria-label="Back to session overview"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>

          <div className="min-w-0 flex-1">
            <p className="text-[20px] font-medium leading-[28px] text-[#292827]">
              Tour: Thai Lan
            </p>
            <p className="text-[14px] leading-[24px] text-[#949493]">
              14 Jun - 26 Jun 2026
            </p>
          </div>

          {/* Draft badge */}
          <div className="shrink-0 rounded-[28px] bg-[#d4d4d4] px-[16px] py-[8px] shadow-sm">
            <p className="text-[14px] font-medium leading-[16px] text-[#292827]" style={{ fontFeatureSettings: "'ss01'" }}>Draft</p>
          </div>

          <button
            className="flex size-[44px] shrink-0 items-center justify-center text-[#292827] transition-transform duration-200 active:scale-90"
            onClick={() => toast("More options coming soon")}
            aria-label="More options"
          >
            <MoreHorizontal size={22} strokeWidth={2} />
          </button>
        </div>

        {/* ── Tab bar ─────────────────────────────────────────────────── */}
        <div className="relative w-full" role="tablist" aria-label="Session sections">
          <div
            className="flex overflow-x-auto p-[0px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {TABS.map((tab) => {
              const isActive = tab === "Timeline";
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    if (tab === "Overview") navigate("/session-overview");
                    else if (tab !== "Timeline") toast(`${tab} tab coming soon`);
                  }}
                  className={`relative shrink-0 px-[12px] pb-[10px] pt-[8px] text-[14px] leading-[20px] transition-all duration-200 ${
                    isActive
                      ? "text-[#292827] font-medium"
                      : "text-[#696968] hover:text-[#545352]"
                  }`}
                  style={{ fontFeatureSettings: "'ss01'" }}
                >
                  {tab}
                  {isActive && (
                    <span
                      className="absolute bottom-[-1px] left-[12px] right-[12px] h-[2px] rounded-full bg-[#ff6733]"
                      style={{ boxShadow: "0 0 8px rgba(255, 103, 51, 0.4)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[0.6px] bg-[#eaeae9]" />
        </div>
      </div>

      {/* ── Main white area ──────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col bg-white overflow-hidden">

        {/* Day picker */}
        <div className="shrink-0 pt-[12px] pb-[2px] bg-white">
          <div
            ref={dayPickerRef}
            className="flex gap-[24px] overflow-x-auto scrollbar-hide px-[20px]"
          >
            {DAYS.map((day) => {
              const isActive = day.dayNum === selectedDay;
              return (
                <button
                  key={day.dayNum}
                  data-day={day.dayNum}
                  onClick={() => setSelectedDay(day.dayNum)}
                  className={`flex flex-col items-center gap-[2px] shrink-0 w-[30px] rounded-[8px] transition-all duration-150 ${
                    isActive ? "text-[#545352]" : "text-[#949493]"
                  }`}
                >
                  <p className={`text-[16px] leading-[24px] ${isActive ? "font-semibold" : "font-normal"}`}>
                    {day.label}
                  </p>
                  <p className={`text-[14px] leading-[24px] ${isActive ? "font-semibold" : "font-normal"}`}>
                    {day.date}
                  </p>
                  {/* Active indicator dot */}
                  <div
                    className={`rounded-full transition-all duration-200 ${
                      isActive ? "size-[4px] bg-[#ff6733]" : "size-[4px] bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Day title + scrollable cards */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Day title */}
          <div className="flex items-start gap-[4px] px-[20px] pt-[10px] pb-[8px] bg-white shrink-0">
            <p className="text-[16px] font-medium leading-[24px] text-[#7f7e7d] whitespace-nowrap">
              Day {currentDay.dayNum} :
            </p>
            <p className="flex-1 text-[16px] font-medium leading-[24px] text-[#292827]">
              {currentDay.destination}
            </p>
          </div>

          {/* Scrollable event list */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden border-t border-[#f5f5f5]">
            <div className="flex flex-col px-[16px] pr-[20px] pb-[8px]">
              {currentDay.periods.length > 0 ? (
                currentDay.periods.map((period) => (
                  <TimePeriodGroup key={period.period} period={period} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-[8px] py-[48px] text-center">
                  <p className="text-[16px] font-medium text-[#949493]">No events planned</p>
                  <p className="text-[14px] leading-[20px] text-[#b4b4b3] max-w-[200px]">
                    Tap "Add Event Card" to plan activities for Day {currentDay.dayNum}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom: Add Event Card ──────────────────────────────────────── */}
      <div
        className="flex flex-col items-center gap-[16px] pt-[12px] shrink-0 bg-white"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,1) 40%)",
          boxShadow: "0 -8px 20px rgba(255,255,255,0.8)",
        }}
      >
        <div className="w-full px-[20px]">
          <button
            onClick={() => openAddEvent()}
            className="w-full h-[48px] rounded-full bg-[#ff6733] flex items-center justify-center active:bg-[#e55a28] active:scale-[0.99] transition-all duration-150"
            style={{ boxShadow: "0 2px 12px rgba(255,103,51,0.35)" }}
          >
            <p className="text-[16px] font-medium leading-[24px] text-white" style={{ fontFeatureSettings: "'ss01' 1" }}>
              Add Event Card
            </p>
          </button>
        </div>

        {/* iOS home indicator */}
        <div className="flex items-center justify-center w-full pb-[8px] h-[26px]">
          <div className="w-[134px] h-[5px] bg-black rounded-full opacity-20" />
        </div>
      </div>

      {/* Add Event Bottom Sheet */}
      {showAddEvent && (
        <AddEventModal
          visible={addEventVisible}
          onClose={closeAddEvent}
          onSubmit={({ title }) => {
            toast.success(`"${title}" added to Day ${currentDay.dayNum}`);
            closeAddEvent();
          }}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}

// ─── Screen Export ───────────────────────────────────────────────────────────
export default function TimelineScreen() {
  return (
    <AndroidFrame>
      <style>{`
        .timeline-root {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
      <TimelineContent />
    </AndroidFrame>
  );
}
