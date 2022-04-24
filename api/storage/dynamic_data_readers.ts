import { Database } from "sqlite3";
import { readAllLnes } from "./db_helpers";
import {
  DBPCreateEvent,
  DBPFinishStoryEvent,
  DBPStartFightEvent,
  DBPAttackSpellEvent,
} from "./db_types";

export const getPlayerEvents = async (
  player_id: number,
  db: Database
): Promise<DBPCreateEvent[]> => {
  const events: DBPCreateEvent[] = [];
  const sql = `SELECT * FROM player_event WHERE player_id='${player_id}' AND event="CREATEUSER";`;
  return readAllLnes(events, sql, db) as unknown as DBPCreateEvent[];
};

export const getPlayerFinishStoryEvents = async (
  player_id: number,
  db: Database
): Promise<DBPFinishStoryEvent[]> => {
  const events: DBPFinishStoryEvent[] = [];
  const sql = `SELECT event, player_id, created_at, deleted_at, updated_at, event_id, story_id, adventure_id
  FROM player_event JOIN player_event_finishstory
  ON player_event.id=player_event_finishstory.event_id
  WHERE player_event.player_id='${player_id}';`;
  return readAllLnes(events, sql, db) as unknown as DBPFinishStoryEvent[];
};

export const getPlayerStartFightEvents = async (
  player_id: number,
  db: Database
): Promise<DBPStartFightEvent[]> => {
  const events: DBPStartFightEvent[] = [];
  const sql = `SELECT event, player_id, created_at, updated_at, deleted_at, event_id, fight_id, heroes, spells
  FROM player_event JOIN player_event_startfight
  ON player_event.id=player_event_startfight.event_id
  WHERE player_event.player_id='${player_id}';`;
  return readAllLnes(events, sql, db) as unknown as DBPStartFightEvent[];
};

export const getPlayerAttackSpellEvents = async (
  player_id: number,
  db: Database
): Promise<DBPAttackSpellEvent[]> => {
  const events: DBPAttackSpellEvent[] = [];
  const sql = `SELECT player_event_id as id, player_event.event, player_event.player_id, spell_id, spell_copy,
  player_event.created_at, player_event.updated_at, player_event.deleted_at FROM player_event
    JOIN player_event_attackspell on player_event.player_id = player_event_attackspell.player_id
    AND player_event.id=player_event_attackspell.player_event_id WHERE player_event.player_id='${player_id}';`;
  return readAllLnes(events, sql, db) as unknown as DBPAttackSpellEvent[];
};
