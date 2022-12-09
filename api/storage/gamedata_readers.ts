import { Database } from "sqlite3";
import { readAllLnes } from "./db";

export interface IInventoryDB {
  id: number;
  name: string;
  elementId: number | null;
}

export interface IElementDB {
  id: number;
  name: string;
}

export interface IWeaponDB {
  id: number;
  name: string;
}

export interface ICharacterDB {
  id: number;
  name: string;
  weaponId: number;
  materialId: number;
}

export interface IInventoryDB {
  id: number;
  name: string;
}

export interface IAdventureDB {
  id: number;
  characterId: number;
}

export interface IStoryDB {
  storyId: number;
  name: string;
  adventureId: number;
}

export interface IChapterDB {
  id: number;
  storyId: number;
  mode: string;
  expMax: number;
  expReplay: number;
  energy: number;
  name: string;
}

export interface IChapterRewardDB {
  chapterId: number;
  inventoryId: number;
  quantity: number;
  initial: string;
}

export const readAllInventory = async (
  db: Database
): Promise<IInventoryDB[]> => {
  const inventory: IInventoryDB[] = [];
  const sql = `SELECT id, name from inventory WHERE deleted='NULL'`;
  return readAllLnes(inventory, sql, db) as unknown as IInventoryDB[];
};

export const readAllWeapons = async (db: Database): Promise<IWeaponDB[]> => {
  const weapons: IWeaponDB[] = [];
  const sql = `SELECT id, name from weapon WHERE deleted='NULL'`;
  return readAllLnes(weapons, sql, db) as unknown as IWeaponDB[];
};

export const readAllCharacters = async (
  db: Database
): Promise<ICharacterDB[]> => {
  const characters: ICharacterDB[] = [];
  const sql = `SELECT id, name, weaponId, materialId from character WHERE deleted='NULL'`;
  return readAllLnes(characters, sql, db) as unknown as ICharacterDB[];
};

export const readAllAdventures = async (
  db: Database
): Promise<IAdventureDB[]> => {
  const adventures: IAdventureDB[] = [];
  const sql = `SELECT id, characterId from adventure WHERE deleted='NULL'`;
  return readAllLnes(adventures, sql, db) as unknown as IAdventureDB[];
};

export const readAllStories = async (db: Database): Promise<IStoryDB[]> => {
  const stories: IStoryDB[] = [];
  const sql = `SELECT storyId, name, adventureId  from story_chapter WHERE deleted='NULL'`;
  return readAllLnes(stories, sql, db) as unknown as IStoryDB[];
};

export const readAllChapters = async (db: Database): Promise<IChapterDB[]> => {
  const chapters: IChapterDB[] = [];
  const sql = `SELECT id, storyId, mode, energy, name from chapter WHERE deleted='NULL'`;
  return readAllLnes(chapters, sql, db) as unknown as IChapterDB[];
};

export const readAllChapterRewards = async (
  db: Database
): Promise<IChapterRewardDB[]> => {
  const rewards: IChapterRewardDB[] = [];
  const sql = `SELECT chapterId, inventoryId, quantity, initial from chapter_inventory WHERE deleted='NULL'`;
  return readAllLnes(rewards, sql, db) as unknown as IChapterRewardDB[];
};
