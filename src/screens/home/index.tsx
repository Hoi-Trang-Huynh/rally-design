import { Link } from "react-router";
import { useState } from "react";
import { Link2, Check } from "lucide-react";

type Screen = {
  path: string;
  title: string;
  description: string;
  status: "done" | "wip" | "planned";
  thumbnail?: string;
};

type Flow = {
  id: string;
  label: string;
  description: string;
  color: string;
  screens: Screen[];
};

const FLOWS: Flow[] = [
  {
    id: "organizer",
    label: "Flow A — Organizer Planning",
    description:
      "Dashboard → Trip → Session Overview → Explore → Save to Library",
    color: "#ff6733",
    screens: [
      {
        path: "/dashboard",
        title: "Dashboard",
        description: "Active trip banner, upcoming trips, quick actions.",
        status: "done",
        thumbnail:
          "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&h=800&fit=crop&crop=center",
      },
      {
        path: "/session-overview",
        title: "Session Overview",
        description: "Trip planning with map, timeline, saved places.",
        status: "done",
        thumbnail:
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=800&fit=crop&crop=center",
      },
      {
        path: "/session-overview/timeline",
        title: "Timeline Tab",
        description: "Day-by-day schedule with event cards and day picker.",
        status: "done",
        thumbnail:
          "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=800&fit=crop&crop=center",
      },
      {
        path: "/explore",
        title: "Explore Map",
        description: "Search, filters, interactive pins, location sheets.",
        status: "done",
        thumbnail:
          "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=800&fit=crop&crop=center",
      },
    ],
  },
  {
    id: "participant",
    label: "Flow B — Participant Consensus",
    description: "Library → Upvote places → Session Map → View routes by day",
    color: "#6366f1",
    screens: [
      {
        path: "/session/active/library",
        title: "Session Library",
        description: "Upvote/downvote voting, comments, group consensus.",
        status: "done",
        thumbnail:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=800&fit=crop&crop=center",
      },
      {
        path: "/session/active/map",
        title: "Session Map",
        description: "Route lines, day filters, itinerary, live locations.",
        status: "done",
        thumbnail:
          "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&h=800&fit=crop&crop=center",
      },
    ],
  },
];

const ALL_SCREENS = FLOWS.flatMap((f) => f.screens);

const STATUS_STYLES = {
  done: { bg: "bg-[#34c759]/10", text: "text-[#34c759]", dot: "bg-[#34c759]" },
  wip: { bg: "bg-[#ffb830]/10", text: "text-[#ffb830]", dot: "bg-[#ffb830]" },
  planned: {
    bg: "bg-[#949493]/10",
    text: "text-[#949493]",
    dot: "bg-[#949493]",
  },
};

function CopyUrlButton({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-[4px] rounded-[8px] bg-[#f5f5f4] px-[8px] py-[4px] text-[11px] font-medium text-[#949493] transition-all duration-200 hover:bg-[#eaeae9] hover:text-[#545352] active:scale-95"
    >
      {copied ? (
        <>
          <Check size={12} className="text-[#34c759]" />
          <span className="text-[#34c759]">Copied</span>
        </>
      ) : (
        <>
          <Link2 size={12} />
          <span>Copy URL</span>
        </>
      )}
    </button>
  );
}

function ScreenCard({ screen }: { screen: Screen }) {
  const status = STATUS_STYLES[screen.status];
  return (
    <Link
      to={screen.path}
      className="group relative flex flex-col overflow-hidden rounded-[16px] bg-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg active:scale-[0.98]"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative h-[140px] w-full overflow-hidden bg-[#eaeae9]">
        {screen.thumbnail && (
          <img
            src={screen.thumbnail}
            alt=""
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Status pill */}
        <div
          className={`absolute top-[10px] right-[10px] flex items-center gap-[4px] rounded-full px-[8px] py-[3px] backdrop-blur-sm ${status.bg}`}
          style={{ background: "rgba(255,255,255,0.85)" }}
        >
          <div className={`size-[6px] rounded-full ${status.dot}`} />
          <span className={`text-[10px] font-semibold ${status.text}`}>
            {screen.status === "done"
              ? "Done"
              : screen.status === "wip"
                ? "WIP"
                : "Planned"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-[14px]">
        <p className="text-[14px] font-semibold leading-[18px] text-[#292827] transition-colors group-hover:text-[#ff6733]">
          {screen.title}
        </p>
        <p className="mt-[4px] flex-1 text-[12px] leading-[16px] text-[#949493]">
          {screen.description}
        </p>
        <div className="mt-[8px] flex items-center justify-between">
          <span className="rounded-[6px] bg-[#f5f5f4] px-[6px] py-[2px] font-mono text-[10px] text-[#b4b4b3]">
            {screen.path}
          </span>
          <CopyUrlButton path={screen.path} />
        </div>
      </div>
    </Link>
  );
}

function FlowArrow() {
  return (
    <div className="flex shrink-0 items-center self-center px-[2px]">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#b4b4b3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden sm:block"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </div>
  );
}

export default function HomeScreen() {
  const [view, setView] = useState<"flows" | "all">("flows");
  const doneCount = ALL_SCREENS.filter((s) => s.status === "done").length;

  return (
    <div className="flex min-h-screen justify-center bg-[#f0eeeb] font-['Inclusive_Sans',sans-serif]">
      <div className="w-full max-w-[960px] px-[24px] py-[48px]">
        {/* ─── Hero ─── */}
        <div className="mb-[40px]">
          <div className="mb-[12px] flex items-center gap-[12px]">
            <div
              className="flex size-[48px] items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ff6733] to-[#ff8f66]"
              style={{ boxShadow: "0 4px 16px rgba(255,103,51,0.3)" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <h1 className="text-[32px] font-semibold leading-[38px] tracking-[-0.5px] text-[#292827]">
                Rally Design
              </h1>
              <p className="mt-[2px] text-[14px] leading-[20px] text-[#949493]">
                Mobile screen showcase
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-[20px] flex flex-wrap items-center gap-[12px]">
            <div
              className="flex items-center gap-[6px] rounded-full bg-white/80 px-[14px] py-[6px] backdrop-blur-sm"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div className="size-[8px] rounded-full bg-[#34c759]" />
              <span className="text-[13px] font-medium text-[#545352]">
                {doneCount}/{ALL_SCREENS.length} screens done
              </span>
            </div>
            <div
              className="flex items-center gap-[6px] rounded-full bg-white/80 px-[14px] py-[6px] backdrop-blur-sm"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <span className="text-[13px] font-medium text-[#545352]">
                {FLOWS.length} user flows
              </span>
            </div>
            {/* Progress bar */}
            <div className="ml-auto hidden items-center gap-[8px] sm:flex">
              <div className="h-[6px] w-[120px] overflow-hidden rounded-full bg-[#eaeae9]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#ff6733] to-[#ff8f66] transition-all duration-500"
                  style={{
                    width: `${(doneCount / ALL_SCREENS.length) * 100}%`,
                  }}
                />
              </div>
              <span className="text-[12px] font-medium text-[#b4b4b3]">
                {Math.round((doneCount / ALL_SCREENS.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* ─── View Toggle ─── */}
        <div
          className="mb-[24px] flex w-fit items-center gap-[4px] rounded-[10px] bg-white/60 p-[3px] backdrop-blur-sm"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          {(["flows", "all"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-[8px] px-[14px] py-[6px] text-[13px] font-medium transition-all duration-200 ${
                view === v
                  ? "bg-white text-[#292827] shadow-sm"
                  : "text-[#949493] hover:text-[#545352]"
              }`}
            >
              {v === "flows" ? "By Flow" : "All Screens"}
            </button>
          ))}
        </div>

        {/* ─── Flow View ─── */}
        {view === "flows" && (
          <div className="flex flex-col gap-[32px]">
            {FLOWS.map((flow) => (
              <section key={flow.id}>
                {/* Flow header */}
                <div className="mb-[16px] flex items-start gap-[10px]">
                  <div
                    className="mt-[4px] size-[10px] shrink-0 rounded-full"
                    style={{ background: flow.color }}
                  />
                  <div>
                    <h2 className="text-[16px] font-semibold leading-[20px] text-[#292827]">
                      {flow.label}
                    </h2>
                    <p className="mt-[2px] text-[13px] leading-[18px] text-[#949493]">
                      {flow.description}
                    </p>
                  </div>
                </div>

                {/* Screen cards in a flow row */}
                <div className="flex gap-[8px] overflow-x-auto pb-[4px] sm:gap-[12px]">
                  {flow.screens.map((screen, i) => (
                    <div
                      key={screen.path}
                      className="flex items-stretch gap-[8px] sm:gap-[12px]"
                    >
                      <div className="w-[200px] shrink-0 sm:w-[220px]">
                        <ScreenCard screen={screen} />
                      </div>
                      {i < flow.screens.length - 1 && <FlowArrow />}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ─── All Screens Grid ─── */}
        {view === "all" && (
          <div className="grid grid-cols-2 gap-[16px] sm:grid-cols-3">
            {ALL_SCREENS.map((screen) => (
              <ScreenCard key={screen.path} screen={screen} />
            ))}
          </div>
        )}

        {/* ─── Footer ─── */}
        <div className="mt-[48px] border-t border-[#e0dfdd] pt-[20px]">
          <p className="text-center text-[12px] text-[#b4b4b3]">
            Built with React + TypeScript + Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
