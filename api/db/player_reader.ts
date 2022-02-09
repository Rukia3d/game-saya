import { Database } from "sqlite3";
import {
  PlayerAdventureDB,
  PlayerDB,
  PlayerHeroDB,
  PlayerNpcDialogues,
  PlayerResourceDB,
  PlayerSpellAppliedUpdateDB,
  PlayerSpellDB,
  PlayerSpellUpdateDB,
  PlayerStoryDB,
} from "./types";

export const readPlayer = (id: string, db: Database): Promise<PlayerDB> => {
  const sql = `
      SELECT DISTINCT id, experience, maxlife, maxmana, life, mana, created_at, rank
      FROM
        player
      WHERE
        id='${id}';`;

  // request player data from db and save into player
  return new Promise((resolve, reject) => {
    db.get(sql, [], (err: Error, row: PlayerDB) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
};

export const readPlayerAdventures = (
  id: string,
  db: Database
): Promise<PlayerAdventureDB[]> => {
  const adventures: PlayerAdventureDB[] = [];
  const sql = `
   SELECT DISTINCT player_id, adventure_id, state, created_at
    FROM
      player_adventure
    WHERE
      player_id='${id}' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: PlayerAdventureDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: PlayerAdventureDB) => {
        adventures.push(row);
      });

      resolve(adventures);
    });
  });
};

export const readPlayerStories = (
  id: string,
  db: Database
): Promise<PlayerStoryDB[]> => {
  const stories: PlayerStoryDB[] = [];
  const sql = `
     SELECT DISTINCT story_id, created_at
      FROM
        player_story
      WHERE
        player_id='${id}' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: PlayerStoryDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: PlayerStoryDB) => {
        stories.push(row);
      });

      resolve(stories);
    });
  });
};

export const readPlayerResources = (
  id: string,
  db: Database
): Promise<PlayerResourceDB[]> => {
  const resources: PlayerResourceDB[] = [];
  const sql = `
  SELECT resource_id, quantity, created_at 
  FROM player_resource WHERE player_id='${id}';`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: PlayerResourceDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: PlayerResourceDB) => {
        resources.push(row);
      });

      resolve(resources);
    });
  });
};

export const readPlayerHeroes = (
  id: string,
  db: Database
): Promise<PlayerHeroDB[]> => {
  const heroes: PlayerHeroDB[] = [];
  const sql = `
  SELECT hero_id, selected, created_at 
    FROM player_hero 
    WHERE player_id='${id}' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: PlayerHeroDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: PlayerHeroDB) => {
        heroes.push(row);
      });

      resolve(heroes);
    });
  });
};

export const readPlayerSpells = (
  id: string,
  db: Database
): Promise<PlayerSpellDB[]> => {
  const spells: PlayerSpellDB[] = [];
  const sql = `
  SELECT spell_id, copy_id, selected, created_at 
  FROM player_spell 
  WHERE player_id='${id}' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: PlayerSpellDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: PlayerSpellDB) => {
        spells.push(row);
      });

      resolve(spells);
    });
  });
};

export const readPlayerUpdates = (
  id: string,
  db: Database
): Promise<PlayerSpellUpdateDB[]> => {
  const updates: PlayerSpellUpdateDB[] = [];
  const sql = `
  SELECT spellupdate_id, created_at, name, description, effect, mana, school_id, action_id
  FROM player_spellupdate
  JOIN spellupdate on player_spellupdate.spellupdate_id=spellupdate.id 
  WHERE player_id='dyreJuRnYqhudFkW2kdcLr' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: PlayerSpellUpdateDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: PlayerSpellUpdateDB) => {
        updates.push(row);
      });

      resolve(updates);
    });
  });
};

export const readPlayerAppliedUpdates = (
  id: string,
  db: Database
): Promise<PlayerSpellAppliedUpdateDB[]> => {
  const updates: PlayerSpellAppliedUpdateDB[] = [];
  const sql = `
  SELECT spell_id, spellupdate_id, copy_id, created_at 
  FROM player_spell_spellupdate 
  WHERE player_id='${id}' AND deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: PlayerSpellAppliedUpdateDB[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: PlayerSpellAppliedUpdateDB) => {
        updates.push(row);
      });

      resolve(updates);
    });
  });
};

export const readPlayerCharacters = (
  id: string,
  db: Database
): Promise<PlayerNpcDialogues[]> => {
  const npc: PlayerNpcDialogues[] = [];
  const sql = `
      SELECT npc_id, dialogue_id, image, created_at 
      FROM player_npc_dialogue 
      WHERE player_id='${id}' and deleted_at='NULL';`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error, rows: PlayerNpcDialogues[]) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row: PlayerNpcDialogues) => {
        npc.push(row);
      });

      resolve(npc);
    });
  });
};
