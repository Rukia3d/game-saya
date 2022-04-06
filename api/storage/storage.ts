import { IPlayer } from "../engine/types";
import {
  combineAdventuresData,
  combinedFightsData,
  combineDialoguesData,
  combineElementData,
  combineHeroesData,
  combinePlayerspells,
  combineResourceData,
  combineSpellData,
  combineStoriesData,
  combineUpdateData,
} from "./combiners";
import {
  DBAction,
  DBAdventure,
  DBCharacter,
  DBDialogue,
  DBElement,
  DBFight,
  DBFightElement,
  DBHero,
  DBLine,
  DBPAdventure,
  DBPAttackSpellEvent,
  DBPCharacter,
  DBPCreateEvent,
  DBPEvent,
  DBPFinishStoryEvent,
  DBPlayer,
  DBPResource,
  DBPSpell,
  DBPSpellUpdate,
  DBPStartFightEvent,
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
  getPlayerAttackSpellEvents,
  getPlayerCharacters,
  getPlayerCreateEvent,
  getPlayerFinishStoryEvents,
  getPlayerHeroes,
  getPlayerResources,
  getPlayerSpells,
  getPlayerSpellUpdates,
  getPlayerStartFightEvents,
  getPlayerUpdates,
} from "./dynamic_data_readers";
import {
  addPlayerCharacter,
  addPlayerHero,
  createPlayer,
  createPlayerAdventures,
  createPlayerSpells,
} from "./dynamic_data_writers";
import {
  getAction,
  getAllActions,
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
  transformAdventures,
  transformCharacters,
  transformHeroes,
  transformPlayerResources,
  transformPlayerUpdates,
} from "./transformers";
import {
  IAdventure,
  IDialogue,
  IElement,
  IFight,
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
  const actions: DBAction[] = await getAllActions();

  const combinedDialogues = await loadDialogues();
  const combinedFigths = await loadFights();
  const combinedStories = combineStoriesData(
    stories,
    combinedDialogues,
    combinedFigths
  );
  return combineAdventuresData(adventures, combinedStories, actions);
};

export const getDBAction = async (action_id: string): Promise<DBAction> => {
  return await getAction(action_id);
};

export const loadPlayerEvents = async (
  player_id: string
): Promise<DBPEvent[]> => {
  const creationEvent: DBPCreateEvent = await getPlayerCreateEvent(player_id);
  const finishStoryEvents: DBPFinishStoryEvent[] =
    await getPlayerFinishStoryEvents(player_id);
  const startFightEvents: DBPStartFightEvent[] =
    await getPlayerStartFightEvents(player_id);
  const attackSpellEvents: DBPAttackSpellEvent[] =
    await getPlayerAttackSpellEvents(player_id);
  const eventsData: DBPEvent[] = [creationEvent]
    .concat(finishStoryEvents)
    .concat(finishStoryEvents)
    .concat(startFightEvents)
    .concat(attackSpellEvents);
  return eventsData;
};
export const loadPlayerAdventures = async (
  player_id: string
): Promise<IPAdventure[]> => {
  const playerAdventures: DBPAdventure[] = await getPlayerAdventures(player_id);
  return transformAdventures(playerAdventures);
};

export const loadHeroes = async (): Promise<IHero[]> => {
  const characters: DBCharacter[] = await getAllCharacters();
  const heroes: DBHero[] = await getAllHeroes();
  const elements = await loadElements();

  return combineHeroesData(heroes, characters, elements);
};

export const loadPlayerHeroes = async (
  player_id: string
): Promise<IPHero[]> => {
  const playerHeroes = await getPlayerHeroes(player_id);

  return transformHeroes(playerHeroes);
};

export const loadCharacters = async (): Promise<DBCharacter[]> => {
  const characters: DBCharacter[] = await getAllCharacters();
  return characters;
};

export const loadPlayerCharacters = async (
  player_id: string
): Promise<IPCharacter[]> => {
  const playerCharacters: DBPCharacter[] = await getPlayerCharacters(player_id);

  return transformCharacters(playerCharacters);
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
  const actions: DBAction[] = await getAllActions();
  const schools: DBSchool[] = await getAllSchools();

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
  const player_applied_updates: DBPSpellUpdate[] = await getPlayerSpellUpdates(
    player_id
  );
  const player_spells: DBPSpell[] = await getPlayerSpells(player_id);

  return combinePlayerspells(player_spells, player_applied_updates);
};

export const loadPlayerUpdates = async (
  player_id: string
): Promise<IPUpdate[]> => {
  const player_updates: DBPUpdate[] = await getPlayerUpdates(player_id);

  return transformPlayerUpdates(player_updates);
};

export const loadPlayerResources = async (
  player_id: string
): Promise<IPResource[]> => {
  const player_updates: DBPResource[] = await getPlayerResources(player_id);

  return transformPlayerResources(player_updates);
};

export const loadResources = async (): Promise<IResource[]> => {
  const updates: DBResource[] = await getAllResources();
  const schools: DBSchool[] = await getAllSchools();

  return combineResourceData(updates, schools);
};

const STARTINGCHARACTERID = 0;
const STARTINGCHARACTERIMAGE = "maya_story1";
const STARTINGCHARACTERDIALOGUE = 6;
export const newPlayer = async (player_id: string): Promise<DBPlayer> => {
  await createPlayer(player_id);
  await createPlayerAdventures(player_id);
  await addPlayerHero(player_id, STARTINGCHARACTERID, true);
  await addPlayerCharacter(
    player_id,
    STARTINGCHARACTERID,
    STARTINGCHARACTERIMAGE,
    STARTINGCHARACTERDIALOGUE
  );
  await createPlayerSpells(player_id);
  return await getPlayer(player_id);
};

export const loadPlayer = async (player_id: string): Promise<IPlayer> => {
  let player: DBPlayer = await getPlayer(player_id);
  //TODO Create new player
  if (!player) {
    console.log("Creating player");
    player = await newPlayer(player_id);
  }
  return {
    id: player.id,
    experience: player.experience,
    life: player.life,
    maxlife: player.experience,
    mana: player.mana,
    maxmana: player.maxmana,
    created_at: new Date(player.created_at),
    updated_at: new Date(),
    rank: player.rank,
  };
};
