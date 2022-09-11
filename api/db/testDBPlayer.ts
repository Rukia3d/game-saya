import {
  IMaterial,
  IEventDB,
  ICreatePlayerDB,
  IMissCheckpointDB,
  IOpenSpellDB,
  IPassCheckpointDB,
  IStartEndlessDB,
  IStartLevelDB,
  IUpdateSpellDB,
  IWinLevelDB,
  IServerArenaStartDB,
} from "../engine/types";

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

export const allPEvents: IEventDB[] = [
  {
    playerId: 1,
    eventId: 0,
    type: "CREATEPLAYER",
    created: 1654347193,
  },
  {
    playerId: 1,
    eventId: 0,
    type: "STARTLEVEL",
    created: 1654347300,
  },
  { playerId: 1, eventId: 0, type: "WINLEVEL", created: 1654347302 },
  { playerId: 1, eventId: 0, type: "OPENSPELL", created: 1654347302 },
  {
    playerId: 2,
    eventId: 1,
    type: "CREATEPLAYER",
    created: 1654347193,
  },
  {
    playerId: null,
    eventId: 0,
    type: "SERVERARENASTART",
    created: 1654347193,
  },
];

export const createPlayerEvents: ICreatePlayerDB[] = [
  { eventId: 0, playerName: "player 1 name" },
  { eventId: 1, playerName: "player 2 name" },
];

export const startLevelEvents: IStartLevelDB[] = [
  { eventId: 0, arcanaId: 0, levelId: 0, mode: "story" },
];

export const winLevelEvents: IWinLevelDB[] = [
  { eventId: 0, arcanaId: 0, levelId: 0, mode: "story" },
];

export const openSpellEvents: IOpenSpellDB[] = [
  {
    eventId: 0,
    arcanaId: 0,
    spellId: 0,
  },
];
export const updateSpellEvents: IUpdateSpellDB[] = [
  {
    eventId: 0,
    arcanaId: 0,
    spellId: 0,
  },
];

export const startEldessEvents: IStartEndlessDB[] = [
  {
    eventId: 0,
    arcanaId: 0,
    mode: "run",
  },
];

export const passCheckpointEvents: IPassCheckpointDB[] = [
  {
    eventId: 0,
    arcanaId: 0,
    mode: "run",
    checkpoint: 0,
  },
];

export const missCheckpointEvents: IMissCheckpointDB[] = [
  {
    eventId: 0,
    arcanaId: 0,
    mode: "run",
  },
];

export const serverArenaStartEvents: IServerArenaStartDB[] = [
  {
    eventId: 0,
    created: 1654347193,
    start: 1654347193,
    end: 1654357193,
  },
];
