import React, { useContext } from "react";
import "./Fight.scss";
// Types
import { colorType, IEnemy, ISpell, schoolType } from "../utils/types";
import {
  calculateSpellMana,
  calculateSpellStrength,
} from "../utils/spellslogic";
import { GameContext } from "../App";
// Utils
// Components

const Strength = ({ n, school }: { n: number; school: schoolType }) => {
  const strengthColor = () => {
    return `rgb(0, 39, 194)`;
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
}: {
  transparency?: boolean;
  spell: ISpell;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.story || !context.setAdditionScreen) {
    throw new Error("No data in context");
  }
  //const mana = calculateSpellMana(spell);
  const strength = calculateSpellStrength(spell);
  //const updates = spell.updates.length;
  return (
    <div
      className={"BigSpellPosition"}
      aria-label="big-spell-frame"
      style={{
        position: "absolute",
        top: spell.owner === "enemy" ? "0" : "10%",
        left: spell.owner === "enemy" ? "0" : "10%",
        zIndex: spell.owner === "enemy" ? 100 : 150,
        opacity: transparency ? 0.5 : 1,
      }}
    >
      <div
        className={`BigSpell ${spell.school}`}
        onClick={() => context.setAdditionScreen(spell)}
        aria-label="big-spell"
      >
        {new Array(strength).fill(0).map((x, n) => (
          <Strength n={n} school={spell.school} key={n} />
        ))}
        <img
          className="BigSpellImage"
          src={`../img/Spells/${spell.color}/${spell.id}.png`}
          alt={`spellimage_${spell.id}`}
        />
      </div>
    </div>
  );
};
