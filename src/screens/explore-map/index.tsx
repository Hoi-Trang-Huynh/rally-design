import { useState } from "react";
import { useNavigate } from "react-router";
import { Navigation } from "lucide-react";
import { toast } from "sonner";
import AndroidFrame from "../../app/components/layout/android-frame";
import PhoneFrame from "../../app/components/layout/phone-frame";
import type { MapPlace, MapLayers } from "./types";
import { CATEGORIES, PLACES, FRIENDS } from "./data";
import SearchBar from "./components/search-bar";
import CategoryChips from "./components/category-chips";
import ExploreMapBg from "./components/explore-map-bg";
import MapPins from "./components/map-pins";
import PlaceDetailSheet from "./components/place-detail-sheet";
import SaveDestinationPicker from "./components/save-destination-picker";
import MapLayersPanel from "./components/map-layers-panel";
import FriendMarkers from "./components/friend-markers";
import WeatherOverlay from "./components/weather-overlay";

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

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <AndroidFrame>
      <PhoneFrame activeTab="explore" showHeader={false} showBottomNav={!selectedPlace}>
        <div className="relative size-full">
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

          {/* Current location FAB */}
          {!selectedPlace && (
            <button
              className="absolute bottom-[16px] right-[16px] z-20 flex size-[44px] items-center justify-center rounded-full bg-white transition-all active:scale-95"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
            >
              <Navigation size={20} className="text-[#ff6733]" strokeWidth={2} />
            </button>
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
        </div>
      </PhoneFrame>
    </AndroidFrame>
  );
}
