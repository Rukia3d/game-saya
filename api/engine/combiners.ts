import { Database } from "sqlite";
import {
  AWARDABLEARENAINDEXEND,
  AWARDABLEARENAINDEXSTART,
  INDEXOFJADE,
} from "../config";
import {
  ICharacterDB,
  IInventoryDB,
  IWeaponDB,
  IChapterDB,
  IChapterRewardDB,
  readAllAdventures,
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
import { testLevel } from "../storage/testDBLevelMaps";
import {
  ICharacter,
  IInventoryQuant,
  IStory,
  IAdventure,
  IWeapon,
  ICreatePlayerEvent,
  ILevel,
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
    (m: IInventoryDB) => m.id === charDb.inventoryId
  );
  if (!materialDb)
    throw new Error(`Can't find a material with id ${charDb.inventoryId}`);
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

type IStoryTemType = { origId: number; chapters: IChapterDB[] };
const findStoriesForAdventure = (
  dbChapters: IChapterDB[],
  dbRewards: IChapterRewardDB[],
  dbInventory: IInventoryDB[],
  adventureId: number
): IStory[] => {
  const chaptersDb = dbChapters.filter(
    (s: IChapterDB) => s.adventureId === adventureId
  );
  if (!chaptersDb)
    throw new Error(`Can't find stories for adventure with id ${adventureId}`);
  const storiesTemp: IStoryTemType[] = [];
  for (let i = 0; i < chaptersDb.length; i++) {
    const storyTemp = storiesTemp.findIndex(
      (t: IStoryTemType) => t.origId === chaptersDb[i].storyId
    );
    if (storyTemp === -1) {
      storiesTemp.push({
        origId: chaptersDb[i].storyId,
        chapters: [{ ...chaptersDb[i] }],
      });
    } else {
      storiesTemp[storyTemp].chapters.push(chaptersDb[i]);
    }
  }

  const stories: IStory[] = storiesTemp.map((s: IStoryTemType, n: number) => {
    return {
      name: s.chapters[0].storyName,
      id: n,
      chapters: s.chapters.map((c: IChapterDB, j: number) => {
        const rewardDb = dbRewards.filter(
          (r: IChapterRewardDB) =>
            r.chapterId === c.id &&
            r.adventureId === c.adventureId &&
            r.storyId === c.storyId
        );
        if (!rewardDb)
          throw new Error(`Can't find rewards for chapter ${c.id}`);
        const rewards: IRewardInitial[] = rewardDb.map(
          (a: IChapterRewardDB) => {
            return {
              ...findReward(dbInventory, a.inventoryId, a.quantity),
              initial: a.initial === "true" ? true : false,
            };
          }
        );
        return {
          id: j,
          mode: c.mode,
          name: c.chapterName,
          state: "closed",
          level: testLevel,
          firstTimeRewards: rewards.filter((r: IRewardInitial) => r.initial),
          staticRewards: rewards.filter((r: IRewardInitial) => !r.initial),
          energy: c.energy,
          storyId: j,
          adventureId: c.adventureId,
        };
      }),
    };
  });

  return stories;
};

export const readAdventuresData = async (
  db: Database
): Promise<IAdventure[]> => {
  const adventures = await readAllAdventures(db);
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
      stories: findStoriesForAdventure(chapters, rewards, inventory, a.id),
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
      materials: inventory
        .slice(AWARDABLEARENAINDEXSTART, AWARDABLEARENAINDEXEND + 1)
        .map((i: IInventoryDB) => {
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
