import { useState } from "react";
import { Layers, Car, AlertTriangle, Cloud, Users, X, Radio } from "lucide-react";
import type { MapLayers } from "../types";

type MapLayersPanelProps = {
  layers: MapLayers;
  onToggle: (layer: keyof MapLayers) => void;
  sharingLocation: boolean;
  onToggleSharing: () => void;
};

const LAYER_OPTIONS: { key: keyof MapLayers; label: string; icon: typeof Car; color: string }[] = [
  { key: "traffic", label: "Traffic", icon: Car, color: "#ef4444" },
  { key: "transit", label: "Alerts", icon: AlertTriangle, color: "#f59e0b" },
  { key: "weather", label: "Weather", icon: Cloud, color: "#3b82f6" },
  { key: "friends", label: "Friends", icon: Users, color: "#7c3aed" },
];

export default function MapLayersPanel({ layers, onToggle, sharingLocation, onToggleSharing }: MapLayersPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const activeCount = Object.values(layers).filter(Boolean).length;

  return (
    <div className="absolute bottom-[68px] right-[16px] z-20 flex flex-col items-end gap-[8px]">
      {/* Expanded panel */}
      {expanded && (
        <div
          className="flex flex-col gap-[4px] rounded-[16px] bg-white p-[8px] animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-[8px] pb-[4px] pt-[2px]">
            <p className="text-[12px] font-bold text-[#292827]">Map Layers</p>
            <button
              onClick={() => setExpanded(false)}
              className="flex size-[24px] items-center justify-center rounded-full text-[#949493] transition-colors hover:bg-[#f5f5f5]"
            >
              <X size={12} strokeWidth={2.5} />
            </button>
          </div>

          {/* Toggle rows */}
          {LAYER_OPTIONS.map(({ key, label, icon: Icon, color }) => {
            const isOn = layers[key];
            return (
              <button
                key={key}
                onClick={() => onToggle(key)}
                className={`flex items-center gap-[10px] rounded-[10px] px-[10px] py-[8px] transition-all duration-150 ${
                  isOn ? "bg-[#f5f5f5]" : "bg-transparent"
                }`}
              >
                <div
                  className={`flex size-[28px] items-center justify-center rounded-[8px] transition-colors duration-150 ${
                    isOn ? "opacity-100" : "opacity-40"
                  }`}
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={14} style={{ color }} strokeWidth={2} />
                </div>
                <p className={`flex-1 text-left text-[13px] font-medium transition-colors duration-150 ${
                  isOn ? "text-[#292827]" : "text-[#949493]"
                }`}>
                  {label}
                </p>
                {/* Toggle switch */}
                <div
                  className={`relative h-[22px] w-[38px] rounded-full transition-colors duration-200 ${
                    isOn ? "bg-[#ff6733]" : "bg-[#d4d4d4]"
                  }`}
                >
                  <div
                    className={`absolute top-[2px] size-[18px] rounded-full bg-white transition-transform duration-200 ${
                      isOn ? "translate-x-[18px]" : "translate-x-[2px]"
                    }`}
                    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
                  />
                </div>
              </button>
            );
          })}

          {/* Privacy / Location Sharing — shown when Friends layer is on */}
          {layers.friends && (
            <>
              <div className="mx-[8px] my-[2px] h-[0.6px] bg-[#eaeae9]" />
              <button
                onClick={onToggleSharing}
                className="flex items-center gap-[10px] rounded-[10px] px-[10px] py-[8px] transition-all duration-150"
              >
                <div className={`flex size-[28px] items-center justify-center rounded-[8px] transition-colors duration-150 ${sharingLocation ? "bg-[#22c55e]/15" : "bg-[#949493]/10"}`}>
                  <Radio size={14} className={sharingLocation ? "text-[#22c55e]" : "text-[#949493]"} strokeWidth={2} />
                </div>
                <div className="flex flex-1 flex-col items-start">
                  <p className={`text-[13px] font-medium ${sharingLocation ? "text-[#292827]" : "text-[#949493]"}`}>
                    Share My Location
                  </p>
                  <p className="text-[10px] leading-[13px] text-[#b4b4b3]">
                    {sharingLocation ? "Visible to trip members" : "Your location is hidden"}
                  </p>
                </div>
                <div
                  className={`relative h-[22px] w-[38px] rounded-full transition-colors duration-200 ${
                    sharingLocation ? "bg-[#22c55e]" : "bg-[#d4d4d4]"
                  }`}
                >
                  <div
                    className={`absolute top-[2px] size-[18px] rounded-full bg-white transition-transform duration-200 ${
                      sharingLocation ? "translate-x-[18px]" : "translate-x-[2px]"
                    }`}
                    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
                  />
                </div>
              </button>
            </>
          )}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className={`flex size-[44px] items-center justify-center rounded-full transition-all duration-200 active:scale-95 ${
          expanded ? "bg-[#292827]" : "bg-white"
        }`}
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
      >
        <Layers
          size={20}
          className={`transition-colors duration-200 ${expanded ? "text-white" : "text-[#545352]"}`}
          strokeWidth={2}
        />
        {/* Active count badge */}
        {activeCount > 0 && !expanded && (
          <div className="absolute -right-[2px] -top-[2px] flex size-[16px] items-center justify-center rounded-full bg-[#ff6733]">
            <p className="text-[9px] font-bold text-white">{activeCount}</p>
          </div>
        )}
      </button>
    </div>
  );
}
