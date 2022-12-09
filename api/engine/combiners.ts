import { Database } from "sqlite3";
import {
  ICharacterDB,
  IInventoryDB,
  IWeaponDB,
  IChapterDB,
  IChapterRewardDB,
  IStoryDB,
  readAllAdventures,
  readAllStories,
  readAllChapters,
  readAllCharacters,
  readAllWeapons,
  readAllInventory,
  readAllChapterRewards,
  IAdventureDB,
} from "../storage/gamedata_readers";
import {
  IEventCreatePlayerDB,
  IEventDB,
  readCreatePlayerEvents,
  readGameEvents,
} from "../storage/playerdata_readers";
import { testLevel } from "../db/testDBLevelMaps";
import {
  ICharacter,
  IInventoryQuant,
  IChapter,
  IStory,
  IAdventure,
  IWeapon,
  ICreatePlayerEvent,
} from "./types";

const findCharForAdventure = (
  dbCharacters: ICharacterDB[],
  dbInventory: IInventoryDB[],
  dbWeapons: IWeaponDB[],
  id: number
): ICharacter => {
  const charDb = dbCharacters.find((c: ICharacterDB) => c.id === id);
  if (!charDb) throw new Error(`Can't find a character with id ${id}`);
  const materialDb = dbInventory.find(
    (m: IInventoryDB) => m.id === charDb.materialId
  );
  if (!materialDb)
    throw new Error(`Can't find a material with id ${charDb.materialId}`);
  const weaponDb = dbWeapons.find((w: IWeaponDB) => w.id === charDb.weaponId);
  if (!weaponDb)
    throw new Error(`Can't find a weapons with id ${charDb.weaponId}`);
  return {
    id: charDb.id,
    name: charDb.name,
    weapon: weaponDb.name,
    material: { id: materialDb.id, name: materialDb.name },
  };
};

const findReward = (
  dbInventory: IInventoryDB[],
  id: number,
  quant: number
): IInventoryQuant => {
  const material = dbInventory.find((m: IInventoryDB) => m.id === id);
  if (!material) throw new Error(`Can't find material ${id}`);
  return {
    id: material.id,
    name: material.name,
    quantity: quant,
  };
};

type IRewardInitial = IInventoryQuant & { initial: boolean };

const findChapter = (
  dbChapters: IChapterDB[],
  dbRewards: IChapterRewardDB[],
  dbInventory: IInventoryDB[],
  id: number
): IChapter => {
  const chapDb = dbChapters.find((c: IChapterDB) => c.id === id);
  if (!chapDb) throw new Error(`Can't find a chapter with id ${id}`);
  const rewardDb = dbRewards.filter(
    (r: IChapterRewardDB) => r.chapterId === chapDb.id
  );
  if (!rewardDb) throw new Error(`Can't find rewards for chapter ${chapDb.id}`);
  const rewards: IRewardInitial[] = rewardDb.map((a: IChapterRewardDB) => {
    return {
      ...findReward(dbInventory, a.inventoryId, a.quantity),
      initial: a.initial === "true" ? true : false,
    };
  });
  return {
    id: chapDb.id,
    mode: chapDb.mode,
    name: chapDb.name,
    state: "closed",
    level: testLevel,
    firstTimeRewards: rewards.filter((r: IRewardInitial) => r.initial),
    staticRewards: rewards.filter((r: IRewardInitial) => !r.initial),
    energy: chapDb.energy,
  };
};

const findChaptersForStory = (
  dbChapters: IChapterDB[],
  dbRewards: IChapterRewardDB[],
  dbInventory: IInventoryDB[],
  id: number
): IChapter[] => {
  const chaptersDb = dbChapters.filter((c: IChapterDB) => c.storyId === id);
  return chaptersDb.map((c: IChapterDB) =>
    findChapter(dbChapters, dbRewards, dbInventory, c.id)
  );
};

const findStoriesForAdventure = (
  dbStories: IStoryDB[],
  dbChapters: IChapterDB[],
  dbRewards: IChapterRewardDB[],
  dbInventory: IInventoryDB[],
  id: number
): IStory[] => {
  const storiesDB = dbStories.filter((s: IStoryDB) => s.adventureId === id);
  if (!storiesDB)
    throw new Error(`Can't find stories for adventure with id ${id}`);
  const stories: IStory[] = storiesDB.map((s: IStoryDB) => {
    const chapters: IChapter[] = findChaptersForStory(
      dbChapters,
      dbRewards,
      dbInventory,
      id
    );
    return { name: s.name, id: s.storyId, chapters: chapters };
  });
  return stories;
};

export const readAdventuresData = async (
  db: Database
): Promise<IAdventure[]> => {
  const adventures = await readAllAdventures(db);
  const stories = await readAllStories(db);
  const chapters = await readAllChapters(db);
  const characters = await readAllCharacters(db);
  const weapons = await readAllWeapons(db);
  const inventory = await readAllInventory(db);
  const rewards = await readAllChapterRewards(db);

  const fullAdventures: IAdventure[] = adventures.map((a: IAdventureDB) => {
    return {
      character: findCharForAdventure(
        characters,
        inventory,
        weapons,
        a.characterId
      ),
      id: a.id,
      stories: findStoriesForAdventure(
        stories,
        chapters,
        rewards,
        inventory,
        a.id
      ),
      endless: [],
      quests: [],
    };
  });
  return fullAdventures;
};

export const readWeaponsData = async (db: Database): Promise<IWeapon[]> => {
  const weapons = await readAllWeapons(db);
  const inventory = await readAllInventory(db);
  const weaponsElement: IWeapon[] = weapons.map((w: IWeaponDB) => {
    return {
      id: w.id,
      name: w.name,
      materials: inventory.slice(4).map((i: IInventoryDB) => {
        return { ...i, charge: 100, maxCharge: 100, state: "closed" };
      }),
    };
  });
  return weaponsElement;
};

export const readMaterialsData = async (
  db: Database
): Promise<IInventoryQuant[]> => {
  const inventory = await readAllInventory(db);
  const inventoryItems = inventory.map((i: IInventoryDB) => {
    return { ...i, quantity: 0 };
  });
  return inventoryItems;
};

export const readCreatePlayerEventsData = async (
  db: Database
): Promise<ICreatePlayerEvent[]> => {
  const allEvents = await readGameEvents(db);
  const createPlayerEvents: IEventCreatePlayerDB[] =
    await readCreatePlayerEvents(db);
  const events: ICreatePlayerEvent[] = [];
  for (let c of createPlayerEvents) {
    const event = allEvents.find(
      (e: IEventDB) => e.eventId === c.eventId && e.type === "CREATEPLAYER"
    );
    if (!event) throw new Error(`Can't find event ${c.eventId}`);
    events.push({
      playerId: c.playerId,
      eventId: c.eventId,
      created: event.created,
      type: "CREATEPLAYER",
      playerName: c.playerName,
    });
  }
  return events;
};
