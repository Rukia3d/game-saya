import { IGoal, IMaterial, IPlayer, IServer } from "../engine/types";
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
  goals: [],
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

export const goals: IGoal[] = [
  {
    id: 0,
    title: "Complete 3 story levels",
    description: "Complete any 3 story levels",
    state: "new",
    screenToGo: "arcana",
    condition: { type: "any_story_levels", goal: 3, current: 0 },
    reward: [
      { ...materials[0], quantity: 30 },
      { ...materials[2], quantity: 25 },
    ],
  },
  {
    id: 1,
    title: "Participate in arena",
    description: "Stake and participate in arena event",
    state: "new",
    screenToGo: "arena",
    condition: { type: "any_arena_levels", goal: 1, current: 0 },
    reward: [
      { ...materials[0], quantity: 30 },
      { ...materials[3], quantity: 25 },
    ],
  },
  {
    id: 2,
    title: "Play 2 endless events",
    description: "Play 2 endless events",
    state: "new",
    screenToGo: "arcana",
    condition: { type: "any_endless", goal: 2, current: 0 },
    reward: [
      { ...materials[0], quantity: 30 },
      { ...materials[4], quantity: 25 },
    ],
  },
];
