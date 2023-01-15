import { addPoints, mapToScreen, screenToMap } from "./utils/helpers";
import {
  ICell,
  IDialogue,
  IEntity,
  IFight,
  IMapEnemy,
  IMapTrigger,
  IRun,
  Point,
} from "../api/engine/types";

const BULLETSPEED = 5;
const BULLETLIFEINCELLS = 4;

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
      enemy: IMapEnemy;
    }
  | {
      point: Point;
      type: "obstacle";
    }
  | {
      point: Point;
      type: "trigger";
      trigger: IMapTrigger;
      dialogue?: IDialogue;
    };

export type Gameplay = {
  player: Point;
  playerTargetX: number;
  lives: number;
  state: "run" | "stop" | "hit" | "lost" | "win";
  time: number;
  level: IRun;
  triggered: Point[];
  dialogue: IDialogue | null;
  moveLeft: () => void;
  moveRight: () => void;
  fire: () => void;
};

const enemyCollision = (current: IRun, player: Box): Collision | void => {
  const enemies = current.enemies;
  for (const e of enemies.coordinates) {
    const collision = boxesCollided(player, pointToBox(e));
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

const triggerCollision = (current: IRun, player: Box): Collision | void => {
  const triggers = current.triggers;
  const dialogues = current.dialogues;
  for (const t of triggers.coordinates) {
    const collision = boxesCollided(player, pointToBox(t));
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
  player: Box
): Collision | void => {
  const collision = boxCorners(player).find((point) =>
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

const findLastRestart = (collision: Collision, gameplay: Gameplay): Point => {
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
  x: 160,
  y: 0,
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
      console.log("entity is dead", entity.id);
      entities.splice(i, 1);
      continue;
    }

    if (entity.lifetime) {
      entity.lifetime -= 1;
    }
    console.log("entity aged", entity.id, entity.lifetime);
    moveEntity(entity);
  }
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

  updateEntities(gameplay.level.entities);

  const collision =
    mapCollision(level, playerM) ||
    enemyCollision(level, playerS) ||
    triggerCollision(level, playerS);

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
            y: restartPoint.y,
            x: restartPoint.x,
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

const fire = (gameplay: Gameplay) => {
  const bullet: IEntity = {
    type: "bullet",
    id: new Date().valueOf(),
    lifetime: Math.floor((80 * BULLETLIFEINCELLS) / BULLETSPEED),
    point: {
      x: gameplay.player.x + 40 - 5,
      y: gameplay.player.y + 80,
    },
    movement: {
      type: "line",
    },
  };
  gameplay.level.entities.push(bullet);
};

export const initGameplay = (level: IRun): Gameplay => {
  const gp: Gameplay = {
    player: { ...initialPlayer },
    playerTargetX: initialPlayer.x,
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
