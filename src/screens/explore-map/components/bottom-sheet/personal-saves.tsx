import { useState } from "react";
import { Plus, Search, Filter, ArrowUpDown, Grid3x3, List, ChevronRight, MapPin, Tag, Bookmark } from "lucide-react";
import type { SavedCollection, EventCard } from "../../types";

type Props = {
  collections: SavedCollection[];
  savedPlaces: EventCard[];
};

export default function PersonalSaves({ collections, savedPlaces }: Props) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "name" | "rating">("recent");

  const filteredPlaces = savedPlaces.filter(
    (p) =>
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-[16px] px-[16px] pb-[100px] pt-[4px]">
      {/* New Collection CTA */}
      <button
        className="flex items-center gap-[8px] rounded-[12px] border-[1.5px] border-dashed border-[#ff6733]/40 bg-[#ff6733]/5 px-[14px] py-[12px] text-[13px] font-semibold text-[#ff6733] transition-all active:scale-[0.98]"
      >
        <Plus size={16} strokeWidth={2.5} />
        New Collection
      </button>

      {/* Collections grid */}
      <div>
        <div className="mb-[8px] flex items-center justify-between">
          <h4 className="text-[13px] font-bold text-[#292827]">Collections</h4>
          <button className="flex items-center gap-[2px] text-[11px] font-semibold text-[#ff6733]">
            View more <ChevronRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-[10px]">
          {collections.slice(0, 4).map((col) => (
            <button
              key={col.id}
              className="flex flex-col overflow-hidden rounded-[12px] bg-white transition-all active:scale-[0.97]"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)" }}
            >
              <div className="relative h-[80px] w-full overflow-hidden">
                <img src={col.coverImg} alt={col.name} className="size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-[6px] left-[8px] text-[11px] font-bold text-white drop-shadow-sm">
                  {col.name}
                </div>
              </div>
              <div className="flex items-center justify-between px-[8px] py-[6px]">
                <span className="text-[10px] font-medium text-[#949493]">{col.count} places</span>
                <span className="text-[10px] text-[#b4b4b3]">{col.updatedAt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Places Management */}
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center justify-between">
          <h4 className="text-[13px] font-bold text-[#292827]">
            Saved Places
            <span className="ml-[6px] text-[11px] font-medium text-[#949493]">
              {filteredPlaces.length}
            </span>
          </h4>
          <div className="flex gap-[4px]">
            <button
              onClick={() => setViewMode("grid")}
              className="rounded-[6px] p-[5px] transition-all"
              style={{ background: viewMode === "grid" ? "#f5f5f5" : "transparent" }}
            >
              <Grid3x3 size={14} className={viewMode === "grid" ? "text-[#292827]" : "text-[#b4b4b3]"} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className="rounded-[6px] p-[5px] transition-all"
              style={{ background: viewMode === "list" ? "#f5f5f5" : "transparent" }}
            >
              <List size={14} className={viewMode === "list" ? "text-[#292827]" : "text-[#b4b4b3]"} />
            </button>
          </div>
        </div>

        {/* Search + Filter/Sort */}
        <div className="flex gap-[8px]">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#b4b4b3]" />
            <input
              type="text"
              placeholder="Search saved places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-[#f5f5f5] py-[7px] pl-[30px] pr-[10px] text-[12px] text-[#292827] outline-none placeholder:text-[#b4b4b3]"
            />
          </div>
          <button className="flex items-center gap-[4px] rounded-full bg-[#f5f5f5] px-[10px] py-[7px] text-[11px] font-medium text-[#545352]">
            <Filter size={12} />
          </button>
          <button
            onClick={() => setSortBy(sortBy === "recent" ? "name" : sortBy === "name" ? "rating" : "recent")}
            className="flex items-center gap-[4px] rounded-full bg-[#f5f5f5] px-[10px] py-[7px] text-[11px] font-medium text-[#545352]"
          >
            <ArrowUpDown size={12} />
          </button>
        </div>

        {/* Places list */}
        <div className="flex flex-col gap-[8px]">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="flex gap-[10px] rounded-[12px] bg-white p-[10px] transition-all active:scale-[0.98]"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)" }}
            >
              <img
                src={place.img}
                alt={place.name}
                className="size-[56px] shrink-0 rounded-[10px] object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <div className="flex items-start justify-between">
                  <span className="truncate text-[13px] font-semibold text-[#292827]">{place.name}</span>
                  <Bookmark size={14} className="shrink-0 fill-[#ff6733] text-[#ff6733]" />
                </div>
                <div className="flex items-center gap-[4px] text-[10px] text-[#949493]">
                  <MapPin size={10} />
                  <span>{place.distance}</span>
                  <span className="text-[#b4b4b3]">·</span>
                  <span>{place.category}</span>
                </div>
                <div className="flex gap-[4px]">
                  <span className="rounded-full bg-[#f5f5f5] px-[6px] py-[2px] text-[9px] font-medium text-[#545352]">
                    <Tag size={8} className="mr-[2px] inline" />
                    must-visit
                  </span>
                  <span className="rounded-full bg-[#f5f5f5] px-[6px] py-[2px] text-[9px] font-medium text-[#545352]">
                    dinner
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination indicator */}
        <div className="flex items-center justify-center gap-[6px] py-[8px]">
          <div className="size-[6px] rounded-full bg-[#ff6733]" />
          <div className="size-[6px] rounded-full bg-[#d4d4d4]" />
          <div className="size-[6px] rounded-full bg-[#d4d4d4]" />
        </div>
      </div>
    </div>
  );
}
