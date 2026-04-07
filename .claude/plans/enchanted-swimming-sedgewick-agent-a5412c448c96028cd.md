# Explore Page Rebuild - Implementation Plan

## Executive Summary

This plan transforms the existing Explore Map screen from a pure map view into a dual-mode interface: map + persistent bottom sheet with three tabs (Explore, Saved Places, Add Places). The bottom sheet is the primary new feature. Secondary features include a weather modal, scratch-off map overlay, and leaderboard link.

---

## Part 1: Architecture Assessment

### What Exists (Keep As-Is)
These components work and need no modification:
- `components/explore-map-bg.tsx` - SVG map background
- `components/map-pins.tsx` - Place pin rendering
- `components/friend-markers.tsx` - Friend location avatars
- `components/category-chips.tsx` - Horizontal filter chips
- `components/search-bar.tsx` - Search input overlay
- `components/save-destination-picker.tsx` - Two-step save flow

### What Needs Modification
- **`index.tsx`** (main screen) - Major restructure. Must integrate bottom sheet, change how PlaceDetailSheet/WeatherOverlay are triggered, add new state for bottom sheet tabs and drag position, add leaderboard + scratch-map state.
- **`types.ts`** - Extend with ~10 new types for explore sections, saved collections, rallies, weather modal data, leaderboard entries, scratch-map state.
- **`data.ts`** - Extend with mock data for all new features (explore sections, collections, rallies, weather forecast, leaderboard).
- **`components/place-detail-sheet.tsx`** - Will still be used but its trigger changes. Currently it replaces everything when a pin is clicked. Now it should overlay on top of the bottom sheet OR the bottom sheet should collapse when a pin is clicked to show the detail. Recommend: keep the existing overlay behavior but restore bottom sheet on close.
- **`components/weather-overlay.tsx`** - Replace with a clickable chip that opens the new weather modal. The existing component is a static display. Needs to become a button that triggers the weather modal.
- **`components/map-layers-panel.tsx`** - Minor. Reposition since bottom sheet will consume the bottom area. The FAB moves to sit above the bottom sheet header.

### What Is New
10 new component files + type/data extensions.

---

## Part 2: New Type Definitions

**File: `src/screens/explore-map/types.ts`** (extend existing)

Add these types:

```
BottomSheetState = "collapsed" | "half" | "full"
  - collapsed: only tab header visible (~64px from bottom)
  - half: sheet covers ~50% of screen (default on load)
  - full: sheet covers ~85% of screen

BottomSheetTab = "explore" | "saved" | "add"

ExploreSection = {
  id: string
  title: string          // "Trending Places", "Where to eat", etc.
  subtitle?: string
  icon: LucideIcon
  places: ExploreCard[]
}

ExploreCard = {
  id: string
  name: string
  img: string
  category: string
  rating: number
  reviewCount: number
  priceLabel?: string    // For "Where to stay" - shows avg price
  trending?: boolean
  saved: boolean
  x: number              // Map coordinates for "Trending on Maps"
  y: number
}

SavedCollection = {
  id: string
  name: string
  coverImg: string
  placeCount: number
  emoji: string          // Collection icon
  createdAt: string
}

SavedPlace = {
  id: string
  name: string
  img: string
  category: string
  rating: number
  address: string
  notes?: string
  tags: string[]
  savedAt: string
  collectionId: string
}

RallySession = {
  id: string
  name: string
  coverImg: string
  placeCount: number
  participantCount: number
  participantAvatars: string[]  // URLs
  lastActive: string
}

RallyPlace = {
  id: string
  name: string
  img: string
  category: string
  rating: number
  address: string
  upvotes: number
  downvotes: number
  commentCount: number
  addedBy: string
}

WeatherForecast = {
  current: {
    temp: number
    condition: string
    icon: string
    humidity: number
    wind: string
    feelsLike: number
    uvIndex: number
  }
  hourly: { time: string; temp: number; icon: string }[]
  daily: { day: string; high: number; low: number; icon: string; condition: string }[]
  location: string
}

LeaderboardEntry = {
  id: string
  name: string
  avatar: string
  areaPercent: number    // % of map "unlocked"
  rank: number
}

ScratchMapRegion = {
  id: string
  path: string           // SVG path for the region
  visited: boolean
  opacity: number        // 0 = fully revealed, 1 = fully scratched/hidden
}
```

---

## Part 3: New Mock Data

**File: `src/screens/explore-map/data.ts`** (extend existing)

Add:

1. **EXPLORE_SECTIONS** - 5 sections (Trending Places, Where to eat, Where to play, Community recommends, Where to stay), each with 5 ExploreCard entries using Unsplash images and data consistent with the Da Nang setting.

2. **SAVED_COLLECTIONS** - 3-4 mock collections (e.g., "Day 1 Musts", "Food Tour", "Photo Spots", "Nightlife").

3. **PERSONAL_SAVED_PLACES** - 6-8 saved places with notes and tags.

4. **RALLY_SESSIONS** - 2-3 sessions (one active, one past) with participant avatars reusing the AVATARS pattern from dashboard/session-library.

5. **RALLY_PLACES** - 5-6 places per rally with voting data.

6. **WEATHER_FORECAST** - Single WeatherForecast object for Da Nang with 8 hourly entries and 5 daily entries.

7. **LEADERBOARD** - 5 entries including the current user.

8. **SCRATCH_REGIONS** - 6-8 SVG regions covering the map grid.

---

## Part 4: New Components

### 4.1 Bottom Sheet Container
**File: `src/screens/explore-map/components/bottom-sheet/bottom-sheet.tsx`**

The central new component. Responsibilities:
- Renders a draggable panel anchored to the bottom of the screen
- Three snap points: collapsed (~64px visible = tab header only), half (~50% screen), full (~85% screen)
- Drag handle at top with 36px wide / 4px tall rounded bar (matching existing pattern from place-detail-sheet)
- Tab header row always visible with 3 tabs + weather button
- Content area scrollable within the sheet
- Uses pointer events for drag (matching pattern from session-overview bottom sheet documented in component-patterns.md)
- Velocity-based snapping with 0.4 threshold

Implementation approach:
- Use CSS `transform: translateY()` for positioning (GPU-accelerated)
- Track drag via `onPointerDown/Move/Up` on the handle zone
- Store `sheetTop` as a pixel value; compute snap points from container height
- Content div gets `overflow-y: auto` only when sheet is at half or full
- On initial load, snap to "half" state

Props: `{ activeTab, onTabChange, sheetState, onSheetStateChange, children }`

### 4.2 Bottom Sheet Tab Header
**File: `src/screens/explore-map/components/bottom-sheet/tab-header.tsx`**

- Horizontal row with 3 tab buttons: Explore, Saved Places, Add Places
- Weather button on the far right (cloud icon + current temp)
- Active tab has bottom orange indicator bar (2px, matching session-overview tab pattern)
- Tabs use Lucide icons: Compass for Explore, Bookmark for Saved, PlusCircle for Add

### 4.3 Explore Tab Content
**File: `src/screens/explore-map/components/bottom-sheet/explore-tab.tsx`**

- "Trending on Maps" button at top (full-width, gradient background, flame icon)
- 5 sections rendered as vertical list
- Each section: title row with icon + "See more" link, then horizontal carousel of 5 cards
- Carousel: CSS scroll-snap horizontal (matching existing PhotoCarousel pattern)
- Cards: 160px wide, rounded-[14px], image top (100px), title + rating + category below, "Save" bookmark button overlay
- "Where to stay" section cards additionally show price overlay on the image

### 4.4 Explore Card
**File: `src/screens/explore-map/components/bottom-sheet/explore-card.tsx`**

- Reusable card for explore section carousels
- 160px width, rounded-[14px], white bg with standard two-layer shadow
- Image area: 100px height, gradient overlay at bottom, category badge top-left, save button top-right
- Text area: place name (13px bold), star + rating + review count row, price overlay for lodging
- On tap: could expand to PlaceDetailSheet or just show a toast (design showcase)

### 4.5 Saved Places Tab Content
**File: `src/screens/explore-map/components/bottom-sheet/saved-tab.tsx`**

- Secondary tab row: "Personal" | "Rallies (Shared)" toggle
- **Personal sub-tab:**
  - Collections grid (2 columns) at top with "New Collection" CTA card
  - Each collection card: cover image, name, place count, emoji
  - Below collections: "All Saved Places" section with search bar + sort dropdown
  - Saved place items: compact list rows with image thumb (48px), name, category, tags as pills, date
  - Sort options: Date added, Name, Rating
- **Rallies sub-tab:**
  - Session cards: cover image, name, participant count + avatar cluster, place count, "last active" label
  - On card tap: expand to show rally place list with voting UI (simplified version of session-library pattern)

### 4.6 Add Places Tab Content
**File: `src/screens/explore-map/components/bottom-sheet/add-tab.tsx`**

- Simple form layout for adding a custom place
- Fields: Place name, Category (dropdown), Address, Notes (textarea), Photo placeholder
- Tags selector (reusing SUGGESTED_TAGS pattern from save-destination-picker)
- "Add Place" CTA button (orange gradient, matching existing button pattern)
- This is a design showcase so the form is purely visual

### 4.7 Weather Modal
**File: `src/screens/explore-map/components/weather-modal.tsx`**

- Full overlay modal (similar to save-destination-picker pattern)
- Google Weather-inspired layout:
  - Header: location name + close button
  - Current conditions: large temp display, condition text, weather icon, feels like / humidity / wind / UV row
  - Hourly forecast: horizontal scroll row of hour chips (icon + temp)
  - 5-day forecast: vertical list of daily rows (day, icon, high/low bar)
- Backdrop blur + slide-up animation
- Close button top-right (X in circle, matching existing close pattern)

### 4.8 Scratch Map Overlay
**File: `src/screens/explore-map/components/scratch-map-overlay.tsx`**

- SVG overlay on the map that shows "fog of war" over unvisited areas
- Uses SVG paths defining regions (rectangles or organic shapes covering the map grid)
- Visited regions have reduced opacity (revealing the map beneath)
- Unvisited regions show a semi-transparent scratch pattern (hatched or solid gray)
- Toggle controlled from the Map Layers panel (add "Scratch Map" as a new layer option)
- Purely visual - no actual scratch gesture needed (this is a design showcase)
- Stat display: small floating chip showing "42% explored" in the corner

### 4.9 Leaderboard Panel
**File: `src/screens/explore-map/components/leaderboard-panel.tsx`**

- Small floating button/icon near the scratch map stat chip
- On tap: opens a compact overlay showing top 5 users ranked by area explored
- Each row: rank number, avatar, name, percentage bar, percentage text
- Current user highlighted with orange accent
- Close button, rounded-[16px] white panel with shadow (matching map-layers-panel aesthetic)

---

## Part 5: Main Screen Restructure

**File: `src/screens/explore-map/index.tsx`**

### New State Variables
```
// Bottom sheet
const [sheetState, setSheetState] = useState<BottomSheetState>("half")
const [activeSheetTab, setActiveSheetTab] = useState<BottomSheetTab>("explore")

// Weather modal
const [showWeatherModal, setShowWeatherModal] = useState(false)

// Scratch map
const [scratchMapEnabled, setScratchMapEnabled] = useState(false)

// Leaderboard
const [showLeaderboard, setShowLeaderboard] = useState(false)

// Existing state remains unchanged
```

### Layout Changes
The render structure changes to:
1. Map background layer (unchanged)
2. Friend markers layer (unchanged)
3. Map pins layer (unchanged)
4. Scratch map overlay (new, conditional on scratchMapEnabled)
5. Search bar (unchanged, stays at z-30)
6. Category chips (unchanged, stays at z-20)
7. Map layers FAB (repositioned to sit above the bottom sheet header)
8. Current location FAB (repositioned similarly)
9. Weather overlay chip - becomes a button part of tab header, not a standalone overlay
10. Leaderboard button + panel (new, near map layers area)
11. Scratch map stats chip (new, conditional)
12. Bottom sheet container (new, always rendered, z-30)
13. Place detail sheet (unchanged, overlays everything at z-30 when pin selected)
14. Save destination picker (unchanged, overlays at z-60)
15. Weather modal (new, overlays at z-50)

### Key Behavioral Changes
- Bottom sheet is ALWAYS visible (even collapsed state shows tab header)
- When a pin is tapped, the bottom sheet collapses to show the PlaceDetailSheet
- When PlaceDetailSheet closes, bottom sheet restores to its previous state
- `showBottomNav` on PhoneFrame should be `false` since the bottom sheet replaces it visually, OR the bottom nav stays but bottom sheet sits above it. Recommend: keep bottom nav visible always (it provides navigation to other screens), and the bottom sheet sits ABOVE it.
- Actually - looking at the existing code, `showBottomNav={!selectedPlace}` already hides nav when a place is selected. The bottom sheet should also manage this - when sheet is full, the bottom nav is hidden or pushed down.

### PhoneFrame Integration
- `showBottomNav={true}` always (bottom sheet lives within the content area, above the nav)
- `showHeader={false}` stays as-is (explore map has no app header)

---

## Part 6: Map Layers Panel Extension

**File: `src/screens/explore-map/components/map-layers-panel.tsx`**

Add one new layer option:
```
{ key: "scratchMap", label: "Scratch Map", icon: Map, color: "#ff6733" }
```

This requires extending the `MapLayers` type:
```
export type MapLayers = {
  traffic: boolean;
  transit: boolean;
  weather: boolean;
  friends: boolean;
  scratchMap: boolean;    // NEW
};
```

Repositioning: The entire panel needs to move up by the height of the bottom sheet header (~64px) when the bottom sheet is collapsed, or more when half/full. Pass `bottomOffset` prop.

---

## Part 7: Implementation Order

### Phase 1: Foundation (Types + Data + Skeleton)
Estimated: 1 step

1. Extend `types.ts` with all new types
2. Extend `data.ts` with all mock data
3. Create empty bottom-sheet directory structure
4. Create skeleton `bottom-sheet.tsx` with drag mechanics and snap points (no tab content yet)
5. Create `tab-header.tsx` with tab buttons
6. Integrate bottom-sheet into `index.tsx` at minimal level (renders, drags, shows tab names)

### Phase 2: Explore Tab (The Showcase Feature)
Estimated: 1 step

1. Build `explore-card.tsx`
2. Build `explore-tab.tsx` with all 5 sections and carousels
3. Wire "Trending on Maps" button (visual only, or could trigger map zoom)
4. Wire "Save" buttons on cards (reuse existing save flow)
5. Test scrolling within the bottom sheet at half and full states

### Phase 3: Saved Places Tab
Estimated: 1 step

1. Build `saved-tab.tsx` with Personal/Rallies sub-tabs
2. Build collections grid and saved places list for Personal
3. Build rally session cards and place list for Rallies
4. Wire search/filter/sort (visual state management, mock data)

### Phase 4: Add Places Tab + Weather Modal
Estimated: 1 step

1. Build `add-tab.tsx` form layout
2. Build `weather-modal.tsx`
3. Replace weather-overlay with clickable weather button in tab-header
4. Wire weather modal open/close

### Phase 5: Scratch Map + Leaderboard
Estimated: 1 step

1. Build `scratch-map-overlay.tsx`
2. Build `leaderboard-panel.tsx`
3. Extend MapLayers type and map-layers-panel
4. Wire scratch map toggle and leaderboard button
5. Add stats chip overlay

### Phase 6: Polish + Integration
Estimated: 1 step

1. Reposition map-layers-panel FAB and current-location FAB to account for bottom sheet
2. Ensure PlaceDetailSheet interaction (pin tap collapses sheet, close restores)
3. Test all three sheet states with all tabs
4. Smooth animations and transitions
5. Verify z-index layering works correctly across all states

---

## Part 8: Component File Manifest

### New Files to Create
```
src/screens/explore-map/components/bottom-sheet/bottom-sheet.tsx
src/screens/explore-map/components/bottom-sheet/tab-header.tsx
src/screens/explore-map/components/bottom-sheet/explore-tab.tsx
src/screens/explore-map/components/bottom-sheet/explore-card.tsx
src/screens/explore-map/components/bottom-sheet/saved-tab.tsx
src/screens/explore-map/components/bottom-sheet/add-tab.tsx
src/screens/explore-map/components/weather-modal.tsx
src/screens/explore-map/components/scratch-map-overlay.tsx
src/screens/explore-map/components/leaderboard-panel.tsx
```

### Existing Files to Modify
```
src/screens/explore-map/types.ts          - Add ~12 new type definitions
src/screens/explore-map/data.ts           - Add ~8 new mock data exports
src/screens/explore-map/index.tsx         - Major restructure of state + layout
src/screens/explore-map/components/map-layers-panel.tsx  - Add scratch map layer, bottomOffset prop
src/screens/explore-map/components/weather-overlay.tsx    - Convert to clickable button OR remove (weather moves to tab-header)
```

---

## Part 9: Practical Scope Recommendation

The full sitemap describes a very large feature set. For a design showcase, I recommend this priority order:

### Must Have (Phases 1-2)
- Bottom sheet container with drag mechanics and three snap states
- Tab header with Explore / Saved / Add tabs
- Explore tab with all 5 carousels and cards
- This alone transforms the screen and demonstrates the key UX concept

### Should Have (Phase 3)
- Saved Places tab with collections and rally sessions
- This provides the second pillar of the feature

### Nice to Have (Phases 4-6)
- Add Places tab (simple form, lowest visual impact)
- Weather modal (impressive but not core to the bottom sheet concept)
- Scratch map overlay (unique feature, fun visual)
- Leaderboard (small feature, depends on scratch map)

If time is constrained, deliver Phases 1-2 first as they constitute ~60% of the visual impact.

---

## Part 10: Key Technical Decisions

### Bottom Sheet Implementation
**Decision: Custom implementation with pointer events, NOT vaul library.**

Rationale: While `vaul` (v1.1.2) is installed, the bottom sheet here has non-standard behavior:
- Three snap points (vaul defaults to open/closed)
- Tab header always visible even in collapsed state
- Content must switch between tabs while maintaining drag state
- Sheet must interact with the map (collapsing when a pin is tapped)
- The session-overview already established a custom pointer-event drag pattern that works well within the AndroidFrame viewport

The existing pattern from session-overview (documented in component-patterns.md) uses:
- `onPointerDown` on the drag handle
- `onPointerMove` / `onPointerUp` on the window
- Velocity tracking with exponential smoothing
- CSS `transform: translateY()` for GPU-accelerated positioning

This same pattern should be replicated for consistency.

### Carousel Implementation
**Decision: CSS scroll-snap, NOT embla-carousel.**

Rationale: The existing PhotoCarousel in place-detail-sheet uses CSS `scroll-snap-x` with `snap-mandatory` and the `scrollbar-hide` utility. This is lightweight, has no JS dependency, and works well for the 5-card horizontal scroll. The `embla-carousel-react` package is available but unused in the codebase - using it here would introduce an inconsistency.

### Tab State Management
**Decision: Local state in index.tsx, passed down as props.**

The existing pattern in this codebase is to keep all state in the screen's `index.tsx` and pass handlers down. There is no global state management (no Redux, Zustand, or Context). Follow this convention.

### Z-Index Layering
Current layering:
- Map background: base
- Pins: z-10 (selected: z-20)
- Friend markers: z-15
- Category chips: z-20
- Weather overlay: z-18
- Map layers FAB: z-20
- Search bar: z-30
- Place detail sheet: z-30
- Save picker: z-60

New layering:
- Bottom sheet: z-25 (above map controls, below search bar)
- Weather modal: z-50
- Leaderboard panel: z-22
- Scratch map overlay: z-5 (just above map background)
- Place detail sheet: z-30 (unchanged, overlays bottom sheet)
- Save picker: z-60 (unchanged)

---

## Part 11: Detailed Bottom Sheet Snap Point Calculations

The AndroidFrame screen area is 720px tall. After the 24px status bar, app content gets ~696px. The PhoneFrame bottom nav is ~76px (8px top padding + 48px items + 28px bottom safe area = ~84px from the BottomNav component). But the explore map uses `showBottomNav` dynamically.

With bottom nav visible, content area is approximately 696 - 84 = 612px.

Snap points (measured as sheet height from bottom of content area):
- **Collapsed**: 64px visible (tab header height only)
- **Half**: 310px (~50% of content area)
- **Full**: 520px (~85% of content area, leaving room for search bar)

These translate to `translateY` values on the sheet:
- Collapsed: `translateY(calc(100% - 64px))`
- Half: `translateY(calc(100% - 310px))`
- Full: `translateY(calc(100% - 520px))`

The sheet container is absolutely positioned at the bottom of the content area.
