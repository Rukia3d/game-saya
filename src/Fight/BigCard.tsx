import React from "react";
import "./Fight.css";
import { Enemy, Spell } from "../utils/types";

export const BigCard = ({
  card,
  setInfo,
}: {
  card: Spell;
  setInfo: (s: Spell | Enemy | null) => void;
}) => {
  return (
    <div
      className={card.owner === "enemy" ? "EnemyCard" : "HeroCard"}
      aria-label="display_card"
    >
      <p>{card.name}</p>
      <p>Belongs to {card.owner}</p>
      <p>
        <img
          className="BigCardImage"
          src={card.image}
          alt={`spellimage_${card.id}`}
        />
      </p>
      <p>
        <button onClick={() => setInfo(card)}>Info</button>
      </p>
    </div>
  );
};
