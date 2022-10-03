import {
  IArenaEndDB,
  IArenaStartDB,
  ICreatePlayerDB,
  IEventDB,
  IListSpellDB,
  IMissCheckpointDB,
  IOpenSpellDB,
  IPassCheckpointDB,
  IServerArenaEndDB,
  IServerArenaStartDB,
  IStartEndlessDB,
  IStartLevelDB,
  IUpdateSpellDB,
  IWinLevelDB,
} from "../engine/types";

export const allGameEvents: IEventDB[] = [
  {
    eventId: 0,
    type: "CREATEPLAYER",
    created: 1654347193,
  },
  {
    eventId: 1,
    type: "STARTLEVEL",
    created: 1654347300,
  },
  { eventId: 2, type: "WINLEVEL", created: 1654347302 },
  { eventId: 3, type: "OPENSPELL", created: 1654347302 },
  {
    eventId: 4,
    type: "CREATEPLAYER",
    created: 1654347193,
  },
  {
    eventId: 5,
    type: "SERVERARENASTART",
    created: 1654347193,
  },
  {
    eventId: 6,
    type: "SERVERARENAEND",
    created: 1654347593,
  },
  { eventId: 7, type: "ARENASTART", created: 1654348593 },
  { eventId: 8, type: "ARENAEND", created: 1654348793 },
  { eventId: 9, type: "UPDATESPELL", created: 1654348795 },
  { eventId: 10, type: "STARTENDLESS", created: 1654348795 },
  { eventId: 11, type: "PASSCHECKPOINT", created: 1654348796 },
  { eventId: 12, type: "PASSCHECKPOINT", created: 1654348800 },
  { eventId: 13, type: "MISSCHECKPOINT", created: 1654348830 },
  { eventId: 14, type: "LISTSPELL", created: 1654348831 },
];

export const createPlayerEvents: ICreatePlayerDB[] = [
  { playerId: 1, eventId: 0, playerName: "player 1 name" },
  { playerId: 2, eventId: 4, playerName: "player 2 name" },
];

export const startLevelEvents: IStartLevelDB[] = [
  { playerId: 1, eventId: 1, arcanaId: 0, levelId: 0, mode: "story" },
];

export const winLevelEvents: IWinLevelDB[] = [
  { playerId: 1, eventId: 2, arcanaId: 0, levelId: 0, mode: "story" },
];

export const openSpellEvents: IOpenSpellDB[] = [
  {
    playerId: 1,
    eventId: 3,
    arcanaId: 0,
    spellId: 0,
  },
];

export const updateSpellEvents: IUpdateSpellDB[] = [
  {
    playerId: 1,
    eventId: 9,
    arcanaId: 0,
    spellId: 0,
  },
];

export const listSpellEvents: IListSpellDB[] = [
  {
    playerId: 1,
    eventId: 14,
    spellId: 0,
    price: 0.025,
    currency: "ETH",
  },
];

export const startEldessEvents: IStartEndlessDB[] = [
  {
    playerId: 1,
    eventId: 10,
    arcanaId: 0,
    mode: "run",
  },
];

export const passCheckpointEvents: IPassCheckpointDB[] = [
  {
    playerId: 1,
    eventId: 11,
    arcanaId: 0,
    mode: "run",
    checkpoint: 0,
  },
  {
    playerId: 1,
    eventId: 12,
    arcanaId: 0,
    mode: "run",
    checkpoint: 1,
  },
];

export const missCheckpointEvents: IMissCheckpointDB[] = [
  {
    playerId: 1,
    eventId: 13,
    arcanaId: 0,
    mode: "run",
  },
];

export const serverArenaStartEvents: IServerArenaStartDB[] = [
  {
    eventId: 5,
    created: 1654347193,
    start: 1654347193,
    end: 1654357193,
  },
];

export const serverArenaEndEvents: IServerArenaEndDB[] = [
  {
    eventId: 6,
    created: 1654357193,
  },
];

export const startArenaEvents: IArenaStartDB[] = [
  { playerId: 1, eventId: 7, mode: "run", index: 0 },
];

export const endArenaEvents: IArenaEndDB[] = [
  { playerId: 1, eventId: 8, mode: "run", index: 0 },
];
