import { DBAction } from "../storage/db_types";
import { openStory } from "../storage/dynamic_data_modifyers";
import {
  getDBAction,
  loadAdventures,
  loadCharacters,
  loadDialogues,
  loadHeroes,
  loadPlayer,
  loadPlayerAdventures,
  loadPlayerCharacters,
  loadPlayerHeroes,
  loadPlayerResources,
  loadPlayerSpells,
  loadPlayerUpdates,
  loadResources,
  loadSpells,
  loadUpdates,
} from "../storage/storage";
import {
  IAdventure,
  IHero,
  ISpell,
  IUpdate,
  IPUpdatedSpell,
  IResource,
  IPAdventure,
  IPHero,
  ICharacter,
  IPCharacter,
  IPUpdate,
  IPResource,
  IDialogue,
} from "../storage/types";
import {
  combineAdventures,
  combineHeroes,
  combineCharacters,
  combineSpells,
  combineUpdates,
  combineResources,
} from "./combiners";
import {
  IPlayerAdventure,
  IPlayerHero,
  IPlayerCharacter,
  IPlayerSpell,
  IPlayerUpdate,
  IPlayerResource,
  IPlayer,
} from "./types";

export const playerAdventures = async (
  player_id: string
): Promise<IPlayerAdventure[]> => {
  const adventures: IAdventure[] = await loadAdventures();
  const p_adventures: IPAdventure[] = await loadPlayerAdventures(player_id);
  return combineAdventures(adventures, p_adventures);
};

export const playerHeroes = async (
  player_id: string
): Promise<IPlayerHero[]> => {
  const heroes: IHero[] = await loadHeroes();
  const p_heroes: IPHero[] = await loadPlayerHeroes(player_id);
  return combineHeroes(heroes, p_heroes);
};

export const playerCharacters = async (
  player_id: string
): Promise<IPlayerCharacter[]> => {
  const characters: ICharacter[] = await loadCharacters();
  const dialogues: IDialogue[] = await loadDialogues();
  const p_characters: IPCharacter[] = await loadPlayerCharacters(player_id);
  return combineCharacters(characters, dialogues, p_characters);
};

export const playerSpells = async (
  player_id: string
): Promise<IPlayerSpell[]> => {
  const spells: ISpell[] = await loadSpells();
  const updates: IUpdate[] = await loadUpdates();
  const p_spells: IPUpdatedSpell[] = await loadPlayerSpells(player_id);
  return combineSpells(spells, updates, p_spells);
};

export const playerUpdates = async (
  player_id: string
): Promise<IPlayerUpdate[]> => {
  const updates: IUpdate[] = await loadUpdates();
  const p_updates: IPUpdate[] = await loadPlayerUpdates(player_id);
  return combineUpdates(updates, p_updates);
};

export const playerResources = async (
  player_id: string
): Promise<IPlayerResource[]> => {
  const resources: IResource[] = await loadResources();
  const p_resources: IPResource[] = await loadPlayerResources(player_id);
  return combineResources(resources, p_resources);
};

export const player = async (player_id: string): Promise<IPlayer> => {
  const player = await loadPlayer(player_id);
  return player;
};

export const action = async (player_id: string, action_id: string) => {
  const action: DBAction = await getDBAction(action_id);
  console.log("got action", action);
  switch (action.type) {
    case "openStory":
      openStory(player_id, action.parent_id);
      return;
    default:
      throw new Error("Unknown action type");
  }
};
