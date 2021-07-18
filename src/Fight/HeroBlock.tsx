import React from "react";
import "./HeroBlock.css";

import { element, Enemy, FightState, Spell } from "../utils/types";
import { shuffle } from "../utils/helpers";

export const HeroSpellWithInfo = ({
  card,
  selectCard,
  setInfo,
}: {
  card: Spell;
  selectCard: (s: Spell) => void;
  setInfo: (s: any) => void;
}) => {
  return (
    <div>
      <button onClick={() => setInfo(card)} data-testid="hero_card_info">
        Info
      </button>
      <HeroSpell card={card} selectCard={selectCard} />
    </div>
  );
};

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
        className={`SpellCard ${card.selected ? "active" : "inactive"}`}
        aria-label="spell_card_border"
        onClick={() => selectCard(card)}
      >
        <p aria-label="spell_card">{card.name}</p>
        <img
          className="SmallCardImage"
          src={card.image}
          alt={`spellimage_${card.id}`}
        />
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
        <p>
          Elements:
          {fightState.elements.map((s: element) => (
            <span
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
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
