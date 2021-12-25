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
}: {
  spellUpgrades: ISpellUpdate[];
  updateSpell: (s: ISpellUpdate) => void;
}) => {
  console.log("spellUpgrades", spellUpgrades);
  return (
    <div>
      {spellUpgrades.map((s: ISpellUpdate, i: number) => (
        <SpellUpdate update={s} key={i} updateSpell={updateSpell} canUpdate />
      ))}
    </div>
  );
};
