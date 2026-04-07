import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { Compass, Bookmark, Plus, Cloud } from "lucide-react";
import type { BottomSheetSnap, BottomSheetTab } from "../../types";

type Props = {
  activeTab: BottomSheetTab;
  onTabChange: (tab: BottomSheetTab) => void;
  snap: BottomSheetSnap;
  onSnapChange: (snap: BottomSheetSnap) => void;
  onWeatherTap: () => void;
  children: ReactNode;
};

const TABS: { id: BottomSheetTab; label: string; icon: typeof Compass }[] = [
  { id: "explore", label: "Explore", icon: Compass },
  { id: "saved", label: "Saved Places", icon: Bookmark },
  { id: "add", label: "Add Places", icon: Plus },
];

// Snap positions as % from bottom of container
const SNAP_POSITIONS: Record<BottomSheetSnap, number> = {
  collapsed: 80, // header only (80px from bottom = ~12% visible)
  half: 340,     // half screen
  full: 580,     // almost full
};

export default function BottomSheet({
  activeTab,
  onTabChange,
  snap,
  onSnapChange,
  onWeatherTap,
  children,
}: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startY: number;
    startHeight: number;
    isDragging: boolean;
  } | null>(null);
  const [currentHeight, setCurrentHeight] = useState(SNAP_POSITIONS[snap]);

  useEffect(() => {
    setCurrentHeight(SNAP_POSITIONS[snap]);
  }, [snap]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      dragRef.current = {
        startY: e.clientY,
        startHeight: currentHeight,
        isDragging: true,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [currentHeight]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current?.isDragging) return;
    const delta = dragRef.current.startY - e.clientY;
    const newHeight = Math.max(80, Math.min(580, dragRef.current.startHeight + delta));
    setCurrentHeight(newHeight);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!dragRef.current) return;
    dragRef.current.isDragging = false;

    // Snap to nearest position
    const snaps: [BottomSheetSnap, number][] = [
      ["collapsed", SNAP_POSITIONS.collapsed],
      ["half", SNAP_POSITIONS.half],
      ["full", SNAP_POSITIONS.full],
    ];
    let closest: BottomSheetSnap = "half";
    let minDist = Infinity;
    for (const [name, pos] of snaps) {
      const dist = Math.abs(currentHeight - pos);
      if (dist < minDist) {
        minDist = dist;
        closest = name;
      }
    }
    setCurrentHeight(SNAP_POSITIONS[closest]);
    onSnapChange(closest);
    dragRef.current = null;
  }, [currentHeight, onSnapChange]);

  return (
    <div
      ref={sheetRef}
      className="absolute bottom-0 left-0 right-0 z-30 flex flex-col bg-white"
      style={{
        height: currentHeight,
        borderRadius: "20px 20px 0 0",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.1), 0 -1px 4px rgba(0,0,0,0.04)",
        transition: dragRef.current?.isDragging ? "none" : "height 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        touchAction: "none",
      }}
    >
      {/* Drag handle */}
      <div
        className="flex w-full cursor-grab items-center justify-center py-[10px] active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="h-[4px] w-[36px] rounded-full bg-[#d4d4d4]" />
      </div>

      {/* Tab bar + Weather */}
      <div className="flex items-center gap-[6px] px-[12px] pb-[10px]">
        <div className="scrollbar-hide flex flex-1 gap-[6px] overflow-x-auto">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  if (snap === "collapsed") onSnapChange("half");
                }}
                className="flex shrink-0 items-center gap-[5px] rounded-full px-[12px] py-[7px] text-[12px] font-semibold transition-all active:scale-95"
                style={{
                  background: isActive ? "#ff6733" : "#f5f5f5",
                  color: isActive ? "#fff" : "#545352",
                }}
              >
                <Icon size={14} strokeWidth={2.2} />
                {tab.label}
              </button>
            );
          })}
        </div>
        {/* Weather button */}
        <button
          onClick={onWeatherTap}
          className="flex shrink-0 items-center gap-[4px] rounded-full bg-[#e8f4fd] px-[10px] py-[7px] text-[12px] font-semibold text-[#2563eb] transition-all active:scale-95"
        >
          <Cloud size={14} strokeWidth={2.2} />
          29°
        </button>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
