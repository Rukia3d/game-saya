import React from "react";
import "./Spells.scss";
// Types
import { ISpellUpdate } from "../utils/types";
// Utils
// Components
import { SpellUpdate } from "./SpellUpdate";

export const SpellUpdates = ({
  spellUpgrades,
  updateSpell,
  updateInfo,
  distructSpell,
}: {
  spellUpgrades: ISpellUpdate[];
  updateSpell?: (s: ISpellUpdate) => void;
  distructSpell?: (s: ISpellUpdate) => void;
  updateInfo?: (s: ISpellUpdate) => void;
}) => {
  return (
    <div className="SpellUpdates">
      {spellUpgrades.map((s: ISpellUpdate, i: number) => (
        <SpellUpdate
          update={s}
          key={i}
          updateSpell={updateSpell}
          updateInfo={updateInfo}
          distructSpell={distructSpell}
        />
      ))}
    </div>
  );
};
