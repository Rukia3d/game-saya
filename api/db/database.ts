import type { Database } from "sqlite3";
import { GameStateData, Player } from "../../src/utils/types";
import {
  trandformAdventuresData,
  transformCharactersData,
  transformDialogueData,
  transformFightsData,
  transformHeroesData,
  transformResourcesData,
  transformSpellsData,
  transformUpdatesData,
} from "./data_transformers";
import {
  readActionUpdateData,
  readAdventuresData,
  readCharactersData,
  readDialoguesData,
  readElementsData,
  readFightsData,
  readHeroesData,
  readResourcesData,
  readSpellsData,
  readStoriesActionData,
  readStoriesData,
  readUpdateResource,
  readUpdatesData,
} from "./data_readers";
import {
  readPlayer,
  readPlayerAdventures,
  readPlayerStories,
  readPlayerResources,
  readPlayerHeroes,
  readPlayerSpells,
  readPlayerAppliedUpdates,
  readPlayerUpdates,
  readPlayerCharacters,
} from "./player_reader";
import {
  transformPlayer,
  transformPlayerAdventures,
  transformPlayerHeroes,
  transformPlayerNPCs,
  transformPlayerResources,
  transformPlayerSpells,
  transformPlayerUpdates,
} from "./player_transformers";

const sqlite3 = require("sqlite3").verbose();

export const createPlayer = (gameData: GameStateData): Player => {
  const exampleplayer: Player = {
    data: {
      id: "",
      experience: 0,
      maxlife: 0,
      maxmana: 0,
      life: 0,
      mana: 0,
      created_at: new Date(),
      rank: 1,
    },
    npcs: [],
    heroes: [],
    spells: [],
    spellUpdates: [],
    adventures: [],
    resources: [],
  };
  return exampleplayer;
};

export const loadPlayer = async (
  id: string,
  gameData: GameStateData
): Promise<Player> => {
  console.log("Requestimg player id", id);
  // open the database
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

  const player = await readPlayer(id, db);
  const playerAdventures = await readPlayerAdventures(id, db);
  const playerStories = await readPlayerStories(id, db);
  const playerResources = await readPlayerResources(id, db);
  const playerHeroes = await readPlayerHeroes(id, db);
  const playerSpells = await readPlayerSpells(id, db);
  const playerAppliedUpdates = await readPlayerAppliedUpdates(id, db);
  const playerUpdates = await readPlayerUpdates(id, db);
  const playerNPCs = await readPlayerCharacters(id, db);

  db.close();

  const exampleplayer: Player = {
    data: transformPlayer(player),
    npcs: transformPlayerNPCs(playerNPCs, gameData.characters),
    heroes: transformPlayerHeroes(playerHeroes, gameData.heroes),
    spells: transformPlayerSpells(
      playerSpells,
      playerAppliedUpdates,
      gameData.spells,
      gameData.updates
    ),
    spellUpdates: transformPlayerUpdates(playerUpdates, gameData.updates),
    adventures: transformPlayerAdventures(
      playerAdventures,
      playerStories,
      gameData.adventures
    ),
    resources: transformPlayerResources(playerResources, gameData.resources),
  };

  return exampleplayer;
};

export const getGameData = async (): Promise<GameStateData> => {
  // open the database
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

  const adventures = await readAdventuresData(db);
  const stories = await readStoriesData(db);
  const actions = await readStoriesActionData(db);
  const dialogues = await readDialoguesData(db);
  const elements = await readElementsData(db);
  const fights = await readFightsData(db);
  const heroes = await readHeroesData(db);
  const resources = await readResourcesData(db);
  const spells = await readSpellsData(db);
  const characters = await readCharactersData(db);
  const updates = await readUpdatesData(db);
  const updateResources = await readUpdateResource(db);
  const updateActions = await readActionUpdateData(db);

  // close the database
  db.close();

  const gameData: GameStateData = {
    dialogues: transformDialogueData(dialogues),
    fights: transformFightsData(fights, elements, characters),
    reels: [],
    resources: transformResourcesData(resources, elements),
    spells: transformSpellsData(spells, elements),
    adventures: trandformAdventuresData(adventures, stories, actions),
    heroes: transformHeroesData(heroes, elements),
    characters: transformCharactersData(characters),
    updates: transformUpdatesData(
      updates,
      elements,
      updateResources,
      resources,
      updateActions
    ),
  };

  return gameData;
};
