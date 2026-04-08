import { MapPin } from "lucide-react";
import type { CommunityCollection } from "../../types";

type Props = {
  collection: CommunityCollection;
  onTap?: (id: string) => void;
};

export default function CommunityCard({ collection, onTap }: Props) {
  return (
    <button
      onClick={() => onTap?.(collection.id)}
      className="relative flex w-[200px] shrink-0 snap-start flex-col overflow-hidden rounded-[14px] bg-white text-left transition-all active:scale-[0.97]"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)" }}
    >
      <div className="relative h-[120px] w-full overflow-hidden">
        <img src={collection.coverImg} alt={collection.title} className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-[8px] left-[8px] flex items-center gap-[6px]">
          <img src={collection.creatorAvatar} alt={collection.creatorName} className="size-[24px] rounded-full border-[2px] border-white object-cover" />
          <span className="text-[11px] font-semibold text-white drop-shadow-sm">{collection.creatorName}</span>
        </div>
        <div className="absolute right-[8px] top-[8px] flex items-center gap-[3px] rounded-full bg-white/90 px-[7px] py-[3px] backdrop-blur-sm">
          <MapPin size={10} className="text-[#ff6733]" />
          <span className="text-[9px] font-bold text-[#292827]">{collection.placeCount}</span>
        </div>
      </div>
      <div className="flex flex-col gap-[2px] p-[10px]">
        <div className="truncate text-[13px] font-semibold text-[#292827]">{collection.title}</div>
        {collection.description && <p className="truncate text-[10px] text-[#949493]">{collection.description}</p>}
      </div>
    </button>
  );
}
