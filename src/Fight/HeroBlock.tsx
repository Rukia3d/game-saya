import React from "react";
import "./HeroBlock.css";

import { element, Enemy, FightState, Spell } from "../utils/types";
import { HeroSpellWithInfo } from "./HeroSpellWithInfo";

export const HeroBlock = ({
  fightState,
  selectCard,
  setInfo,
}: {
  fightState: FightState;
  selectCard: (s: Spell) => void;
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
          {fightState.elements.map((s: element, i: number) => (
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
          <HeroSpellWithInfo
            card={d}
            selectCard={selectCard}
            setInfo={setInfo}
            element={fightState.element}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
