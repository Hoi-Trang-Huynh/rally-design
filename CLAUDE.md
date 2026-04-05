# Rally Design

A showcase repository of mobile screen designs built with React + TypeScript + Tailwind CSS. Each screen lives at its own URL path, and the root `/` is a navigation hub listing all screens.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite 6
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- **Routing**: React Router v7 (`react-router`)
- **Icons**: Lucide React
- **Toasts**: Sonner
- **Fonts**: Inclusive Sans (loaded in `src/styles/fonts.css`)
- **UI Primitives**: Radix UI, MUI (available but not required)

## Project Structure

```
src/
├── app/
│   ├── App.tsx              ← Router setup (all routes defined here)
│   └── components/          ← Shared/reusable components
│       ├── figma/
│       └── ui/
├── screens/                 ← One folder per screen design
│   ├── home/                ← Navigation hub at "/"
│   │   └── index.tsx
│   ├── dashboard/           ← Home dashboard at "/dashboard"
│   │   └── index.tsx
│   ├── session-overview/    ← Session overview at "/session-overview"
│   │   ├── index.tsx
│   │   └── capture.tsx      ← Flat capture variant for Figma export
│   ├── explore-map/         ← Explore map at "/explore"
│   │   └── index.tsx
│   ├── session-library/     ← Shared library at "/session/:id/library"
│   │   └── index.tsx
│   └── session-map/         ← Session map at "/session/:id/map"
│       └── index.tsx
├── imports/                 ← Generated/imported assets (SVG data, Figma exports)
├── styles/
│   ├── index.css            ← Main CSS entry (imports all others)
│   ├── fonts.css
│   ├── tailwind.css
│   └── theme.css
└── main.tsx                 ← App entry point
```

## How to Add a New Screen

### 1. Create the screen folder

```
src/screens/<screen-name>/index.tsx
```

The screen component should be a default export. It owns its own layout (background, centering, etc).

### 2. Register the route

In `src/app/App.tsx`, add an import and a `<Route>`:

```tsx
import NewScreen from "../screens/<screen-name>";

// Inside <Routes>:
<Route path="/<screen-name>" element={<NewScreen />} />
```

### 3. Add to the navigation hub

In `src/screens/home/index.tsx`, add an entry to the `SCREENS` array:

```ts
{
  path: "/<screen-name>",
  title: "Screen Title",
  description: "Short description of what this screen shows.",
  status: "wip",  // "done" | "wip" | "planned"
},
```

### 4. Screen-specific components

If the screen needs its own components, colocate them in the screen folder:

```
src/screens/<screen-name>/
├── index.tsx
├── components/
│   ├── some-section.tsx
│   └── some-card.tsx
```

For truly shared/reusable components, put them in `src/app/components/`.

### 5. Use the shared PhoneFrame layout

Most screens wrap content in the `PhoneFrame` component (`src/app/components/layout/phone-frame.tsx`), which provides:
- iOS status bar
- App header (optional, with title, breadcrumb, back button)
- Bottom navigation bar (5 tabs: Home, Chat, (+) Create, Explore, Profile)
- 390x844 mobile container

```tsx
import PhoneFrame from "../../app/components/layout/phone-frame";

export default function MyScreen() {
  return (
    <div className="flex size-full items-center justify-center bg-[#f0eeeb]">
      <PhoneFrame activeTab="home" headerTitle="My Screen" showHeader>
        {/* Screen content */}
      </PhoneFrame>
    </div>
  );
}
```

## User Flows

Two key demo flows connect the screens:

**Flow A (Organizer Planning):** Dashboard → tap trip → Session Overview → Explore Map (bottom nav) → search → tap pin → Location Info Sheet → "Save to Library"

**Flow B (Participant Consensus):** Session Library → see saved places → upvote → Session Map → view routes by day

## Design Conventions

- **Mobile-first**: Screens are designed at mobile width (~390px) centered on the page
- **Colors**: Primary brand orange `#ff6733`, neutral grays `#292827` / `#545352` / `#949493` / `#b4b4b3` / `#eaeae9`
- **Border radius**: Cards use `rounded-[14px]`, buttons `rounded-[10px]` to `rounded-full`
- **Shadows**: Two-layer approach — `0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)`
- **Font**: `font-['Inclusive_Sans',sans-serif]` set on screen containers
- **Pixel values**: Use bracket notation `px-[16px]` for precise sizing matching Figma specs
- **Inline images**: Unsplash URLs are used directly for demo imagery

## Commands

- `npx vite` — Start dev server
- `npx vite build` — Production build
- `npx vite preview` — Preview production build
