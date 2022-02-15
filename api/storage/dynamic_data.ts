import { Database } from "sqlite3";
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
  db: Database,
  player_id: string
): Promise<DBPAdventure[]> => {
  const adventures: DBPAdventure[] = [];
  const sql = `
   SELECT DISTINCT *
    FROM
      player_adventure
    WHERE
      player_id='${player_id}' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBPAdventure[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBPAdventure) => {
        adventures.push(row);
      });

      resolve(adventures);
    });
  });
};

export const getPlayerHeroes = async (
  db: Database,
  player_id: string
): Promise<DBPHero[]> => {
  const heroes: DBPHero[] = [];
  const sql = `
     SELECT DISTINCT *
      FROM
        player_hero
      WHERE
        player_id='${player_id}' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBPHero[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBPHero) => {
        heroes.push(row);
      });

      resolve(heroes);
    });
  });
};

export const getPlayerCharacters = async (
  db: Database,
  player_id: string
): Promise<DBPCharacter[]> => {
  const characters: DBPCharacter[] = [];
  const sql = `
       SELECT DISTINCT *
        FROM
          player_character
        WHERE
          player_id='${player_id}' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBPCharacter[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBPCharacter) => {
        characters.push(row);
      });

      resolve(characters);
    });
  });
};

export const getPlayerSpellUpdates = async (
  db: Database,
  player_id: string
): Promise<DBPSpellUpdate[]> => {
  const spell_updates: DBPSpellUpdate[] = [];
  const sql = `
         SELECT DISTINCT *
          FROM
            player_spell_update
          WHERE
            player_id='${player_id}' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBPSpellUpdate[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBPSpellUpdate) => {
        spell_updates.push(row);
      });

      resolve(spell_updates);
    });
  });
};

export const getPlayerSpells = async (
  db: Database,
  player_id: string
): Promise<DBPSpell[]> => {
  const spells: DBPSpell[] = [];
  const sql = `
           SELECT DISTINCT *
            FROM
              player_spell
            WHERE
              player_id='${player_id}' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBPSpell[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBPSpell) => {
        spells.push(row);
      });

      resolve(spells);
    });
  });
};

export const getPlayerUpdates = async (
  db: Database,
  player_id: string
): Promise<DBPUpdate[]> => {
  const updates: DBPUpdate[] = [];
  const sql = `
             SELECT DISTINCT *
              FROM
                player_update
              WHERE
                player_id='${player_id}' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBPUpdate[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBPUpdate) => {
        updates.push(row);
      });

      resolve(updates);
    });
  });
};

export const getPlayerResources = async (
  db: Database,
  player_id: string
): Promise<DBPResource[]> => {
  const resources: DBPResource[] = [];
  const sql = `
               SELECT DISTINCT *
                FROM
                  player_resource
                WHERE
                  player_id='${player_id}' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBPResource[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBPResource) => {
        resources.push(row);
      });

      resolve(resources);
    });
  });
};

export const getPlayer = async (
  db: Database,
  player_id: string
): Promise<DBPlayer> => {
  const sql = `
    SELECT DISTINCT *
    FROM
      player
    WHERE
      id='${player_id}';`;

  // request player data from db and save into player
  return new Promise((resolve, reject) => {
    db.get(sql, [], (err: Error, row: DBPlayer) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
};
