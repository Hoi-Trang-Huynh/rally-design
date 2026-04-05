import { useState } from "react";
import { X } from "lucide-react";
import type { FriendLocation } from "../types";

type FriendMarkersProps = {
  friends: FriendLocation[];
};

export default function FriendMarkers({ friends }: FriendMarkersProps) {
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  return (
    <>
      {friends.map((f) => {
        const isSelected = selectedFriend === f.id;
        return (
          <div
            key={f.id}
            className="absolute z-[15] flex flex-col items-center"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Pulsing ring */}
            <div
              className="absolute size-[40px] animate-ping rounded-full opacity-20"
              style={{ backgroundColor: f.avatar }}
            />
            {/* Tappable avatar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFriend(isSelected ? null : f.id);
              }}
              className={`relative flex size-[30px] items-center justify-center rounded-full border-[2px] border-white transition-transform duration-200 ${isSelected ? "scale-125" : ""}`}
              style={{ backgroundColor: f.avatar, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
            >
              <p className="text-[11px] font-bold text-white">{f.initial}</p>
            </button>

            {/* Name label (always visible) */}
            <div
              className="mt-[2px] rounded-[4px] bg-white/90 px-[6px] py-[1px] backdrop-blur-sm"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
            >
              <p className="text-[9px] font-semibold text-[#292827]">{f.name}</p>
            </div>

            {/* Status tooltip (on tap) */}
            {isSelected && (
              <div
                className="absolute top-[-58px] left-1/2 -translate-x-1/2 flex items-center gap-[8px] whitespace-nowrap rounded-[12px] bg-white px-[12px] py-[8px] animate-in fade-in zoom-in-95 duration-150"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)" }}
              >
                <div
                  className="flex size-[24px] shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: f.avatar }}
                >
                  <p className="text-[9px] font-bold text-white">{f.initial}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[11px] font-semibold text-[#292827]">{f.name}</p>
                  <p className="text-[10px] text-[#949493]">{f.status}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFriend(null);
                  }}
                  className="ml-[4px] flex size-[18px] items-center justify-center rounded-full bg-[#f5f5f5]"
                >
                  <X size={9} strokeWidth={2.5} className="text-[#949493]" />
                </button>
                {/* Arrow */}
                <div className="absolute bottom-[-4px] left-1/2 size-[8px] -translate-x-1/2 rotate-45 bg-white" style={{ boxShadow: "2px 2px 2px rgba(0,0,0,0.04)" }} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
