import React from "react";
import "./Fight.scss";
// Types
import { elementType, IEnemy, ISpell } from "../utils/types";
import {
  calculateSpellMana,
  calculateSpellStrength,
} from "../utils/spellslogic";
// Utils
// Components

const Strength = ({ n, element }: { n: number; element: elementType }) => {
  const strengthColor = () => {
    switch (element) {
      case "fire":
        return `rgba(255, 0, 0, 1)`;
      case "earth":
        return `rgb(254, 222, 8)`;
      case "air":
        return `rgb(8, 254, 221)`;
      case "metal":
        return `rgb(82, 82, 82)`;
      case "water":
        return `rgb(0, 39, 194)`;
    }
  };
  return (
    <div className={`Path size_${n}`}>
      <div
        className="Strength"
        aria-label="spell-strength"
        style={{ backgroundColor: strengthColor() }}
      ></div>
    </div>
  );
};

export const SpellBig = ({
  transparency,
  spell,
  setInfo,
}: {
  transparency?: boolean;
  spell: ISpell;
  setInfo: (s: ISpell | IEnemy | null) => void;
}) => {
  //const mana = calculateSpellMana(spell);
  const strength = calculateSpellStrength(spell);
  //const updates = spell.updates.length;
  return (
    <div
      className={"BigSpellPosition"}
      style={{
        position: "absolute",
        top: spell.owner === "enemy" ? "0" : "10%",
        left: spell.owner === "enemy" ? "0" : "10%",
        zIndex: spell.owner === "enemy" ? 100 : 150,
        opacity: transparency ? 0.5 : 1,
      }}
    >
      <div
        className={`BigSpell ${spell.element}`}
        onClick={() => setInfo(spell)}
      >
        {new Array(strength).fill(0).map((x, n) => (
          <Strength n={n} element={spell.element} key={n} />
        ))}
        <img
          className="BigSpellImage"
          src={`../img/Spells/${spell.element}/${spell.image}.png`}
          alt={`spellimage_${spell.id}`}
        />
      </div>
    </div>
  );
};
