import { Database } from "sqlite3";

const sqlite3 = require("sqlite3").verbose();

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
