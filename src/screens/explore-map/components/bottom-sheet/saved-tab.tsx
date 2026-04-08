import { useState } from "react";
import type { SavedSubTab, SavedCollection, RallySession, EventCard } from "../../types";
import PersonalSaves from "./personal-saves";
import RalliesSaves from "./rallies-saves";

type Props = {
  collections: SavedCollection[];
  savedPlaces: EventCard[];
  sessions: RallySession[];
  onNewCollection: () => void;
};

export default function SavedTab({ collections, savedPlaces, sessions, onNewCollection }: Props) {
  const [subTab, setSubTab] = useState<SavedSubTab>("personal");

  return (
    <div className="flex flex-col pt-[2px]">
      {/* Sub tabs */}
      <div className="flex gap-[4px] px-[16px] pb-[12px]">
        {(["personal", "rallies"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className="flex-1 rounded-full py-[8px] text-center text-[12px] font-semibold transition-all active:scale-95"
            style={{
              background: subTab === tab ? "#292827" : "#f5f5f5",
              color: subTab === tab ? "#fff" : "#545352",
            }}
          >
            {tab === "personal" ? "Personal" : "Rallies"}
          </button>
        ))}
      </div>

      {/* Content */}
      {subTab === "personal" ? (
        <PersonalSaves collections={collections} savedPlaces={savedPlaces} onNewCollection={onNewCollection} />
      ) : (
        <RalliesSaves sessions={sessions} />
      )}
    </div>
  );
}
