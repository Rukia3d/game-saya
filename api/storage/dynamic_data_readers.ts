import { Database } from "sqlite3";
import { readAllLnes, readOneLne } from "./db_helpers";
import {
  DBPCreateEvent,
  DBPFinishStoryEvent,
  DBPStartFightEvent,
  DBPAttackSpellEvent,
} from "./db_types";

export const getPlayerCreateEvent = async (
  player_id: string,
  db: Database
): Promise<DBPCreateEvent> => {
  const sql = `SELECT player_event.id, player_event.event, player_event.player_id, player_event.created_at,
  player_event.updated_at, player_event.deleted_at FROM player_event
    JOIN player_event_createuser on player_event.player_id = player_event_createuser.player_id
	  AND player_event.id=player_event_createuser.player_event_id WHERE player_event.player_id='${player_id}';`;
  return readOneLne(sql, db) as unknown as DBPCreateEvent;
};

export const getPlayerFinishStoryEvents = async (
  player_id: string,
  db: Database
): Promise<DBPFinishStoryEvent[]> => {
  const events: DBPFinishStoryEvent[] = [];
  const sql = `SELECT player_event_id as id, player_event.event, player_event.player_id, story_id, adventure_id,
  player_event.created_at, player_event.updated_at, player_event.deleted_at FROM player_event
    JOIN player_event_finishstory on player_event.player_id = player_event_finishstory.player_id
    AND player_event.id=player_event_finishstory.player_event_id WHERE player_event.player_id='${player_id}';`;
  return readAllLnes(events, sql, db) as unknown as DBPFinishStoryEvent[];
};

export const getPlayerStartFightEvents = async (
  player_id: string,
  db: Database
): Promise<DBPStartFightEvent[]> => {
  const events: DBPStartFightEvent[] = [];
  const sql = `SELECT player_event_id as id, player_event.event, player_event.player_id, fight_id,
  player_event.created_at, player_event.updated_at, player_event.deleted_at FROM player_event
    JOIN player_event_startfight on player_event.player_id = player_event_startfight.player_id
    AND player_event.id=player_event_startfight.player_event_id WHERE player_event.player_id='${player_id}';`;
  return readAllLnes(events, sql, db) as unknown as DBPStartFightEvent[];
};

export const getPlayerAttackSpellEvents = async (
  player_id: string,
  db: Database
): Promise<DBPAttackSpellEvent[]> => {
  const events: DBPAttackSpellEvent[] = [];
  const sql = `SELECT player_event_id as id, player_event.event, player_event.player_id, spell_id, spell_copy,
  player_event.created_at, player_event.updated_at, player_event.deleted_at FROM player_event
    JOIN player_event_attackspell on player_event.player_id = player_event_attackspell.player_id
    AND player_event.id=player_event_attackspell.player_event_id WHERE player_event.player_id='${player_id}';`;
  return readAllLnes(events, sql, db) as unknown as DBPAttackSpellEvent[];
};
