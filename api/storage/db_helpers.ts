import { Database } from "sqlite3";
import { DBPEvent } from "./db_types";

const sqlite3 = require("sqlite3").verbose();

type dbDataType = DBPEvent;

const createDb = async (): Promise<Database> => {
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

export const readAllLnes = async (
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

export const readOneLne = async (sql: string): Promise<dbDataType[]> => {
  const db = await createDb();
  return new Promise((resolve, reject) => {
    db.get(sql, [], (err: Error, row: dbDataType[]) => {
      db.close();
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
};

export const writeAllLines = async (table: string, data: any[]) => {
  const db = await createDb();
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
      db.close();
      if (err) {
        reject(err);
      }
      resolve(200);
    });
  });
};

export const writeOneLine = async (table: string, data: any[]) => {
  const db = await createDb();
  const placeholders = data.map((p) => "?").join(",");
  const sql = `INSERT INTO ${table} VALUES (${placeholders});`;
  return new Promise((resolve, reject) => {
    db.run(sql, data, function (err: Error) {
      if (err) {
        reject(err);
      }
      resolve(this.lastID);
    });
  });
  // return new Promise((resolve, reject) => {
  //   db.get("SELECT last_insert_rowid()", [], (err: Error, row: any) => {
  //     db.close();
  //     if (err) {
  //       reject(err);
  //     }
  //     resolve(row);
  //   });
  // });
};
