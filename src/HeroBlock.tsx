import React from "react";
import { Enemy, FightState, Spell } from "./Fight";
import "./HeroBlock.css";

const HeroSpell = ({
  card,
  selectCard,
}: {
  card: Spell;
  selectCard: (s: Spell) => void;
}) => {
  return (
    <div className="Spell">
      <div
        className="SpellCard"
        aria-label="spell_card"
        onClick={() => selectCard(card)}
      >
        {card.name}
      </div>
    </div>
  );
};

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
        <p>Current element is SOME</p>
      </div>
      <div className="Deck" aria-label="Deck">
        {fightState.heroHand.map((d: Spell, i: number) => (
          <div key={i}>
            <button onClick={() => setInfo(d)} data-testid="hero_card_info">
              Info
            </button>
            <HeroSpell card={d} selectCard={selectCard} />
          </div>
        ))}
      </div>
    </div>
  );
};
