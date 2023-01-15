import { addPoints, mapToScreen, screenToMap } from "./utils/helpers";
import {
  ICell,
  IDialogue,
  IEntity,
  IFight,
  IMapEnemy,
  IMapTrigger,
  IRun,
  IPoint,
  ISizedPoint,
} from "../api/engine/types";

const BULLETSPEED = 5;
const BULLETLIFEINCELLS = 4;
const CELLSIZE: IPoint = { x: 80, y: 80 };

type Box = {
  bottomLeft: IPoint;
  topLeft: IPoint;
  topRight: IPoint;
  bottomRight: IPoint;
};

type Collision =
  | {
      point: IPoint;
      type: "enemy";
      enemy: IMapEnemy;
    }
  | {
      point: IPoint;
      type: "obstacle";
    }
  | {
      point: IPoint;
      type: "trigger";
      trigger: IMapTrigger;
      dialogue?: IDialogue;
    };

export type Gameplay = {
  player: ISizedPoint;
  playerTargetX: number;
  lives: number;
  state: "run" | "stop" | "hit" | "lost" | "win";
  time: number;
  level: IRun;
  triggered: IPoint[];
  dialogue: IDialogue | null;
  moveLeft: () => void;
  moveRight: () => void;
  fire: () => void;
};

const enemyCollision = (
  current: IRun,
  source: ISizedPoint
): Collision | void => {
  const enemies = current.enemies;
  const sourceBox = pointToBox(source);
  for (const e of enemies.coordinates) {
    const collision = boxesCollided(sourceBox, pointToBox(e));
    if (collision) {
      const enemy =
        enemies.content.find((f: IMapEnemy) => f.id === e.enemyId) || null;
      if (!enemy) throw new Error(`Can't find enemy ${e.enemyId}`);
      return {
        point: collision,
        type: "enemy",
        enemy: enemy,
      };
    }
  }
};

const triggerCollision = (
  current: IRun,
  source: ISizedPoint
): Collision | void => {
  const triggers = current.triggers;
  const dialogues = current.dialogues;
  const sourceBox = pointToBox(source);
  for (const t of triggers.coordinates) {
    const collision = boxesCollided(sourceBox, pointToBox(t));
    if (collision) {
      const trigger =
        triggers.content.find((f: IMapTrigger) => f.id === t.triggerId) || null;
      if (!trigger) throw new Error(`Can't find trigger ${t.triggerId}`);
      const dialogue =
        trigger.type === "dialogue"
          ? dialogues.find(
              (d: IDialogue) => d.id === trigger.data?.dialogueId
            ) || undefined
          : undefined;
      return {
        point: collision,
        type: "trigger",
        trigger: trigger,
        dialogue: dialogue,
      };
    }
  }
};

const mapCollision = (
  current: IRun | IFight,
  source: ISizedPoint
): Collision | void => {
  const box = pointToBox(source);
  const mapBox: Box = {
    bottomLeft: screenToMap(box.bottomLeft, current.map),
    topLeft: screenToMap(box.topLeft, current.map),
    topRight: screenToMap(box.topRight, current.map),
    bottomRight: screenToMap(box.bottomRight, current.map),
  };
  const collision = boxCorners(mapBox).find((point) =>
    isDangerous(current.map, point)
  );

  if (!collision) return;
  console.log("Collisions with", collision);
  const cell = current.map[collision.y][collision.x];
  if (cell.type !== "obstacle") {
    throw new Error(`Incorrect collision with ${collision}`);
  }

  return {
    type: cell.type,
    point: collision,
  };
};

const isDangerous = (level: ICell[][], coord: IPoint) => {
  return level[coord.y][coord.x].type !== "space";
};

const pointToBox = (source: ISizedPoint): Box => {
  const { point, size } = source;
  const prefix = point.name ? `${point.name}-` : "";
  return {
    bottomLeft: addPoints({ x: 0, y: 0, name: `${prefix}bottomLeft` }, point),
    topLeft: addPoints(
      { x: 0, y: size.y - 1, name: `${prefix}topLeft` },
      point
    ),
    topRight: addPoints(
      { x: size.x - 1, y: size.y - 1, name: `${prefix}topRight` },
      point
    ),
    bottomRight: addPoints(
      { x: size.x - 1, y: 0, name: `${prefix}bottomRight` },
      point
    ),
  };
};

const boxCorners = (box: Box): IPoint[] => [
  box.bottomLeft,
  box.bottomRight,
  box.topLeft,
  box.topRight,
];

const pointInsideBox = (point: IPoint, box: Box): boolean => {
  const xInsideBox = point.x >= box.bottomLeft.x && point.x <= box.topRight.x;
  const yInsideBox = point.y >= box.bottomLeft.y && point.y <= box.topRight.y;
  return xInsideBox && yInsideBox;
};
const boxesCollided = (box1: Box, box2: Box): IPoint | undefined => {
  return boxCorners(box1).find((point) => pointInsideBox(point, box2));
};

const makeInactive = (collision: Collision, gameplay: Gameplay): Gameplay => {
  const triggerIndex = gameplay.level.triggers.content.findIndex(
    (t: IMapTrigger) =>
      collision.type === "trigger" && t.id === collision.trigger.id
  );
  gameplay.level.triggers.content[triggerIndex] = {
    ...gameplay.level.triggers.content[triggerIndex],
    active: false,
  };
  return gameplay;
};

const findLastRestart = (collision: Collision, gameplay: Gameplay): IPoint => {
  const currentPosition = collision.point.y;
  const restarts: number[] = gameplay.level.triggers.content.map(
    (t: IMapTrigger) =>
      t.type === "restart" && t.data?.x && t.data.x > currentPosition
        ? t.data.x
        : gameplay.level.map.length - 1
  );
  const res = mapToScreen(
    { x: 2, y: Math.min(...restarts) },
    gameplay.level.map
  );
  return res;
};

const initialPlayer = {
  point: { x: 160, y: 0 },
  size: CELLSIZE,
  name: "player",
};

const trajectories = {
  line: () => ({ change: { x: 0, y: BULLETSPEED } }), // constant vertical movement
};

const moveEntity = (entity: IEntity) => {
  if (entity.movement.type === null) {
    return;
  }

  const move = trajectories[entity.movement.type]();
  entity.point = addPoints(entity.point, move.change);
};

const updateEntities = (entities: IEntity[]) => {
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];

    if (entity.lifetime === 0) {
      // delete the entity if it reached lifetime 0
      entities.splice(i, 1);
      continue;
    }

    if (entity.lifetime) {
      entity.lifetime -= 1;
    }
    moveEntity(entity);
  }
};

const collideEntities = (level: IRun) => {
  for (let i = 0; i < level.entities.length; i++) {
    const entity = level.entities[i];
    if (!entity.initiateCollisions) continue;

    // const collision =
    // mapCollision(level, playerM) ||
    // enemyCollision(level, playerS);
  }
};

export const updateGameplay = (gameplay: Gameplay) => {
  const { level, player } = gameplay;

  player.point.y = player.point.y + 1;
  if (player.point.x !== gameplay.playerTargetX) {
    const step = player.point.x < gameplay.playerTargetX ? 10 : -10;
    player.point.x = player.point.x + step;
  }

  updateEntities(gameplay.level.entities);
  // collideEntities(gameplay.level);

  const collision =
    mapCollision(level, player) ||
    enemyCollision(level, player) ||
    triggerCollision(level, player);

  if (collision && gameplay.state === "run") {
    // console.log("collision detected", collision);
    switch (collision.type) {
      case "obstacle":
      case "enemy":
        if (gameplay.lives > 0) {
          gameplay.state = "hit";
          gameplay.lives = gameplay.lives - 1;
          const restartPoint = findLastRestart(collision, gameplay);
          console.log("restartPoint", restartPoint);
          gameplay.player = {
            ...initialPlayer,
            point: restartPoint,
          };
          gameplay.state = "run";
        } else {
          gameplay.state = "lost";
        }
        break;
      case "trigger":
        // console.log("trigger", collision.trigger.id);
        if (collision.trigger.active) {
          if (collision.trigger.type === "dialogue" && collision.dialogue) {
            gameplay.state = "stop";
            gameplay.dialogue = collision.dialogue;
            gameplay = makeInactive(collision, gameplay);
          }
          if (
            collision.trigger.type === "coin" &&
            collision.trigger.data?.value
          ) {
            gameplay.state = "stop";
            gameplay.triggered.push(collision.point);
            gameplay = makeInactive(collision, gameplay);
            gameplay.state = "run";
          }
          if (collision.trigger.type === "win") {
            gameplay.state = "win";
          }
        }
        break;
    }
  }
};

const moveLeft = (gameplay: Gameplay) => {
  console.log("gameplay move left");
  gameplay.playerTargetX = Math.max(
    Math.floor((gameplay.player.point.x - 1) / CELLSIZE.x) * 80,
    0
  );
};

const moveRight = (gameplay: Gameplay) => {
  console.log("gameplay move right");
  gameplay.playerTargetX = Math.min(
    Math.ceil((gameplay.player.point.x + 1) / CELLSIZE.x) * 80,
    80 * 4
  );
};

const fire = (gameplay: Gameplay) => {
  const bullet: IEntity = {
    type: "bullet",
    id: new Date().valueOf(),
    lifetime: Math.floor((80 * BULLETLIFEINCELLS) / BULLETSPEED),
    initiateCollisions: true,
    point: addPoints(gameplay.player.point, {
      x: CELLSIZE.x / 2 - 5,
      y: CELLSIZE.y,
    }),
    movement: {
      type: "line",
    },
  };
  gameplay.level.entities.push(bullet);
};

export const initGameplay = (level: IRun): Gameplay => {
  const gp: Gameplay = {
    player: { ...initialPlayer },
    playerTargetX: initialPlayer.point.x,
    lives: 3,
    state: "run",
    triggered: [],
    dialogue: null,
    time: 0,
    level,
    moveLeft: () => moveLeft(gp),
    moveRight: () => moveRight(gp),
    fire: () => fire(gp),
  };

  return gp;
};
