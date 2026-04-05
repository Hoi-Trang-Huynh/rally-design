import { Link } from "react-router";

type Screen = {
  path: string;
  title: string;
  description: string;
  status: "done" | "wip" | "planned";
};

const SCREENS: Screen[] = [
  {
    path: "/dashboard",
    title: "Home (Dashboard)",
    description: "Landing view with active trip banner, upcoming trips grid, and quick-action navigation.",
    status: "done",
  },
  {
    path: "/session-overview",
    title: "Session Overview",
    description: "Trip planning screen with map, timeline, saved places, and collaborative features.",
    status: "done",
  },
  {
    path: "/session-overview/timeline",
    title: "Timeline Tab",
    description: "Day-by-day trip schedule with time periods, event cards, and day picker navigation.",
    status: "done",
  },
  {
    path: "/explore",
    title: "Explore Map",
    description: "Discovery map with search, category filters, interactive pins, and location info sheet.",
    status: "done",
  },
  {
    path: "/session/active/library",
    title: "Shared Session Library",
    description: "Consensus UI with upvote/downvote voting, comments, and sorting for group trip planning.",
    status: "done",
  },
  {
    path: "/session/active/map",
    title: "Session Map",
    description: "Trip visualization with route lines, day filters, itinerary list, and real-time location sharing.",
    status: "done",
  },
];

const STATUS_STYLES = {
  done: { bg: "bg-[#34c759]/10", text: "text-[#34c759]", label: "Done" },
  wip: { bg: "bg-[#ffb830]/10", text: "text-[#ffb830]", label: "WIP" },
  planned: { bg: "bg-[#949493]/10", text: "text-[#949493]", label: "Planned" },
};

export default function HomeScreen() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-[#f0eeeb] px-[24px] py-[48px] font-['Inclusive_Sans',sans-serif]">
      <div className="w-full max-w-[720px]">
        {/* Header */}
        <div className="mb-[32px]">
          <div className="mb-[8px] flex items-center gap-[10px]">
            <div
              className="flex size-[40px] items-center justify-center rounded-[12px] bg-gradient-to-br from-[#ff6733] to-[#ff8f66]"
              style={{ boxShadow: "0 2px 10px rgba(255,103,51,0.3)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h1 className="text-[28px] font-semibold leading-[34px] tracking-[-0.5px] text-[#292827]">
              Rally Design
            </h1>
          </div>
          <p className="text-[15px] leading-[22px] text-[#949493]">
            Screen design showcase &mdash; {SCREENS.length} screen{SCREENS.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Screen Grid */}
        <div className="flex flex-col gap-[12px]">
          {SCREENS.map((screen) => {
            const status = STATUS_STYLES[screen.status];
            return (
              <Link
                key={screen.path}
                to={screen.path}
                className="group flex items-center gap-[16px] rounded-[16px] bg-white px-[20px] py-[18px] transition-all duration-200 hover:shadow-md active:scale-[0.99]"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)" }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-[8px]">
                    <p className="text-[16px] font-semibold leading-[22px] text-[#292827] group-hover:text-[#ff6733] transition-colors duration-200">
                      {screen.title}
                    </p>
                    <div className={`rounded-full px-[8px] py-[2px] ${status.bg}`}>
                      <p className={`text-[11px] font-semibold ${status.text}`}>{status.label}</p>
                    </div>
                  </div>
                  <p className="mt-[4px] text-[13px] leading-[18px] text-[#949493]">
                    {screen.description}
                  </p>
                  <p className="mt-[6px] text-[12px] font-medium leading-[16px] text-[#b4b4b3]">
                    {screen.path}
                  </p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b4b4b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:stroke-[#ff6733]">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
