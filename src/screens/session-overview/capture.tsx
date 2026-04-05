import SessionOverview from "../../app/components/session-overview";

/**
 * Capture-only route: renders the session overview as a flat,
 * full-height layout with no viewport clipping for Figma export.
 */
export default function SessionOverviewCapture() {
  return (
    <div className="flex w-full justify-center bg-[#f0eeeb]">
      <style>{`
        /* Remove all height constraints and overflow clipping for flat capture */
        #root { height: auto !important; }
        /* Unclip the main component wrapper */
        [class*="w-[390px]"] {
          height: auto !important;
          max-height: none !important;
        }
        /* Unclip the content area (map + bottom sheet container) */
        [class*="relative flex-1 overflow-hidden"] {
          overflow: visible !important;
          position: relative !important;
          height: auto !important;
          flex: none !important;
        }
        /* Make the map section a fixed height instead of absolute */
        [class*="absolute inset-0 overflow-hidden bg-[#e8e4df]"] {
          position: relative !important;
          height: 320px !important;
          overflow: hidden !important;
        }
        /* Make the bottom sheet flow naturally instead of absolute */
        [class*="absolute bottom-0 left-0 right-0 flex flex-col rounded-t-"] {
          position: relative !important;
          top: auto !important;
          bottom: auto !important;
          border-radius: 20px 20px 0 0 !important;
        }
        /* Scrollable content should not scroll, just show all */
        [class*="flex-1 overflow-x-hidden overflow-y-auto"] {
          overflow: visible !important;
          flex: none !important;
          height: auto !important;
        }
      `}</style>
      <SessionOverview />
    </div>
  );
}
