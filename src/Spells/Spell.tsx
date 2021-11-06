import React from "react";
import "./Spells.css";
// Types
import { elementType, ISpell } from "../utils/types";
// Utils
// Components
import { SpellFrame } from "./SpellFrame";

export const Spell = ({
  element,
  spell,
  selectSpell,
}: {
  element: elementType;
  spell: ISpell;
  selectSpell?: (s: ISpell) => void;
}) => {
  return (
    <div className="Spell">
      <div
        className={`SpellCard ${
          spell.element === element ? "trump" : "standard"
        }`}
        aria-label="spell_card_border"
        onClick={() => (selectSpell ? selectSpell(spell) : null)}
      >
        <p aria-label="spell_card">{spell.name}</p>
        <SpellFrame spell={spell} />
      </div>
    </div>
  );
};
