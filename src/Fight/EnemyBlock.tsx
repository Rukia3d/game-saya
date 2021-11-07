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

const EnemyInfo = ({ fightState }: { fightState: FightState }) => {
  return (
    <div>
      Your opponent: {fightState.enemy.name} with power of{" "}
      {fightState.enemy.element}
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
      <EnemyInfo fightState={fightState} />
      <Enemy enemy={fightState.enemy} enemyAct={enemyAct} />
    </div>
  );
};
