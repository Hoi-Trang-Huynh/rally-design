import { useState, useEffect } from "react";
import { X, Lock, Users, ChevronRight, Tag, StickyNote } from "lucide-react";

const SUGGESTED_TAGS = [
  "must-visit", "dinner", "day 1", "day 2", "day 3",
  "breakfast", "photo spot", "nightlife", "hidden gem", "kid-friendly",
];

type SaveDestinationPickerProps = {
  placeName: string;
  onClose: () => void;
  onSave: (destination: "personal" | "shared", notes: string, tags: string[]) => void;
};

export default function SaveDestinationPicker({
  placeName,
  onClose,
  onSave,
}: SaveDestinationPickerProps) {
  const [step, setStep] = useState<"pick" | "details">("pick");
  const [destination, setDestination] = useState<"personal" | "shared" | null>(null);
  const [notes, setNotes] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePickDestination = (dest: "personal" | "shared") => {
    setDestination(dest);
    setStep("details");
  };

  const handleConfirm = () => {
    if (destination) onSave(destination, notes, selectedTags);
  };

  return (
    <div className="absolute inset-0 z-[60] flex flex-col justify-end" onClick={handleClose}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      />

      {/* Sheet */}
      <div
        className={`relative z-10 flex flex-col rounded-t-[24px] bg-white transition-transform duration-300 ease-out ${visible ? "translate-y-0" : "translate-y-full"}`}
        style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.14)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex shrink-0 justify-center pb-[8px] pt-[12px]">
          <div className="h-[4px] w-[36px] rounded-full bg-[#d4d4d4]" />
        </div>

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between px-[16px] pb-[12px]">
          <div className="min-w-0 flex-1">
            <p className="text-[16px] font-semibold leading-[22px] text-[#292827]">
              {step === "pick" ? "Save to..." : "Add Details"}
            </p>
            <p className="mt-[1px] truncate text-[11px] text-[#949493]">{placeName}</p>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="flex size-[32px] items-center justify-center rounded-full bg-[#f5f5f5] transition-transform duration-150 active:scale-90"
          >
            <X size={14} strokeWidth={2.5} className="text-[#545352]" />
          </button>
        </div>

        <div className="h-[0.6px] w-full shrink-0 bg-[#eaeae9]" />

        {/* Step 1: Pick destination */}
        {step === "pick" && (
          <div className="flex flex-col gap-[8px] px-[16px] py-[14px]">
            <button
              onClick={() => handlePickDestination("personal")}
              className="flex items-center gap-[12px] rounded-[14px] bg-[#f9f9f8] px-[14px] py-[12px] text-left transition-all duration-150 active:scale-[0.98] active:bg-[#f0f0ef]"
            >
              <div className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/10">
                <Lock size={16} className="text-[#7c3aed]" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-[#292827]">Personal Library</p>
                <p className="mt-[1px] text-[11px] leading-[14px] text-[#949493]">
                  Private — only you can see
                </p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-[#b4b4b3]" strokeWidth={2} />
            </button>

            <button
              onClick={() => handlePickDestination("shared")}
              className="flex items-center gap-[12px] rounded-[14px] bg-[#f9f9f8] px-[14px] py-[12px] text-left transition-all duration-150 active:scale-[0.98] active:bg-[#f0f0ef]"
            >
              <div className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-[#ff6733]/10">
                <Users size={16} className="text-[#ff6733]" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-[#292827]">Shared Session Library</p>
                <p className="mt-[1px] text-[11px] leading-[14px] text-[#949493]">
                  Tour: Thai Lan — all participants
                </p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-[#b4b4b3]" strokeWidth={2} />
            </button>
          </div>
        )}

        {/* Step 2: Notes + Tags */}
        {step === "details" && (
          <div className="flex max-h-[60vh] flex-col gap-[12px] overflow-y-auto px-[16px] py-[14px]">
            {/* Destination indicator */}
            <div className="flex items-center gap-[6px] rounded-[10px] bg-[#f0f7ff] px-[10px] py-[6px]">
              {destination === "personal" ? (
                <Lock size={12} className="text-[#7c3aed]" strokeWidth={2} />
              ) : (
                <Users size={12} className="text-[#ff6733]" strokeWidth={2} />
              )}
              <p className="flex-1 text-[11px] font-semibold text-[#3b82f6]">
                Saving to {destination === "personal" ? "Personal Library" : "Shared Session Library"}
              </p>
              <button
                onClick={() => setStep("pick")}
                className="text-[10px] font-semibold text-[#949493] underline"
              >
                Change
              </button>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-[4px]">
              <div className="flex items-center gap-[4px]">
                <StickyNote size={12} className="text-[#949493]" strokeWidth={2} />
                <p className="text-[11px] font-medium text-[#545352]">Notes</p>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Why is this place interesting?"
                rows={2}
                className="w-full resize-none rounded-[10px] border-[1.5px] border-[#eaeae9] bg-[#f9f9f9] px-[10px] py-[8px] text-[13px] leading-[18px] text-[#292827] outline-none placeholder:text-[#c4c4c3] transition-colors duration-150 focus:border-[#ff6733] focus:bg-white"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-[4px]">
              <div className="flex items-center gap-[4px]">
                <Tag size={12} className="text-[#949493]" strokeWidth={2} />
                <p className="text-[11px] font-medium text-[#545352]">Tags</p>
              </div>
              <div className="flex flex-wrap gap-[6px]">
                {SUGGESTED_TAGS.map((tag) => {
                  const isActive = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full px-[10px] py-[5px] text-[11px] font-medium transition-all duration-150 active:scale-95 ${
                        isActive
                          ? "bg-[#ff6733] text-white"
                          : "bg-[#f5f5f5] text-[#545352]"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Confirm */}
            <button
              onClick={handleConfirm}
              className="flex h-[44px] w-full items-center justify-center rounded-full bg-[#ff6733] text-[14px] font-medium text-white transition-all duration-150 active:scale-[0.99] active:bg-[#e55a28]"
              style={{ boxShadow: "0 2px 12px rgba(255,103,51,0.35)" }}
            >
              Save Place
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
