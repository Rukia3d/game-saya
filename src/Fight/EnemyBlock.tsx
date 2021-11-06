import React from "react";
import "./Fight.css";
// Types
import { IEnemy, FightState, ISpell } from "../utils/types";
// Utils
// Components

const Enemy = ({
  enemy,
  enemyAct,
}: {
  enemy: IEnemy;
  enemyAct: (i: number) => void;
}) => {
  return (
    <div className="Enemy" onClick={() => enemyAct(0)} aria-label="opponent">
      <img src={`../img/Enemies/${enemy.id}.png`} alt={enemy.name} />
    </div>
  );
};

const EnemyStats = ({
  fightState,
  setInfo,
}: {
  fightState: FightState;
  setInfo: (i: ISpell | IEnemy | null) => void;
}) => {
  return (
    <div
      className="Stats"
      aria-label="opponent_info"
      onClick={() => setInfo(fightState.enemy)}
    >
      cards:
      <span data-testid="enemy_life">{fightState.enemyDeck.length}</span>, drop:{" "}
      {fightState.enemyDrop.length}
    </div>
  );
};

export const EnemyBlock = ({
  fightState,
  enemyAct,
  setInfo,
}: {
  fightState: FightState;
  enemyAct: (i: number) => void;
  setInfo: (i: ISpell | IEnemy | null) => void;
}) => {
  return (
    <div className="CharacterBox">
      <EnemyStats fightState={fightState} setInfo={setInfo} />
      <Enemy enemy={fightState.enemy} enemyAct={enemyAct} />
      <div className="Stats">
        hero health: <span data-testid="hero_life">{fightState.hero.life}</span>
        , hero mana: <span data-testid="hero_mana">{fightState.hero.mana}</span>
        , cards:
        {fightState.heroDeck.length}+{fightState.heroHand.length}, drop:{" "}
        {fightState.heroDrop.length}
      </div>
    </div>
  );
};
