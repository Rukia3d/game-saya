import { IMaterial, IPlayer, IServer } from "../engine/types";
import { arenaFight, arenaRun } from "./testDBArena";

// const testLevel = new Array(131).fill(new Array(9));
// for (let i = 0; i < testLevel.length; i++) {
//   for (let j = 0; j < testLevel[i].length; i++) {
//     testLevel[i][j] = "o";
//     if (i === 50 || i === 95 || i === 131) {
//       testLevel[i][j] = "t";
//     }
//   }
// }
// console.log(testLevel);

export const basePlayer: IPlayer = {
  id: 0,
  name: "",
  exprience: 0,
  energy: 0,
  maxEnergy: 0,
  loungeId: null,
  materials: [],
  arcanas: [],
  spells: [],
  missions: [],
  messages: [],
  claims: [],
  currentState: { state: "MAIN" },
};

export const baseServer: IServer = {
  arenaRun: arenaRun,
  arenaFight: arenaFight,
  arenaRunHistory: [],
  arenaFightHistory: [],
  listings: [],
};

export const baseGame = { players: [basePlayer], server: baseServer };

export const materials: IMaterial[] = [
  { id: 0, name: "money" },
  { id: 1, name: "token" },
  { id: 2, name: "resource1" },
  { id: 3, name: "resource2" },
  { id: 4, name: "resource3" },
  { id: 5, name: "resource4" },
  { id: 6, name: "resource5" },
];
