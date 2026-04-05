---
name: Rally app project context
description: High-level context for the Rally trip-planning app and its design environment
type: project
---

Rally is a collaborative trip-planning mobile app. The main screen reviewed is "Session Overview" — a trip detail screen.

**Platform:** Android-first presentation (360px wide screen inside a 392×776 bezel mockup) but the underlying component (session-overview.tsx) was originally built for iOS (390px, uses iOS StatusBar, HomeIndicator, Notch). The screen wrapper at `src/screens/session-overview/index.tsx` overrides these with CSS `display: none` to suppress iOS chrome.

**Why:** The component is being adapted into an Android frame for prototyping/demo purposes.

**How to apply:** When reviewing, flag any remaining iOS-specific conventions (spring animations, sheet behaviors, navigation patterns) that don't match Material Design 3 when the Android frame is the target.

**Stack:** React + Tailwind CSS, custom bottom sheet drag (pointer events), Sonner for toasts, Lucide icons, Inclusive Sans font.

**Screen content area:** 360px wide × 648px tall (720px screen minus 24px status bar minus 48px system nav).

**Key screens/flows reviewed:** Session Overview (map + bottom sheet with Trip Overview, Reservations grid, Saved Places), Add to Timeline modal, Remove from Timeline dialog, Add a Place search sheet, File Preview modal, New Collection modal, General Card Detail view, Timeline tab (day picker + event cards).

**Frame mismatch — known issue:** `session-overview.tsx` (Overview tab) uses a bespoke 390×844 iOS frame with a 47px Notch-based StatusBar. `src/screens/session-overview/timeline.tsx` (Timeline tab) uses `AndroidFrame` at 360×720 with a 24px Android status bar. These are two tabs of the same logical screen and must share one frame. The iOS status bar height delta (47px vs 24px) is the root cause of the "title drops lower" complaint on Overview.
