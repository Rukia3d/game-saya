import React from "react";
import "./HeroBlock.css";
// Types
import { elementType, IEnemy, FightState, IHero, ISpell } from "../utils/types";
// Utils
// Components
import { SpellWithInfo } from "../Spells/SpellWithInfo";

const SmallHero = ({ hero }: { hero: IHero }) => {
  return (
    <div className="Character" aria-label={`character-${hero.id}`}>
      <h3>{hero.name}</h3>
    </div>
  );
};

export const HeroBlock = ({
  fightState,
  selectSpell,
  setInfo,
}: {
  fightState: FightState;
  selectSpell: (index: number) => void;
  setInfo: (s: ISpell | IEnemy | null) => void;
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
        {fightState.heroHand.map((d: ISpell, i: number) => (
          <SpellWithInfo
            spell={d}
            selectSpell={() => selectSpell(i)}
            setInfo={setInfo}
            element={fightState.element}
            key={i}
          />
        ))}
      </div>
      <div className="Characters" aria-label="Characters">
        {fightState.heroes.map((h: IHero, i: number) => (
          <SmallHero hero={h} key={i} />
        ))}
      </div>
    </div>
  );
};
