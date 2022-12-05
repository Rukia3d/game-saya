import { Database } from "sqlite3";
import { eventType } from "../engine/types";
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

export const readGameEvents = async (db: Database): Promise<IEventDB[]> => {
  const events: IEventDB[] = [];
  const sql = `SELECT id as eventId, type, created_at as created from event WHERE deleted_at='NULL'`;
  return readAllLnes(events, sql, db) as unknown as IEventDB[];
};

export const readCreatePlayerEvents = async (
  db: Database
): Promise<IEventCreatePlayerDB[]> => {
  const events: IEventCreatePlayerDB[] = [];
  const sql = `SELECT event_id as eventId, player_id as playerId, player_name as playerName from event_player_createplayer`;
  return readAllLnes(events, sql, db) as unknown as IEventCreatePlayerDB[];
};

export const readStartLevelEvents = async (
  db: Database
): Promise<IEventStartLevelDB[]> => {
  const events: IEventStartLevelDB[] = [];
  const sql = `SELECT * from event_player_startlevel`;
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
