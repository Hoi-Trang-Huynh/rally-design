import { ReactNode, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Home,
  MessageCircle,
  Plus,
  Compass,
  User,
  Bell,
} from "lucide-react";
import { toast, Toaster } from "sonner";

const FONT = "font-['Inclusive_Sans',sans-serif]";

// ─── Status Bar (iOS-style) ───
function StatusBar() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className="relative flex h-[54px] w-full shrink-0 items-end justify-between px-[24px] pb-[8px]">
      <p className="text-[15px] font-semibold leading-[18px] text-[#292827]">
        {timeStr}
      </p>
      <div className="flex items-center gap-[5px]">
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="1" fill="#292827" />
          <rect x="4.5" y="5" width="3" height="7" rx="1" fill="#292827" />
          <rect x="9" y="2" width="3" height="10" rx="1" fill="#292827" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#292827" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 11.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" fill="#292827" />
          <path d="M4.93 7.81a4.35 4.35 0 016.14 0" stroke="#292827" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M2.4 5.28a7.6 7.6 0 0111.2 0" stroke="#292827" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        {/* Battery */}
        <svg width="28" height="13" viewBox="0 0 28 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3" stroke="#292827" strokeOpacity="0.35" />
          <rect x="2" y="2" width="20" height="9" rx="1.5" fill="#292827" />
          <path d="M25 4.5v4a2 2 0 000-4z" fill="#292827" fillOpacity="0.35" />
        </svg>
      </div>
    </div>
  );
}

// ─── App Header ───
type AppHeaderProps = {
  title: string;
  breadcrumb?: string;
  onBack?: () => void;
  rightAction?: ReactNode;
};

function AppHeader({ title, breadcrumb, onBack, rightAction }: AppHeaderProps) {
  return (
    <div className="shrink-0 border-b border-[#eaeae9]/60 bg-white px-[16px] pb-[12px] pt-[4px]">
      {breadcrumb && (
        <p className="mb-[4px] text-[11px] font-medium leading-[14px] tracking-[0.3px] text-[#b4b4b3]">
          {breadcrumb}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          {onBack && (
            <button
              onClick={onBack}
              className="flex size-[30px] items-center justify-center rounded-[8px] transition-all duration-200 active:scale-90"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#292827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          <h1 className="text-[20px] font-semibold leading-[26px] tracking-[-0.3px] text-[#292827]">
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-[8px]">
          {rightAction || (
            <button className="relative flex size-[36px] items-center justify-center rounded-[10px] bg-[#f5f5f5] transition-all duration-200 active:scale-95">
              <Bell size={18} className="text-[#545352]" strokeWidth={2} />
              <div className="absolute right-[6px] top-[6px] size-[8px] rounded-full border-[1.5px] border-white bg-[#ff6733]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Navigation ───
const NAV_ITEMS = [
  { id: "home" as const, label: "Home", icon: Home, path: "/dashboard" },
  { id: "chat" as const, label: "Chat", icon: MessageCircle, path: "" },
  { id: "create" as const, label: "", icon: Plus, path: "" },
  { id: "explore" as const, label: "Explore", icon: Compass, path: "/explore" },
  { id: "profile" as const, label: "Profile", icon: User, path: "" },
];

type NavTab = "home" | "chat" | "create" | "explore" | "profile";

function BottomNav({ activeTab, hidden, overlay }: { activeTab?: NavTab; hidden?: boolean; overlay?: boolean }) {
  const navigate = useNavigate();

  return (
    <div
      className={`border-t border-[#eaeae9]/60 bg-white pb-[28px] pt-[8px] ${overlay ? "absolute bottom-0 left-0 right-0 z-40" : "shrink-0"}`}
      style={{
        transform: hidden ? "translateY(100%)" : "translateY(0)",
        transition: "transform 250ms ease-in-out",
      }}
    >
      <div className="flex items-center justify-around px-[8px]">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const isCreate = item.id === "create";
          const Icon = item.icon;

          if (isCreate) {
            return (
              <button
                key={item.id}
                onClick={() => toast("Create Session flow coming soon")}
                className="flex size-[48px] items-center justify-center rounded-full bg-gradient-to-br from-[#ff6733] to-[#ff8f66] transition-all duration-200 active:scale-95"
                style={{ boxShadow: "0 4px 14px rgba(255,103,51,0.35)" }}
              >
                <Plus size={24} className="text-white" strokeWidth={2.5} />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.path) navigate(item.path);
                else toast(`${item.label} coming soon`);
              }}
              className="flex min-w-[56px] flex-col items-center gap-[3px] py-[4px] transition-all duration-200 active:scale-95"
            >
              <Icon
                size={22}
                className={isActive ? "text-[#ff6733]" : "text-[#b4b4b3]"}
                strokeWidth={isActive ? 2.2 : 1.8}
                fill={isActive ? "rgba(255,103,51,0.12)" : "none"}
              />
              <p
                className={`text-[10px] font-medium leading-[12px] ${
                  isActive ? "text-[#ff6733]" : "text-[#b4b4b3]"
                }`}
              >
                {item.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Phone Frame (Main Export) ───
type PhoneFrameProps = {
  children: ReactNode;
  activeTab?: NavTab;
  showBottomNav?: boolean;
  hideBottomNavOnScroll?: boolean;
  headerTitle?: string;
  headerBreadcrumb?: string;
  onBack?: () => void;
  showHeader?: boolean;
  headerRightAction?: ReactNode;
};

export default function PhoneFrame({
  children,
  activeTab,
  showBottomNav = true,
  hideBottomNavOnScroll = false,
  headerTitle,
  headerBreadcrumb,
  onBack,
  showHeader = true,
  headerRightAction,
}: PhoneFrameProps) {
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollTop = useRef(0);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!hideBottomNavOnScroll) return;
      const target = e.target as HTMLElement;
      const scrollTop = target.scrollTop;
      if (scrollTop > lastScrollTop.current && scrollTop > 10) {
        setNavHidden(true);  // scrolling down
      } else {
        setNavHidden(false); // scrolling up
      }
      lastScrollTop.current = scrollTop;
    },
    [hideBottomNavOnScroll]
  );

  return (
    <div className={`relative flex size-full flex-col bg-white ${FONT}`}>
      <Toaster position="top-center" richColors />
      {showHeader && headerTitle && (
        <AppHeader
          title={headerTitle}
          breadcrumb={headerBreadcrumb}
          onBack={onBack}
          rightAction={headerRightAction}
        />
      )}
      <div
        className="relative flex-1 overflow-hidden"
        onScrollCapture={handleScroll}
      >
        {children}
      </div>
      {showBottomNav && <BottomNav activeTab={activeTab} hidden={hideBottomNavOnScroll && navHidden} overlay={hideBottomNavOnScroll} />}
    </div>
  );
}

export { StatusBar, AppHeader, BottomNav, FONT };
export type { NavTab };
