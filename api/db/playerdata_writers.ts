import { Database } from "sqlite3";
import { writeOneLine } from "./db";

export const writeCreatePlayer = async (
  playerId: number,
  created: number,
  name: string,
  db: Database
): Promise<number> => {
  // console.log("trying to write a new player");
  const player_event = "event(type, created, updated, deleted)";
  const newPlayer = ["CREATEPLAYER", created, created, "NULL"];
  const event_id = await writeOneLine(player_event, newPlayer, db);
  // console.log("player_event last ID", event_id);
  const event_createuser =
    "event_player_createplayer(playerId, playerName, eventId)";
  const newEvent = [playerId, name, event_id];
  const res = await writeOneLine(event_createuser, newEvent, db);
  // console.log("create_player_event last ID", res);
  return res;
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
  const newStart = ["STARTLEVEL", created, created, "NULL"];
  const event_id = await writeOneLine(start_event, newStart, db);
  const event_startlevel =
    "event_player_startlevel(playerId, eventId, adventureId, storyId, chapterId)";
  const newEvent = [playerId, event_id, adventureId, storyId, chapterId];
  const res = await writeOneLine(event_startlevel, newEvent, db);
  return res;
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
  const newStart = ["WINLEVEL", created, created, "NULL"];
  const event_id = await writeOneLine(start_event, newStart, db);
  const event_startlevel =
    "event_player_winlevel(playerId, eventId, adventureId, storyId, chapterId)";
  const newEvent = [playerId, event_id, adventureId, storyId, chapterId];
  const res = await writeOneLine(event_startlevel, newEvent, db);
  return res;
};
