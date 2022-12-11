import {
  IArenaEndDB,
  IArenaStartDB,
  IBuySpellDB,
  IDelistSpellDB,
  IListSpellDB,
  IMissCheckpointDB,
  IOpenSpellDB,
  IPassCheckpointDB,
  IStartEndlessDB,
  IUpdateSpellDB,
} from "../engine/types";

export const openSpellEvents: IOpenSpellDB[] = [
  {
    playerId: 1,
    eventId: 3,
    elementId: 0,
    spellId: 0,
  },
];

export const updateSpellEvents: IUpdateSpellDB[] = [
  {
    playerId: 1,
    eventId: 9,
    elementId: 0,
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

export const delistSpellEvents: IDelistSpellDB[] = [];

export const buySpellEvents: IBuySpellDB[] = [];

export const startEldessEvents: IStartEndlessDB[] = [
  {
    playerId: 1,
    eventId: 10,
    elementId: 0,
    mode: "run",
  },
];

export const passCheckpointEvents: IPassCheckpointDB[] = [
  {
    playerId: 1,
    eventId: 11,
    elementId: 0,
    mode: "run",
    checkpoint: 0,
  },
  {
    playerId: 1,
    eventId: 12,
    elementId: 0,
    mode: "run",
    checkpoint: 1,
  },
];

export const missCheckpointEvents: IMissCheckpointDB[] = [
  {
    playerId: 1,
    eventId: 13,
    elementId: 0,
    mode: "run",
  },
];

export const startArenaEvents: IArenaStartDB[] = [
  { playerId: 1, eventId: 7, mode: "run", index: 0 },
];

export const endArenaEvents: IArenaEndDB[] = [
  { playerId: 1, eventId: 8, mode: "run", index: 0 },
];
