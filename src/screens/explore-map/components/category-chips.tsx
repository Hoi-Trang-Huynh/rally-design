import { useRef } from "react";
import type { Category } from "../types";

type CategoryChipsProps = {
  categories: Category[];
  activeCategory: string;
  onChange: (id: string) => void;
};

export default function CategoryChips({ categories, activeCategory, onChange }: CategoryChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute left-0 right-0 top-[64px] z-20">
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-[8px] overflow-x-auto px-[16px] py-[4px]"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const isTrending = cat.id === "trending";
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`flex shrink-0 items-center gap-[6px] rounded-full px-[14px] py-[8px] text-[12px] font-semibold transition-all duration-200 active:scale-95 ${
                isActive
                  ? isTrending
                    ? "bg-[#ff6733] text-white"
                    : "bg-[#292827] text-white"
                  : isTrending
                    ? "bg-white text-[#ff6733]"
                    : "bg-white text-[#545352]"
              }`}
              style={{
                boxShadow: isActive
                  ? isTrending
                    ? "0 2px 8px rgba(255,103,51,0.3)"
                    : "0 2px 8px rgba(0,0,0,0.2)"
                  : "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              <Icon size={14} strokeWidth={2.2} />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
