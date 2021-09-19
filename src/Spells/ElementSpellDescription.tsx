import React from "react";
import { Spell } from "../utils/types";
import "./ElementSpells.css";

export const ElementSpellDescription = ({ card }: { card: Spell }) => {
  return (
    <div>
      <h3 aria-label="card_name_header">{card.name}</h3>
      <p>Strength: {card.strength}</p>
      <p>{card.element ? "Element " + card.element : null}</p>
      <p>{card.selected ? "Equiped" : null}</p>
      <p>{card.mana ? "Special" : null}</p>
    </div>
  );
};
