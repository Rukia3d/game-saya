import { DBPEvent } from "./db_types";
import { Database } from "sqlite3";

type dbDataType = DBPEvent;
export const readAllLnes = (
  res: dbDataType[],
  sql: string,
  db: Database
): Promise<dbDataType[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: dbDataType[]) => {
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

export const writeOneLine = (table: string, data: any[], db: Database) => {
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
};
