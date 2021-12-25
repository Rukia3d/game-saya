import React from "react";
import "./Spells.scss";
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
        className={`SpellCard`}
        onClick={() => (selectSpell ? selectSpell(spell) : null)}
      >
        <p aria-label="spell_card">{spell.name}</p>
      </div>
    </div>
  );
};

export const EmptySpell = () => {
  return (
    <div className="Spell">
      <div className={`SpellCard`}></div>
    </div>
  );
};
