---
name: Rally component architecture and interaction patterns
description: Key component patterns, interactions, and decisions found in the session-overview screen
type: project
---

## Bottom Sheet
- Three snap points: full (top: 8px), half (~40% of container height), peek (container height - 60px)
- Drag uses PointerEvent at window level for reliable tracking across the mockup boundary
- Velocity-based snapping with 0.4 threshold and exponential smoothing
- Sheet content scrolls independently from drag handle
- Carousel cards animate position tied to sheetTop (appears above sheet, fades when sheet is near full)

## Tab Bar
- Tabs: Overview, Timeline, Participants, Media, Template, Budget (line 1244)
- Only "Overview" is active in current build — others are not wired to content
- Active indicator: 2px rounded bottom border in #ff6733 with glow shadow
- Inactive label color #949493 fails WCAG contrast on white bg

## Map
- SVG map (illustrative, not real tiles) with gradient terrain, roads, water
- Route lines use a separate SVG overlay with viewBox="0 0 100 100" (percentage coords match pin positions)
- Map pins are absolute-positioned buttons with percentage left/top
- Day selector dropdown overlays map top-left; z-index 20
- Map zoom/pan on day change via CSS transform on the inner map div

## Saved Places — General Space
- Cards have double-tap-to-like gesture (300ms threshold, onTouchEnd + lastTapRef)
- Heart toggle inside card body; like count opens a "Likes" bottom sheet
- "Add to Timeline" button on each card opens a centered modal (not a bottom sheet)
- "Added" state shows green check; tapping again opens "Remove from Timeline" confirmation dialog
- Owner-only: Add a new place (opens search bottom sheet), delete card (trash button top-left of image)

## Add to Timeline Modal
- Centered popup (absolute inset-0, flex items-center) — NOT a bottom sheet
- Day carousel: horizontal scroll with snap; 5 days shown
- Time picker: period tabs (Morning/Afternoon/Evening) + time chips
- Occupied slots shown with line-through and red dot indicator
- Conflict detection: clears timelineFormTime when switching days if that slot is occupied

## Saved Places — Personal Space
- Separate view (savedPlacesSpace state) — NO toggle UI currently rendered in JSX (lines 2069–2071 have the comment but null content)
- Personal cards show recommend status: pending (spinner), accepted (green check), rejected (red X)

## Reservation Grid
- 3-column grid of icon tiles (6 categories)
- Tap opens accordion file list below grid (CSS max-height transition)
- Files show sync status badge (Synced/Offline)
- File tap opens centered preview modal

## Modals Pattern
- All modals use `absolute inset-0 z-50` — scoped to the 390px component, not viewport
- Backdrop: black/40 or black/70 + backdrop-blur-md
- Click-outside closes via onClick on backdrop div + stopPropagation on modal content

## iOS Chrome Suppression (Android frame)
- StatusBar and HomeIndicator hidden via CSS in screen wrapper (display: none on data-name selectors)
- Component root overrides: width 100%, height 100%, max-height none
- iOS-style ToggleSwitch (green/gray, 31×51px) still used — not replaced with MD3 Switch
