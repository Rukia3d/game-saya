import React from "react";
import "./ElementSpells.css";

import { elementType, Spell } from "../utils/types";
import { ElementSpell } from "./ElementSpell";

export const ElementSpellWithInfo = ({
  forge = false,
  card,
  element,
  setForge = () => {},
  selectCard,
  setInfo,
}: {
  forge?: boolean;
  card: Spell;
  element: elementType;
  setForge?: (s: Spell) => void;
  selectCard: (s: Spell) => void;
  setInfo: (s: any) => void;
}) => {
  return (
    <div className={`SpellCard ${card.selected ? "active" : "inactive"}`}>
      <button onClick={() => setInfo(card)} data-testid="hero_card_info">
        Info
      </button>
      <ElementSpell card={card} selectCard={selectCard} element={element} />
      {forge ? (
        <button data-testid="forge_card" onClick={() => setForge(card)}>
          forge
        </button>
      ) : null}
    </div>
  );
};
