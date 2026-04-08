import { useRef, useState } from "react";
import {
  X, Star, MapPin, Clock, Bookmark, Check, ChevronRight,
  Flame,
} from "lucide-react";
import type { MapPlace, Review } from "../types";
import { CATEGORY_COLORS, REVIEWS } from "../data";

// ─── Photo Carousel (CSS scroll-snap) ────────────────────────────────────────
function PhotoCarousel({ photos, name }: { photos: string[]; name: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(idx);
  };

  if (photos.length <= 1) {
    return (
      <div className="relative h-[160px] overflow-hidden rounded-[14px]">
        <img src={photos[0]} alt={name} className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[14px]">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex h-[160px] snap-x snap-mandatory overflow-x-auto"
      >
        {photos.map((src, i) => (
          <div key={i} className="h-full w-full shrink-0 snap-center">
            <img src={src} alt={`${name} ${i + 1}`} className="size-full object-cover" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute bottom-[10px] left-1/2 flex -translate-x-1/2 gap-[5px]">
        {photos.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-200 ${
              i === activeIndex ? "h-[6px] w-[16px] bg-white" : "size-[6px] bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-[2px]">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={12}
          className={n <= rating ? "text-[#fbbf24]" : "text-[#eaeae9]"}
          fill={n <= rating ? "#fbbf24" : "#eaeae9"}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

// ─── Reviews Section ─────────────────────────────────────────────────────────
function ReviewsSection({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;
  const shown = reviews.slice(0, 2);
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-bold text-[#292827]">Reviews</p>
        {reviews.length > 2 && (
          <button className="flex items-center gap-[2px] text-[12px] font-semibold text-[#ff6733]">
            See all {reviews.length}
            <ChevronRight size={12} strokeWidth={2.5} />
          </button>
        )}
      </div>
      {shown.map((r) => (
        <div key={r.id} className="flex gap-[10px] rounded-[12px] bg-[#f9f9f8] px-[12px] py-[10px]">
          <div
            className="flex size-[32px] shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: r.avatar }}
          >
            <p className="text-[12px] font-bold text-white">{r.author[0]}</p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold text-[#292827]">{r.author}</p>
              <p className="text-[11px] text-[#b4b4b3]">{r.date}</p>
            </div>
            <StarRating rating={r.rating} />
            <p className="text-[12px] leading-[17px] text-[#696968]">{r.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Detail Sheet ───────────────────────────────────────────────────────
type PlaceDetailSheetProps = {
  place: MapPlace;
  onClose: () => void;
  onSave: (placeId: string) => void;
  onViewLibrary: () => void;
};

export default function PlaceDetailSheet({
  place,
  onClose,
  onSave,
  onViewLibrary,
}: PlaceDetailSheetProps) {
  const reviews = REVIEWS[place.id] || [];
  const color = CATEGORY_COLORS[place.category] || "#ff6733";

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Sheet */}
      <div
        className="relative z-10 max-h-[80%] overflow-y-auto rounded-t-[24px] bg-white animate-in slide-in-from-bottom duration-300"
        style={{ boxShadow: "0 -8px 40px rgba(0,0,0,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="sticky top-0 z-10 flex justify-center bg-white pb-[4px] pt-[10px]">
          <div className="h-[4px] w-[36px] rounded-full bg-[#d4d4d4]" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-[16px] top-[12px] z-20 flex size-[32px] items-center justify-center rounded-full bg-[#f5f5f5] transition-all active:scale-95"
        >
          <X size={16} className="text-[#545352]" strokeWidth={2.5} />
        </button>

        <div className="px-[16px] pb-[16px]">
          {/* Photo carousel */}
          <div className="relative mb-[14px]">
            <PhotoCarousel photos={place.photos} name={place.name} />
            {/* Category badge */}
            <div
              className="absolute left-[10px] top-[10px] rounded-full px-[10px] py-[4px]"
              style={{ backgroundColor: color }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3px] text-white">
                {place.category}
              </p>
            </div>
            {/* Trending badge */}
            {place.trending && (
              <div className="absolute right-[10px] top-[10px] flex items-center gap-[4px] rounded-full bg-[#292827]/80 px-[8px] py-[4px] backdrop-blur-sm">
                <Flame size={11} className="text-[#ff6733]" fill="#ff6733" strokeWidth={0} />
                <p className="text-[10px] font-bold text-white">Trending</p>
              </div>
            )}
          </div>

          {/* Title + rating row */}
          <div className="flex items-start justify-between gap-[10px]">
            <div className="min-w-0 flex-1">
              <h2 className="text-[18px] font-bold leading-[24px] tracking-[-0.3px] text-[#292827]">
                {place.name}
              </h2>
              <div className="mt-[5px] flex flex-wrap items-center gap-[6px]">
                <div className="flex items-center gap-[3px]">
                  <Star size={13} className="text-[#fbbf24]" fill="#fbbf24" strokeWidth={0} />
                  <p className="text-[12px] font-bold text-[#292827]">{place.rating}</p>
                </div>
                <p className="text-[12px] text-[#949493]">
                  ({place.reviewCount.toLocaleString()})
                </p>
                <span className="text-[#d4d4d4]">|</span>
                <p className="text-[12px] font-semibold text-[#545352]">{place.priceLevel}</p>
              </div>
            </div>
          </div>

          <p className="mt-[8px] text-[12px] leading-[18px] text-[#696968]">
            {place.description}
          </p>

          {/* Meta rows */}
          <div className="mt-[10px] flex flex-col gap-[1px]">
            <div className="flex items-center gap-[8px] py-[6px]">
              <MapPin size={14} className="shrink-0 text-[#949493]" strokeWidth={2} />
              <p className="text-[12px] leading-[16px] text-[#545352]">{place.address}</p>
            </div>
            <div className="flex items-center gap-[8px] py-[6px]">
              <Clock size={14} className="shrink-0 text-[#949493]" strokeWidth={2} />
              <p className="text-[12px] leading-[16px] text-[#545352]">{place.hours}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-[10px] h-[0.6px] bg-[#eaeae9]" />

          {/* Reviews */}
          <ReviewsSection reviews={reviews} />

          {/* Save CTA */}
          <div className="mt-[14px]">
            <button
              onClick={() => onSave(place.id)}
              className={`flex w-full items-center justify-center gap-[8px] rounded-[14px] py-[12px] text-[14px] font-bold transition-all duration-200 active:scale-[0.98] ${
                place.saved
                  ? "bg-[#34c759] text-white"
                  : "bg-gradient-to-r from-[#ff6733] to-[#ff8f66] text-white"
              }`}
              style={{
                boxShadow: place.saved
                  ? "0 4px 16px rgba(52,199,89,0.35)"
                  : "0 4px 16px rgba(255,103,51,0.35)",
              }}
            >
              {place.saved ? (
                <>
                  <Check size={16} strokeWidth={3} />
                  Saved to Shared Library
                </>
              ) : (
                <>
                  <Bookmark size={16} strokeWidth={2.5} />
                  Save to Shared Session Library
                </>
              )}
            </button>
            {place.saved && (
              <button
                onClick={onViewLibrary}
                className="mt-[8px] flex w-full items-center justify-center gap-[6px] text-[12px] font-semibold text-[#ff6733] transition-all active:scale-95"
              >
                View in Library
                <ChevronRight size={14} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
