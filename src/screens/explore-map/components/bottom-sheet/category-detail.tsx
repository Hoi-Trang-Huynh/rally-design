import { useState } from "react";
import { ChevronLeft, Star, Clock, MapPin, Bookmark } from "lucide-react";
import type { CategoryFilterGroup, EventCard } from "../../types";

type Props = {
  categoryId: string;
  categoryLabel: string;
  filters: CategoryFilterGroup[];
  cards: EventCard[];
  onBack: () => void;
  onSaveCard: (id: string) => void;
};

export default function CategoryDetail({ categoryLabel, filters, cards, onBack, onSaveCard }: Props) {
  const [activeFilterGroup, setActiveFilterGroup] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const toggleFilter = (groupId: string, option: string) => {
    setSelectedFilters((prev) => {
      const current = prev[groupId] ?? [];
      const updated = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
      return { ...prev, [groupId]: updated };
    });
  };

  const activeFilters = Object.entries(selectedFilters).flatMap(([groupId, options]) =>
    options.map((o) => ({ groupId, option: o }))
  );

  return (
    <div className="flex flex-col pb-[100px]">
      <div className="flex items-center gap-[8px] px-[12px] pb-[10px]">
        <button onClick={onBack} className="flex size-[30px] items-center justify-center rounded-full bg-[#f5f5f5] transition-all active:scale-90">
          <ChevronLeft size={16} className="text-[#292827]" />
        </button>
        <div className="flex-1">
          <h3 className="text-[15px] font-bold text-[#292827]">{categoryLabel}</h3>
          <p className="text-[11px] text-[#949493]">{cards.length} places found</p>
        </div>
      </div>

      {filters.length > 0 && (
        <div className="flex flex-col gap-[8px] px-[12px] pb-[10px]">
          <div className="scrollbar-hide flex gap-[6px] overflow-x-auto">
            {filters.map((group) => {
              const isActive = activeFilterGroup === group.id;
              const hasSelected = (selectedFilters[group.id] ?? []).length > 0;
              return (
                <button key={group.id} onClick={() => setActiveFilterGroup(isActive ? null : group.id)}
                  className="flex shrink-0 items-center gap-[4px] rounded-full px-[12px] py-[6px] text-[11px] font-semibold transition-all active:scale-95"
                  style={{ background: isActive || hasSelected ? "#292827" : "#f5f5f5", color: isActive || hasSelected ? "#fff" : "#545352" }}>
                  {group.label}
                  {hasSelected && <span className="flex size-[16px] items-center justify-center rounded-full bg-[#ff6733] text-[9px] font-bold text-white">{selectedFilters[group.id]!.length}</span>}
                </button>
              );
            })}
          </div>
          {activeFilterGroup && (
            <div className="flex flex-wrap gap-[6px]">
              {filters.find((f) => f.id === activeFilterGroup)?.options.map((option) => {
                const isSelected = (selectedFilters[activeFilterGroup] ?? []).includes(option);
                return (
                  <button key={option} onClick={() => toggleFilter(activeFilterGroup, option)}
                    className="rounded-full px-[10px] py-[5px] text-[11px] font-medium transition-all active:scale-95"
                    style={{ background: isSelected ? "#ff6733" : "#f5f5f5", color: isSelected ? "#fff" : "#545352" }}>
                    {option}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-[4px] px-[12px] pb-[10px]">
          {activeFilters.map(({ groupId, option }) => (
            <button key={`${groupId}-${option}`} onClick={() => toggleFilter(groupId, option)}
              className="flex items-center gap-[4px] rounded-full bg-[#ff6733]/10 px-[8px] py-[4px] text-[10px] font-semibold text-[#ff6733] transition-all active:scale-95">
              {option}<span>&times;</span>
            </button>
          ))}
          <button onClick={() => setSelectedFilters({})} className="px-[6px] py-[4px] text-[10px] font-medium text-[#949493] underline">Clear all</button>
        </div>
      )}

      <div className="flex flex-col gap-[8px] px-[12px]">
        {cards.map((card) => (
          <div key={card.id} className="flex gap-[10px] rounded-[12px] bg-white p-[10px] transition-all active:scale-[0.98]"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)" }}>
            <img src={card.img} alt={card.name} className="size-[64px] shrink-0 rounded-[10px] object-cover" />
            <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <div className="flex items-start justify-between">
                <span className="truncate text-[13px] font-semibold text-[#292827]">{card.name}</span>
                <button onClick={(e) => { e.stopPropagation(); onSaveCard(card.id); }} className="shrink-0 transition-all active:scale-90">
                  <Bookmark size={14} className={card.saved ? "fill-[#ff6733] text-[#ff6733]" : "text-[#b4b4b3]"} />
                </button>
              </div>
              <div className="flex items-center gap-[4px] text-[10px]">
                <Star size={10} className="fill-[#f59e0b] text-[#f59e0b]" />
                <span className="font-semibold text-[#292827]">{card.rating}</span>
                <span className="text-[#949493]">({card.reviewCount})</span>
                <span className="text-[#b4b4b3]">&middot;</span>
                <span className="font-medium text-[#949493]">{card.priceLevel}</span>
              </div>
              <div className="flex items-center gap-[4px] text-[10px] text-[#949493]">
                <Clock size={10} /><span>{card.openClose}</span>
                <span className="text-[#b4b4b3]">&middot;</span>
                <MapPin size={10} /><span>{card.distance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
