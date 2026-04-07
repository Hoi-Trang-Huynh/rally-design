import { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Utensils,
  Coffee,
  Camera,
  TreePine,
  Wine,
  ShoppingBag,
  Building2,
  Plus,
  ChevronRight,
} from "lucide-react";

const QUICK_CATEGORIES = [
  { id: "restaurant", label: "Restaurant", icon: Utensils, color: "#ff6733" },
  { id: "cafe", label: "Cafe", icon: Coffee, color: "#8B5E3C" },
  { id: "attraction", label: "Attraction", icon: Camera, color: "#7c3aed" },
  { id: "park", label: "Park", icon: TreePine, color: "#22c55e" },
  { id: "nightlife", label: "Nightlife", icon: Wine, color: "#ec4899" },
  { id: "shopping", label: "Shopping", icon: ShoppingBag, color: "#3b82f6" },
  { id: "museum", label: "Museum", icon: Building2, color: "#eab308" },
];

const RECENT_SEARCHES = [
  "Vietnamese street food",
  "Rooftop bars Da Nang",
  "Best coffee shops nearby",
  "Sunrise viewpoints",
];

export default function AddPlacesTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showManualForm, setShowManualForm] = useState(false);

  if (showManualForm) {
    return <ManualEntryForm onBack={() => setShowManualForm(false)} />;
  }

  return (
    <div className="flex flex-col gap-[16px] px-[16px] pb-[100px] pt-[4px]">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#b4b4b3]" />
        <input
          type="text"
          placeholder="Search for a place to add..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-[12px] bg-[#f5f5f5] py-[11px] pl-[36px] pr-[12px] text-[13px] text-[#292827] outline-none placeholder:text-[#b4b4b3]"
        />
      </div>

      {/* Drop a pin */}
      <button
        className="flex items-center gap-[10px] rounded-[12px] bg-white p-[12px] transition-all active:scale-[0.98]"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)" }}
      >
        <div className="flex size-[40px] items-center justify-center rounded-full bg-[#ff6733]/10">
          <MapPin size={20} className="text-[#ff6733]" />
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-[13px] font-semibold text-[#292827]">Drop a pin on map</span>
          <span className="text-[11px] text-[#949493]">Tap anywhere on the map to mark a spot</span>
        </div>
        <ChevronRight size={16} className="text-[#b4b4b3]" />
      </button>

      {/* Manual entry */}
      <button
        onClick={() => setShowManualForm(true)}
        className="flex items-center gap-[10px] rounded-[12px] bg-white p-[12px] transition-all active:scale-[0.98]"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)" }}
      >
        <div className="flex size-[40px] items-center justify-center rounded-full bg-[#7c3aed]/10">
          <Plus size={20} className="text-[#7c3aed]" />
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-[13px] font-semibold text-[#292827]">Add manually</span>
          <span className="text-[11px] text-[#949493]">Enter place details yourself</span>
        </div>
        <ChevronRight size={16} className="text-[#b4b4b3]" />
      </button>

      {/* Quick categories */}
      <div>
        <h4 className="mb-[8px] text-[13px] font-bold text-[#292827]">Browse by category</h4>
        <div className="grid grid-cols-4 gap-[8px]">
          {QUICK_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className="flex flex-col items-center gap-[6px] rounded-[12px] bg-white py-[12px] transition-all active:scale-95"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div
                  className="flex size-[36px] items-center justify-center rounded-full"
                  style={{ background: `${cat.color}15` }}
                >
                  <Icon size={18} style={{ color: cat.color }} />
                </div>
                <span className="text-[10px] font-medium text-[#545352]">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent searches */}
      <div>
        <h4 className="mb-[8px] text-[13px] font-bold text-[#292827]">Recent searches</h4>
        <div className="flex flex-col">
          {RECENT_SEARCHES.map((search) => (
            <button
              key={search}
              className="flex items-center gap-[10px] border-b border-[#eaeae9]/40 py-[10px] text-left transition-all active:bg-[#f5f5f5]"
            >
              <Clock size={14} className="shrink-0 text-[#b4b4b3]" />
              <span className="text-[12px] text-[#545352]">{search}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Manual Entry Form ─────────────────────────────────────────────────────

function ManualEntryForm({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col gap-[14px] px-[16px] pb-[100px] pt-[4px]">
      <button
        onClick={onBack}
        className="self-start text-[12px] font-semibold text-[#ff6733]"
      >
        ← Back to options
      </button>

      <h3 className="text-[15px] font-bold text-[#292827]">Add a place</h3>

      <div className="flex flex-col gap-[10px]">
        <div>
          <label className="mb-[4px] block text-[11px] font-semibold text-[#545352]">Place name *</label>
          <input
            type="text"
            placeholder="e.g. The Beach House"
            className="w-full rounded-[10px] border border-[#eaeae9] px-[12px] py-[10px] text-[13px] text-[#292827] outline-none placeholder:text-[#b4b4b3] focus:border-[#ff6733]"
          />
        </div>
        <div>
          <label className="mb-[4px] block text-[11px] font-semibold text-[#545352]">Address</label>
          <input
            type="text"
            placeholder="e.g. 123 Beach Road, Da Nang"
            className="w-full rounded-[10px] border border-[#eaeae9] px-[12px] py-[10px] text-[13px] text-[#292827] outline-none placeholder:text-[#b4b4b3] focus:border-[#ff6733]"
          />
        </div>
        <div>
          <label className="mb-[4px] block text-[11px] font-semibold text-[#545352]">Category</label>
          <div className="scrollbar-hide flex gap-[6px] overflow-x-auto">
            {QUICK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className="shrink-0 rounded-full border border-[#eaeae9] px-[10px] py-[6px] text-[11px] font-medium text-[#545352] transition-all active:scale-95"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-[4px] block text-[11px] font-semibold text-[#545352]">Notes</label>
          <textarea
            placeholder="Add any notes about this place..."
            rows={3}
            className="w-full resize-none rounded-[10px] border border-[#eaeae9] px-[12px] py-[10px] text-[13px] text-[#292827] outline-none placeholder:text-[#b4b4b3] focus:border-[#ff6733]"
          />
        </div>
      </div>

      <button className="mt-[4px] w-full rounded-[12px] bg-[#ff6733] py-[12px] text-center text-[14px] font-bold text-white transition-all active:scale-[0.98]">
        Add Place
      </button>
    </div>
  );
}
