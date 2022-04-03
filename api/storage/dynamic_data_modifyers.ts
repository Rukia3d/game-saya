import { Database } from "sqlite3";
import { readAllLnes, readOneLne } from "./db_helpers";
import { DBAdventure, DBPAdventure } from "./db_types";
const sqlite3 = require("sqlite3").verbose();

const createDb = async (): Promise<Database> => {
  const db: Database = new sqlite3.Database(
    "./db/player.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      //console.log("Connected to the game database.");
    }
  );
  return db;
};

export const openStory = async (player_id: string, adventure_id: number) => {
  console.log("openStory", player_id, adventure_id);
  const db = await createDb();
  const advsql = `SELECT DISTINCT * FROM player_adventure WHERE player_id='${player_id}' AND adventure_id='${adventure_id}';`;
  const adventure = (await readOneLne(advsql)) as unknown as DBPAdventure;
  console.log("adventure", adventure);
  const currentDate = Date.now();
  // Adventure will be open if action opeStory with it's parent_id is called
  let sql = `UPDATE player_adventure
            SET last_story_id = ${
              adventure.last_story_id + 1
            }, state = 1, updated_at = ${currentDate}
            WHERE player_id='${player_id}' AND adventure_id='${adventure_id}';`;
  return new Promise((resolve, reject) => {
    db.run(sql, [], (err: Error) => {
      db.close();
      if (err) {
        reject(err);
      }
      resolve(200);
    });
  });
};
