import { useState } from "react";
import { useNavigate } from "react-router";
import { Navigation, X, Check, Image, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import AndroidFrame from "../../app/components/layout/android-frame";
import PhoneFrame from "../../app/components/layout/phone-frame";
import type { MapPlace, BottomSheetSnap, BottomSheetTab, ExploreViewMode } from "./types";
import {
  CATEGORIES, PLACES, EXPLORE_SECTIONS, SAVED_COLLECTIONS, RALLY_SESSIONS,
  COMMUNITY_COLLECTIONS, CATEGORY_FILTERS, CATEGORY_DETAIL_CARDS,
} from "./data";
import SearchBar from "./components/search-bar";
import CategoryChips from "./components/category-chips";
import ExploreMapBg from "./components/explore-map-bg";
import MapPins from "./components/map-pins";
import PlaceDetailSheet from "./components/place-detail-sheet";
import SaveDestinationPicker from "./components/save-destination-picker";
import BottomSheet from "./components/bottom-sheet/bottom-sheet";
import ExploreTab from "./components/bottom-sheet/explore-tab";
import SavedTab from "./components/bottom-sheet/saved-tab";

export default function ExploreMapScreen() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<MapPlace | null>(null);
  const [places, setPlaces] = useState(PLACES);

  const [showSavePicker, setShowSavePicker] = useState(false);
  const [savingPlaceId, setSavingPlaceId] = useState<string | null>(null);

  const [sheetSnap, setSheetSnap] = useState<BottomSheetSnap>("half");
  const [sheetTab, setSheetTab] = useState<BottomSheetTab>("explore");

  const [exploreViewMode, setExploreViewMode] = useState<ExploreViewMode>("overview");
  const [activeCategoryDetail, setActiveCategoryDetail] = useState<string | null>(null);
  const [trendingMode, setTrendingMode] = useState(false);
  const [showMyLocation, setShowMyLocation] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  const [exploreSections, setExploreSections] = useState(EXPLORE_SECTIONS);

  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const filteredPlaces = places.filter((p) => {
    if (trendingMode) return !!p.trending;
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleSelectPlace = (place: MapPlace) => setSelectedPlace(place);

  const handleSaveButtonTap = (placeId: string) => {
    const place = places.find((p) => p.id === placeId);
    if (place?.saved) {
      setPlaces((prev) => prev.map((p) => (p.id === placeId ? { ...p, saved: false } : p)));
      if (selectedPlace?.id === placeId) setSelectedPlace((prev) => (prev ? { ...prev, saved: false } : null));
      toast.info("Removed from library");
    } else {
      setSavingPlaceId(placeId);
      setShowSavePicker(true);
    }
  };

  const handleSaveConfirm = (destination: "personal" | "shared", notes: string, tags: string[], _collectionId?: string | null, _sessionIds?: string[]) => {
    if (!savingPlaceId) return;
    // Mark map place as saved (if it's a map place)
    setPlaces((prev) => prev.map((p) => (p.id === savingPlaceId ? { ...p, saved: true } : p)));
    if (selectedPlace?.id === savingPlaceId) setSelectedPlace((prev) => (prev ? { ...prev, saved: true } : null));
    // Mark explore card as saved (if it's an explore card)
    setExploreSections((prev) => prev.map((section) => ({ ...section, cards: section.cards.map((c) => c.id === savingPlaceId ? { ...c, saved: true } : c) })));
    const name = places.find((p) => p.id === savingPlaceId)?.name || exploreSections.flatMap((s) => s.cards).find((c) => c.id === savingPlaceId)?.name || "";
    toast.success(`"${name}" saved to ${destination === "personal" ? "Personal Library" : "Shared Session Library"}`);
    setShowSavePicker(false);
    setSavingPlaceId(null);
  };

  const handleExploreCardSave = (cardId: string) => {
    const card = exploreSections.flatMap((s) => s.cards).find((c) => c.id === cardId);
    if (card?.saved) {
      // Unsave: toggle off directly
      setExploreSections((prev) => prev.map((section) => ({ ...section, cards: section.cards.map((c) => c.id === cardId ? { ...c, saved: false } : c) })));
      toast.info(`Removed "${card.name}"`);
    } else {
      // Save: open the Save Place modal
      setSavingPlaceId(cardId);
      setShowSavePicker(true);
    }
  };

  const handleTrendingOnMaps = () => {
    setTrendingMode(true);
    setActiveCategory("all");
    setExploreViewMode("category-detail");
    setActiveCategoryDetail("trending");
    setSheetSnap("half");
  };

  const handleCategoryChange = (categoryId: string) => {
    setTrendingMode(false);
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      setExploreViewMode("overview");
      setActiveCategoryDetail(null);
    } else {
      setExploreViewMode("category-detail");
      setActiveCategoryDetail(categoryId);
      if (sheetSnap === "collapsed") setSheetSnap("half");
    }
  };

  const handleCategoryBack = () => { setExploreViewMode("overview"); setActiveCategoryDetail(null); setActiveCategory("all"); setTrendingMode(false); };

  const handleSeeMore = (sectionId: string) => {
    if (sectionId === "trending") {
      handleTrendingOnMaps();
      return;
    }
    const map: Record<string, string> = { eat: "restaurant", play: "attraction", community: "attraction", stay: "hotel" };
    handleCategoryChange(map[sectionId] || "all");
  };

  const handleCardTap = (cardId: string) => {
    // Find matching map place by name and open the detail sheet
    const card = exploreSections.flatMap((s) => s.cards).find((c) => c.id === cardId);
    if (!card) return;
    const matchingPlace = places.find((p) => p.name.includes(card.name) || card.name.includes(p.name));
    if (matchingPlace) {
      setSelectedPlace(matchingPlace);
    } else {
      // Show a toast with the card info if no matching map place
      toast(`${card.name} — ${card.rating} · ${card.priceLevel} · ${card.openClose}`);
    }
  };

  const activeCategoryConfig = CATEGORY_FILTERS.find((f) => f.categoryId === activeCategoryDetail);
  const activeCategoryLabel = activeCategoryDetail === "trending"
    ? "Trending Places"
    : CATEGORIES.find((c) => c.id === activeCategoryDetail)?.label ?? "";
  const categoryDetailCards = activeCategoryDetail === "trending"
    ? exploreSections.find((s) => s.id === "trending")?.cards ?? []
    : activeCategoryDetail ? CATEGORY_DETAIL_CARDS[activeCategoryDetail] ?? [] : [];
  const savedCards = exploreSections.flatMap((s) => s.cards).filter((c) => c.saved);

  return (
    <AndroidFrame>
      <PhoneFrame activeTab="explore" showHeader={false} showBottomNav={!selectedPlace} hideBottomNavOnScroll>
        <div className="relative size-full overflow-hidden">
          <div className="absolute inset-0 overflow-auto bg-[#e8e4df]">
            <div
              className="relative origin-center"
              style={{
                width: `${100 * mapZoom}%`,
                height: `${100 * mapZoom}%`,
                minWidth: "100%",
                minHeight: "100%",
                transition: "width 300ms ease-out, height 300ms ease-out",
              }}
            >
              <ExploreMapBg />
              <MapPins places={filteredPlaces} selectedId={selectedPlace?.id ?? null} onSelect={handleSelectPlace} showRatings={trendingMode} />
              {/* My location blue dot */}
              {showMyLocation && (
                <div className="absolute" style={{ left: "50%", top: "45%", transform: "translate(-50%, -50%)" }}>
                  <div className="relative flex items-center justify-center">
                    <div className="absolute size-[48px] animate-ping rounded-full bg-[#4285f4]/20" style={{ animationDuration: "2s" }} />
                    <div className="absolute size-[32px] rounded-full bg-[#4285f4]/10" />
                    <div className="relative size-[14px] rounded-full border-[2.5px] border-white bg-[#4285f4]" style={{ boxShadow: "0 2px 8px rgba(66,133,244,0.5)" }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <SearchBar
            query={searchQuery}
            onChange={setSearchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            results={filteredPlaces}
            focused={searchFocused}
            onSelectResult={(place) => {
              setSelectedPlace(place);
              setSearchQuery("");
              setSearchFocused(false);
            }}
          />
          <CategoryChips categories={CATEGORIES} activeCategory={activeCategory} onChange={handleCategoryChange} />

          {!selectedPlace && (
            <div className="absolute right-[16px] z-20 flex flex-col gap-[8px]" style={{ bottom: sheetSnap === "collapsed" ? 146 : sheetSnap === "half" ? 356 : 644, transition: "bottom 0.3s cubic-bezier(0.32, 0.72, 0, 1)" }}>
              {/* Zoom controls */}
              <div className="flex flex-col overflow-hidden rounded-full bg-white" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}>
                <button
                  onClick={() => setMapZoom((z) => Math.min(2.5, z + 0.25))}
                  className="flex size-[40px] items-center justify-center transition-all active:scale-95 active:bg-[#f5f5f5]"
                >
                  <Plus size={18} className="text-[#545352]" strokeWidth={2} />
                </button>
                <div className="mx-[8px] h-[0.5px] bg-[#eaeae9]" />
                <button
                  onClick={() => setMapZoom((z) => Math.max(0.5, z - 0.25))}
                  className="flex size-[40px] items-center justify-center transition-all active:scale-95 active:bg-[#f5f5f5]"
                >
                  <Minus size={18} className="text-[#545352]" strokeWidth={2} />
                </button>
              </div>
              {/* Current location FAB */}
              <button
                onClick={() => {
                  setShowMyLocation((v) => !v);
                  toast[showMyLocation ? "info" : "success"](showMyLocation ? "Location hidden" : "Showing your location");
                }}
                className="flex size-[44px] items-center justify-center rounded-full bg-white transition-all active:scale-95"
                style={{
                  boxShadow: showMyLocation ? "0 2px 12px rgba(66,133,244,0.3)" : "0 2px 12px rgba(0,0,0,0.12)",
                  border: showMyLocation ? "2px solid #4285f4" : "none",
                }}
              >
                <Navigation size={20} className={showMyLocation ? "text-[#4285f4]" : "text-[#ff6733]"} strokeWidth={2} />
              </button>
            </div>
          )}

          {!selectedPlace && (
            <BottomSheet activeTab={sheetTab} onTabChange={setSheetTab} snap={sheetSnap} onSnapChange={setSheetSnap}>
              {sheetTab === "explore" && (
                <ExploreTab sections={exploreSections} communityCollections={COMMUNITY_COLLECTIONS} onSaveCard={handleExploreCardSave} onCardTap={handleCardTap} onTrendingOnMaps={handleTrendingOnMaps}
                  viewMode={exploreViewMode} activeCategoryId={activeCategoryDetail} activeCategoryLabel={activeCategoryLabel}
                  categoryFilters={activeCategoryConfig?.filters ?? []} categoryCards={categoryDetailCards} onCategoryBack={handleCategoryBack} onSeeMore={handleSeeMore} />
              )}
              {sheetTab === "saved" && <SavedTab collections={SAVED_COLLECTIONS} savedPlaces={savedCards} sessions={RALLY_SESSIONS} onNewCollection={() => setShowCreateCollection(true)} />}
            </BottomSheet>
          )}

          {selectedPlace && (
            <PlaceDetailSheet place={selectedPlace} onClose={() => setSelectedPlace(null)} onSave={handleSaveButtonTap} onViewLibrary={() => navigate("/session/active/library")} />
          )}

          {showSavePicker && savingPlaceId && (
            <SaveDestinationPicker placeName={places.find((p) => p.id === savingPlaceId)?.name || exploreSections.flatMap((s) => s.cards).find((c) => c.id === savingPlaceId)?.name || ""}
              onClose={() => { setShowSavePicker(false); setSavingPlaceId(null); }} onSave={handleSaveConfirm} collections={SAVED_COLLECTIONS} sessions={RALLY_SESSIONS} />
          )}

          {/* Create Collection Modal */}
          {showCreateCollection && (
            <div className="absolute inset-0 z-[70] flex items-center justify-center" onClick={() => setShowCreateCollection(false)}>
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 mx-[24px] w-full max-w-[340px] rounded-[20px] bg-white p-[20px]"
                style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between pb-[14px]">
                  <h3 className="text-[16px] font-bold text-[#292827]">New Collection</h3>
                  <button onClick={() => { setShowCreateCollection(false); setNewCollectionName(""); }}
                    className="flex size-[30px] items-center justify-center rounded-full bg-[#f5f5f5] transition-all active:scale-90">
                    <X size={14} strokeWidth={2.5} className="text-[#545352]" />
                  </button>
                </div>
                <div className="mb-[14px] flex h-[100px] items-center justify-center rounded-[12px] bg-[#f5f5f5]">
                  <div className="flex flex-col items-center gap-[4px]">
                    <Image size={24} className="text-[#b4b4b3]" strokeWidth={1.5} />
                    <span className="text-[11px] font-medium text-[#b4b4b3]">Add cover photo</span>
                  </div>
                </div>
                <div className="mb-[16px]">
                  <label className="mb-[4px] block text-[11px] font-medium text-[#545352]">Collection name</label>
                  <input type="text" value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} placeholder="e.g. Best Coffee Spots" autoFocus
                    className="w-full rounded-[10px] border-[1.5px] border-[#eaeae9] bg-[#f9f9f9] px-[12px] py-[10px] text-[14px] text-[#292827] outline-none placeholder:text-[#c4c4c3] transition-colors focus:border-[#ff6733] focus:bg-white" />
                </div>
                <button onClick={() => { setShowCreateCollection(false); setNewCollectionName(""); toast.success("Collection created"); }}
                  disabled={!newCollectionName.trim()}
                  className="flex h-[44px] w-full items-center justify-center gap-[6px] rounded-full bg-[#ff6733] text-[14px] font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-40"
                  style={{ boxShadow: "0 2px 12px rgba(255,103,51,0.35)" }}>
                  <Check size={16} strokeWidth={2.5} />Create Collection
                </button>
              </div>
            </div>
          )}
        </div>
      </PhoneFrame>
    </AndroidFrame>
  );
}
