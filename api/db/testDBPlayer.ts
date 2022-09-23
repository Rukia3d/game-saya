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
};

export const baseGame = { players: [basePlayer], server: baseServer };

export const materials: IMaterial[] = [
  { id: 0, name: "Coin" },
  { id: 1, name: "Black Soul Stone" },
  { id: 2, name: "White Soul Stone" },
  { id: 3, name: "Rings" },
  { id: 4, name: "Wands" },
  { id: 5, name: "Swords" },
  { id: 6, name: "Cups" },
  { id: 7, name: "Dimonds" },
];
