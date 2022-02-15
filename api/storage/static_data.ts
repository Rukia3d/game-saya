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
} from "./db_types";

export const getAllAdventures = async (
  db: Database
): Promise<DBAdventure[]> => {
  const adventures: DBAdventure[] = [];
  const sql = `
      SELECT * from adventure
      WHERE deleted_at='NULL'`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBAdventure[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBAdventure) => {
        adventures.push(row);
      });

      resolve(adventures);
    });
  });
};

export const getAllStories = async (db: Database): Promise<DBStory[]> => {
  const stories: DBStory[] = [];
  const sql = `
        SELECT * from story
        WHERE deleted_at='NULL'`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBStory[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBStory) => {
        stories.push(row);
      });

      resolve(stories);
    });
  });
};

export const getAllActions = async (db: Database): Promise<DBAction[]> => {
  const actions: DBAction[] = [];
  const sql = `
          SELECT * from story
          WHERE deleted_at='NULL'`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBAction[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBAction) => {
        actions.push(row);
      });

      resolve(actions);
    });
  });
};

export const getAllCharacters = async (
  db: Database
): Promise<DBCharacter[]> => {
  const characters: DBCharacter[] = [];
  const sql = `
            SELECT * from characters
            WHERE deleted_at='NULL'`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBCharacter[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBCharacter) => {
        characters.push(row);
      });

      resolve(characters);
    });
  });
};

export const getAllHeroes = async (db: Database): Promise<DBHero[]> => {
  const heroes: DBHero[] = [];
  const sql = `
              SELECT * from heroes
              WHERE deleted_at='NULL'`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBHero[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBHero) => {
        heroes.push(row);
      });

      resolve(heroes);
    });
  });
};

export const getAllElements = async (db: Database): Promise<DBElement[]> => {
  const elements: DBElement[] = [];
  const sql = `
                SELECT * from elements
                WHERE deleted_at='NULL'`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBElement[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBElement) => {
        elements.push(row);
      });

      resolve(elements);
    });
  });
};

export const getAllSchools = async (db: Database): Promise<DBSchool[]> => {
  const schools: DBSchool[] = [];
  const sql = `
                  SELECT * from schools
                  WHERE deleted_at='NULL'`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBSchool[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBSchool) => {
        schools.push(row);
      });

      resolve(schools);
    });
  });
};

export const getAllSpells = async (db: Database): Promise<DBSpell[]> => {
  const spells: DBSpell[] = [];
  const sql = `
                    SELECT * from spells
                    WHERE deleted_at='NULL'`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBSpell[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBSpell) => {
        spells.push(row);
      });

      resolve(spells);
    });
  });
};

export const getAllUpdates = async (db: Database): Promise<DBUpdate[]> => {
  const updates: DBUpdate[] = [];
  const sql = `
                      SELECT * from updates
                      WHERE deleted_at='NULL'`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBUpdate[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBUpdate) => {
        updates.push(row);
      });

      resolve(updates);
    });
  });
};

export const getAllUpdateResources = async (
  db: Database
): Promise<DBUpdateResource[]> => {
  const update_resources: DBUpdateResource[] = [];
  const sql = `
                        SELECT * from update_resource
                        WHERE deleted_at='NULL'`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBUpdateResource[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBUpdateResource) => {
        update_resources.push(row);
      });

      resolve(update_resources);
    });
  });
};

export const getAllResources = async (db: Database): Promise<DBResource[]> => {
  const resources: DBResource[] = [];
  const sql = `
                          SELECT * from update_resource
                          WHERE deleted_at='NULL'`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: DBResource[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: DBResource) => {
        resources.push(row);
      });

      resolve(resources);
    });
  });
};
