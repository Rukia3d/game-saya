import { IPlayer, IUserEvent } from "../engine/types";
import {
  combineAdventuresData,
  combinedFightsData,
  combineDialoguesData,
  combineElementData,
  combineEvents,
  combineHeroesData,
  combineResourceData,
  combineSpellData,
  combineStoriesData,
  combineUpdateData,
} from "./combiners";
import {
  DBAdventure,
  DBCharacter,
  DBDialogue,
  DBElement,
  DBFight,
  DBFightElement,
  DBHero,
  DBLine,
  DBPAttackSpellEvent,
  DBPCreateEvent,
  DBPEvent,
  DBPFinishStoryEvent,
  DBPStartFightEvent,
  DBResource,
  DBSchool,
  DBSpell,
  DBStory,
  DBUpdate,
  DBUpdateResource,
} from "./db_types";
import {
  getPlayerAttackSpellEvents,
  getPlayerCreateEvent,
  getPlayerFinishStoryEvents,
  getPlayerStartFightEvents,
} from "./dynamic_data_readers";
import {
  getAllAdventures,
  getAllCharacters,
  getAllDialogues,
  getAllElements,
  getAllFightElements,
  getAllFights,
  getAllHeroes,
  getAllLines,
  getAllResources,
  getAllSchools,
  getAllSpells,
  getAllStories,
  getAllUpdateResources,
  getAllUpdates,
} from "./static_data_csv";
import {
  IAdventure,
  ICharacter,
  IDialogue,
  IElement,
  IFight,
  IHero,
  IResource,
  ISpell,
  IUpdate,
} from "./types";

export const loadDialogues = async (): Promise<IDialogue[]> => {
  const dialogues: DBDialogue[] = await getAllDialogues();
  const lines: DBLine[] = await getAllLines();
  const characters: DBCharacter[] = await getAllCharacters();
  return combineDialoguesData(dialogues, lines, characters);
};

export const loadElements = async (): Promise<IElement[]> => {
  const elements: DBElement[] = await getAllElements();
  const schools: DBSchool[] = await getAllSchools();
  return combineElementData(elements, schools);
};

export const loadFights = async (): Promise<IFight[]> => {
  const fights: DBFight[] = await getAllFights();
  const fightElements: DBFightElement[] = await getAllFightElements();
  const combinedElements = await loadElements();
  const heroes = await loadHeroes();
  return combinedFightsData(fights, fightElements, combinedElements, heroes);
};

export const loadAdventures = async (): Promise<IAdventure[]> => {
  const adventures: DBAdventure[] = await getAllAdventures();
  const stories: DBStory[] = await getAllStories();

  const combinedDialogues = await loadDialogues();
  const combinedFigths = await loadFights();
  const combinedStories = combineStoriesData(
    stories,
    combinedDialogues,
    combinedFigths
  );
  return combineAdventuresData(adventures, combinedStories);
  return [];
};

export const loadPlayerEvents = async (
  player_id: string
): Promise<IUserEvent[]> => {
  const creationEvent: DBPCreateEvent = await getPlayerCreateEvent(player_id);
  const finishStoryEvents: DBPFinishStoryEvent[] =
    await getPlayerFinishStoryEvents(player_id);
  const startFightEvents: DBPStartFightEvent[] =
    await getPlayerStartFightEvents(player_id);
  const attackSpellEvents: DBPAttackSpellEvent[] =
    await getPlayerAttackSpellEvents(player_id);
  const eventsData: DBPEvent[] = combineEvents(
    creationEvent,
    finishStoryEvents,
    startFightEvents,
    attackSpellEvents
  );
  //console.log("loadPlayerEvents eventsData", eventsData);
  if (eventsData.length == 0) {
    return [];
  }
  return eventsData.map((e: DBPEvent) => ({
    ...e,
    created_at: new Date(parseInt(e.created_at) * 1000),
    updated_at: new Date(parseInt(e.updated_at) * 1000),
    deleted_at: new Date(parseInt(e.deleted_at) * 1000),
  }));
};

export const loadHeroes = async (): Promise<IHero[]> => {
  const characters: DBCharacter[] = await getAllCharacters();
  const heroes: DBHero[] = await getAllHeroes();
  const elements = await loadElements();

  return combineHeroesData(heroes, characters, elements);
};

export const loadCharacters = async (): Promise<ICharacter[]> => {
  const characters: DBCharacter[] = await getAllCharacters();
  return characters;
};

export const loadSpells = async (): Promise<ISpell[]> => {
  const spells: DBSpell[] = await getAllSpells();
  const elements: DBElement[] = await getAllElements();
  const schools: DBSchool[] = await getAllSchools();

  return combineSpellData(spells, elements, schools);
};

export const loadUpdates = async (): Promise<IUpdate[]> => {
  const updates: DBUpdate[] = await getAllUpdates();
  const update_resources: DBUpdateResource[] = await getAllUpdateResources();
  const resources: DBResource[] = await getAllResources();
  const schools: DBSchool[] = await getAllSchools();

  return combineUpdateData(updates, update_resources, resources, schools);
};

export const loadResources = async (): Promise<IResource[]> => {
  const updates: DBResource[] = await getAllResources();
  const schools: DBSchool[] = await getAllSchools();

  return combineResourceData(updates, schools);
};
