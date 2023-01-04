import { Database } from "sqlite";
import { arenaMode } from "../engine/types";
import { writeOneLine } from "./db";

export const writeArenaStart = async (
  start: number,
  end: number,
  created: number,
  db: Database
): Promise<number> => {
  const arena_event = "event(type, created, updated, deleted)";
  const newArena = ["SERVERARENASTART", created, created, null];
  const event_id = await writeOneLine(arena_event, newArena, db);
  const event_arenaStart =
    "event_server_arenastart(eventId, created, updated, deleted, start, end)";
  const newEvent = [event_id, created, created, null, start, end];
  await writeOneLine(event_arenaStart, newEvent, db);
  return event_id;
};

export const writeArenaEnd = async (
  created: number,
  db: Database
): Promise<number> => {
  const arena_event = "event(type, created, updated, deleted)";
  const newArena = ["SERVERARENAEND", created, created, null];
  const event_id = await writeOneLine(arena_event, newArena, db);
  const event_arenaEnd =
    "event_server_arenaend(eventId, created, updated, deleted)";
  const newEvent = [event_id, created, created, null];
  await writeOneLine(event_arenaEnd, newEvent, db);
  return event_id;
};

export const writeDistributeLives = async (
  created: number,
  db: Database
): Promise<number> => {
  const distribute_event = "event(type, created, updated, deleted)";
  const newArena = ["DISTRIBUTELIVES", created, created, null];
  const event_id = await writeOneLine(distribute_event, newArena, db);
  const event_distributeLives =
    "event_server_distributelives(eventId, created, updated, deleted)";
  const newEvent = [event_id, created, created, null];
  await writeOneLine(event_distributeLives, newEvent, db);
  return event_id;
};

export const writeCreatePlayer = async (
  playerId: number,
  created: number,
  name: string,
  db: Database
): Promise<number> => {
  const player_event = "event(type, created, updated, deleted)";
  const newPlayer = ["CREATEPLAYER", created, created, null];
  const event_id = await writeOneLine(player_event, newPlayer, db);
  const event_createuser =
    "event_player_createplayer(playerId, playerName, eventId)";
  const newEvent = [playerId, name, event_id];
  await writeOneLine(event_createuser, newEvent, db);
  return event_id;
};

export const writeStartLevelEvent = async (
  playerId: number,
  adventureId: number,
  storyId: number,
  chapterId: number,
  created: number,
  db: Database
): Promise<number> => {
  const start_event = "event(type, created, updated, deleted)";
  const newStart = ["STARTLEVEL", created, created, null];
  const event_id = await writeOneLine(start_event, newStart, db);
  const event_startlevel =
    "event_player_startlevel(playerId, eventId, adventureId, storyId, chapterId)";
  const newEvent = [playerId, event_id, adventureId, storyId, chapterId];
  await writeOneLine(event_startlevel, newEvent, db);
  return event_id;
};

export const writeWinLevelEvent = async (
  playerId: number,
  adventureId: number,
  storyId: number,
  chapterId: number,
  created: number,
  db: Database
): Promise<number> => {
  const start_event = "event(type, created, updated, deleted)";
  const newStart = ["WINLEVEL", created, created, null];
  const event_id = await writeOneLine(start_event, newStart, db);
  const event_startlevel =
    "event_player_winlevel(playerId, eventId, adventureId, storyId, chapterId)";
  const newEvent = [playerId, event_id, adventureId, storyId, chapterId];
  await writeOneLine(event_startlevel, newEvent, db);
  return event_id;
};

export const writeArenaStartEvent = async (
  playerId: number,
  mode: arenaMode,
  index: number,
  created: number,
  db: Database
): Promise<number> => {
  const start_event = "event(type, created, updated, deleted)";
  const newStart = ["ARENASTART", created, created, null];
  const event_id = await writeOneLine(start_event, newStart, db);
  const event_startArena =
    "event_player_arenastart(playerId, eventId, mode, id)";
  const newEvent = [playerId, event_id, mode, index];
  await writeOneLine(event_startArena, newEvent, db);
  return event_id;
};

export const writeArenaEndEvent = async (
  playerId: number,
  mode: arenaMode,
  index: number,
  created: number,
  db: Database
): Promise<number> => {
  const start_event = "event(type, created, updated, deleted)";
  const newStart = ["ARENAEND", created, created, null];
  const event_id = await writeOneLine(start_event, newStart, db);
  const event_endArena = "event_player_arenaend(playerId, eventId, mode, id)";
  const newEvent = [playerId, event_id, mode, index];
  await writeOneLine(event_endArena, newEvent, db);
  return event_id;
};

export const writeClaimRewardEvent = async (
  playerId: number,
  claimId: number,
  created: number,
  db: Database
): Promise<number> => {
  const start_event = "event(type, created, updated, deleted)";
  const newStart = ["CLAIMREWARD", created, created, null];
  const event_id = await writeOneLine(start_event, newStart, db);
  const event_endArena = "event_player_claimreward(playerId, eventId, claimId)";
  const newEvent = [playerId, event_id, claimId];
  await writeOneLine(event_endArena, newEvent, db);
  return event_id;
};
