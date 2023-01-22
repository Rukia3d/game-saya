import { addPoints, mapToScreen, screenToMap } from "../utils/helpers";
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
  IMapEnemyCell,
  Command,
} from "../../api/engine/types";

const BULLETSPEED = 5;
const BULLETLIFEINCELLS = 4;
const CELLSIZE: IPoint = { x: 80, y: 80 };
const BULLETSIZE: IPoint = { x: 10, y: 10 };

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
      enemyCell: IMapEnemyCell;
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

type History = { y: number; command: Command };
export type Gameplay = {
  player: ISizedPoint;
  playerTargetX: number;
  lives: number;
  state: "run" | "stop" | "hit" | "lost" | "win";
  time: number;
  level: IRun;
  triggered: IPoint[];
  dialogue: IDialogue | null;
  history: History[];
};

const enemyCollision = (
  current: IRun,
  source: ISizedPoint
): Collision | void => {
  const sourceBox = pointToBox(source);
  for (const e of current.enemies) {
    const collision = boxesCollided(sourceBox, pointToBox(e));
    if (collision) {
      const enemy =
        current.enemiesContent.find((f: IMapEnemy) => f.id === e.enemyId) ||
        null;
      if (!enemy) throw new Error(`Can't find enemy ${e.enemyId}`);
      return {
        point: collision,
        type: "enemy",
        enemy: enemy,
        enemyCell: e,
      };
    }
  }
};

const triggerCollision = (
  current: IRun,
  source: ISizedPoint
): Collision | void => {
  const dialogues = current.dialogues;
  const sourceBox = pointToBox(source);
  for (const t of current.triggers) {
    const collision = boxesCollided(sourceBox, pointToBox(t));
    if (collision) {
      const trigger =
        current.triggersContent.find(
          (f: IMapTrigger) => f.id === t.triggerId
        ) || null;
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

const makeInactive = (collision: Collision, gameplay: Gameplay) => {
  /*      point: IPoint;
      type: "trigger";
      trigger: IMapTrigger;
      dialogue?: IDialogue;*/
  if (collision.type !== "trigger") return;

  const triggerIndex = gameplay.level.triggersContent.findIndex(
    (t: IMapTrigger) => t.id === collision.trigger.id
  );
  gameplay.level.triggersContent[triggerIndex] = {
    ...gameplay.level.triggersContent[triggerIndex],
    active: false,
  };
};

const findLastRestart = (collision: Collision, gameplay: Gameplay): IPoint => {
  const currentPosition = collision.point.y;
  const restarts: number[] = gameplay.level.triggersContent.map(
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
      removeEntity(entities, i);
      continue;
    }

    if (entity.lifetime) {
      entity.lifetime -= 1;
    }
    moveEntity(entity);
  }
};

const collidePlayer = (gameplay: Gameplay) => {
  const { level, player } = gameplay;

  const collision =
    mapCollision(level, player) ||
    enemyCollision(level, player) ||
    triggerCollision(level, player);

  if (!collision) return;

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
          makeInactive(collision, gameplay);
        }
        if (
          collision.trigger.type === "coin" &&
          collision.trigger.data?.value
        ) {
          gameplay.state = "stop";
          gameplay.triggered.push(collision.point);
          makeInactive(collision, gameplay);
          gameplay.state = "run";
        }
        if (collision.trigger.type === "win") {
          gameplay.state = "win";
        }
      }
      break;
  }
};

const removeEntity = (entities: IEntity[], i: number) => entities.splice(i, 1);

const killEnemy = (gameplay: Gameplay, enemyCell: IMapEnemyCell) => {
  const n = gameplay.level.enemies.findIndex(
    (e) =>
      e.point.x === enemyCell.point.x &&
      e.point.y === enemyCell.point.y &&
      e.enemyId === enemyCell.enemyId
  );
  gameplay.level.enemies.splice(n, 1);
};

const collideEntities = (gameplay: Gameplay) => {
  const { level } = gameplay;
  const { entities } = level;

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (!entity.initiateCollisions) continue;

    const collision =
      mapCollision(level, entity) || enemyCollision(level, entity);

    if (!collision) continue;
    switch (collision.type) {
      case "obstacle":
        removeEntity(entities, i);
        break;
      case "enemy":
        killEnemy(gameplay, collision.enemyCell);
        removeEntity(entities, i);
        break;
    }
  }
};

// test
//
// const history = [{ y: 9, command: "left" }, { y: 85, command: "fire" }, { y: 98, command: "right" }];
//
// const gameplay = new Gameplay(....);
// for/while/???? {
//    const command = findCommand(history, gameplay.player.y);
//    updateGameplay(gameplay, command);
// }

export const updateGameplay = (gameplay: Gameplay, command: Command) => {
  if (gameplay.state !== "run") {
    return;
  }

  const { player } = gameplay;

  if (command !== undefined) {
    const histcmd = { y: player.point.y, command };
    console.log("player command", histcmd);
    gameplay.history.push(histcmd);
  }

  // moveLeft
  if (command === "left") {
    gameplay.playerTargetX = Math.max(
      Math.floor((gameplay.player.point.x - 1) / CELLSIZE.x) * 80,
      0
    );
  }

  // moveRight
  if (command === "right") {
    gameplay.playerTargetX = Math.min(
      Math.ceil((gameplay.player.point.x + 1) / CELLSIZE.x) * 80,
      80 * 4
    );
  }

  // fire
  if (command === "fire") {
    const bullet: IEntity = {
      type: "bullet",
      id: new Date().valueOf(),
      lifetime: Math.floor((80 * BULLETLIFEINCELLS) / BULLETSPEED),
      initiateCollisions: true,
      point: addPoints(gameplay.player.point, {
        x: CELLSIZE.x / 2 - 5,
        y: CELLSIZE.y,
      }),
      size: BULLETSIZE,
      movement: {
        type: "line",
      },
    };
    gameplay.level.entities.push(bullet);
  }

  // *****

  player.point.y = player.point.y + 1;
  if (player.point.x !== gameplay.playerTargetX) {
    const step = player.point.x < gameplay.playerTargetX ? 10 : -10;
    player.point.x = player.point.x + step;
  }

  updateEntities(gameplay.level.entities);

  collideEntities(gameplay);
  collidePlayer(gameplay);
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
    history: [],
    level,
  };

  return gp;
};
