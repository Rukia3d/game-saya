import React, { useContext } from "react";
import "./Fight.scss";
// Types
import { IEnemy, FightState, ISpell, IHero } from "../utils/types";
import { GameContext } from "../App";
import { enemy } from "../utils/testobjects";
import { AnimatedSpriteCycle } from "../Animations/AnimatedSpriteCycle";
import { TopMenu } from "../UI/TopMenu";
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
      <AnimatedSpriteCycle
        width={500}
        height={500}
        img={`../img/Enemies/${enemy.element}/${enemy.id}_idle.png`}
        frames={10}
        breakpoint={1}
      />
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
  const imgUrl = `/img/Backgrounds/gradient.png`;
  return (
    <div
      className="EnemyStats"
      aria-label="opponent_info"
      onClick={() => setInfo(fightState.enemy)}
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div data-testid="enemy-name">{enemy.name}: </div>
      <div data-testid="enemy-element">{enemy.element}: </div>
      <div data-testid="enemy-life">{fightState.enemyDeck.length}</div>
    </div>
  );
};

export const HeroPreviews = ({ heroes }: { heroes: IHero[] }) => {
  return (
    <div className="HeroPreviews">
      {heroes.map((h: IHero) => (
        <img src={`/img/Heroes/${h.id}_icon_back.png`} alt="hero-back" />
      ))}
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
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.story) {
    throw new Error("No data in context");
  }
  const story = context.story;
  const imgUrl = `/img/Fights/${story.image}.jpg`;
  return (
    <div
      className="EnemyBlock"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <TopMenu />
      <EnemyStats fightState={fightState} setInfo={setInfo} />
      <Enemy enemy={fightState.enemy} enemyAct={enemyAct} />
      <HeroPreviews heroes={fightState.heroes} />
    </div>
  );
};
