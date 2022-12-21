import { Database } from "sqlite";
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
  inventoryId: number;
}

export interface IInventoryDB {
  id: number;
  name: string;
}

export interface IAdventureDB {
  id: number;
  characterId: number;
}

export interface IChapterDB {
  id: number;
  storyId: number;
  adventureId: number;
  mode: string;
  expMax: number;
  expReplay: number;
  energy: number;
  chapterName: string;
  storyName: string;
}

export interface IChapterRewardDB {
  chapterId: number;
  storyId: number;
  adventureId: number;
  inventoryId: number;
  quantity: number;
  initial: string;
}

export const readAllInventory = async (
  db: Database
): Promise<IInventoryDB[]> => {
  const inventory: IInventoryDB[] = [];
  const sql = `SELECT id, name from inventory WHERE deleted is NULL`;
  return readAllLnes(inventory, sql, db) as unknown as IInventoryDB[];
};

export const readAllWeapons = async (db: Database): Promise<IWeaponDB[]> => {
  const weapons: IWeaponDB[] = [];
  const sql = `SELECT id, name from weapon WHERE deleted is NULL`;
  return readAllLnes(weapons, sql, db) as unknown as IWeaponDB[];
};

export const readAllCharacters = async (
  db: Database
): Promise<ICharacterDB[]> => {
  const characters: ICharacterDB[] = [];
  const sql = `SELECT id, name, weaponId, inventoryId from character WHERE deleted is NULL`;
  return readAllLnes(characters, sql, db) as unknown as ICharacterDB[];
};

export const readAllAdventures = async (
  db: Database
): Promise<IAdventureDB[]> => {
  const adventures: IAdventureDB[] = [];
  const sql = `SELECT id, characterId from adventure WHERE deleted is NULL`;
  return readAllLnes(adventures, sql, db) as unknown as IAdventureDB[];
};

export const readAllChapters = async (db: Database): Promise<IChapterDB[]> => {
  const chapters: IChapterDB[] = [];
  const sql = `SELECT * from chapter WHERE deleted is NULL`;
  return readAllLnes(chapters, sql, db) as unknown as IChapterDB[];
};

export const readAllChapterRewards = async (
  db: Database
): Promise<IChapterRewardDB[]> => {
  const rewards: IChapterRewardDB[] = [];
  const sql = `SELECT * from chapter_inventory WHERE deleted is NULL`;
  return readAllLnes(rewards, sql, db) as unknown as IChapterRewardDB[];
};
