---
name: Rally accessibility issues and patterns
description: Recurring a11y problems found in the Rally session-overview screen review
type: project
---

## Critical Patterns

**Zero aria-label coverage across the entire component.**
Not a single `aria-label`, `aria-expanded`, `aria-pressed`, `role`, or `sr-only` was found in session-overview.tsx (confirmed via grep). Every interactive element — map pins, drag handle, heart toggle, tab bar, sheet close buttons — is unlabeled. Screen readers cannot identify any interactive element by purpose.

**Double-tap gesture (Like) has no alternative.**
The double-tap-to-like interaction (lines 2116–2133) relies entirely on timing (300ms threshold). There is no alternative interaction path for users who cannot double-tap quickly or use switch access. The single-tap opens a detail view, so the only way to "like" without opening details is double-tap or using the heart button — the heart button is valid, but the gesture itself is undiscoverable.

## Major Patterns

**Sub-minimum touch targets — systemic.**
Multiple buttons fall below 44×44pt (Android/iOS minimum):
- Back button (line 1208): 30×30px
- More/ellipsis button (line 1232): 24×24px
- Timeline modal close (line 2483): 28×28px
- Trash button on card image (line 2161): 28×28px
- Likes sheet close (line 2394): 32×32px
- Heart toggle button (lines 2186–2204): icon-only, no size wrapper

**Sub-minimum text sizes.**
- 8px text in avatar stack overflow badge (line 2229) — fails WCAG 1.4.4 minimum text size
- 9px text in day carousel sub-label (line 2533) — fails WCAG 1.4.4
- 10px text for section labels (Date, Time) in timeline modal — borderline

## Minor Patterns

**Color-only state communication.**
Occupied time slots use line-through + light color (line 2580) with a red dot. Color is the only meaningful difference from unoccupied slots. Needs a text label or icon supplement per WCAG 1.4.1.

**Inactive tab text (#949493 on white) contrast ratio ~2.5:1.**
Fails WCAG 1.4.3 (4.5:1 required for normal text at 14px). Affects all non-active tab labels in the horizontal tab bar (line 1251).

**#d4d4d4 text on white (ChevronRight at line 2003, separator dot at line 1982).**
~1.6:1 contrast — severely fails. These are decorative but could mislead low-vision users.
