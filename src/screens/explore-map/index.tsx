import { useState } from "react";
import { useNavigate } from "react-router";
import { Navigation, Trophy } from "lucide-react";
import { toast } from "sonner";
import AndroidFrame from "../../app/components/layout/android-frame";
import PhoneFrame from "../../app/components/layout/phone-frame";
import type { MapPlace, MapLayers, BottomSheetSnap, BottomSheetTab } from "./types";
import {
  CATEGORIES,
  PLACES,
  FRIENDS,
  EXPLORE_SECTIONS,
  SAVED_COLLECTIONS,
  RALLY_SESSIONS,
  WEATHER_DETAIL,
  LEADERBOARD,
} from "./data";
import SearchBar from "./components/search-bar";
import CategoryChips from "./components/category-chips";
import ExploreMapBg from "./components/explore-map-bg";
import MapPins from "./components/map-pins";
import PlaceDetailSheet from "./components/place-detail-sheet";
import SaveDestinationPicker from "./components/save-destination-picker";
import MapLayersPanel from "./components/map-layers-panel";
import FriendMarkers from "./components/friend-markers";
import WeatherOverlay from "./components/weather-overlay";
import BottomSheet from "./components/bottom-sheet/bottom-sheet";
import ExploreTab from "./components/bottom-sheet/explore-tab";
import SavedTab from "./components/bottom-sheet/saved-tab";
import AddPlacesTab from "./components/bottom-sheet/add-places-tab";
import WeatherModal from "./components/weather-modal";
import LeaderboardPanel from "./components/leaderboard-panel";

export default function ExploreMapScreen() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<MapPlace | null>(null);
  const [places, setPlaces] = useState(PLACES);

  // Save flow state
  const [showSavePicker, setShowSavePicker] = useState(false);
  const [savingPlaceId, setSavingPlaceId] = useState<string | null>(null);

  // Map layers state
  const [layers, setLayers] = useState<MapLayers>({
    traffic: false,
    transit: false,
    weather: false,
    friends: false,
  });
  const [sharingLocation, setSharingLocation] = useState(false);

  // Bottom sheet state
  const [sheetSnap, setSheetSnap] = useState<BottomSheetSnap>("half");
  const [sheetTab, setSheetTab] = useState<BottomSheetTab>("explore");

  // Explore tab card saves
  const [exploreSections, setExploreSections] = useState(EXPLORE_SECTIONS);

  // Modals
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const toggleLayer = (layer: keyof MapLayers) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  // ─── Filtering ────────────────────────────────────────────────────────────
  const filteredPlaces = places.filter((p) => {
    const matchCategory =
      activeCategory === "all" ||
      (activeCategory === "trending" ? !!p.trending : p.category === activeCategory);
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handleSelectPlace = (place: MapPlace) => {
    setSelectedPlace(place);
  };

  const handleSaveButtonTap = (placeId: string) => {
    const place = places.find((p) => p.id === placeId);
    if (place?.saved) {
      setPlaces((prev) => prev.map((p) => (p.id === placeId ? { ...p, saved: false } : p)));
      if (selectedPlace?.id === placeId) {
        setSelectedPlace((prev) => (prev ? { ...prev, saved: false } : null));
      }
      toast.info("Removed from library");
    } else {
      setSavingPlaceId(placeId);
      setShowSavePicker(true);
    }
  };

  const handleSaveConfirm = (destination: "personal" | "shared", notes: string, tags: string[]) => {
    if (!savingPlaceId) return;
    setPlaces((prev) => prev.map((p) => (p.id === savingPlaceId ? { ...p, saved: true } : p)));
    if (selectedPlace?.id === savingPlaceId) {
      setSelectedPlace((prev) => (prev ? { ...prev, saved: true } : null));
    }
    const place = places.find((p) => p.id === savingPlaceId);
    const destLabel = destination === "personal" ? "Personal Library" : "Shared Session Library";
    toast.success(`"${place?.name}" saved to ${destLabel}`);
    setShowSavePicker(false);
    setSavingPlaceId(null);
  };

  const handleExploreCardSave = (cardId: string) => {
    setExploreSections((prev) =>
      prev.map((section) => ({
        ...section,
        cards: section.cards.map((card) =>
          card.id === cardId ? { ...card, saved: !card.saved } : card
        ),
      }))
    );
    const card = exploreSections.flatMap((s) => s.cards).find((c) => c.id === cardId);
    if (card) {
      toast[card.saved ? "info" : "success"](
        card.saved ? `Removed "${card.name}"` : `Saved "${card.name}"`
      );
    }
  };

  const handleTrendingOnMaps = () => {
    setActiveCategory("trending");
    setSheetSnap("collapsed");
    toast.success("Showing trending places on map");
  };

  // Get saved cards for the saved tab
  const savedCards = exploreSections.flatMap((s) => s.cards).filter((c) => c.saved);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <AndroidFrame>
      <PhoneFrame activeTab="explore" showHeader={false} showBottomNav={!selectedPlace}>
        <div className="relative size-full overflow-hidden">
          {/* Map background with layers */}
          <div className="absolute inset-0 bg-[#e8e4df]">
            <ExploreMapBg layers={layers} />

            {/* Friend markers layer */}
            {layers.friends && <FriendMarkers friends={FRIENDS} />}

            {/* Place pins */}
            <MapPins
              places={filteredPlaces}
              selectedId={selectedPlace?.id ?? null}
              onSelect={handleSelectPlace}
            />
          </div>

          {/* Floating controls */}
          <SearchBar
            query={searchQuery}
            onChange={setSearchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <CategoryChips
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />

          {/* Weather overlay */}
          {layers.weather && !selectedPlace && <WeatherOverlay />}

          {/* Map layers FAB + panel */}
          {!selectedPlace && (
            <MapLayersPanel
              layers={layers}
              onToggle={toggleLayer}
              sharingLocation={sharingLocation}
              onToggleSharing={() => {
                setSharingLocation((v) => !v);
                toast[sharingLocation ? "info" : "success"](
                  sharingLocation ? "Location sharing off" : "Sharing your location with trip members"
                );
              }}
            />
          )}

          {/* Right-side FABs */}
          {!selectedPlace && (
            <div className="absolute right-[16px] z-20 flex flex-col gap-[8px]" style={{ bottom: sheetSnap === "collapsed" ? 96 : sheetSnap === "half" ? 356 : 596 , transition: "bottom 0.3s cubic-bezier(0.32, 0.72, 0, 1)" }}>
              {/* Leaderboard FAB */}
              <button
                onClick={() => setShowLeaderboard(true)}
                className="flex size-[44px] items-center justify-center rounded-full bg-white transition-all active:scale-95"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
              >
                <Trophy size={20} className="text-[#f59e0b]" strokeWidth={2} />
              </button>
              {/* Current location FAB */}
              <button
                className="flex size-[44px] items-center justify-center rounded-full bg-white transition-all active:scale-95"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
              >
                <Navigation size={20} className="text-[#ff6733]" strokeWidth={2} />
              </button>
            </div>
          )}

          {/* Bottom Sheet (hidden when place detail is open) */}
          {!selectedPlace && (
            <BottomSheet
              activeTab={sheetTab}
              onTabChange={setSheetTab}
              snap={sheetSnap}
              onSnapChange={setSheetSnap}
              onWeatherTap={() => setShowWeatherModal(true)}
            >
              {sheetTab === "explore" && (
                <ExploreTab
                  sections={exploreSections}
                  onSaveCard={handleExploreCardSave}
                  onTrendingOnMaps={handleTrendingOnMaps}
                />
              )}
              {sheetTab === "saved" && (
                <SavedTab
                  collections={SAVED_COLLECTIONS}
                  savedPlaces={savedCards}
                  sessions={RALLY_SESSIONS}
                />
              )}
              {sheetTab === "add" && <AddPlacesTab />}
            </BottomSheet>
          )}

          {/* Place detail bottom sheet */}
          {selectedPlace && (
            <PlaceDetailSheet
              place={selectedPlace}
              onClose={() => setSelectedPlace(null)}
              onSave={handleSaveButtonTap}
              onViewLibrary={() => navigate("/session/active/library")}
            />
          )}

          {/* Save destination picker */}
          {showSavePicker && savingPlaceId && (
            <SaveDestinationPicker
              placeName={places.find((p) => p.id === savingPlaceId)?.name ?? ""}
              onClose={() => { setShowSavePicker(false); setSavingPlaceId(null); }}
              onSave={handleSaveConfirm}
            />
          )}

          {/* Weather modal */}
          {showWeatherModal && (
            <WeatherModal
              weather={WEATHER_DETAIL}
              onClose={() => setShowWeatherModal(false)}
            />
          )}

          {/* Leaderboard panel */}
          {showLeaderboard && (
            <LeaderboardPanel
              entries={LEADERBOARD}
              onClose={() => setShowLeaderboard(false)}
            />
          )}
        </div>
      </PhoneFrame>
    </AndroidFrame>
  );
}
