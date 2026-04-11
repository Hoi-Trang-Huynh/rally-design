import { useState, useEffect } from "react";
import { X, Lock, Users, ChevronRight, ChevronLeft, StickyNote, Plus, Inbox, FolderOpen, Check, MapPin } from "lucide-react";
import { toast } from "sonner";
import type { SavedCollection, RallySession } from "../types";

type Step = "pick" | "pick-personal" | "pick-shared" | "details";

type SaveDestinationPickerProps = {
  placeName: string;
  onClose: () => void;
  onSave: (destination: "personal" | "shared", notes: string, tags: string[], collectionId?: string | null, sessionIds?: string[], collectionIds?: string[]) => void;
  onUnsave?: () => void;
  collections: SavedCollection[];
  sessions: RallySession[];
  initialSavedCollectionIds?: string[];
};

export default function SaveDestinationPicker({ placeName, onClose, onSave, onUnsave, collections, sessions, initialSavedCollectionIds }: SaveDestinationPickerProps) {
  const isEditMode = !!initialSavedCollectionIds && initialSavedCollectionIds.length > 0;
  const [step, setStep] = useState<Step>(isEditMode ? "pick-personal" : "pick");
  const [destination, setDestination] = useState<"personal" | "shared" | null>(isEditMode ? "personal" : null);
  const [notes, setNotes] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>(initialSavedCollectionIds ?? []);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [tempCollections, setTempCollections] = useState<{ id: string; name: string }[]>([]);
  const [selectedSessionIds, setSelectedSessionIds] = useState<string[]>([]);

  useEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true))); }, []);

  const handleClose = () => { setVisible(false); setTimeout(onClose, 300); };
  const toggleSession = (id: string) => setSelectedSessionIds((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  const toggleCollection = (id: string) => setSelectedCollectionIds((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);

  const handleConfirm = () => {
    if (destination) onSave(destination, notes, [], destination === "personal" ? selectedCollectionIds[0] ?? null : null, destination === "shared" ? selectedSessionIds : undefined, destination === "personal" ? selectedCollectionIds : undefined);
  };

  const handlePersonalDone = () => {
    const count = selectedCollectionIds.length;
    if (isEditMode) {
      // Unsave from all remaining selected collections
      onUnsave?.();
      handleClose();
      const removedCount = count > 0 ? count : (initialSavedCollectionIds?.length ?? 0);
      toast.info(`Removed from ${removedCount} collection${removedCount > 1 ? "s" : ""}`);
      return;
    }
    if (count === 0) return;
    handleConfirm();
    handleClose();
    toast.success(`Saved to ${count} collection${count > 1 ? "s" : ""}`);
  };

  const handleAddTempCollection = () => {
    if (!newCollectionName.trim()) return;
    const tempId = `temp-${Date.now()}`;
    setTempCollections((prev) => [...prev, { id: tempId, name: newCollectionName.trim() }]);
    setSelectedCollectionIds((prev) => [...prev, tempId]);
    setNewCollectionName("");
    setShowCreateCollection(false);
  };

  const stepTitle: Record<Step, string> = { pick: "Save to...", "pick-personal": isEditMode ? "Saved Collections" : "Personal Library", "pick-shared": "Select a trip to save to", details: "Add Details" };

  return (
    <div className="absolute inset-0 z-[60] flex flex-col justify-end" onClick={handleClose}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`} />
      <div className={`relative z-10 flex max-h-[75vh] flex-col rounded-t-[24px] bg-white transition-transform duration-300 ease-out ${visible ? "translate-y-0" : "translate-y-full"}`}
        style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.14)" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex shrink-0 justify-center pb-[8px] pt-[12px]"><div className="h-[4px] w-[36px] rounded-full bg-[#d4d4d4]" /></div>

        <div className="flex shrink-0 items-center justify-between px-[16px] pb-[12px]">
          <div className="flex items-center gap-[8px]">
            {(step === "pick-personal" || step === "pick-shared") && (
              <button onClick={() => setStep("pick")} className="flex size-[28px] items-center justify-center rounded-full bg-[#f5f5f5] transition-all active:scale-90">
                <ChevronLeft size={14} strokeWidth={2.5} className="text-[#545352]" />
              </button>
            )}
            {step === "details" && (
              <button onClick={() => setStep(destination === "personal" ? "pick-personal" : "pick-shared")} className="flex size-[28px] items-center justify-center rounded-full bg-[#f5f5f5] transition-all active:scale-90">
                <ChevronLeft size={14} strokeWidth={2.5} className="text-[#545352]" />
              </button>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-semibold leading-[22px] text-[#292827]">{stepTitle[step]}</p>
              <p className="mt-[1px] truncate text-[11px] text-[#949493]">{placeName}</p>
            </div>
          </div>
          <button onClick={handleClose} aria-label="Close" className="flex size-[32px] items-center justify-center rounded-full bg-[#f5f5f5] transition-transform duration-150 active:scale-90">
            <X size={14} strokeWidth={2.5} className="text-[#545352]" />
          </button>
        </div>
        <div className="h-[0.6px] w-full shrink-0 bg-[#eaeae9]" />

        {step === "pick" && (
          <div className="flex flex-col gap-[8px] px-[16px] py-[14px]">
            <button onClick={() => { setDestination("personal"); setStep("pick-personal"); }}
              className="flex items-center gap-[12px] rounded-[14px] bg-[#f9f9f8] px-[14px] py-[12px] text-left transition-all duration-150 active:scale-[0.98] active:bg-[#f0f0ef]">
              <div className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/10"><Lock size={16} className="text-[#7c3aed]" strokeWidth={2} /></div>
              <div className="min-w-0 flex-1"><p className="text-[14px] font-semibold text-[#292827]">Personal Library</p><p className="mt-[1px] text-[11px] leading-[14px] text-[#949493]">Private — only you can see</p></div>
              <ChevronRight size={16} className="shrink-0 text-[#b4b4b3]" strokeWidth={2} />
            </button>
            <button onClick={() => { setDestination("shared"); setStep("pick-shared"); }}
              className="flex items-center gap-[12px] rounded-[14px] bg-[#f9f9f8] px-[14px] py-[12px] text-left transition-all duration-150 active:scale-[0.98] active:bg-[#f0f0ef]">
              <div className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-[#ff6733]/10"><Users size={16} className="text-[#ff6733]" strokeWidth={2} /></div>
              <div className="min-w-0 flex-1"><p className="text-[14px] font-semibold text-[#292827]">Shared Session Library</p><p className="mt-[1px] text-[11px] leading-[14px] text-[#949493]">Save to one or more trips</p></div>
              <ChevronRight size={16} className="shrink-0 text-[#b4b4b3]" strokeWidth={2} />
            </button>
          </div>
        )}

        {step === "pick-personal" && (
          <div className="flex flex-col overflow-y-auto px-[16px] py-[14px]">
            <div className="flex flex-col gap-[6px]">
              {/* + New Collection button at top */}
              {!showCreateCollection ? (
                <button onClick={() => setShowCreateCollection(true)} className="flex items-center gap-[8px] rounded-[12px] border-[1.5px] border-dashed border-[#ff6733]/40 bg-[#ff6733]/5 px-[14px] py-[12px] text-[13px] font-semibold text-[#ff6733] transition-all active:scale-[0.98]">
                  <Plus size={16} strokeWidth={2.5} />New Collection
                </button>
              ) : (
                <div className="flex items-center gap-[8px] rounded-[12px] border-[1.5px] border-[#ff6733]/30 bg-[#ff6733]/5 px-[12px] py-[10px]">
                  <input type="text" placeholder="Collection name..." value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} autoFocus className="flex-1 bg-transparent text-[13px] text-[#292827] outline-none placeholder:text-[#b4b4b3]" />
                  <button onClick={handleAddTempCollection}
                    disabled={!newCollectionName.trim()} className="flex size-[28px] items-center justify-center rounded-full bg-[#ff6733] transition-all active:scale-90 disabled:opacity-40">
                    <Check size={14} className="text-white" strokeWidth={2.5} />
                  </button>
                </div>
              )}

              {/* All Saved with checkbox */}
              <button onClick={() => toggleCollection("all-saved")}
                className="flex items-center gap-[12px] rounded-[14px] px-[14px] py-[12px] text-left transition-all duration-150 active:scale-[0.98]"
                style={{ backgroundColor: selectedCollectionIds.includes("all-saved") ? "rgba(255,103,51,0.05)" : "#f9f9f8", border: selectedCollectionIds.includes("all-saved") ? "1.5px solid #ff6733" : "1.5px solid transparent" }}>
                <div className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-[#3b82f6]/10"><Inbox size={16} className="text-[#3b82f6]" strokeWidth={2} /></div>
                <div className="min-w-0 flex-1"><p className="text-[14px] font-semibold text-[#292827]">All Saved</p><p className="mt-[1px] text-[11px] leading-[14px] text-[#949493]">General unsorted saves</p></div>
                <div className="flex size-[22px] shrink-0 items-center justify-center rounded-[6px] transition-all"
                  style={{ background: selectedCollectionIds.includes("all-saved") ? "#ff6733" : "#eaeae9", border: selectedCollectionIds.includes("all-saved") ? "none" : "1.5px solid #d4d4d4" }}>
                  {selectedCollectionIds.includes("all-saved") && <Check size={14} className="text-white" strokeWidth={2.5} />}
                </div>
              </button>

              <div className="flex items-center gap-[8px] px-[4px] py-[6px]"><span className="text-[11px] font-semibold text-[#949493]">Your Collections</span><div className="h-[0.5px] flex-1 bg-[#eaeae9]" /></div>

              {/* Existing collections with checkboxes */}
              {collections.map((col) => {
                const isSelected = selectedCollectionIds.includes(col.id);
                return (
                  <button key={col.id} onClick={() => toggleCollection(col.id)}
                    className="flex items-center gap-[10px] rounded-[12px] px-[12px] py-[10px] text-left transition-all duration-150 active:scale-[0.98]"
                    style={{ backgroundColor: isSelected ? "rgba(255,103,51,0.05)" : "#f9f9f8", border: isSelected ? "1.5px solid #ff6733" : "1.5px solid transparent" }}>
                    <img src={col.coverImg} alt={col.name} className="size-[40px] shrink-0 rounded-[8px] object-cover" />
                    <div className="min-w-0 flex-1"><p className="truncate text-[13px] font-semibold text-[#292827]">{col.name}</p><p className="text-[10px] text-[#949493]">{col.count} places</p></div>
                    <div className="flex size-[22px] shrink-0 items-center justify-center rounded-[6px] transition-all"
                      style={{ background: isSelected ? "#ff6733" : "#eaeae9", border: isSelected ? "none" : "1.5px solid #d4d4d4" }}>
                      {isSelected && <Check size={14} className="text-white" strokeWidth={2.5} />}
                    </div>
                  </button>
                );
              })}

              {/* Temporary (newly created) collections */}
              {tempCollections.map((col) => {
                const isSelected = selectedCollectionIds.includes(col.id);
                return (
                  <button key={col.id} onClick={() => toggleCollection(col.id)}
                    className="flex items-center gap-[10px] rounded-[12px] px-[12px] py-[10px] text-left transition-all duration-150 active:scale-[0.98]"
                    style={{ backgroundColor: isSelected ? "rgba(255,103,51,0.05)" : "#f9f9f8", border: isSelected ? "1.5px solid #ff6733" : "1.5px solid transparent" }}>
                    <div className="flex size-[40px] shrink-0 items-center justify-center rounded-[8px] bg-[#f0f0ef]"><FolderOpen size={16} className="text-[#949493]" /></div>
                    <div className="min-w-0 flex-1"><p className="truncate text-[13px] font-semibold text-[#292827]">{col.name}</p><p className="text-[10px] text-[#949493]">New collection</p></div>
                    <div className="flex size-[22px] shrink-0 items-center justify-center rounded-[6px] transition-all"
                      style={{ background: isSelected ? "#ff6733" : "#eaeae9", border: isSelected ? "none" : "1.5px solid #d4d4d4" }}>
                      {isSelected && <Check size={14} className="text-white" strokeWidth={2.5} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Done / Unsave button */}
            {isEditMode ? (
              <button onClick={handlePersonalDone}
                className="mt-[12px] flex h-[44px] w-full items-center justify-center rounded-full bg-[#ef4444] text-[14px] font-medium text-white transition-all duration-150 active:scale-[0.99] active:bg-[#dc2626]"
                style={{ boxShadow: "0 2px 12px rgba(239,68,68,0.35)" }}>
                Unsave ({selectedCollectionIds.length} selected)
              </button>
            ) : (
              <button onClick={handlePersonalDone} disabled={selectedCollectionIds.length === 0}
                className="mt-[12px] flex h-[44px] w-full items-center justify-center rounded-full bg-[#ff6733] text-[14px] font-medium text-white transition-all duration-150 active:scale-[0.99] active:bg-[#e55a28] disabled:opacity-40"
                style={{ boxShadow: "0 2px 12px rgba(255,103,51,0.35)" }}>
                Done ({selectedCollectionIds.length} selected)
              </button>
            )}
          </div>
        )}

        {step === "pick-shared" && (
          <div className="flex flex-col overflow-y-auto px-[16px] py-[14px]">
            <div className="flex flex-col gap-[8px]">
              {sessions.map((session) => {
                const isSelected = selectedSessionIds.includes(session.id);
                return (
                  <button key={session.id} onClick={() => toggleSession(session.id)}
                    className="flex items-center gap-[10px] rounded-[14px] p-[10px] text-left transition-all duration-150 active:scale-[0.98]"
                    style={{ backgroundColor: isSelected ? "rgba(255,103,51,0.05)" : "#f9f9f8", border: isSelected ? "1.5px solid #ff6733" : "1.5px solid transparent" }}>
                    <img src={session.coverImg} alt={session.name} className="size-[48px] shrink-0 rounded-[10px] object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-[#292827]">{session.name}</p>
                      <p className="text-[10px] text-[#949493]">{session.date}</p>
                      <div className="mt-[3px] flex items-center gap-[6px]">
                        <div className="flex items-center gap-[3px] rounded-full bg-[#ff6733]/10 px-[6px] py-[2px]"><MapPin size={8} className="text-[#ff6733]" /><span className="text-[9px] font-semibold text-[#ff6733]">{session.placeCount}</span></div>
                        <div className="flex -space-x-[4px]">{session.members.slice(0, 3).map((m) => (<img key={m.id} src={m.avatar} alt={m.name} className="size-[16px] rounded-full border-[1px] border-white object-cover" />))}</div>
                      </div>
                    </div>
                    <div className="flex size-[22px] shrink-0 items-center justify-center rounded-[6px] transition-all"
                      style={{ background: isSelected ? "#ff6733" : "#eaeae9", border: isSelected ? "none" : "1.5px solid #d4d4d4" }}>
                      {isSelected && <Check size={14} className="text-white" strokeWidth={2.5} />}
                    </div>
                  </button>
                );
              })}
            </div>
            <button onClick={() => setStep("details")} disabled={selectedSessionIds.length === 0}
              className="mt-[12px] flex h-[44px] w-full items-center justify-center rounded-full bg-[#ff6733] text-[14px] font-medium text-white transition-all duration-150 active:scale-[0.99] active:bg-[#e55a28] disabled:opacity-40"
              style={{ boxShadow: "0 2px 12px rgba(255,103,51,0.35)" }}>
              Continue ({selectedSessionIds.length} selected)
            </button>
          </div>
        )}

        {step === "details" && (
          <div className="flex max-h-[60vh] flex-col gap-[12px] overflow-y-auto px-[16px] py-[14px]">
            <div className="flex items-center gap-[6px] rounded-[10px] bg-[#f0f7ff] px-[10px] py-[6px]">
              {destination === "personal" ? <Lock size={12} className="text-[#7c3aed]" strokeWidth={2} /> : <Users size={12} className="text-[#ff6733]" strokeWidth={2} />}
              <p className="flex-1 text-[11px] font-semibold text-[#3b82f6]">
                {destination === "shared" ? `Saving to ${selectedSessionIds.length} trip${selectedSessionIds.length > 1 ? "s" : ""}` : `Saving to ${selectedCollectionIds.length} collection${selectedCollectionIds.length > 1 ? "s" : ""}`}
              </p>
              <button onClick={() => setStep(destination === "personal" ? "pick-personal" : "pick-shared")} className="text-[10px] font-semibold text-[#949493] underline">Change</button>
            </div>
            <div className="flex flex-col gap-[4px]">
              <div className="flex items-center gap-[4px]"><StickyNote size={12} className="text-[#949493]" strokeWidth={2} /><p className="text-[11px] font-medium text-[#545352]">Notes</p></div>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Why is this place interesting?" rows={2}
                className="w-full resize-none rounded-[10px] border-[1.5px] border-[#eaeae9] bg-[#f9f9f9] px-[10px] py-[8px] text-[13px] leading-[18px] text-[#292827] outline-none placeholder:text-[#c4c4c3] transition-colors duration-150 focus:border-[#ff6733] focus:bg-white" />
            </div>
            <button onClick={handleConfirm} className="flex h-[44px] w-full items-center justify-center rounded-full bg-[#ff6733] text-[14px] font-medium text-white transition-all duration-150 active:scale-[0.99] active:bg-[#e55a28]"
              style={{ boxShadow: "0 2px 12px rgba(255,103,51,0.35)" }}>Save Place</button>
          </div>
        )}
      </div>
    </div>
  );
}
