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
      <p>{card.name}</p>
      <p>
        Element {card.element}, Strength {card.strength}
      </p>
      <p>
        <img
          className="BigCardImage"
          src={`../img/Spells/${card.image}.jpg`}
          alt={`spellimage_${card.id}`}
        />
      </p>
      <p>
        <button onClick={() => setInfo(card)}>Info</button>
      </p>
    </div>
  );
};
