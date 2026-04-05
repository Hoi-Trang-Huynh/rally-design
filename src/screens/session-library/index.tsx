import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  MapPin,
  Clock,
  Star,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Map,
  Check,
  Send,
} from "lucide-react";
import PhoneFrame from "../../app/components/layout/phone-frame";
import AndroidFrame from "../../app/components/layout/android-frame";
import { toast } from "sonner";

// ─── Avatars ───
const AVATARS = [
  "https://images.unsplash.com/photo-1569913486515-b74bf7751574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1748200100142-e8d4f689acd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1748344386932-f0b9c7b925e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1543132220-e7fef0b974e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
];

const MEMBERS = [
  { id: "m1", name: "You (Linh)", avatar: AVATARS[0] },
  { id: "m2", name: "Minh", avatar: AVATARS[1] },
  { id: "m3", name: "Hana", avatar: AVATARS[2] },
  { id: "m4", name: "Tuan", avatar: AVATARS[3] },
];

type Comment = {
  memberId: string;
  text: string;
  time: string;
};

type LibraryPlace = {
  id: string;
  name: string;
  img: string;
  category: string;
  rating: number;
  address: string;
  upvotes: string[];
  downvotes: string[];
  comments: Comment[];
  addedBy: string;
  addedAt: string;
  inTimeline: boolean;
};

const LIBRARY_PLACES: LibraryPlace[] = [
  {
    id: "lp1",
    name: "Be Man Seafood Restaurant",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Restaurant",
    rating: 4.6,
    address: "216 Vo Nguyen Giap, Da Nang",
    upvotes: ["m1", "m2", "m3", "m4"],
    downvotes: [],
    comments: [
      { memberId: "m2", text: "Their grilled lobster is amazing!", time: "2h ago" },
      { memberId: "m3", text: "Let's go for dinner on Day 2", time: "1h ago" },
    ],
    addedBy: "m1",
    addedAt: "Mar 28",
    inTimeline: true,
  },
  {
    id: "lp2",
    name: "43 Factory Coffee Roaster",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Cafe",
    rating: 4.8,
    address: "70 Bach Dang, Da Nang",
    upvotes: ["m1", "m3"],
    downvotes: ["m4"],
    comments: [
      { memberId: "m1", text: "Best coffee I've had in Vietnam", time: "3h ago" },
    ],
    addedBy: "m1",
    addedAt: "Mar 28",
    inTimeline: false,
  },
  {
    id: "lp3",
    name: "Marble Mountains",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Attraction",
    rating: 4.7,
    address: "Hoa Hai, Ngu Hanh Son, Da Nang",
    upvotes: ["m1", "m2", "m4"],
    downvotes: [],
    comments: [
      { memberId: "m4", text: "We should go early before it gets hot", time: "5h ago" },
      { memberId: "m2", text: "Agreed! 7am?", time: "4h ago" },
    ],
    addedBy: "m3",
    addedAt: "Mar 27",
    inTimeline: true,
  },
  {
    id: "lp4",
    name: "Dragon Bridge",
    img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Attraction",
    rating: 4.4,
    address: "Nguyen Van Linh, Da Nang",
    upvotes: ["m2", "m3"],
    downvotes: ["m1"],
    comments: [
      { memberId: "m3", text: "Fire show is on Sat night!", time: "6h ago" },
    ],
    addedBy: "m2",
    addedAt: "Mar 27",
    inTimeline: false,
  },
  {
    id: "lp5",
    name: "My Khe Beach",
    img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Beach",
    rating: 4.5,
    address: "Pham Van Dong, Da Nang",
    upvotes: ["m1", "m2", "m3", "m4"],
    downvotes: [],
    comments: [
      { memberId: "m1", text: "Sunrise yoga session here?", time: "8h ago" },
      { memberId: "m3", text: "Yes!! Count me in", time: "7h ago" },
      { memberId: "m2", text: "Perfect for morning swim too", time: "6h ago" },
    ],
    addedBy: "m4",
    addedAt: "Mar 26",
    inTimeline: true,
  },
  {
    id: "lp6",
    name: "Sky Bar Da Nang",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Nightlife",
    rating: 4.3,
    address: "36 Bach Dang, Da Nang",
    upvotes: ["m3"],
    downvotes: ["m2", "m4"],
    comments: [],
    addedBy: "m3",
    addedAt: "Mar 29",
    inTimeline: false,
  },
];

type SortMode = "votes" | "recent" | "comments";

// ─── Main Screen ───
export default function SessionLibraryScreen() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState(LIBRARY_PLACES);
  const [sortMode, setSortMode] = useState<SortMode>("votes");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [voteAnimating, setVoteAnimating] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const currentUserId = "m1";

  const sortedPlaces = [...places].sort((a, b) => {
    if (sortMode === "votes")
      return b.upvotes.length - b.downvotes.length - (a.upvotes.length - a.downvotes.length);
    if (sortMode === "comments") return b.comments.length - a.comments.length;
    return 0; // recent = natural order
  });

  const handleVote = (placeId: string, type: "up" | "down") => {
    setVoteAnimating(`${placeId}-${type}`);
    setTimeout(() => setVoteAnimating(null), 400);

    setPlaces((prev) =>
      prev.map((p) => {
        if (p.id !== placeId) return p;
        const alreadyUp = p.upvotes.includes(currentUserId);
        const alreadyDown = p.downvotes.includes(currentUserId);
        let upvotes = [...p.upvotes];
        let downvotes = [...p.downvotes];

        if (type === "up") {
          if (alreadyUp) upvotes = upvotes.filter((id) => id !== currentUserId);
          else {
            upvotes.push(currentUserId);
            downvotes = downvotes.filter((id) => id !== currentUserId);
          }
        } else {
          if (alreadyDown) downvotes = downvotes.filter((id) => id !== currentUserId);
          else {
            downvotes.push(currentUserId);
            upvotes = upvotes.filter((id) => id !== currentUserId);
          }
        }
        return { ...p, upvotes, downvotes };
      })
    );
  };

  const handleAddComment = (placeId: string) => {
    const text = commentInput[placeId]?.trim();
    if (!text) return;
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === placeId
          ? { ...p, comments: [...p.comments, { memberId: currentUserId, text, time: "Just now" }] }
          : p
      )
    );
    setCommentInput((prev) => ({ ...prev, [placeId]: "" }));
  };

  const SORT_OPTIONS: { value: SortMode; label: string }[] = [
    { value: "votes", label: "Most Votes" },
    { value: "recent", label: "Recently Added" },
    { value: "comments", label: "Most Comments" },
  ];

  return (
    <AndroidFrame>
      <PhoneFrame
        showHeader
        headerTitle="Shared Library"
        headerBreadcrumb="Home / Da Nang Beach Getaway"
        onBack={() => navigate("/session-overview")}
        activeTab="home"
        headerRightAction={
          <button
            onClick={() => navigate("/session/active/map")}
            className="flex items-center gap-[6px] rounded-[10px] bg-[#f5f5f5] px-[12px] py-[8px] transition-all active:scale-95"
          >
            <Map size={15} className="text-[#545352]" strokeWidth={2} />
            <p className="text-[12px] font-semibold text-[#545352]">Map</p>
          </button>
        }
      >
        <div className="size-full overflow-y-auto bg-[#f8f7f5]">
          {/* Sort & Filter Bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#eaeae9]/60 bg-white/95 px-[16px] py-[10px] backdrop-blur-md">
            <p className="text-[13px] font-medium text-[#949493]">
              {places.length} places saved
            </p>
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-[5px] rounded-full border border-[#eaeae9] bg-white px-[12px] py-[6px] transition-all active:scale-95"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <ArrowUpDown size={12} className="text-[#545352]" strokeWidth={2.5} />
                <p className="text-[12px] font-semibold text-[#545352]">
                  {SORT_OPTIONS.find((s) => s.value === sortMode)?.label}
                </p>
                <ChevronDown size={12} className="text-[#949493]" strokeWidth={2.5} />
              </button>
              {showSortMenu && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setShowSortMenu(false)} />
                  <div
                    className="absolute right-0 top-[40px] z-30 w-[180px] overflow-hidden rounded-[12px] bg-white py-[4px]"
                    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortMode(opt.value);
                          setShowSortMenu(false);
                        }}
                        className={`flex w-full items-center justify-between px-[14px] py-[10px] text-[13px] font-medium transition-colors ${
                          sortMode === opt.value
                            ? "bg-[#fff4ef] text-[#ff6733]"
                            : "text-[#545352] hover:bg-[#f5f5f5]"
                        }`}
                      >
                        {opt.label}
                        {sortMode === opt.value && (
                          <Check size={14} className="text-[#ff6733]" strokeWidth={3} />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Place Cards */}
          <div className="flex flex-col gap-[12px] px-[16px] py-[14px]">
            {sortedPlaces.map((place) => {
              const netVotes = place.upvotes.length - place.downvotes.length;
              const hasUpvoted = place.upvotes.includes(currentUserId);
              const hasDownvoted = place.downvotes.includes(currentUserId);
              const addedByMember = MEMBERS.find((m) => m.id === place.addedBy);
              const isExpanded = expandedComments.has(place.id);

              return (
                <div
                  key={place.id}
                  className="overflow-hidden rounded-[16px] bg-white"
                  style={{
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Image + overlay */}
                  <div className="relative h-[110px] w-full overflow-hidden">
                    <img src={place.img} alt={place.name} className="size-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {place.inTimeline && (
                      <div className="absolute right-[10px] top-[10px] flex items-center gap-[4px] rounded-full bg-[#34c759]/90 px-[8px] py-[3px] backdrop-blur-sm">
                        <Check size={10} className="text-white" strokeWidth={3} />
                        <p className="text-[10px] font-semibold text-white">In Timeline</p>
                      </div>
                    )}
                    <div className="absolute bottom-[10px] left-[12px] right-[12px]">
                      <p className="text-[16px] font-bold leading-[20px] text-white drop-shadow-sm">
                        {place.name}
                      </p>
                      <div className="mt-[3px] flex items-center gap-[6px]">
                        <div className="flex items-center gap-[3px]">
                          <Star size={11} className="text-[#fbbf24]" fill="#fbbf24" strokeWidth={0} />
                          <p className="text-[11px] font-bold text-white">{place.rating}</p>
                        </div>
                        <span className="text-[10px] text-white/50">|</span>
                        <p className="text-[11px] text-white/80">{place.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Voting Row */}
                  <div className="flex items-center gap-[6px] border-b border-[#f5f5f5] px-[14px] py-[10px]">
                    {/* Upvote */}
                    <button
                      onClick={() => handleVote(place.id, "up")}
                      className={`flex items-center gap-[5px] rounded-full px-[12px] py-[6px] transition-all duration-200 active:scale-95 ${
                        hasUpvoted
                          ? "bg-[#34c759]/10 text-[#34c759]"
                          : "bg-[#f5f5f5] text-[#949493]"
                      }`}
                      style={{
                        transform: voteAnimating === `${place.id}-up` ? "scale(1.1)" : undefined,
                      }}
                    >
                      <ThumbsUp
                        size={15}
                        strokeWidth={2.2}
                        fill={hasUpvoted ? "#34c759" : "none"}
                      />
                      <p className="text-[13px] font-bold tabular-nums">
                        {place.upvotes.length}
                      </p>
                    </button>
                    {/* Downvote */}
                    <button
                      onClick={() => handleVote(place.id, "down")}
                      className={`flex items-center gap-[5px] rounded-full px-[12px] py-[6px] transition-all duration-200 active:scale-95 ${
                        hasDownvoted
                          ? "bg-[#ff3b30]/10 text-[#ff3b30]"
                          : "bg-[#f5f5f5] text-[#949493]"
                      }`}
                      style={{
                        transform: voteAnimating === `${place.id}-down` ? "scale(1.1)" : undefined,
                      }}
                    >
                      <ThumbsDown
                        size={15}
                        strokeWidth={2.2}
                        fill={hasDownvoted ? "#ff3b30" : "none"}
                      />
                      <p className="text-[13px] font-bold tabular-nums">
                        {place.downvotes.length}
                      </p>
                    </button>
                    {/* Net score */}
                    <div className="ml-auto flex items-center gap-[6px]">
                      <div
                        className={`rounded-full px-[10px] py-[4px] text-[12px] font-bold ${
                          netVotes > 0
                            ? "bg-[#34c759]/10 text-[#34c759]"
                            : netVotes < 0
                            ? "bg-[#ff3b30]/10 text-[#ff3b30]"
                            : "bg-[#f5f5f5] text-[#949493]"
                        }`}
                      >
                        {netVotes > 0 ? "+" : ""}
                        {netVotes}
                      </div>
                      {/* Voter avatars */}
                      <div className="flex -space-x-[5px]">
                        {place.upvotes.slice(0, 3).map((mId) => {
                          const m = MEMBERS.find((mm) => mm.id === mId);
                          return m ? (
                            <img
                              key={m.id}
                              src={m.avatar}
                              alt={m.name}
                              className="size-[18px] rounded-full border-[1.5px] border-white object-cover"
                            />
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="px-[14px] py-[10px]">
                    {/* Comment preview */}
                    {place.comments.length > 0 && (
                      <div className="flex flex-col gap-[8px]">
                        {(isExpanded ? place.comments : place.comments.slice(-2)).map(
                          (comment, i) => {
                            const member = MEMBERS.find(
                              (m) => m.id === comment.memberId
                            );
                            return (
                              <div key={i} className="flex items-start gap-[8px]">
                                <img
                                  src={member?.avatar || AVATARS[0]}
                                  alt={member?.name || ""}
                                  className="mt-[2px] size-[22px] shrink-0 rounded-full object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="text-[12px] leading-[17px] text-[#545352]">
                                    <span className="font-semibold text-[#292827]">
                                      {member?.name?.split(" ")[0] || "User"}
                                    </span>{" "}
                                    {comment.text}
                                  </p>
                                  <p className="mt-[1px] text-[10px] text-[#b4b4b3]">
                                    {comment.time}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        )}
                        {place.comments.length > 2 && !isExpanded && (
                          <button
                            onClick={() =>
                              setExpandedComments((prev) => new Set([...prev, place.id]))
                            }
                            className="text-left text-[12px] font-medium text-[#949493]"
                          >
                            View all {place.comments.length} comments
                          </button>
                        )}
                      </div>
                    )}

                    {/* Add comment input */}
                    <div className="mt-[8px] flex items-center gap-[8px]">
                      <img
                        src={AVATARS[0]}
                        alt="You"
                        className="size-[24px] shrink-0 rounded-full object-cover"
                      />
                      <div className="flex min-w-0 flex-1 items-center rounded-full bg-[#f5f5f5] px-[12px] py-[7px]">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={commentInput[place.id] || ""}
                          onChange={(e) =>
                            setCommentInput((prev) => ({
                              ...prev,
                              [place.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddComment(place.id);
                          }}
                          className="min-w-0 flex-1 bg-transparent text-[12px] font-medium text-[#292827] outline-none placeholder:text-[#b4b4b3]"
                        />
                        {commentInput[place.id]?.trim() && (
                          <button
                            onClick={() => handleAddComment(place.id)}
                            className="ml-[6px] text-[#ff6733] transition-all active:scale-95"
                          >
                            <Send size={14} strokeWidth={2.5} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Added by */}
                    <div className="mt-[8px] flex items-center gap-[4px]">
                      <p className="text-[10px] text-[#b4b4b3]">
                        Added by{" "}
                        <span className="font-medium text-[#949493]">
                          {addedByMember?.name?.split("(")[0]?.trim() || "Unknown"}
                        </span>{" "}
                        · {place.addedAt}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PhoneFrame>
    </AndroidFrame>
  );
}
