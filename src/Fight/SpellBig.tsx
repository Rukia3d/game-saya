import React from "react";
import "./Fight.css";
// Types
import { elementType, IEnemy, ISpell } from "../utils/types";
// Utils
// Components

export const SpellBig = ({
  element,
  spell,
  setInfo,
}: {
  element: elementType;
  spell: ISpell;
  setInfo: (s: ISpell | IEnemy | null) => void;
}) => {
  const baseClass = spell.owner === "enemy" ? "EnemyCard" : "HeroCard";
  return (
    <div
      className={`${baseClass} ${spell.element === element ? "trump" : null}`}
      aria-label="display_card"
    >
      <div>{spell.name}</div>
      <div>
        Element {spell.element}, Strength {spell.strength}
      </div>
      {/* <div className="CardElement">
        <CardElement size="m" element={card.element} />
      </div> */}
      <img
        className="BigSpellImage"
        src={`../img/Spells/${spell.image}.jpg`}
        alt={`spellimage_${spell.id}`}
      />
      <div>
        <button onClick={() => setInfo(spell)}>Info</button>
      </div>
    </div>
  );
};
