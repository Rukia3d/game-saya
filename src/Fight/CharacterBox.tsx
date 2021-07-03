import React from "react";
import "./CharacterBox.css";

import { Human } from "./Human";

import { Enemy, FightState, Spell } from "../utils/types";

export const CharacterBox = ({
  fightState,
  setEnemyCard,
  setInfo,
}: {
  fightState: FightState;
  setEnemyCard: (s: Spell | null) => void;
  setInfo: (i: Spell | Enemy | null) => void;
}) => {
  const enemyAct = () => {
    const spell = fightState.enemyDeck.shift() || null;
    setEnemyCard(spell);
  };

  return (
    <div className="CharacterBox">
      <div className="Stats" onClick={() => setInfo(fightState.enemy)}>
        cards:
        <span data-testid="enemy_life">{fightState.enemyDeck.length}</span>,
        drop: {fightState.enemyDrop.length}
      </div>
      <div className="Human" onClick={enemyAct} aria-label="opponent">
        <Human />
      </div>
      <div className="Stats">
        hero health:{" "}
        <span data-testid="hero_life">{fightState.hero.currentHealth}</span>,
        cards:
        {fightState.heroDeck.length}+{fightState.heroHand.length}, drop:{" "}
        {fightState.heroDrop.length}
      </div>
    </div>
  );
};
