import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

import { ICreatePlayerDB, IStartLevelDB, IWinLevelDB } from "../engine/types";
import {
  IAdventureDB,
  IChapterRewardDB,
  ICharacterDB,
  IInventoryDB,
  IWeaponDB,
  IChapterDB,
} from "./gamedata_readers";
import migrateDB from "./migrate";
import {
  IEventCreatePlayerDB,
  IEventDB,
  IEventServerArenaEndDB,
  IEventServerArenaStartDB,
  IEventStartLevelDB,
  IEventWinLevelDB,
} from "./playerdata_readers";

sqlite3.verbose();
type dbDataType =
  | IEventDB
  | ICreatePlayerDB
  | IStartLevelDB
  | IWinLevelDB
  | IInventoryDB
  | IAdventureDB
  | IWeaponDB
  | ICharacterDB
  | IChapterDB
  | IChapterRewardDB
  | IEventCreatePlayerDB
  | IEventStartLevelDB
  | IEventWinLevelDB
  | IEventServerArenaStartDB
  | IEventServerArenaEndDB;

const createDb = async (dbname: string): Promise<Database> => {
  console.log("Create DB", dbname);
  const db: Database = await open({
    filename: dbname,
    driver: sqlite3.Database,
  });
  await migrateDB(db);
  return db;
};

export default createDb;

export const readAllLnes = (
  res: dbDataType[],
  sql: string,
  db: Database
): Promise<dbDataType[]> => {
  return db.all(sql, []).then((rows: dbDataType[]) => {
    rows.forEach((row: dbDataType) => {
      res.push(row);
    });
    return res;
  });
};

export const readOneLne = (
  sql: string,
  db: Database
): Promise<dbDataType[]> => {
  return db.all(sql, []).then((row: dbDataType[]) => {
    return row;
  });
};

export const writeAllLines = (table: string, data: any[], db: Database) => {
  const flat: any[] = [];
  data.forEach((arr) => {
    arr.forEach((item: any) => {
      flat.push(item);
    });
  });
  const singleLine = data[0].map((p: any) => "?").join(",");
  const placeholders = data.map((l) => `(${singleLine})`).join(",");
  const sql = `INSERT INTO ${table} VALUES ${placeholders}`;
  return db.run(sql, flat).then(() => 200);
};

export const writeOneLine = (
  table: string,
  data: any[],
  db: Database
): Promise<number> => {
  const placeholders = data.map((p) => "?").join(",");
  const sql = `INSERT INTO ${table} VALUES (${placeholders});`;
  return db.run(sql, data).then((result) => result.lastID as number);
};
