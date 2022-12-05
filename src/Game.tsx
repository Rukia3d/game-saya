import axios from "axios";
import React, { useContext, useState } from "react";

import { ICell, IEnemyCell, IReel, ITriggerCell } from "../api/levelgen";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { CloseButton } from "./PopUp";
import { Reel } from "./Reel";
import { Gameplay, initGameplay, updateGameplay } from "./gameplay";

export const useGameplay = (gameplay: Gameplay): [Gameplay, () => void] => {
  const [, setTime] = useState(0);

  const tick = () => {
    setTime((prevTime) => {
      updateGameplay(gameplay);
      return prevTime + 1;
    });
  };
  return [gameplay, tick];
};

export const Player = ({ gameplay }: { gameplay: Gameplay }) => {
  return (
    <div
      className="Player"
      style={{
        left: `${gameplay.player.x}px`,
        bottom: `${gameplay.player.y}px`,
      }}
    ></div>
  );
};

type ITrigger = {
  trigger: ITriggerCell;
  triggerId: number;
  x: number;
  y: number;
};
const Trigger = ({ trigger }: { trigger: ITrigger }) => {
  return (
    <div
      className="trigger"
      style={{ left: `${trigger.x}px`, bottom: `${trigger.y}px` }}
    />
  );
};

type IEnemy = { enemy: IEnemyCell; x: number; y: number };
const Enemy = ({ enemy }: { enemy: IEnemy }) => {
  return (
    <div
      className="enemy"
      style={{ left: `${enemy.x}px`, bottom: `${enemy.y}px` }}
    />
  );
};

export const Controls = ({ gameplay }: { gameplay: Gameplay }) => {
  const moveLeft = () => {
    console.log("moveLeft");
    gameplay.moveLeft();
  };
  const moveRight = () => {
    console.log("moveRight");
    gameplay.moveRight();
  };

  return (
    <div className="Control">
      <button onClick={moveLeft}>Left</button>
      <button onClick={moveRight}>Right</button>
    </div>
  );
};

export const Level = ({ gameplay }: { gameplay: Gameplay }) => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.game) {
    throw new Error("No data in context");
  }

  const { level, player } = gameplay;
  const staticCells = level.map;
  const enemies = level.enemies;
  const triggers = level.triggers;

  return (
    <div className="GameLevelMap">
      <div className="GameLevel" style={{ bottom: `-${player.y}px` }}>
        {staticCells.map((m: ICell[], n: number) => (
          <div className="MapRow" key={n}>
            {m.map((c: ICell, j: number) => (
              <div className={`MapCell ${c.type}`} key={j}></div>
            ))}
          </div>
        ))}
        {enemies.map((enemy) => (
          <Enemy key={enemy.enemy.id} enemy={enemy} />
        ))}
        {triggers.map((trigger, n) => (
          <Trigger key={n} trigger={trigger} />
        ))}

        <Player gameplay={gameplay} />
      </div>
    </div>
  );
};

export const GamePlay = ({
  setScreen,
  setReel,
  gameplay: levelGameplay,
}: {
  setScreen: (n: mainScreenState) => void;
  setReel: (r: undefined | IReel[]) => void;
  gameplay: Gameplay;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.game) {
    throw new Error("No data in context");
  }

  const [gameplay, tick] = useGameplay(levelGameplay);
  const { lives } = gameplay;

  switch (gameplay.state) {
    case "run":
      setTimeout(tick, 25);
  }

  const winLevel = async () => {
    console.log("WinLevel");
    if (context.game && "id" in context.game) {
      await axios.post(`/api/players/${context.player.id}/winLevel`, {
        storyId: context.game.id,
      });

      await context.mutate();
      setScreen("adventure");
      context.setGame(null);
    }
  };

  const looseLevel = () => {
    setScreen("adventure");
    context.setGame(null);
  };

  // LEVEL MOVES

  return (
    <div className="GameContainer" data-testid="game-screen">
      <div className="GameUI">
        <CloseButton close={() => setScreen("adventure")} />
        <button onClick={winLevel}>Win</button>
        <button onClick={looseLevel}>Loose</button>
        <div>Lives: {lives}</div>
        <Controls gameplay={gameplay} />
      </div>
      <Level gameplay={gameplay} />
    </div>
  );
};

export const Game = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.game) {
    throw new Error("No data in context");
  }
  const [reel, setReel] = useState(context.game.level.opening);

  if (reel === undefined) {
    const level = context.game.level.levels[0];
    const gameplay = initGameplay(level);

    return (
      <GamePlay gameplay={gameplay} setScreen={setScreen} setReel={setReel} />
    );
  }
  return (
    <div className="ReelContainer" data-testid="reel-screen">
      <CloseButton close={() => setReel(undefined)} />
      <Reel reel={reel} setReel={setReel} />
    </div>
  );
};
