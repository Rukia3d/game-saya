import { Database } from "sqlite3";
import { ICreatePlayerDB, IStartLevelDB, IWinLevelDB } from "../engine/types";
import {
  IAdventureDB,
  IChapterRewardDB,
  ICharacterDB,
  IInventoryDB,
  IStoryDB,
  IWeaponDB,
} from "./gamedata_readers";
import {
  IEventCreatePlayerDB,
  IEventDB,
  IEventServerArenaEndDB,
  IEventServerArenaStartDB,
  IEventStartLevelDB,
  IEventWinLevelDB,
} from "./playerdata_readers";

const sqlite3 = require("sqlite3").verbose();
type dbDataType =
  | IEventDB
  | ICreatePlayerDB
  | IStartLevelDB
  | IWinLevelDB
  | IInventoryDB
  | IAdventureDB
  | IWeaponDB
  | IStoryDB
  | ICharacterDB
  | IChapterRewardDB
  | IEventCreatePlayerDB
  | IEventStartLevelDB
  | IEventWinLevelDB
  | IEventServerArenaStartDB
  | IEventServerArenaEndDB;

const createDb = async (): Promise<Database> => {
  console.log("Create DB");
  const db: Database = new sqlite3.Database(
    "./db/player.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
  return db;
};

export default createDb;

export const readAllLnes = (
  res: dbDataType[],
  sql: string,
  db: Database
): Promise<dbDataType[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: dbDataType[]) => {
      if (err) {
        reject(err);
        return;
      }
      rows.forEach((row: dbDataType) => {
        res.push(row);
      });
      resolve(res);
    });
  });
};

export const readOneLne = (
  sql: string,
  db: Database
): Promise<dbDataType[]> => {
  return new Promise((resolve, reject) => {
    db.get(sql, [], (err: Error, row: dbDataType[]) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
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
  return new Promise((resolve, reject) => {
    db.run(sql, flat, (err: Error) => {
      if (err) {
        reject(err);
      }
      resolve(200);
    });
  });
};

export const writeOneLine = (
  table: string,
  data: any[],
  db: Database
): Promise<number> => {
  const placeholders = data.map((p) => "?").join(",");
  const sql = `INSERT INTO ${table} VALUES (${placeholders});`;
  return new Promise((resolve, reject) => {
    db.run(sql, data, function (err: Error) {
      if (err) {
        reject(err);
      }
      //@ts-ignore
      resolve(this.lastID);
    });
  });
};
