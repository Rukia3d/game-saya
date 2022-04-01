import { Database } from "sqlite3";
import {
  DBAdventure,
  DBStory,
  DBAction,
  DBCharacter,
  DBHero,
  DBElement,
  DBSchool,
  DBSpell,
  DBUpdate,
  DBUpdateResource,
  DBResource,
  DBDialogue,
  DBLine,
  DBFight,
  DBReel,
  DBFightElement,
} from "./db_types";

const sqlite3 = require("sqlite3").verbose();

type dbDataType =
  | DBAdventure
  | DBDialogue
  | DBFight
  | DBReel
  | DBLine
  | DBStory
  | DBAction
  | DBCharacter
  | DBHero
  | DBElement
  | DBSchool
  | DBSpell
  | DBUpdate
  | DBUpdateResource
  | DBResource;

const createDb = async (): Promise<Database> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  return db;
};

const readAllLnes = async (
  res: dbDataType[],
  sql: string
): Promise<dbDataType[]> => {
  const db = await createDb();
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: dbDataType[]) => {
      db.close();
      if (err) {
        reject(err);
      }
      rows.forEach((row: dbDataType) => {
        res.push(row);
      });
      resolve(res);
    });
  });
};

export const getAllFightElements = async (): Promise<DBFightElement[]> => {
  const fight_elements: DBFightElement[] = [];
  const sql = `SELECT * from fight_element WHERE deleted_at='NULL'`;
  return readAllLnes(fight_elements, sql) as unknown as DBFightElement[];
};

export const getAllDialogues = async (): Promise<DBDialogue[]> => {
  const dialogues: DBDialogue[] = [];
  const sql = `SELECT * from dialogue WHERE deleted_at='NULL'`;
  return readAllLnes(dialogues, sql) as unknown as DBDialogue[];
};

export const getAllLines = async (): Promise<DBLine[]> => {
  const lines: DBLine[] = [];
  const sql = `SELECT * from lines WHERE deleted_at='NULL'`;
  return readAllLnes(lines, sql) as unknown as DBLine[];
};

export const getAllFights = async (): Promise<DBFight[]> => {
  const fights: DBFight[] = [];
  const sql = `SELECT * from fights WHERE deleted_at='NULL'`;
  return readAllLnes(fights, sql) as unknown as DBFight[];
};

export const getAllReels = async (): Promise<DBReel[]> => {
  const reels: DBReel[] = [];
  const sql = `SELECT * from reels WHERE deleted_at='NULL'`;
  return readAllLnes(reels, sql) as unknown as DBReel[];
};

export const getAllAdventures = async (): Promise<DBAdventure[]> => {
  const adventures: DBAdventure[] = [];
  const sql = `SELECT * from adventure WHERE deleted_at='NULL'`;
  return readAllLnes(adventures, sql) as unknown as DBAdventure[];
};

export const getAllStories = async (): Promise<DBStory[]> => {
  const stories: DBStory[] = [];
  const sql = `SELECT * from story WHERE deleted_at='NULL'`;
  return readAllLnes(stories, sql) as unknown as DBStory[];
};

export const getAllActions = async (): Promise<DBAction[]> => {
  const actions: DBAction[] = [];
  const sql = `SELECT * from story WHERE deleted_at='NULL'`;
  return readAllLnes(actions, sql) as unknown as DBAction[];
};

export const getAction = async (action_id: number): Promise<DBAction> => {
  const all = await getAllActions();
  const res = all.find((a: DBAction) => a.id === action_id);
  if (!res) throw new Error(`Can't find action with id ${action_id}`);
  return res;
};

export const getAllCharacters = async (): Promise<DBCharacter[]> => {
  const characters: DBCharacter[] = [];
  const sql = `SELECT * from characters WHERE deleted_at='NULL'`;
  return readAllLnes(characters, sql) as unknown as DBCharacter[];
};

export const getAllHeroes = async (): Promise<DBHero[]> => {
  const heroes: DBHero[] = [];
  const sql = `SELECT * from heroes WHERE deleted_at='NULL'`;
  return readAllLnes(heroes, sql) as unknown as DBHero[];
};

export const getAllElements = async (): Promise<DBElement[]> => {
  const elements: DBElement[] = [];
  const sql = `SELECT * from elements WHERE deleted_at='NULL'`;
  return readAllLnes(elements, sql) as unknown as DBElement[];
};

export const getAllSchools = async (): Promise<DBSchool[]> => {
  const schools: DBSchool[] = [];
  const sql = `SELECT * from schools WHERE deleted_at='NULL'`;
  return readAllLnes(schools, sql) as unknown as DBSchool[];
};

export const getAllSpells = async (): Promise<DBSpell[]> => {
  const spells: DBSpell[] = [];
  const sql = `SELECT * from spells WHERE deleted_at='NULL'`;
  return readAllLnes(spells, sql) as unknown as DBSpell[];
};

export const getAllUpdates = async (): Promise<DBUpdate[]> => {
  const updates: DBUpdate[] = [];
  const sql = `SELECT * from updates WHERE deleted_at='NULL'`;
  return readAllLnes(updates, sql) as unknown as DBUpdate[];
};

export const getAllUpdateResources = async (): Promise<DBUpdateResource[]> => {
  const update_resources: DBUpdateResource[] = [];
  const sql = `SELECT * from update_resource WHERE deleted_at='NULL'`;
  return readAllLnes(update_resources, sql) as unknown as DBUpdateResource[];
};

export const getAllResources = async (): Promise<DBResource[]> => {
  const resources: DBResource[] = [];
  const sql = `SELECT * from update_resource WHERE deleted_at='NULL'`;
  return readAllLnes(resources, sql) as unknown as DBResource[];
};
