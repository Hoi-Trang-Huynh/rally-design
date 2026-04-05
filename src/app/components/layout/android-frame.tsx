import { ReactNode } from "react";

/**
 * Realistic Android phone mockup.
 *   Screen: 360 × 720 (within 392 × 776 bezel)
 *   Status bar: 24px  |  System nav: 48px (classic 3-button)
 *   Content area: fills between status bar and system nav
 */
export default function AndroidFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-full items-center justify-center bg-[#0e0e0e] font-['Inclusive_Sans',sans-serif]">
      <div className="relative" style={{ width: 392, height: 776 }}>
        {/* Outer casing */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: 48,
            background: "linear-gradient(160deg, #303030 0%, #1c1c1c 40%, #171717 100%)",
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.06),
              0 2px 4px rgba(0,0,0,0.4),
              0 12px 32px rgba(0,0,0,0.5),
              0 40px 80px rgba(0,0,0,0.4),
              inset 0 1px 0 rgba(255,255,255,0.08),
              inset 0 -1px 0 rgba(0,0,0,0.3)
            `,
          }}
        />

        {/* Side buttons — right: power */}
        <div
          className="absolute"
          style={{
            right: -2.5, top: 180, width: 3, height: 48,
            borderRadius: "0 3px 3px 0",
            background: "linear-gradient(180deg, #3a3a3a, #252525)",
            boxShadow: "1px 0 2px rgba(0,0,0,0.3)",
          }}
        />
        {/* Side buttons — left: volume up */}
        <div
          className="absolute"
          style={{
            left: -2.5, top: 155, width: 3, height: 36,
            borderRadius: "3px 0 0 3px",
            background: "linear-gradient(180deg, #3a3a3a, #252525)",
            boxShadow: "-1px 0 2px rgba(0,0,0,0.3)",
          }}
        />
        {/* Side buttons — left: volume down */}
        <div
          className="absolute"
          style={{
            left: -2.5, top: 200, width: 3, height: 36,
            borderRadius: "3px 0 0 3px",
            background: "linear-gradient(180deg, #3a3a3a, #252525)",
            boxShadow: "-1px 0 2px rgba(0,0,0,0.3)",
          }}
        />

        {/* Camera punch-hole */}
        <div className="absolute left-1/2 top-[20px] z-[200] -translate-x-1/2">
          <div
            style={{
              width: 12, height: 12, borderRadius: "50%",
              background: "radial-gradient(circle at 40% 40%, #1a1a1a 0%, #080808 60%, #000 100%)",
              boxShadow: "0 0 0 1.5px #222, 0 0 0 2.5px #2a2a2a, inset 0 0 3px rgba(0,0,0,0.8)",
            }}
          />
        </div>

        {/* Screen */}
        <div
          className="absolute left-1/2 top-[18px] -translate-x-1/2 overflow-hidden"
          style={{
            width: 360, height: 720, borderRadius: 36,
            background: "#000",
            boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.05)",
          }}
        >
          <div className="relative flex h-full w-full flex-col bg-white">
            {/* Status Bar — 24px */}
            <div
              className="relative z-50 flex shrink-0 items-center justify-between bg-white px-[16px]"
              style={{ height: 24 }}
            >
              <p className="text-[11px] font-semibold text-[#292827]">
                {new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
              </p>
              <div className="flex items-center gap-[4px]">
                <svg width="12" height="9" viewBox="0 0 17 12" fill="#292827">
                  <rect x="0" y="8" width="3" height="4" rx="0.8" />
                  <rect x="4.5" y="5" width="3" height="7" rx="0.8" />
                  <rect x="9" y="2" width="3" height="10" rx="0.8" />
                  <rect x="13.5" y="0" width="3" height="12" rx="0.8" />
                </svg>
                <svg width="11" height="9" viewBox="0 0 16 12" fill="none">
                  <path d="M8 11a1 1 0 100-2 1 1 0 000 2z" fill="#292827" />
                  <path d="M5 7.8a4 4 0 016 0" stroke="#292827" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M2.5 5.3a7.2 7.2 0 0111 0" stroke="#292827" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <svg width="20" height="10" viewBox="0 0 28 13" fill="none">
                  <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="#292827" strokeOpacity="0.3" />
                  <rect x="2" y="2" width="18" height="8" rx="1.5" fill="#292827" />
                  <path d="M24 4.5v3.5a1.5 1.5 0 000-3.5z" fill="#292827" fillOpacity="0.3" />
                </svg>
              </div>
            </div>

            {/* App content */}
            <div className="relative flex-1 overflow-hidden">
              {children}
            </div>

            {/* Android System Navigation — 48px, classic 3-button */}
            <div
              className="flex shrink-0 items-center justify-evenly border-t border-[#f0f0ef] bg-[#fafafa]"
              style={{ height: 48 }}
            >
              <button
                className="group flex size-[40px] items-center justify-center rounded-full transition-colors duration-150 hover:bg-[#e8e8e8] active:bg-[#ddd]"
                onClick={() => window.history.back()}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11.5 3.5L5.5 9L11.5 14.5" stroke="#555" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-150 group-hover:stroke-[#333] group-active:stroke-[#111]" />
                </svg>
              </button>
              <button className="group flex size-[40px] items-center justify-center rounded-full transition-colors duration-150 hover:bg-[#e8e8e8] active:bg-[#ddd]">
                <div className="rounded-full border-[2.2px] border-[#555] transition-colors duration-150 group-hover:border-[#333] group-active:border-[#111] group-active:bg-[#111]/5" style={{ width: 16, height: 16 }} />
              </button>
              <button className="group flex size-[40px] items-center justify-center rounded-full transition-colors duration-150 hover:bg-[#e8e8e8] active:bg-[#ddd]">
                <div className="rounded-[3px] border-[2.2px] border-[#555] transition-colors duration-150 group-hover:border-[#333] group-active:border-[#111] group-active:bg-[#111]/5" style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>
        </div>

        {/* Bezel inner edge highlight */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: 17, width: 362, height: 2,
            borderRadius: "36px 36px 0 0",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
          }}
        />
      </div>
    </div>
  );
}
