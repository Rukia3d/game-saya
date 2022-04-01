import { readAllLnes, readOneLne } from "./db_helpers";
import {
  DBPAdventure,
  DBPHero,
  DBPCharacter,
  DBPSpellUpdate,
  DBPSpell,
  DBPUpdate,
  DBPResource,
  DBPlayer,
} from "./db_types";

export const getPlayerAdventures = async (
  player_id: string
): Promise<DBPAdventure[]> => {
  const adventures: DBPAdventure[] = [];
  const sql = `SELECT DISTINCT * FROM player_adventure
    WHERE player_id='${player_id}' AND deleted_at='NULL';`;
  return readAllLnes(adventures, sql) as unknown as DBPAdventure[];
};

export const getPlayerHeroes = async (
  player_id: string
): Promise<DBPHero[]> => {
  const heroes: DBPHero[] = [];
  const sql = `SELECT DISTINCT * FROM player_hero
    WHERE player_id='${player_id}' AND deleted_at='NULL';`;
  return readAllLnes(heroes, sql) as unknown as DBPHero[];
};

export const getPlayerCharacters = async (
  player_id: string
): Promise<DBPCharacter[]> => {
  const characters: DBPCharacter[] = [];
  const sql = `SELECT DISTINCT * FROM player_character
    WHERE player_id='${player_id}' AND deleted_at='NULL';`;
  return readAllLnes(characters, sql) as unknown as DBPCharacter[];
};

export const getPlayerSpellUpdates = async (
  player_id: string
): Promise<DBPSpellUpdate[]> => {
  const spell_updates: DBPSpellUpdate[] = [];
  const sql = `SELECT DISTINCT * FROM player_spell_update
    WHERE player_id='${player_id}' AND deleted_at='NULL';`;
  return readAllLnes(spell_updates, sql) as unknown as DBPSpellUpdate[];
};

export const getPlayerSpells = async (
  player_id: string
): Promise<DBPSpell[]> => {
  const spells: DBPSpell[] = [];
  const sql = `SELECT DISTINCT * FROM player_spell
    WHERE player_id='${player_id}' AND deleted_at='NULL';`;
  return readAllLnes(spells, sql) as unknown as DBPSpell[];
};

export const getPlayerUpdates = async (
  player_id: string
): Promise<DBPUpdate[]> => {
  const updates: DBPUpdate[] = [];
  const sql = `SELECT DISTINCT * FROM player_update
    WHERE player_id='${player_id}' AND deleted_at='NULL';`;
  return readAllLnes(updates, sql) as unknown as DBPUpdate[];
};

export const getPlayerResources = async (
  player_id: string
): Promise<DBPResource[]> => {
  const resources: DBPResource[] = [];
  const sql = `SELECT DISTINCT * FROM player_resource
    WHERE player_id='${player_id}' AND deleted_at='NULL';`;
  return readAllLnes(resources, sql) as unknown as DBPResource[];
};

export const getPlayer = async (player_id: string): Promise<DBPlayer> => {
  const sql = `SELECT DISTINCT * FROM player WHERE id='${player_id}';`;
  return readOneLne(sql) as unknown as DBPlayer;
};
