import { MapPin, Bookmark, Star } from "lucide-react";
import type { MapPlace } from "../types";
import { CATEGORY_COLORS } from "../data";

type MapPinsProps = {
  places: MapPlace[];
  selectedId: string | null;
  onSelect: (place: MapPlace) => void;
  showRatings?: boolean;
};

export default function MapPins({ places, selectedId, onSelect, showRatings }: MapPinsProps) {
  return (
    <>
      {places.map((place) => {
        const isSelected = selectedId === place.id;
        const color = CATEGORY_COLORS[place.category] || "#ff6733";
        return (
          <button
            key={place.id}
            onClick={() => onSelect(place)}
            className="absolute transition-all duration-300"
            style={{
              left: `${place.x}%`,
              top: `${place.y}%`,
              transform: `translate(-50%, -100%) ${isSelected ? "scale(1.25)" : "scale(1)"}`,
              zIndex: isSelected ? 20 : 10,
            }}
          >
            <div
              className="flex flex-col items-center"
              style={{
                filter: isSelected
                  ? `drop-shadow(0 4px 12px ${color}40)`
                  : "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            >
              {/* Trending glow ring */}
              {place.trending && !isSelected && (
                <div
                  className="absolute top-0 size-[36px] animate-ping rounded-full opacity-25"
                  style={{ backgroundColor: color, animationDuration: "2s" }}
                />
              )}
              <div
                className="relative flex size-[36px] items-center justify-center rounded-full border-[2.5px] border-white"
                style={{ backgroundColor: color }}
              >
                {place.saved ? (
                  <Bookmark size={15} className="text-white" fill="white" strokeWidth={0} />
                ) : (
                  <MapPin size={15} className="text-white" strokeWidth={2.5} />
                )}
              </div>
              <div
                className="h-[8px] w-[3px] rounded-b-full"
                style={{ backgroundColor: color }}
              />
            </div>
            {/* Name tooltip */}
            {isSelected && (
              <div className="absolute left-1/2 top-[-36px] -translate-x-1/2 whitespace-nowrap rounded-[8px] bg-[#292827] px-[10px] py-[5px]">
                <p className="text-[11px] font-semibold text-white">{place.name}</p>
                <div className="absolute bottom-[-4px] left-1/2 size-[8px] -translate-x-1/2 rotate-45 bg-[#292827]" />
              </div>
            )}
            {/* Rating badge (trending mode) */}
            {showRatings && !isSelected && (
              <div className="absolute left-1/2 top-[48px] flex -translate-x-1/2 items-center gap-[2px] whitespace-nowrap rounded-full bg-white px-[6px] py-[2px]"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}>
                <Star size={9} className="fill-[#f59e0b] text-[#f59e0b]" />
                <span className="text-[9px] font-bold text-[#292827]">{place.rating}</span>
              </div>
            )}
          </button>
        );
      })}
    </>
  );
}
