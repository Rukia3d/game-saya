import { screenToMap } from "./utils/helpers";
import { ICell, IEnemyCell, IFight, IRun, ITriggerCell } from "../api/levelgen";

type Point = { x: number; y: number; name?: string };
type Box = {
  bottomLeft: Point;
  topLeft: Point;
  topRight: Point;
  bottomRight: Point;
};

type Collision =
  | {
      point: Point;
      type: "enemy";
      cell: IEnemyCell;
    }
  | {
      point: Point;
      type: "obstacle";
      cell: ICell;
    }
  | {
      point: Point;
      type: "trigger";
      cell: ITriggerCell;
    };

export type Gameplay = {
  player: Point;
  playerTargetX: number;
  lives: number;
  state: "run" | "lost" | "dead";
  time: number;
  level: IRun | IFight;
  moveLeft: () => void;
  moveRight: () => void;
};

const enemyCollision = (
  current: IRun | IFight,
  player: Box
): Collision | void => {
  const enemies = current.enemies;
  for (const enemy of enemies) {
    const collision = boxesCollided(player, pointToBox(enemy));
    if (collision) {
      return {
        point: collision,
        type: "enemy",
        cell: enemy.enemy,
      };
    }
  }
};

const mapCollision = (
  current: IRun | IFight,
  player: Box
): Collision | void => {
  const collision = boxCorners(player).find((point) =>
    isDangerous(current.map, point)
  );

  if (!collision) return;

  const cell = current.map[collision.y][collision.x];

  switch (cell.type) {
    case "obstacle":
      return {
        type: cell.type,
        point: collision,
        cell: cell,
      };
    case "trigger":
      return {
        type: cell.type,
        point: collision,
        cell: cell,
      };
  }
};

const isDangerous = (level: ICell[][], coord: Point) => {
  return level[coord.y][coord.x].type !== "space";
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

const initialPlayer = {
  x: 160,
  y: 0,
  name: "player",
};

export const updateGameplay = (gameplay: Gameplay) => {
  const { level, player } = gameplay;

  player.y = player.y + 1;
  if (player.x !== gameplay.playerTargetX) {
    const step = player.x < gameplay.playerTargetX ? 10 : -10;
    player.x = player.x + step;
  }

  const playerS = pointToBox(player);
  const playerM: Box = {
    bottomLeft: screenToMap(playerS.bottomLeft, level.map),
    topLeft: screenToMap(playerS.topLeft, level.map),
    topRight: screenToMap(playerS.topRight, level.map),
    bottomRight: screenToMap(playerS.bottomRight, level.map),
  };
  const collision =
    mapCollision(level, playerM) || enemyCollision(level, playerS);

  if (collision) {
    // ignore triggers - will need a switch on collision.type

    console.log("collision detected", collision);

    if (gameplay.lives > 0) {
      gameplay.lives = gameplay.lives - 1;
      gameplay.player = { ...initialPlayer };
      gameplay.state = "dead";
    } else {
      gameplay.state = "lost";
    }
  }
};

const moveLeft = (gameplay: Gameplay) => {
  console.log("gameplay move left");
  gameplay.playerTargetX = Math.max(
    Math.floor((gameplay.player.x - 1) / 80) * 80,
    0
  );
};

const moveRight = (gameplay: Gameplay) => {
  console.log("gameplay move right");
  gameplay.playerTargetX = Math.min(
    Math.ceil((gameplay.player.x + 1) / 80) * 80,
    80 * 4
  );
};

export const initGameplay = (level: IRun | IFight): Gameplay => {
  const gp: Gameplay = {
    player: { ...initialPlayer },
    playerTargetX: initialPlayer.x,
    lives: 3,
    state: "run",
    time: 0,
    level,
    moveLeft: () => moveLeft(gp),
    moveRight: () => moveRight(gp),
  };

  return gp;
};
