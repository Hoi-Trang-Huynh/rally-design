---
name: Rally design tokens and conventions
description: Color, spacing, typography, and radius tokens used in the Rally app codebase
type: project
---

## Colors (inferred from usage — no separate token file found)
- Primary orange: #ff6733 (CTAs, active states, brand)
- Primary dark orange: #ff551d (gradient start)
- Primary gradient: linear-gradient(#FF551D → #FF6A9F) — used on primary CTAs
- Secondary orange tint: #ffeee8 (active bg), #fff4ef, #fff7f4
- Success green: #34c759 (active badge), #22c55e (synced)
- Destructive red: #ff3b30, #ef4444
- Warning amber: #f59e0b
- Text high: #292827
- Text medium: #3e3e3d, #545352
- Text low: #696968, #949493
- Text disabled: #b4b4b3, #d4d4d4
- Border: #eaeae9
- Surface: #f5f5f5, #fafafa, #f0efee

## Typography (Inclusive Sans, px-based)
- Display: 22px / 28px
- Section header: 18px–20px / 24–28px
- Body: 16px / 24px
- Body small: 14px / 20px
- Caption: 12–13px / 16–18px
- Micro: 10–11px (used for badges and labels — potential a11y concern)
- Below-minimum micro: 8–9px (found in carousel order badges and day sub-labels)

## Spacing
- Page horizontal padding: 16px (bottom sheet content), 20px (some modals), 24px (sheets)
- Component gaps: 8px, 10px, 12px, 16px
- Section padding bottom: 20–32px

## Border Radius
- Cards: 14px (saved place cards), 16px (modals/sheets), 20px (sheets/modals), 28px (pill buttons)
- Small chips: 6–8px (time chips, day pills)
- Icon containers: 8–10px

## Touch Targets (ISSUES FOUND)
- Back button: size-[30px] — BELOW 44pt minimum (PhoneFrame AppHeader; FIXED to size-[44px] in session-overview.tsx header row and timeline.tsx header row)
- More/ellipsis button: size-[24px] — BELOW 44pt minimum (PhoneFrame AppHeader; FIXED to size-[44px] in session-overview.tsx and timeline.tsx)
- Timeline modal close: size-[28px] — BELOW 44pt minimum
- Heart toggle on card: no explicit size, icon only 17px — BELOW 44pt
- Heart like count button: flex items with ~30px height — BELOW 44pt
- Likes sheet close: size-[32px] — BELOW 44pt
- Delete (trash) on card image: size-[28px] — BELOW 44pt
- Day picker buttons in timeline.tsx: w-[30px] — BELOW 44pt minimum

## Color Drift (ISSUES FOUND)
- "Add Event Card" CTA in timeline.tsx uses #ff561c — should be brand orange #ff6733
- Draft badge (#3e3e3d on #d4d4d4) ~3.0:1 contrast — FAILS WCAG AA
- Active badge (white on #34c759) ~3.9:1 contrast — FAILS WCAG AA for normal text
