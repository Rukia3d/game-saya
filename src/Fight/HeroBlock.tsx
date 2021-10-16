import React from "react";
import "./HeroBlock.css";

import { elementType, Enemy, FightState, Spell } from "../utils/types";
import { ElementSpellWithInfo } from "../Spells/ElementSpellWithInfo";

export const HeroBlock = ({
  fightState,
  selectCard,
  setInfo,
}: {
  fightState: FightState;
  selectCard: (index: number) => void;
  setInfo: (s: Spell | Enemy | null) => void;
}) => {
  return (
    <div className="HeroBlock">
      <div className="Info">
        <p>
          Your opponent: {fightState.enemy.name} with power of{" "}
          {fightState.enemy.element}
        </p>
        <p>
          Elements:
          {fightState.elements.map((s: elementType, i: number) => (
            <span
              key={i}
              style={{ color: s === fightState.element ? "green" : "black" }}
            >
              {" "}
              {s.toUpperCase()}
            </span>
          ))}
        </p>
      </div>
      <div className="Deck" aria-label="Deck">
        {fightState.heroHand.map((d: Spell, i: number) => (
          <ElementSpellWithInfo
            card={d}
            selectCard={() => selectCard(i)}
            setInfo={setInfo}
            element={fightState.element}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
