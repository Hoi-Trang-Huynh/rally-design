import { ChevronRight, Flame, MapPin } from "lucide-react";
import type { ExploreSection } from "../../types";
import EventCard from "./event-card";

type Props = {
  sections: ExploreSection[];
  onSaveCard: (id: string) => void;
  onTrendingOnMaps: () => void;
};

export default function ExploreTab({ sections, onSaveCard, onTrendingOnMaps }: Props) {
  return (
    <div className="flex flex-col gap-[20px] pb-[100px] pt-[4px]">
      {sections.map((section) => (
        <div key={section.id} className="flex flex-col gap-[10px]">
          {/* Section header */}
          <div className="flex items-center justify-between px-[16px]">
            <div>
              <h3 className="text-[15px] font-bold text-[#292827]">{section.title}</h3>
              {section.subtitle && (
                <p className="text-[11px] text-[#949493]">{section.subtitle}</p>
              )}
            </div>
            <button className="flex items-center gap-[2px] text-[12px] font-semibold text-[#ff6733] transition-all active:scale-95">
              See more
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Trending on Maps button (only for trending section) */}
          {section.id === "trending" && (
            <div className="px-[16px]">
              <button
                onClick={onTrendingOnMaps}
                className="flex items-center gap-[6px] rounded-full border border-[#eaeae9] bg-white px-[12px] py-[7px] text-[12px] font-semibold text-[#292827] transition-all active:scale-95"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div className="flex size-[22px] items-center justify-center rounded-full bg-[#ff6733]/10">
                  <Flame size={12} className="text-[#ff6733]" />
                </div>
                Trending on Maps
                <MapPin size={12} className="text-[#949493]" />
              </button>
            </div>
          )}

          {/* Card carousel */}
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-[10px] overflow-x-auto px-[16px]">
            {section.cards.map((card) => (
              <EventCard
                key={card.id}
                card={card}
                onSave={onSaveCard}
                showPrice={section.id === "stay"}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
