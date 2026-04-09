import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { Compass, Bookmark } from "lucide-react";
import type { BottomSheetSnap, BottomSheetTab } from "../../types";

type Props = {
  activeTab: BottomSheetTab;
  onTabChange: (tab: BottomSheetTab) => void;
  snap: BottomSheetSnap;
  onSnapChange: (snap: BottomSheetSnap) => void;
  children: ReactNode;
};

const TABS: { id: BottomSheetTab; label: string; icon: typeof Compass }[] = [
  { id: "explore", label: "Explore", icon: Compass },
  { id: "saved", label: "Saved Places", icon: Bookmark },
];

const SNAP_POSITIONS: Record<BottomSheetSnap, number> = {
  collapsed: 130,  // shows drag handle + tab bar above bottom nav
  half: 340,
  full: 628,  // nearly full — small gap below status bar
};

export default function BottomSheet({ activeTab, onTabChange, snap, onSnapChange, children }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startY: number; startHeight: number; isDragging: boolean } | null>(null);
  const [currentHeight, setCurrentHeight] = useState(SNAP_POSITIONS[snap]);

  useEffect(() => { setCurrentHeight(SNAP_POSITIONS[snap]); }, [snap]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    dragRef.current = { startY: e.clientY, startHeight: currentHeight, isDragging: true };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [currentHeight]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current?.isDragging) return;
    const delta = dragRef.current.startY - e.clientY;
    setCurrentHeight(Math.max(130, Math.min(628, dragRef.current.startHeight + delta)));
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!dragRef.current) return;
    dragRef.current.isDragging = false;
    const snaps: [BottomSheetSnap, number][] = [["collapsed", SNAP_POSITIONS.collapsed], ["half", SNAP_POSITIONS.half], ["full", SNAP_POSITIONS.full]];
    let closest: BottomSheetSnap = "half";
    let minDist = Infinity;
    for (const [name, pos] of snaps) { const dist = Math.abs(currentHeight - pos); if (dist < minDist) { minDist = dist; closest = name; } }
    setCurrentHeight(SNAP_POSITIONS[closest]);
    onSnapChange(closest);
    dragRef.current = null;
  }, [currentHeight, onSnapChange]);

  return (
    <div ref={sheetRef} className="absolute bottom-0 left-0 right-0 z-30 flex flex-col bg-white"
      style={{ height: currentHeight, borderRadius: "20px 20px 0 0", boxShadow: "0 -4px 24px rgba(0,0,0,0.1), 0 -1px 4px rgba(0,0,0,0.04)", transition: dragRef.current?.isDragging ? "none" : "height 0.3s cubic-bezier(0.32, 0.72, 0, 1)", touchAction: "none" }}>
      <div className="flex w-full cursor-grab items-center justify-center py-[10px] active:cursor-grabbing"
        onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
        <div className="h-[4px] w-[36px] rounded-full bg-[#d4d4d4]" />
      </div>
      <div className="flex items-center gap-[6px] px-[12px] pb-[10px]">
        <div className="scrollbar-hide flex flex-1 gap-[6px] overflow-x-auto">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => { onTabChange(tab.id); if (snap === "collapsed") onSnapChange("half"); }}
                className="flex shrink-0 items-center gap-[5px] rounded-full px-[12px] py-[7px] text-[12px] font-semibold transition-all active:scale-95"
                style={{ background: isActive ? "#ff6733" : "#f5f5f5", color: isActive ? "#fff" : "#545352" }}>
                <Icon size={14} strokeWidth={2.2} />{tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">{children}</div>
    </div>
  );
}
