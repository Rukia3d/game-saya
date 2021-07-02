import React from "react";
import { FightState, Spell } from "./Fight";
import "./HeroBlock.css";

export const HeroBlock = ({
  fightState,
  selectCard,
}: {
  fightState: FightState;
  selectCard: (s: Spell) => void;
}) => {
  return (
    <div className="HeroBlock">
      <div className="Info">
        <p>
          Your opponent:{fightState.enemy.name} with power of
          {fightState.enemy.element}
        </p>
        <p>Current element is SOME</p>
      </div>
      <div className="Deck">
        {fightState.heroHand.map((d: Spell, i: number) => (
          <div key={i} className="Spell" onClick={() => selectCard(d)}>
            {d.name}
          </div>
        ))}
      </div>
      <div className="Card">Card</div>
    </div>
  );
};
