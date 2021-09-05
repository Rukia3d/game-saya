import React from "react";
import "./Fight.css";
import { elementType, Enemy, Spell } from "../utils/types";

export const BigCard = ({
  element,
  card,
  setInfo,
}: {
  element: elementType;
  card: Spell;
  setInfo: (s: Spell | Enemy | null) => void;
}) => {
  const baseClass = card.owner === "enemy" ? "EnemyCard" : "HeroCard";
  return (
    <div
      className={`${baseClass} ${card.element === element ? "trump" : null}`}
      aria-label="display_card"
    >
      <div>{card.name}</div>
      <div>
        Element {card.element}, Strength {card.strength}
      </div>
      {/* <div className="CardElement">
        <CardElement size="m" element={card.element} />
      </div> */}
      <img
        className="BigCardImage"
        src={`../img/Spells/${card.image}.jpg`}
        alt={`spellimage_${card.id}`}
      />
      <div>
        <button onClick={() => setInfo(card)}>Info</button>
      </div>
    </div>
  );
};
