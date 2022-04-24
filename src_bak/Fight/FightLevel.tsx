import React, { useContext, useEffect, useState } from "react";
import "./Fight.scss";
// Types
import { IEnemy, FightState, IHero } from "../utils/types";
import { GameContext } from "../App";
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
        img={`../img/Enemies/${enemy.element.color}/${enemy.id}_idle.png`}
        frames={10}
        breakpoint={1}
      />
    </div>
  );
};

const EnemyStats = ({ fightState }: { fightState: FightState }) => {
  const context = useContext(GameContext);
  if (!context || !context.story || !context.setAdditionScreen) {
    throw new Error("No data in context");
  }
  const imgUrl = `/img/Backgrounds/gradient.png`;
  return (
    <div
      className="EnemyStats"
      aria-label="opponent_info"
      onClick={() => context.setAdditionScreen(fightState.enemy)}
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div data-testid="enemy-name">{fightState.enemy.name}: </div>
      <div data-testid="enemy-element">{fightState.enemy.element.color}: </div>
      <div data-testid="enemy-life">{fightState.enemyDeck.length}</div>
    </div>
  );
};

export const Heroes = ({ heroes }: { heroes: IHero[] }) => {
  return (
    <div className="Heroes">
      {heroes.map((h: IHero, i: number) => (
        <AnimatedSpriteCycle
          width={500}
          height={500}
          img={`../img/Heroes/Animations/${h.id}_idle.png`}
          frames={9}
          breakpoint={1}
          key={i}
          styleWidth="auto"
        />
      ))}
    </div>
  );
};

export const FightScene = ({
  fightState,
  enemyAct,
  animation,
}: {
  fightState: FightState;
  enemyAct: (i: number) => void;
  animation: string | null;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.story) {
    throw new Error("No data in context");
  }
  const story = context.story;
  const imgUrl = `/img/Fights/${story.image}.jpg`;
  const [currentCameraX, setCurrentCameraX] = useState(0);
  const [moveCameraX, setMoveCameraX] = useState(0);

  useEffect(() => {
    if (animation === "GIVECARDS") {
      setTimeout(() => {
        setMoveCameraX(250);
      }, 1000);
    }

    // if (animation === "HEROACT") {
    //   console.log("I will move left");
    //   setMoveCameraX(0);
    // }
  }, [animation]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (currentCameraX < moveCameraX) {
        setCurrentCameraX(currentCameraX + 10);
      }
      if (currentCameraX > moveCameraX) {
        setCurrentCameraX(currentCameraX - 10);
      }
    }, 40);
    return () => {
      window.clearInterval(interval);
    };
  }, [currentCameraX, moveCameraX]);

  const tempStyle = {
    position: "absolute" as "absolute",
    top: "20px",
    left: "20px",
    zIndex: 50000,
  };
  return (
    <div
      className={`FightScene`}
      style={{
        backgroundImage: `url(${imgUrl})`,
        left: `-${currentCameraX}px`,
      }}
    >
      <div
        className="Animation"
        style={tempStyle}
        aria-label={`animation-${animation}`}
      >
        <h1>{animation}</h1>
      </div>
      <Enemy enemy={fightState.enemy} enemyAct={enemyAct} />
      <Heroes heroes={fightState.heroes} />
    </div>
  );
};

export const FightLevel = ({
  fightState,
  enemyAct,
  animation,
}: {
  fightState: FightState;
  enemyAct: (i: number) => void;
  animation: string | null;
}) => {
  return (
    <div className="FightLevel">
      <TopMenu
        currentHealth={fightState.hero.life}
        currentMana={fightState.hero.mana}
      />
      <EnemyStats fightState={fightState} />
      <FightScene
        fightState={fightState}
        enemyAct={enemyAct}
        animation={animation}
      />
    </div>
  );
};
