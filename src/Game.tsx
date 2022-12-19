import axios from "axios";
import React, { useContext, useState } from "react";

import { ICell, IEnemyCell, IReel, ITriggerCell } from "../api/levelgen";
import { GameContext } from "./App";
import { CloseButton } from "./PopUp";
import { Reel } from "./Reel";
import { Gameplay, initGameplay, updateGameplay } from "./gameplay";
import { IStory } from "../api/engine/types";

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
  if (
    !context ||
    !context.player ||
    context.screen.screen !== "game" ||
    context.screen.adventureId == null ||
    context.screen.storyId == null ||
    context.screen.gameId == null
  ) {
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
  winLevel,
  looseLevel,
  setReel,
  gameplay: levelGameplay,
}: {
  winLevel: () => void;
  looseLevel: () => void;
  setReel: (r: undefined | IReel[]) => void;
  gameplay: Gameplay;
}) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    context.screen.screen !== "game" ||
    context.screen.adventureId == null ||
    context.screen.storyId == null ||
    context.screen.gameId == null
  ) {
    throw new Error("No data in context");
  }

  const [gameplay, tick] = useGameplay(levelGameplay);
  const { lives } = gameplay;

  switch (gameplay.state) {
    case "run":
      setTimeout(tick, 25);
  }

  // LEVEL MOVES

  return (
    <div className="GameContainer" data-testid="game-screen">
      <div className="GameUI">
        <CloseButton
          close={() =>
            context.setScreen({
              screen: "adventure",
              adventureId: null,
              storyId: null,
            })
          }
        />
        <button onClick={winLevel}>Win</button>
        <button onClick={looseLevel}>Loose</button>
        <div>Lives: {lives}</div>
        <Controls gameplay={gameplay} />
      </div>
      <Level gameplay={gameplay} />
    </div>
  );
};

export const Game = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    context.screen.screen !== "game" ||
    context.screen.adventureId == null ||
    context.screen.storyId == null ||
    context.screen.gameId == null
  ) {
    throw new Error("No data in context");
  }
  const adventure = context.player.adventures[context.screen.adventureId];
  const story = adventure.stories[context.screen.storyId];
  const game = story.chapters[context.screen.storyId];

  const winLevel = async () => {
    console.log("WinLevel");
    await axios.post(`/api/players/${context.player.id}/winLevel`, {
      adventureId: adventure.id,
      storyId: story.id,
      chapterId: game.id,
    });

    await context.mutate();
    //TODO doesn't load the chapters in a new state

    context.setScreen({
      screen: "adventure",
      adventureId: adventure.id,
      storyId: story.id,
    });
  };

  const looseLevel = () => {
    context.setScreen({
      screen: "adventure",
      adventureId: adventure.id,
      storyId: story.id,
    });
  };

  const [reel, setReel] = useState(game.level.opening);

  if (reel === undefined) {
    const level = game.level.levels[0];
    const gameplay = initGameplay(level);

    return (
      <GamePlay
        gameplay={gameplay}
        setReel={setReel}
        winLevel={winLevel}
        looseLevel={looseLevel}
      />
    );
  }
  return (
    <div className="ReelContainer" data-testid="reel-screen">
      <CloseButton close={() => setReel(undefined)} />
      <Reel reel={reel} setReel={setReel} />
    </div>
  );
};
