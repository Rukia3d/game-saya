import React from "react";
import "./Spells.scss";
// Types
import { IPlayerSpellUpdate, ISpellUpdate } from "../utils/types";
// Utils
// Components
import { SpellUpdate } from "./SpellUpdate";

export const SpellUpdates = ({
  spellUpgrades,
  updateSpell,
  updateInfo,
  distructSpell,
}: {
  spellUpgrades: IPlayerSpellUpdate[];
  updateSpell?: (s: IPlayerSpellUpdate) => void;
  distructSpell?: (s: IPlayerSpellUpdate) => void;
  updateInfo?: (s: ISpellUpdate | IPlayerSpellUpdate) => void;
}) => {
  return (
    <div className="SpellUpdates" aria-label="spell-updates">
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
