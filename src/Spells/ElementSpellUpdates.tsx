import React from "react";
import "./ElementSpells.css";
import { SpellUpdate } from "../utils/types";
import { ElementSpellUpdate } from "./ElementSpellUpdate";

export const ElementSpellUpdates = ({
  spellUpgrades,
  updateSpell,
}: {
  spellUpgrades: SpellUpdate[];
  updateSpell: (s: SpellUpdate) => void;
}) => {
  return (
    <div>
      {spellUpgrades.map((s: SpellUpdate, i: number) => (
        <ElementSpellUpdate update={s} key={i} updateSpell={updateSpell} />
      ))}
    </div>
  );
};
