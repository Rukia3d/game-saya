import React, { useState } from "react";
import { FightState, Spell } from "./Fight";
import "./HeroBlock.css";

const HeroSpell = ({
  selectedCard,
  card,
  selectCard,
  setSelectedCard,
}: {
  selectedCard: Spell | null;
  card: Spell;
  selectCard: (s: Spell) => void;
  setSelectedCard: (s: Spell | null) => void;
}) => {
  const showCardInfo = () => {
    if (!selectedCard) {
      setSelectedCard(card);
    } else if (selectedCard !== card) {
      setSelectedCard(card);
    } else {
      setSelectedCard(null);
    }
  };
  return (
    <div className="Spell">
      <div className="SpellCard" onClick={() => selectCard(card)}>
        {card.name}
      </div>
      <button onClick={showCardInfo}>Info</button>
    </div>
  );
};

export const HeroBlock = ({
  fightState,
  selectCard,
}: {
  fightState: FightState;
  selectCard: (s: Spell) => void;
}) => {
  const [selectedCard, setSelectedCard] = useState<Spell | null>(null);
  return (
    <div className="HeroBlock">
      <div className="Info">
        <p>
          Your opponent: {fightState.enemy.name} with power of{" "}
          {fightState.enemy.element}
        </p>
        <p>Current element is SOME</p>
      </div>
      <div className="Deck">
        {fightState.heroHand.map((d: Spell, i: number) => (
          <HeroSpell
            key={i}
            selectedCard={selectedCard}
            card={d}
            selectCard={selectCard}
            setSelectedCard={setSelectedCard}
          />
        ))}
      </div>
      {selectedCard ? (
        <div className="Card">
          <p>{selectedCard.name}</p>
          <p>Belongs to {selectedCard.owner}</p>
        </div>
      ) : null}
    </div>
  );
};
