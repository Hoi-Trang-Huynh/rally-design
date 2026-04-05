import { Search, X } from "lucide-react";

type SearchBarProps = {
  query: string;
  onChange: (query: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export default function SearchBar({ query, onChange, onFocus, onBlur }: SearchBarProps) {
  return (
    <div className="absolute left-[16px] right-[16px] top-[12px] z-30">
      <div
        className="flex items-center gap-[10px] rounded-[14px] bg-white px-[14px] py-[11px]"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)" }}
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
    </div>
  );
}
