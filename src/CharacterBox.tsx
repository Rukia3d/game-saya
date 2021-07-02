import React, { useState } from "react";
import { FightState, Spell } from "./Fight";
import { Human } from "./Human";
import "./CharacterBox.css";
export const CharacterBox = ({
  fightState,
  setEnemyCard,
}: {
  fightState: FightState;
  setEnemyCard: (s: Spell | null) => void;
}) => {
  const [selectedCard, setSelectedCard] = useState<null | Spell>(null);
  const enemyAct = () => {
    const spell = fightState.enemyDeck.shift() || null;
    setSelectedCard(spell);
    setEnemyCard(spell);
  };

  return (
    <div className="CharacterBox">
      <div className="Stats">
        cards:
        {fightState.enemyDeck.length}, drop: {fightState.enemyDrop.length}
      </div>
      <div className="Human" onClick={enemyAct}>
        <Human />
      </div>
      <div className="Stats">
        hero health: {fightState.hero.currentHealth}, cards:
        {fightState.heroDeck.length}+{fightState.heroHand.length}, drop:{" "}
        {fightState.heroDrop.length}
      </div>
    </div>
  );
};
