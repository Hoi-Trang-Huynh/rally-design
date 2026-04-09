import { Search, X, Star, MapPin } from "lucide-react";
import type { MapPlace } from "../types";

type SearchBarProps = {
  query: string;
  onChange: (query: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  results: MapPlace[];
  focused: boolean;
  onSelectResult: (place: MapPlace) => void;
};

export default function SearchBar({ query, onChange, onFocus, onBlur, results, focused, onSelectResult }: SearchBarProps) {
  const showResults = focused && query.length > 0;

  return (
    <div className="absolute left-[16px] right-[16px] top-[12px] z-30">
      <div
        className="flex items-center gap-[10px] bg-white px-[14px] py-[11px]"
        style={{
          borderRadius: showResults ? "14px 14px 0 0" : "14px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        <Search size={18} className="shrink-0 text-[#949493]" strokeWidth={2.5} />
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={() => setTimeout(onBlur, 200)}
          placeholder="Search places, food, activities..."
          className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-[#292827] outline-none placeholder:text-[#b4b4b3]"
        />
        {query && (
          <button
            onClick={() => onChange("")}
            className="flex size-[22px] items-center justify-center rounded-full bg-[#eaeae9]"
          >
            <X size={12} className="text-[#545352]" strokeWidth={3} />
          </button>
        )}
      </div>

      {/* Search results dropdown */}
      {showResults && (
        <div
          className="max-h-[240px] overflow-y-auto rounded-b-[14px] bg-white"
          style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)" }}
        >
          <div className="h-[0.5px] bg-[#eaeae9]" />
          {results.length > 0 ? (
            results.slice(0, 5).map((place) => (
              <button
                key={place.id}
                onMouseDown={() => onSelectResult(place)}
                className="flex w-full items-center gap-[10px] px-[14px] py-[10px] text-left transition-colors active:bg-[#f5f5f5]"
              >
                <img
                  src={place.img}
                  alt={place.name}
                  className="size-[40px] shrink-0 rounded-[8px] object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-[#292827]">{place.name}</p>
                  <div className="flex items-center gap-[4px] text-[10px] text-[#949493]">
                    <Star size={10} className="fill-[#f59e0b] text-[#f59e0b]" />
                    <span className="font-semibold text-[#292827]">{place.rating}</span>
                    <span className="text-[#b4b4b3]">·</span>
                    <span>{place.category}</span>
                    <span className="text-[#b4b4b3]">·</span>
                    <MapPin size={9} />
                    <span>{place.address.split(",")[0]}</span>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="px-[14px] py-[16px] text-center">
              <p className="text-[13px] text-[#949493]">No results found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
