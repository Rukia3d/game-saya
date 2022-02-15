import { Database } from "sqlite3";
import { IPlayer } from "../engine/types";
import {
  combineAdventuresData,
  combineHeroesData,
  combinePlayerspells,
  combineResourceData,
  combineSpellData,
  combineUpdateData,
} from "./combiners";
import {
  DBAction,
  DBAdventure,
  DBCharacter,
  DBElement,
  DBHero,
  DBPAdventure,
  DBPCharacter,
  DBPHero,
  DBPlayer,
  DBPResource,
  DBPSpell,
  DBPSpellUpdate,
  DBPUpdate,
  DBResource,
  DBSchool,
  DBSpell,
  DBStory,
  DBUpdate,
  DBUpdateResource,
} from "./db_types";
import {
  getPlayer,
  getPlayerAdventures,
  getPlayerCharacters,
  getPlayerHeroes,
  getPlayerResources,
  getPlayerSpells,
  getPlayerSpellUpdates,
  getPlayerUpdates,
} from "./dynamic_data";
import {
  getAllActions,
  getAllAdventures,
  getAllCharacters,
  getAllElements,
  getAllHeroes,
  getAllResources,
  getAllSchools,
  getAllSpells,
  getAllStories,
  getAllUpdateResources,
  getAllUpdates,
} from "./static_data";
import {
  transformAdventures,
  transformCharacters,
  transformHeroes,
  transformPlayerResources,
  transformPlayerUpdates,
} from "./transformers";
import {
  IAdventure,
  IHero,
  IPAdventure,
  IPCharacter,
  IPHero,
  IPResource,
  IPUpdate,
  IPUpdatedSpell,
  IResource,
  ISpell,
  IUpdate,
} from "./types";
const sqlite3 = require("sqlite3").verbose();

export const loadAdventures = async (): Promise<IAdventure[]> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const adventures: DBAdventure[] = await getAllAdventures(db);
  const stories: DBStory[] = await getAllStories(db);
  const actions: DBAction[] = await getAllActions(db);
  db.close();

  return combineAdventuresData(adventures, stories, actions);
};

export const loadPlayerAdventures = async (
  player_id: string
): Promise<IPAdventure[]> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const playerAdventures: DBPAdventure[] = await getPlayerAdventures(
    db,
    player_id
  );
  db.close();
  return transformAdventures(playerAdventures);
};

export const loadHeroes = async (): Promise<IHero[]> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const characters: DBCharacter[] = await getAllCharacters(db);
  const heroes: DBHero[] = await getAllHeroes(db);
  const elements: DBElement[] = await getAllElements(db);
  const schools: DBSchool[] = await getAllSchools(db);
  db.close();

  return combineHeroesData(heroes, characters, elements, schools);
};

export const loadPlayerHeroes = async (
  player_id: string
): Promise<IPHero[]> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const playerHeroes = await getPlayerHeroes(db, player_id);
  db.close();

  return transformHeroes(playerHeroes);
};

export const loadCharacters = async (): Promise<DBCharacter[]> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const characters: DBCharacter[] = await getAllCharacters(db);
  db.close();

  return characters;
};

export const loadPlayerCharacters = async (
  player_id: string
): Promise<IPCharacter[]> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const playerCharacters: DBPCharacter[] = await getPlayerCharacters(
    db,
    player_id
  );
  db.close();

  return transformCharacters(playerCharacters);
};

export const loadSpells = async (): Promise<ISpell[]> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const spells: DBSpell[] = await getAllSpells(db);
  const elements: DBElement[] = await getAllElements(db);
  const schools: DBSchool[] = await getAllSchools(db);
  db.close();

  return combineSpellData(spells, elements, schools);
};

export const loadUpdates = async (): Promise<IUpdate[]> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const updates: DBUpdate[] = await getAllUpdates(db);
  const update_resources: DBUpdateResource[] = await getAllUpdateResources(db);
  const resources: DBResource[] = await getAllResources(db);
  const actions: DBAction[] = await getAllActions(db);
  const schools: DBSchool[] = await getAllSchools(db);
  db.close();

  return combineUpdateData(
    updates,
    update_resources,
    resources,
    actions,
    schools
  );
};

export const loadPlayerSpells = async (
  player_id: string
): Promise<IPUpdatedSpell[]> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const player_applied_updates: DBPSpellUpdate[] = await getPlayerSpellUpdates(
    db,
    player_id
  );
  const player_spells: DBPSpell[] = await getPlayerSpells(db, player_id);
  db.close();

  return combinePlayerspells(player_spells, player_applied_updates);
};

export const loadPlayerUpdates = async (
  player_id: string
): Promise<IPUpdate[]> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const player_updates: DBPUpdate[] = await getPlayerUpdates(db, player_id);
  db.close();

  return transformPlayerUpdates(player_updates);
};

export const loadPlayerResources = async (
  player_id: string
): Promise<IPResource[]> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const player_updates: DBPResource[] = await getPlayerResources(db, player_id);
  db.close();

  return transformPlayerResources(player_updates);
};

export const loadResources = async (): Promise<IResource[]> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const updates: DBResource[] = await getAllResources(db);
  const schools: DBSchool[] = await getAllSchools(db);
  db.close();

  return combineResourceData(updates, schools);
};

export const loadPlayer = async (player_id: string): Promise<IPlayer> => {
  const db: Database = new sqlite3.Database(
    "./db/game.db",
    sqlite3.OPEN_READWRITE,
    (err: Error) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the game database.");
    }
  );
  const player: DBPlayer = await getPlayer(db, player_id);
  //TODO Create new player
  if (!player) throw new Error(`No player found`);
  db.close();

  return {
    id: player.id,
    experience: player.experience,
    life: player.life,
    maxlife: player.experience,
    mana: player.mana,
    maxmana: player.maxmana,
    created_at: new Date(player.created_at),
    rank: player.rank,
  };
};
