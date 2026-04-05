export default function WeatherOverlay() {
  return (
    <div
      className="absolute left-[16px] bottom-[68px] z-[18] flex items-center gap-[6px] rounded-[12px] bg-white/95 px-[10px] py-[8px] backdrop-blur-sm animate-in fade-in slide-in-from-left-2 duration-300"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
    >
      <span className="text-[18px]">☀️</span>
      <div>
        <p className="text-[14px] font-bold leading-[16px] text-[#292827]">28°C</p>
        <p className="text-[10px] leading-[12px] text-[#949493]">Da Nang · Sunny</p>
      </div>
    </div>
  );
}
