import React from "react";
import "./HeroBlock.css";

import { element, Enemy, FightState, Spell } from "../utils/types";

export const HeroSpellWithInfo = ({
  card,
  element,
  selectCard,
  setInfo,
}: {
  card: Spell;
  element: element | null;
  selectCard: (s: Spell) => void;
  setInfo: (s: any) => void;
}) => {
  return (
    <div className={`SpellCard ${card.selected ? "active" : "inactive"}`}>
      <button onClick={() => setInfo(card)} data-testid="hero_card_info">
        Info
      </button>
      <HeroSpell card={card} selectCard={selectCard} element={element} />
    </div>
  );
};

const HeroSpell = ({
  element,
  card,
  selectCard,
}: {
  element: element | null;
  card: Spell;
  selectCard: (s: Spell) => void;
}) => {
  return (
    <div className="Spell">
      <div
        className={`SpellCard ${
          card.element === element ? "trump" : "standard"
        }`}
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
