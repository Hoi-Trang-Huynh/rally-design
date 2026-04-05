import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronRight,
  Calendar,
  MapPin,
  Library,
  Eye,
  Sparkles,
} from "lucide-react";
import PhoneFrame from "../../app/components/layout/phone-frame";
import AndroidFrame from "../../app/components/layout/android-frame";

// ─── Images ───
const AVATARS = [
  "https://images.unsplash.com/photo-1569913486515-b74bf7751574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwYXZhdGFyJTIwaGVhZHNob3R8ZW58MXx8fHwxNzczOTQ0Mzg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1748200100142-e8d4f689acd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGF2YXRhciUyMGhlYWRzaG90fGVufDF8fHx8MTc3Mzk0NDM4OHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1748344386932-f0b9c7b925e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mzg3NjEzNHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1543132220-e7fef0b974e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGNhc3VhbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzkwNTgyNnww&ixlib=rb-4.1.0&q=80&w=1080",
];

type Trip = {
  id: string;
  name: string;
  destination: string;
  coverImg: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "past";
  participants: { name: string; avatar: string }[];
  savedPlaces: number;
  daysLeft?: number;
};

const TRIPS: Trip[] = [
  {
    id: "trip-active",
    name: "Da Nang Beach Getaway",
    destination: "Da Nang, Vietnam",
    coverImg:
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    startDate: "Mar 28",
    endDate: "Apr 3",
    status: "active",
    participants: [
      { name: "You", avatar: AVATARS[0] },
      { name: "Minh", avatar: AVATARS[1] },
      { name: "Hana", avatar: AVATARS[2] },
    ],
    savedPlaces: 12,
    daysLeft: 4,
  },
  {
    id: "trip-1",
    name: "Weekend in Da Lat",
    destination: "Da Lat, Vietnam",
    coverImg:
      "https://images.unsplash.com/photo-1685345414422-74d065a8ffdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    startDate: "Aug 12",
    endDate: "Aug 15",
    status: "upcoming",
    participants: [
      { name: "You", avatar: AVATARS[0] },
      { name: "Minh", avatar: AVATARS[1] },
      { name: "Hana", avatar: AVATARS[2] },
      { name: "Tuan", avatar: AVATARS[3] },
    ],
    savedPlaces: 8,
  },
  {
    id: "trip-2",
    name: "Hoi An Lantern Festival",
    destination: "Hoi An, Vietnam",
    coverImg:
      "https://images.unsplash.com/photo-1535538561842-2048e2a61a2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    startDate: "Sep 20",
    endDate: "Sep 23",
    status: "upcoming",
    participants: [
      { name: "You", avatar: AVATARS[0] },
      { name: "Tuan", avatar: AVATARS[3] },
    ],
    savedPlaces: 5,
  },
  {
    id: "trip-3",
    name: "Saigon Food Tour",
    destination: "Ho Chi Minh City",
    coverImg:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    startDate: "Oct 5",
    endDate: "Oct 8",
    status: "upcoming",
    participants: [
      { name: "You", avatar: AVATARS[0] },
      { name: "Minh", avatar: AVATARS[1] },
      { name: "Hana", avatar: AVATARS[2] },
    ],
    savedPlaces: 3,
  },
];

// ─── Avatar Cluster ───
function AvatarCluster({ participants, size = 28 }: { participants: { name: string; avatar: string }[]; size?: number }) {
  return (
    <div className="flex -space-x-[8px]">
      {participants.slice(0, 4).map((p, i) => (
        <img
          key={i}
          src={p.avatar}
          alt={p.name}
          className="rounded-full border-[2px] border-white object-cover"
          style={{ width: size, height: size }}
        />
      ))}
      {participants.length > 4 && (
        <div
          className="flex items-center justify-center rounded-full border-[2px] border-white bg-[#eaeae9]"
          style={{ width: size, height: size }}
        >
          <p className="text-[9px] font-semibold text-[#545352]">
            +{participants.length - 4}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard Screen ───
export default function DashboardScreen() {
  const navigate = useNavigate();
  const activeTrip = TRIPS.find((t) => t.status === "active");
  const upcomingTrips = TRIPS.filter((t) => t.status === "upcoming");

  return (
    <AndroidFrame>
      <PhoneFrame activeTab="home" showHeader={false}>
        <div className="size-full overflow-y-auto bg-[#f8f7f5]">
          {/* ─── Welcome Banner ─── */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#ff6733] to-[#ff8f66] px-[20px] pb-[24px] pt-[16px]">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-medium leading-[18px] text-white/70">
                    Good morning,
                  </p>
                  <h1 className="mt-[2px] text-[26px] font-bold leading-[32px] tracking-[-0.5px] text-white">
                    Linh
                  </h1>
                </div>
                <div className="flex items-center gap-[10px]">
                  <button className="relative flex size-[40px] items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all active:scale-95">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <div className="absolute right-[8px] top-[8px] size-[8px] rounded-full border-[1.5px] border-[#ff6733] bg-white" />
                  </button>
                  <img
                    src={AVATARS[0]}
                    alt="You"
                    className="size-[40px] rounded-full border-[2px] border-white/30 object-cover"
                  />
                </div>
              </div>
              <div
                className="mt-[16px] flex items-center gap-[10px] rounded-[14px] bg-white/15 px-[14px] py-[12px] backdrop-blur-sm"
              >
                <Sparkles size={18} className="shrink-0 text-white/80" strokeWidth={2} />
                <p className="text-[13px] font-medium leading-[18px] text-white/90">
                  Ready for your next Rally? You have{" "}
                  <span className="font-bold text-white">
                    {upcomingTrips.length} upcoming
                  </span>{" "}
                  trip{upcomingTrips.length !== 1 ? "s" : ""}.
                </p>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -right-[40px] -top-[40px] size-[140px] rounded-full bg-white/5" />
            <div className="absolute -bottom-[30px] -left-[30px] size-[100px] rounded-full bg-white/5" />
          </div>

          {/* ─── Active Trip ─── */}
          {activeTrip && (
            <div className="px-[16px] pt-[20px]">
              <div className="mb-[12px] flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <div className="size-[8px] animate-pulse rounded-full bg-[#34c759]" />
                  <p className="text-[14px] font-semibold leading-[18px] text-[#292827]">
                    Active Trip
                  </p>
                </div>
                <p className="text-[12px] font-medium text-[#949493]">
                  {activeTrip.daysLeft} days left
                </p>
              </div>
              <button
                onClick={() => navigate("/session-overview")}
                className="group w-full overflow-hidden rounded-[18px] bg-white text-left transition-all duration-200 active:scale-[0.98]"
                style={{
                  boxShadow:
                    "0 2px 6px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                <div className="relative h-[140px] w-full overflow-hidden">
                  <img
                    src={activeTrip.coverImg}
                    alt={activeTrip.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-[12px] left-[14px] right-[14px]">
                    <p className="text-[18px] font-bold leading-[22px] text-white drop-shadow-sm">
                      {activeTrip.name}
                    </p>
                    <div className="mt-[4px] flex items-center gap-[6px]">
                      <MapPin size={12} className="text-white/80" strokeWidth={2.5} />
                      <p className="text-[12px] font-medium text-white/80">
                        {activeTrip.destination}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-[14px]">
                  <div className="flex items-center gap-[12px]">
                    <AvatarCluster participants={activeTrip.participants} size={26} />
                    <div className="flex items-center gap-[4px] text-[12px] font-medium text-[#949493]">
                      <Calendar size={13} strokeWidth={2} />
                      {activeTrip.startDate} - {activeTrip.endDate}
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/session/active/library");
                      }}
                      className="flex items-center gap-[5px] rounded-full bg-[#ff6733]/10 px-[10px] py-[6px] text-[11px] font-semibold text-[#ff6733] transition-all active:scale-95"
                    >
                      <Library size={12} strokeWidth={2.5} />
                      Library
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/session/active/map");
                      }}
                      className="flex items-center gap-[5px] rounded-full bg-[#f5f5f5] px-[10px] py-[6px] text-[11px] font-semibold text-[#545352] transition-all active:scale-95"
                    >
                      <MapPin size={12} strokeWidth={2.5} />
                      Map
                    </button>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* ─── Upcoming Trips ─── */}
          <div className="px-[16px] pb-[20px] pt-[24px]">
            <div className="mb-[12px] flex items-center justify-between">
              <p className="text-[16px] font-semibold leading-[20px] text-[#292827]">
                Upcoming Trips
              </p>
              <button className="flex items-center gap-[2px] text-[13px] font-medium text-[#ff6733] transition-all active:scale-95">
                See all
                <ChevronRight size={14} strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex flex-col gap-[10px]">
              {upcomingTrips.map((trip) => (
                <button
                  key={trip.id}
                  onClick={() => navigate("/session-overview")}
                  className="group flex w-full items-center gap-[12px] overflow-hidden rounded-[14px] bg-white p-[12px] text-left transition-all duration-200 active:scale-[0.99]"
                  style={{
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="relative size-[72px] shrink-0 overflow-hidden rounded-[12px]">
                    <img
                      src={trip.coverImg}
                      alt={trip.name}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold leading-[20px] text-[#292827]">
                      {trip.name}
                    </p>
                    <div className="mt-[3px] flex items-center gap-[5px]">
                      <Calendar size={12} className="text-[#b4b4b3]" strokeWidth={2} />
                      <p className="text-[12px] font-medium text-[#949493]">
                        {trip.startDate} - {trip.endDate}
                      </p>
                    </div>
                    <div className="mt-[8px] flex items-center justify-between">
                      <AvatarCluster participants={trip.participants} size={22} />
                      <div className="flex items-center gap-[4px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/session/1/library");
                          }}
                          className="flex items-center gap-[4px] rounded-full bg-[#ff6733]/10 px-[9px] py-[4px] text-[10px] font-semibold text-[#ff6733] transition-all active:scale-95"
                        >
                          <Library size={11} strokeWidth={2.5} />
                          {trip.savedPlaces}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/session-overview");
                          }}
                          className="flex items-center gap-[4px] rounded-full bg-[#f5f5f5] px-[9px] py-[4px] text-[10px] font-semibold text-[#545352] transition-all active:scale-95"
                        >
                          <Eye size={11} strokeWidth={2.5} />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PhoneFrame>
    </AndroidFrame>
  );
}
