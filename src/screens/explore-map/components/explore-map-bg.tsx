import type { MapLayers } from "../types";

type ExploreMapBgProps = {
  layers?: MapLayers;
};

export default function ExploreMapBg({ layers }: ExploreMapBgProps) {
  const showTraffic = layers?.traffic;
  const showTransit = layers?.transit;

  return (
    <svg className="size-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="exploreMapGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eee9e2" />
          <stop offset="100%" stopColor="#e2ddd6" />
        </linearGradient>
        <pattern id="exploreGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4d0ca" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect fill="url(#exploreMapGrad)" width="100%" height="100%" />
      <rect fill="url(#exploreGrid)" width="100%" height="100%" opacity="0.5" />

      {/* Roads — color changes with traffic layer */}
      <path
        d="M 0 180 Q 120 200 195 160 T 390 200"
        stroke={showTraffic ? "#ef4444" : "#cec9c2"}
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        style={{ transition: "stroke 0.4s ease" }}
      />
      <path
        d="M 100 0 Q 130 120 160 240 T 200 500"
        stroke={showTraffic ? "#f59e0b" : "#cec9c2"}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        style={{ transition: "stroke 0.4s ease" }}
      />
      <path
        d="M 250 0 Q 280 150 300 280 T 350 500"
        stroke={showTraffic ? "#22c55e" : "#cec9c2"}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        style={{ transition: "stroke 0.4s ease" }}
      />
      <path
        d="M 0 350 Q 100 330 200 360 T 390 340"
        stroke={showTraffic ? "#ef4444" : "#cec9c2"}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        style={{ transition: "stroke 0.4s ease" }}
      />

      {/* Water */}
      <ellipse cx="320" cy="140" rx="70" ry="40" fill="#c4d8e5" opacity="0.4" />

      {/* Transit disruption markers */}
      {showTransit && (
        <>
          <circle cx="160" cy="235" r="10" fill="#f59e0b" opacity="0.9" />
          <text x="160" y="239" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">!</text>
          <circle cx="300" cy="290" r="10" fill="#f59e0b" opacity="0.9" />
          <text x="300" y="294" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">!</text>
        </>
      )}
    </svg>
  );
}
