import { useState } from "react";
import { Plus, ChevronRight, ChevronLeft, MapPin, Bookmark } from "lucide-react";
import type { SavedCollection, EventCard } from "../../types";

type Props = {
  collections: SavedCollection[];
  savedPlaces: EventCard[];
  onNewCollection: () => void;
};

export default function PersonalSaves({ collections, savedPlaces, onNewCollection }: Props) {
  const [selectedCollection, setSelectedCollection] = useState<SavedCollection | null>(null);
  const [showAllCollections, setShowAllCollections] = useState(false);

  // ─── Collection Detail View ─────────────────────────────────────────────
  if (selectedCollection) {
    return (
      <div className="flex flex-col pb-[100px]">
        {/* Header */}
        <div className="flex items-center gap-[8px] px-[12px] pb-[12px]">
          <button
            onClick={() => setSelectedCollection(null)}
            className="flex size-[30px] items-center justify-center rounded-full bg-[#f5f5f5] transition-all active:scale-90"
          >
            <ChevronLeft size={16} className="text-[#292827]" />
          </button>
          <div className="flex-1">
            <h3 className="text-[15px] font-bold text-[#292827]">{selectedCollection.name}</h3>
            <p className="text-[11px] text-[#949493]">{selectedCollection.count} places</p>
          </div>
        </div>

        {/* Places list (same layout as General Space) */}
        <div className="flex flex-col gap-[8px] px-[12px]">
          {savedPlaces.slice(0, selectedCollection.count).map((place) => (
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
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Default View ───────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-[16px] px-[16px] pb-[100px] pt-[4px]">
      {/* New Collection CTA */}
      <button
        onClick={onNewCollection}
        className="flex items-center gap-[8px] rounded-[12px] border-[1.5px] border-dashed border-[#ff6733]/40 bg-[#ff6733]/5 px-[14px] py-[12px] text-[13px] font-semibold text-[#ff6733] transition-all active:scale-[0.98]"
      >
        <Plus size={16} strokeWidth={2.5} />
        New Collection
      </button>

      {/* Collections grid */}
      <div>
        <div className="mb-[8px] flex items-center justify-between">
          <h4 className="text-[13px] font-bold text-[#292827]">Collections</h4>
          {collections.length > 4 && (
            <button
              onClick={() => setShowAllCollections((v) => !v)}
              className="flex items-center gap-[2px] text-[11px] font-semibold text-[#ff6733]"
            >
              {showAllCollections ? "Show less" : "View more"} <ChevronRight size={12} />
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-[10px]">
          {(showAllCollections ? collections : collections.slice(0, 4)).map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedCollection(col)}
              className="flex flex-col overflow-hidden rounded-[12px] bg-white text-left transition-all active:scale-[0.97]"
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

      {/* Saved Places (General Space) */}
      <div className="flex flex-col gap-[10px]">
        <h4 className="text-[13px] font-bold text-[#292827]">
          Saved Places
          <span className="ml-[6px] text-[11px] font-medium text-[#949493]">
            {savedPlaces.length}
          </span>
        </h4>

        {/* Places list */}
        <div className="flex flex-col gap-[8px]">
          {savedPlaces.map((place) => (
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
