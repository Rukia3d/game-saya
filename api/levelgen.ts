import { gameMode } from "./engine/types";

export interface IReel {
  layout: string;
  panels: IReelPanel[];
}

export interface IReelPanel {
  imageAddress: string;
  text?: string;
  name?: string;
}

export interface IRun {
  settingName: string;
  setting: string;
  map: ICell[][];
  enemies: { enemy: IEnemyCell; x: number; y: number }[];
  type: gameMode;
  musicAddress: string;
  triggers: {
    trigger: ITriggerCell;
    x: number;
    y: number;
    triggerId: number;
  }[];
}
export interface IFight {
  settingName: string;
  setting: string;
  map: ICell[][];
  type: gameMode;
  enemies: { enemy: IEnemyCell; x: number; y: number }[];
  musicAddress: string;
  triggers: {
    trigger: ITriggerCell;
    x: number;
    y: number;
    triggerId: number;
  }[];
}

export type ILayout = IRun | IFight;

export type cellType = "space" | "trigger" | "obstacle" | "enemy";

export interface ILevel {
  levels: ILayout[];
  element: { id: number; name: string }[];
  opening?: IReel[];
  ending?: IReel[];
}

interface IEmptyCell {
  type: cellType;
}

export interface ITriggerCell {
  type: cellType;
}

interface IObstacleCell {
  type: cellType;
  //   image: string;
}

export interface IEnemyCell {
  type: cellType;
  id: number;
  //   image: string;
  //   sound: string;
  //   strength: number;
  //   reward: string;
  //   element: element;
}
export type ICell = IEmptyCell | IObstacleCell | ITriggerCell;

// generate the gated sections of the level
const generatePath = (length: number, width: number) => {
  let newLayer: any = [];
  // separate level into 3 sections
  const diffJump = length / 3;
  for (let i = 0; i < length; i++) {
    let newRow: ICell[] = [];
    // possible positions for paths
    const pos1 = Math.floor(Math.random() * 5);
    const pos2 = Math.floor(Math.random() * 5);
    const pos3 = Math.floor(Math.random() * 5);
    const pos4 = Math.floor(Math.random() * 5);
    for (let j = 0; j < width; j++) {
      if (
        i < diffJump &&
        (j === pos1 || j === pos2 || j === pos3 || j === pos4)
      ) {
        // beginning of the level
        newRow.push({ type: "space" });
      } else if (i < diffJump * 2 && (j === pos1 || j === pos2)) {
        // middle of the level
        newRow.push({ type: "space" });
      } else if (i < diffJump * 3 && j === pos1) {
        // end of the level
        newRow.push({ type: "space" });
      } else {
        newRow.push({ type: "obstacle" });
      }
    }
    newLayer.push(newRow);
  }

  return newLayer;
};

// const generateEnemyPosition = (width: number, difficulty: number) => {
//   const index = Math.floor(Math.random() * width);
//   const addition: ICell[] = new Array(width).fill({ type: "space" });
//   addition[index] = { type: "enemy" };
//   const enemyChance = Math.random() < 0.5;
//   if (difficulty <= 3 && enemyChance) {
//     const index = Math.floor(Math.random() * width);
//     addition[index] = { type: "enemy" };
//   }
//   return addition;
// };

const generateEnemySpace = (width: number, difficulty: number) => {
  let newLayer: any = [];
  const addition: ICell[] = new Array(width).fill({ type: "space" });
  for (let i = 0; i < difficulty; i++) {
    const enemyChance = Math.random() < 0.5;
    if (enemyChance && i >= 1) {
      // enemy can't be inserted into 1st line after gates
      //newLayer.push(generateEnemyPosition(width, difficulty));
    } else {
      newLayer.push(addition);
    }
  }
  return newLayer;
};

const generateMap = (length: number, width: number, difficulty: number) => {
  const path = generatePath(length, width);
  let newLayer: any = [];
  path.forEach((e: ICell[][]) => {
    newLayer.push(e);
    generateEnemySpace(width, difficulty).map((s: ICell[]) => newLayer.push(s));
  });
  //return path;
  return newLayer;
};

const start = () => {
  const length = 16; // number of rows with gates
  const width = 5; // number of moves l to r
  const difficulty = 5; // number of rows between gates, can't be less than 2
  const newMap = generateMap(length, width, difficulty);
  newMap.map((e: ICell[]) => {
    e.map((c: ICell) => {
      switch (c.type) {
        case "space":
          process.stdout.write("_");
          break;
        case "obstacle":
          process.stdout.write("x");
          break;
      }
    });
    console.log("\n");
  });
  console.log(newMap);
};

start();
