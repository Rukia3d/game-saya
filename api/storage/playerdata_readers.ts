import { Database } from "sqlite";
import { eventType, IServerDistributeLivesDB } from "../engine/types";
import { readAllLnes } from "./db";

export type IEventDB = {
  eventId: number;
  type: eventType;
  created: number;
};

export type IEventCreatePlayerDB = {
  eventId: number;
  playerId: number;
  playerName: string;
};

export type IEventStartLevelDB = {
  eventId: number;
  playerId: number;
  adventureId: number;
  storyId: number;
  chapterId: number;
};

export type IEventWinLevelDB = {
  eventId: number;
  playerId: number;
  adventureId: number;
  storyId: number;
  chapterId: number;
};

export type IEventServerArenaStartDB = {
  eventId: number;
  created: number;
  start: number;
  end: number;
};

export type IEventServerArenaEndDB = {
  eventId: number;
  created: number;
};

export type IEventServerDistributeLivesDB = {
  eventId: number;
  created: number;
};

export type IEventArenaStartDB = {
  eventId: number;
  playerId: number;
  created: number;
  mode: string;
  id: number;
};

export type IEventArenaEndDB = {
  eventId: number;
  playerId: number;
  created: number;
  mode: string;
  id: number;
};

export const readGameEvents = async (db: Database): Promise<IEventDB[]> => {
  const events: IEventDB[] = [];
  const sql = `SELECT id as eventId, type, created from event WHERE deleted is NULL`;
  return readAllLnes(events, sql, db) as unknown as IEventDB[];
};

export const readCreatePlayerEvents = async (
  db: Database
): Promise<IEventCreatePlayerDB[]> => {
  const events: IEventCreatePlayerDB[] = [];
  const sql = `SELECT eventId, playerId, playerName from event_player_createplayer`;
  return readAllLnes(events, sql, db) as unknown as IEventCreatePlayerDB[];
};

export const readStartLevelEvents = async (
  db: Database
): Promise<IEventStartLevelDB[]> => {
  const events: IEventStartLevelDB[] = [];
  const sql = `SELECT eventId, playerId, adventureId, chapterId, storyId from event_player_startlevel`;
  return readAllLnes(events, sql, db) as unknown as IEventStartLevelDB[];
};

export const readWinLevelEvents = async (
  db: Database
): Promise<IEventWinLevelDB[]> => {
  const events: IEventWinLevelDB[] = [];
  const sql = `SELECT * from event_player_winlevel`;
  return readAllLnes(events, sql, db) as unknown as IEventWinLevelDB[];
};

export const readServerStartArena = async (
  db: Database
): Promise<IEventServerArenaStartDB[]> => {
  const events: IEventServerArenaStartDB[] = [];
  const sql = `SELECT * from event_server_arenastart`;
  return readAllLnes(events, sql, db) as unknown as IEventServerArenaStartDB[];
};

export const readServerEndArena = async (
  db: Database
): Promise<IEventServerArenaEndDB[]> => {
  const events: IEventServerArenaEndDB[] = [];
  const sql = `SELECT * from event_server_arenaend`;
  return readAllLnes(events, sql, db) as unknown as IEventServerArenaEndDB[];
};

export const readServerDistributeLives = async (
  db: Database
): Promise<IServerDistributeLivesDB[]> => {
  const events: IServerDistributeLivesDB[] = [];
  const sql = `SELECT * from event_server_distributelives`;
  return readAllLnes(events, sql, db) as unknown as IServerDistributeLivesDB[];
};

export const readStartArena = async (
  db: Database
): Promise<IEventArenaStartDB[]> => {
  const events: IEventArenaStartDB[] = [];
  const sql = `SELECT * from event_player_arenastart`;
  return readAllLnes(events, sql, db) as unknown as IEventArenaStartDB[];
};

export const readEndArena = async (
  db: Database
): Promise<IEventArenaEndDB[]> => {
  const events: IEventArenaEndDB[] = [];
  const sql = `SELECT * from event_player_arenaend`;
  return readAllLnes(events, sql, db) as unknown as IEventArenaEndDB[];
};

/*

export const readStartEndlessEvents = async (
  db: Database
): Promise<IEventWinLevelDB[]> => {
  const events: IEventWinLevelDB[] = [];
  const sql = `SELECT * from event_player_winlevel WHERE deleted_at='NULL'`;
  return readAllLnes(events, sql, db) as unknown as IEventStartLevelDB[];
};


export const readPassCheckpointEvents = async (
  db: Database
): Promise<IEventDB[]> => {
  return passCheckpointEvents;
};

export const readMissCheckpointEvents = async (
  db: Database
): Promise<IEventDB[]> => {
  return missCheckpointEvents;
};

export const readStartArena = async (db: Database): Promise<IEventDB[]> => {
  return startArenaEvents;
};

export const readEndArena = async (db: Database): Promise<IEventDB[]> => {
  return endArenaEvents;
};
*/
