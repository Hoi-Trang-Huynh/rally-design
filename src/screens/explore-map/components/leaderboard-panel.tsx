import { X, Trophy, MapPin } from "lucide-react";
import type { LeaderboardEntry } from "../types";

type Props = {
  entries: LeaderboardEntry[];
  onClose: () => void;
};

const RANK_COLORS = ["#f59e0b", "#94a3b8", "#cd7f32"]; // gold, silver, bronze

export default function LeaderboardPanel({ entries, onClose }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div
        className="relative mt-auto flex flex-col bg-white"
        style={{
          borderRadius: "24px 24px 0 0",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
          animation: "slideUp 0.3s ease-out",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center py-[10px]">
          <div className="h-[4px] w-[36px] rounded-full bg-[#d4d4d4]" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-[16px] top-[12px] flex size-[30px] items-center justify-center rounded-full bg-[#f5f5f5] transition-all active:scale-90"
        >
          <X size={16} className="text-[#545352]" />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-[16px] px-[20px] pb-[32px]">
          {/* Title */}
          <div className="flex items-center gap-[8px]">
            <Trophy size={20} className="text-[#f59e0b]" />
            <h3 className="text-[16px] font-bold text-[#292827]">Explorer Leaderboard</h3>
          </div>
          <p className="text-[12px] text-[#949493]">
            Ranked by area explored in Da Nang
          </p>

          {/* Leaderboard list */}
          <div className="flex flex-col gap-[8px]">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-[10px] rounded-[12px] p-[10px] transition-all"
                style={{
                  background: entry.isCurrentUser ? "#ff6733/8" : "#f8f7f5",
                  border: entry.isCurrentUser ? "1.5px solid #ff6733" : "1.5px solid transparent",
                  ...(entry.isCurrentUser ? { background: "rgba(255,103,51,0.06)" } : {}),
                }}
              >
                {/* Rank */}
                <div
                  className="flex size-[28px] shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                  style={{
                    background: entry.rank <= 3 ? RANK_COLORS[entry.rank - 1] : "#d4d4d4",
                  }}
                >
                  {entry.rank}
                </div>

                {/* Avatar */}
                <div
                  className="flex size-[32px] shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
                  style={{ background: entry.avatar }}
                >
                  {entry.initial}
                </div>

                {/* Name + area */}
                <div className="flex-1">
                  <div className="flex items-center gap-[4px]">
                    <span className="text-[13px] font-semibold text-[#292827]">{entry.name}</span>
                    {entry.isCurrentUser && (
                      <span className="rounded-full bg-[#ff6733]/10 px-[6px] py-[1px] text-[9px] font-bold text-[#ff6733]">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-[3px] text-[11px] text-[#949493]">
                    <MapPin size={10} />
                    {entry.areaPercent}% explored
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-[6px] w-[50px] overflow-hidden rounded-full bg-[#eaeae9]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${entry.areaPercent}%`,
                      background: entry.isCurrentUser
                        ? "#ff6733"
                        : entry.rank <= 3
                        ? RANK_COLORS[entry.rank - 1]
                        : "#949493",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
