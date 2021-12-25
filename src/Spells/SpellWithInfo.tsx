import React from "react";
import "./Spells.scss";
// Types
import { elementType, ISpell } from "../utils/types";
// Utils
// Components
import { Spell } from "./Spell";

export const SpellWithInfo = ({
  forge = false,
  spell,
  element,
  setForge = () => {},
  selectSpell,
  setInfo,
}: {
  forge?: boolean;
  spell: ISpell;
  element: elementType;
  setForge?: (s: ISpell) => void;
  selectSpell: (s: ISpell) => void;
  setInfo: (s: any) => void;
}) => {
  return (
    <div className={`SpellCard ${spell.selected ? "active" : "inactive"}`}>
      <button onClick={() => setInfo(spell)} data-testid="hero_card_info">
        Info
      </button>
      <Spell spell={spell} selectSpell={selectSpell} element={element} />
      {forge ? (
        <button data-testid="forge_card" onClick={() => setForge(spell)}>
          forge
        </button>
      ) : null}
    </div>
  );
};
