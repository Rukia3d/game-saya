import React from "react";
import "./HeroBlock.css";

import { elementType, Enemy, FightState, Hero, Spell } from "../utils/types";
import { ElementSpellWithInfo } from "../Spells/ElementSpellWithInfo";

const SmallHero = ({ hero }: { hero: Hero }) => {
  return (
    <div className="Character" aria-label={`character-${hero.id}`}>
      <h3>{hero.name}</h3>
    </div>
  );
};

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
      <div className="Characters" aria-label="Characters">
        {fightState.heroes.map((h: Hero, i: number) => (
          <SmallHero hero={h} key={i} />
        ))}
      </div>
    </div>
  );
};
