import { Star, Bookmark, Clock, Flame } from "lucide-react";
import type { EventCard as EventCardType } from "../../types";

type Props = {
  card: EventCardType;
  onSave: (id: string) => void;
  showPrice?: boolean; // for "Where to Stay"
};

export default function EventCard({ card, onSave, showPrice }: Props) {
  return (
    <div
      className="relative flex w-[200px] shrink-0 snap-start flex-col overflow-hidden rounded-[14px] bg-white"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)" }}
    >
      {/* Image */}
      <div className="relative h-[120px] w-full overflow-hidden">
        <img
          src={card.img}
          alt={card.name}
          className="size-full object-cover"
        />
        {/* Trending badge */}
        {card.trending && (
          <div className="absolute left-[8px] top-[8px] flex items-center gap-[3px] rounded-full bg-[#ff6733] px-[7px] py-[3px] text-[9px] font-bold text-white">
            <Flame size={10} />
            Trending
          </div>
        )}
        {/* Price badge for hotels */}
        {showPrice && card.avgPrice && (
          <div className="absolute bottom-[8px] left-[8px] rounded-full bg-black/60 px-[8px] py-[3px] text-[10px] font-bold text-white">
            {card.avgPrice}
          </div>
        )}
        {/* Save button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(card.id);
          }}
          className="absolute right-[8px] top-[8px] flex size-[28px] items-center justify-center rounded-full transition-all active:scale-90"
          style={{
            background: card.saved ? "#22c55e" : "rgba(255,255,255,0.9)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          }}
        >
          <Bookmark
            size={14}
            strokeWidth={2.2}
            className={card.saved ? "fill-white text-white" : "text-[#545352]"}
          />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-[4px] p-[10px]">
        <div className="truncate text-[13px] font-semibold text-[#292827]">{card.name}</div>
        <div className="flex items-center gap-[6px]">
          <div className="flex items-center gap-[2px]">
            <Star size={11} className="fill-[#f59e0b] text-[#f59e0b]" />
            <span className="text-[11px] font-semibold text-[#292827]">{card.rating}</span>
            <span className="text-[10px] text-[#949493]">({card.reviewCount})</span>
          </div>
          <span className="text-[10px] text-[#b4b4b3]">·</span>
          <span className="text-[10px] font-medium text-[#949493]">{card.priceLevel}</span>
        </div>
        <div className="flex items-center gap-[4px] text-[10px] text-[#949493]">
          <Clock size={10} />
          <span>{card.openClose}</span>
          <span className="text-[#b4b4b3]">·</span>
          <span>{card.distance}</span>
        </div>
      </div>
    </div>
  );
}
