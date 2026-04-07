import { X, Droplets, Wind, Sun, Thermometer } from "lucide-react";
import type { WeatherDetail } from "../types";

type Props = {
  weather: WeatherDetail;
  onClose: () => void;
};

export default function WeatherModal({ weather, onClose }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative mt-auto flex flex-col bg-white"
        style={{
          borderRadius: "24px 24px 0 0",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
          animation: "slideUp 0.3s ease-out",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center py-[10px]">
          <div className="h-[4px] w-[36px] rounded-full bg-[#d4d4d4]" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-[16px] top-[12px] flex size-[30px] items-center justify-center rounded-full bg-[#f5f5f5] transition-all active:scale-90"
        >
          <X size={16} className="text-[#545352]" />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-[20px] px-[20px] pb-[32px]">
          {/* Current conditions */}
          <div className="flex items-center gap-[16px]">
            <div className="text-[56px]">{weather.icon}</div>
            <div>
              <div className="text-[36px] font-bold leading-none text-[#292827]">{weather.temp}°</div>
              <div className="text-[14px] font-medium text-[#545352]">{weather.condition}</div>
              <div className="text-[12px] text-[#949493]">Da Nang, Vietnam</div>
            </div>
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-2 gap-[10px]">
            <DetailCard
              icon={<Thermometer size={18} className="text-[#ff6733]" />}
              label="Feels like"
              value={`${weather.feelsLike}°C`}
            />
            <DetailCard
              icon={<Droplets size={18} className="text-[#3b82f6]" />}
              label="Humidity"
              value={`${weather.humidity}%`}
            />
            <DetailCard
              icon={<Wind size={18} className="text-[#22c55e]" />}
              label="Wind"
              value={`${weather.wind} km/h`}
            />
            <DetailCard
              icon={<Sun size={18} className="text-[#f59e0b]" />}
              label="UV Index"
              value={`${weather.uvIndex} (High)`}
            />
          </div>

          {/* 5-day forecast */}
          <div>
            <h4 className="mb-[10px] text-[13px] font-bold text-[#292827]">5-Day Forecast</h4>
            <div className="flex justify-between">
              {weather.forecast.map((day) => (
                <div
                  key={day.day}
                  className="flex flex-col items-center gap-[4px] rounded-[12px] bg-[#f8f7f5] px-[10px] py-[10px]"
                >
                  <span className="text-[11px] font-semibold text-[#545352]">{day.day}</span>
                  <span className="text-[20px]">{day.icon}</span>
                  <span className="text-[12px] font-bold text-[#292827]">{day.high}°</span>
                  <span className="text-[10px] text-[#949493]">{day.low}°</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex items-center gap-[10px] rounded-[12px] bg-[#f8f7f5] p-[12px]"
    >
      {icon}
      <div>
        <div className="text-[10px] text-[#949493]">{label}</div>
        <div className="text-[13px] font-bold text-[#292827]">{value}</div>
      </div>
    </div>
  );
}
