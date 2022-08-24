import {
  IPlayerEvent,
  ICreatePlayerEvent,
  IStartLevelEvent,
  IWinLevelEvent,
  IMaterial,
  IOpenSpellEvent,
  IUpdateSpellEvent,
  IStartEndlessEvent,
  IPassCheckpointEvent,
  IMissCheckpointEvent,
  IArenaStartEvent,
  IArenaEndEvent,
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

export const allEvents: IPlayerEvent[] = [
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
    created: 1654347310,
  },
];

export const createPlayerEvents: ICreatePlayerEvent[] = [
  { eventId: 0, playerName: "player 1 name" },
  { eventId: 1, playerName: "player 2 name" },
];

export const startLevelEvents: IStartLevelEvent[] = [
  { eventId: 0, arcanaId: 0, levelId: 0, mode: "story" },
];

export const winLevelEvents: IWinLevelEvent[] = [
  { eventId: 0, arcanaId: 0, levelId: 0, mode: "story" },
];

export const openSpellEvents: IOpenSpellEvent[] = [
  {
    eventId: 0,
    arcanaId: 0,
    spellId: 0,
  },
];
export const updateSpellEvents: IUpdateSpellEvent[] = [
  {
    eventId: 0,
    arcanaId: 0,
    spellId: 0,
  },
];

export const startEldessEvents: IStartEndlessEvent[] = [
  {
    eventId: 0,
    arcanaId: 0,
    mode: "run",
  },
];

export const passCheckpointEvents: IPassCheckpointEvent[] = [
  {
    eventId: 0,
    arcanaId: 0,
    mode: "run",
    checkpoint: 0,
  },
];

export const missCheckpointEvents: IMissCheckpointEvent[] = [
  {
    eventId: 0,
    arcanaId: 0,
    mode: "run",
  },
];

export const arenaStartEvents: IArenaStartEvent[] = [
  {
    eventId: 0,
    index: 0,
    mode: "run",
  },
];

export const arenaEndEvents: IArenaEndEvent[] = [
  {
    eventId: 0,
    index: 0,
    mode: "run",
  },
];
