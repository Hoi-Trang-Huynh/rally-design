import { useState } from "react";
import {
  ChevronLeft,
  Heart,
  Star,
  MapPin,
} from "lucide-react";
import type { RallySession, RallyPlace } from "../../types";

type Props = {
  sessions: RallySession[];
};

const CURRENT_USER = "m1";

export default function RalliesSaves({ sessions }: Props) {
  const [selectedSession, setSelectedSession] = useState<RallySession | null>(null);
  const [likeOverrides, setLikeOverrides] = useState<Record<string, boolean>>({});

  const toggleLike = (placeId: string, currentlyLiked: boolean) => {
    setLikeOverrides((prev) => ({ ...prev, [placeId]: !currentlyLiked }));
    // Also update the selected session data so the UI reflects the change
    if (selectedSession) {
      setSelectedSession((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          places: prev.places.map((p) => {
            if (p.id !== placeId) return p;
            const isLiked = likeOverrides[placeId] ?? p.upvotes.includes(CURRENT_USER);
            return {
              ...p,
              upvotes: isLiked
                ? p.upvotes.filter((id) => id !== CURRENT_USER)
                : [...p.upvotes, CURRENT_USER],
            };
          }),
        };
      });
    }
  };

  if (selectedSession) {
    return (
      <SessionDetail
        session={selectedSession}
        onBack={() => { setSelectedSession(null); setLikeOverrides({}); }}
        onLike={toggleLike}
      />
    );
  }

  return (
    <div className="flex flex-col gap-[10px] px-[16px] pb-[100px] pt-[4px]">
      {sessions.map((session) => (
        <button
          key={session.id}
          onClick={() => setSelectedSession(session)}
          className="flex overflow-hidden rounded-[14px] bg-white transition-all active:scale-[0.98]"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)" }}
        >
          {/* Cover image */}
          <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden">
            <img src={session.coverImg} alt={session.name} className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col justify-center gap-[6px] p-[12px]">
            <div className="text-left text-[14px] font-bold text-[#292827]">{session.name}</div>
            <div className="text-left text-[11px] text-[#949493]">{session.date}</div>
            <div className="flex items-center gap-[8px]">
              {/* Place count badge */}
              <div className="flex items-center gap-[3px] rounded-full bg-[#ff6733]/10 px-[8px] py-[3px]">
                <MapPin size={10} className="text-[#ff6733]" />
                <span className="text-[10px] font-semibold text-[#ff6733]">{session.placeCount} places</span>
              </div>
              {/* Member avatars */}
              <div className="flex -space-x-[6px]">
                {session.members.slice(0, 3).map((m) => (
                  <img
                    key={m.id}
                    src={m.avatar}
                    alt={m.name}
                    className="size-[20px] rounded-full border-[1.5px] border-white object-cover"
                  />
                ))}
                {session.members.length > 3 && (
                  <div className="flex size-[20px] items-center justify-center rounded-full border-[1.5px] border-white bg-[#eaeae9] text-[8px] font-bold text-[#545352]">
                    +{session.members.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Session Detail (inline) ───────────────────────────────────────────────

function SessionDetail({
  session,
  onBack,
  onLike,
}: {
  session: RallySession;
  onBack: () => void;
  onLike: (placeId: string, currentlyLiked: boolean) => void;
}) {
  return (
    <div className="flex flex-col pb-[100px]">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-[8px] border-b border-[#eaeae9]/60 bg-white px-[12px] py-[10px]">
        <button
          onClick={onBack}
          className="flex size-[30px] items-center justify-center rounded-full bg-[#f5f5f5] transition-all active:scale-90"
        >
          <ChevronLeft size={16} className="text-[#292827]" />
        </button>
        <div className="flex-1">
          <div className="text-[14px] font-bold text-[#292827]">{session.name}</div>
          <div className="text-[11px] text-[#949493]">{session.date} · {session.places.length} places</div>
        </div>
        <div className="flex -space-x-[6px]">
          {session.members.slice(0, 4).map((m) => (
            <img
              key={m.id}
              src={m.avatar}
              alt={m.name}
              className="size-[24px] rounded-full border-[1.5px] border-white object-cover"
            />
          ))}
        </div>
      </div>

      {/* Places list */}
      <div className="flex flex-col gap-[12px] px-[12px] pt-[12px]">
        {session.places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            members={session.members}
            onLike={onLike}
          />
        ))}

        {session.places.length === 0 && (
          <div className="flex flex-col items-center gap-[8px] py-[32px] text-center">
            <MapPin size={32} className="text-[#d4d4d4]" />
            <p className="text-[13px] text-[#949493]">No places added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Place Card (collaborative) ────────────────────────────────────────────

function PlaceCard({
  place,
  members,
  onLike,
}: {
  place: RallyPlace;
  members: { id: string; name: string; avatar: string }[];
  onLike: (placeId: string, currentlyLiked: boolean) => void;
}) {
  const getMember = (id: string) => members.find((m) => m.id === id);
  const isLiked = place.upvotes.includes(CURRENT_USER);
  const likeCount = place.upvotes.length;

  return (
    <div
      className="flex flex-col overflow-hidden rounded-[14px] bg-white"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)" }}
    >
      {/* Image + info */}
      <div className="flex gap-[10px] p-[10px]">
        <img
          src={place.img}
          alt={place.name}
          className="size-[64px] shrink-0 rounded-[10px] object-cover"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <div className="text-[13px] font-bold text-[#292827]">{place.name}</div>
          <div className="flex items-center gap-[4px] text-[10px] text-[#949493]">
            <Star size={10} className="fill-[#f59e0b] text-[#f59e0b]" />
            <span className="font-semibold text-[#292827]">{place.rating}</span>
            <span>·</span>
            <span>{place.category}</span>
          </div>
          <div className="flex items-center gap-[3px] text-[10px] text-[#949493]">
            <MapPin size={10} />
            {place.address}
          </div>
        </div>
      </div>

      {/* Likes + avatars */}
      <div className="flex items-center justify-between border-t border-[#eaeae9]/60 px-[10px] py-[8px]">
        <button onClick={() => onLike(place.id, isLiked)}
          className="flex items-center gap-[4px] rounded-full px-[10px] py-[5px] transition-all active:scale-95"
          style={{ background: isLiked ? "rgba(255,68,102,0.15)" : "rgba(255,68,102,0.07)" }}>
          <Heart size={13} className={isLiked ? "fill-[#ff4466] text-[#ff4466]" : "text-[#ff4466]"} />
          <span className="text-[11px] font-semibold text-[#ff4466]">{likeCount}</span>
        </button>
        {likeCount > 0 && (
          <div className="flex -space-x-[5px]">
            {place.upvotes.slice(0, 4).map((mId) => {
              const m = getMember(mId);
              return m ? (
                <img key={m.id} src={m.avatar} alt={m.name} className="size-[20px] rounded-full border-[1.5px] border-white object-cover" />
              ) : null;
            })}
            {place.upvotes.length > 4 && (
              <div className="flex size-[20px] items-center justify-center rounded-full border-[1.5px] border-white bg-[#eaeae9] text-[8px] font-bold text-[#545352]">
                +{place.upvotes.length - 4}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Added by */}
      <div className="border-t border-[#eaeae9]/60 px-[10px] py-[6px]">
        <span className="text-[10px] text-[#b4b4b3]">
          Added by {getMember(place.addedBy)?.name}
        </span>
      </div>
    </div>
  );
}
