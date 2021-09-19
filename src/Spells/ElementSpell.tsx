import React from "react";
import "./ElementSpells.css";
import { elementType, Spell } from "../utils/types";
import { ElementSpellFrame } from "./ElementSpellFrame";

export const ElementSpell = ({
  element,
  card,
  selectCard,
}: {
  element: elementType;
  card: Spell;
  selectCard?: (s: Spell) => void;
}) => {
  return (
    <div className="Spell">
      <div
        className={`SpellCard ${
          card.element === element ? "trump" : "standard"
        }`}
        aria-label="spell_card_border"
        onClick={() => (selectCard ? selectCard(card) : null)}
      >
        <p aria-label="spell_card">{card.name}</p>
        <ElementSpellFrame card={card} />
      </div>
    </div>
  );
};
