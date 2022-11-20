import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { ICell, IEnemyCell, IFight, IRun } from "../api/levelgen";
import { GameContext } from "./App";
import { ComingSoon, mainScreenState } from "./Main";
import { CloseButton } from "./PopUp";
import { screenToMap } from "./utils/helpers";

export const Player = ({ position }: { position: number }) => {
  return <div className="Player"></div>;
};

export const Level = ({
  position,
  level,
}: {
  position: number;
  level: IRun | IFight;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.game) {
    throw new Error("No data in context");
  }

  const staticCells = level.map;
  const enemies = level.enemies;

  return (
    <div className="GameLevelMap">
      <div className="GameLevel" style={{ bottom: `-${position}px` }}>
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
      </div>
    </div>
  );
};

type IEnemy = { enemy: IEnemyCell; x: number; y: number };
const Enemy = ({ enemy }: { enemy: IEnemy }) => {
  // ???

  return (
    <div
      className="enemy"
      style={{ left: `${enemy.x}px`, bottom: `${enemy.y}px` }}
    />
  );
};

type Point = { x: number; y: number; name?: string };
type Box = {
  bottomLeft: Point;
  topLeft: Point;
  topRight: Point;
  bottomRight: Point;
};

const isDangerous = (level: ICell[][], coord: Point) => {
  return level[coord.y][coord.x].type !== "space";
};

const mapCollision = (current: IRun | IFight, player: Box) => {
  const collision = boxCorners(player).find((point) =>
    isDangerous(current.map, point)
  );

  if (collision) {
    console.log(
      "MAP COLLISION",
      current.map[collision.y][collision.x].type,
      collision
    );
  }
};

const pointToBox = (point: Point): Box => {
  const prefix = point.name ? `${point.name}-` : "";
  return {
    bottomLeft: { x: point.x, y: point.y, name: `${prefix}bottomLeft` },
    topLeft: { x: point.x, y: point.y + 79, name: `${prefix}topLeft` },
    topRight: { x: point.x + 79, y: point.y + 79, name: `${prefix}topRight` },
    bottomRight: { x: point.x + 79, y: point.y, name: `${prefix}bottomRight` },
  };
};

const boxCorners = (box: Box): Point[] => [
  box.bottomLeft,
  box.bottomRight,
  box.topLeft,
  box.topRight,
];

const pointInsideBox = (point: Point, box: Box): boolean => {
  const xInsideBox = point.x >= box.bottomLeft.x && point.x <= box.topRight.x;
  const yInsideBox = point.y >= box.bottomLeft.y && point.y <= box.topRight.y;
  return xInsideBox && yInsideBox;
};

const boxesCollided = (box1: Box, box2: Box): Point | undefined => {
  return boxCorners(box1).find((point) => pointInsideBox(point, box2));
};

const enemyCollision = (current: IRun | IFight, player: Box) => {
  const enemies = current.enemies;
  enemies.forEach((enemy) => {
    const collision = boxesCollided(player, pointToBox(enemy));
    if (collision) {
      console.log("COLLISION WITH ENEMY ", enemy, " AT ", collision);
    }
  });
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
  // const [confirmation, setConfirmation] = useState(false);
  const [position, setPosition] = useState(10);
  const [current, setCurrent] = useState(context.game.level.levels[0]);

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

  setTimeout(() => {
    setPosition(position + 1);
  }, 50);

  useEffect(() => {
    const playerM: Box = {
      bottomLeft: screenToMap({ x: 160, y: position }, current.map),
      topLeft: screenToMap({ x: 160, y: position + 79 }, current.map),
      topRight: screenToMap({ x: 160 + 79, y: position + 79 }, current.map),
      bottomRight: screenToMap({ x: 160 + 79, y: position }, current.map),
    };
    const playerS = pointToBox({ x: 160, y: position, name: "player" });
    mapCollision(current, playerM);
    enemyCollision(current, playerS);
  }, [current, position]);

  if (context.game.mode === "story") {
    return (
      <div className="GameContainer" data-testid="game-screen">
        <div className="GameUI">
          <CloseButton close={() => setScreen("adventure")} />
          <button onClick={winLevel}>Win</button>
          <button onClick={looseLevel}>Loose</button>
          <Player position={position} />
        </div>
        <Level position={position} level={current} />
      </div>
    );
  }

  return <ComingSoon setScreen={setScreen} />;
};
