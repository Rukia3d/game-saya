import {
  loadAdventures,
  loadCharacters,
  loadDialogues,
  loadHeroes,
  loadPlayer,
  loadPlayerAdventures,
  loadPlayerCharacters,
  loadPlayerEvents,
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
  IDialogueCharacter,
} from "../storage/types";
import {
  addHero,
  openAdventure,
  selectHeroes,
  openStory,
  updateNPCs,
} from "./actions";
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
  IUserEvent,
} from "./types";

type IEventPlayer = {
  player: IPlayer;
  adventures: IPlayerAdventure[] | null;
  heroes: IPlayerHero[] | null;
  spells: null;
  resources: null;
  updates: null;
  npcs: IDialogueCharacter[] | null;
};

const BASEPLAYER: IPlayer = {
  id: 0,
  experience: 0,
  life: 0,
  maxlife: 0,
  mana: 0,
  maxmana: 0,
  created_at: new Date(),
  updated_at: new Date(),
  rank: 0,
};

const createUserEvent = async (
  player: IEventPlayer,
  event: IUserEvent
): Promise<IEventPlayer> => {
  let newPlayer = player;
  const initNPC = { npc_id: 0, dialogue_id: 0 };
  const initHero = 0;
  const initAdv = 0;
  const heroes = await loadHeroes();
  const adventures = await loadAdventures();
  const characters = await loadCharacters();
  const dialogues = await loadDialogues();
  const spells = await loadSpells();
  const resources = await loadResources();
  newPlayer.player.created_at = new Date(event.created_at);
  newPlayer.player.updated_at = new Date();
  newPlayer.heroes = addHero(newPlayer.heroes, heroes, initHero);
  newPlayer.heroes = selectHeroes(newPlayer.heroes, [initHero], 1);
  newPlayer.adventures = openAdventure(
    newPlayer.adventures,
    adventures,
    initAdv
  );
  newPlayer.adventures = openStory(newPlayer.adventures, initAdv, 0);
  newPlayer.npcs = updateNPCs(newPlayer.npcs, characters, dialogues, [initNPC]);
  // newPlayer.spells = addSpells(newPlayer.spells, spells, [0, 1, 2, 3, 4, 5]);
  // newPlayer.spells = selectSpells(newPlayer.spells, [0, 1, 2, 3, 4, 5]);
  // newPlayer.resources = addResource(newPlayer.resources, resources, 3, 5);
  return newPlayer;
};

export const applyUserEvents = async (
  player_id: string
): Promise<IEventPlayer> => {
  let player: IEventPlayer = {
    player: BASEPLAYER,
    adventures: null,
    heroes: null,
    spells: null,
    resources: null,
    updates: null,
    npcs: null,
  };
  const events: IUserEvent[] = await userEvents(player_id);
  events.map(async (e: IUserEvent) => {
    switch (e.event) {
      case "CREATEUSER":
        player = await createUserEvent(player, e);
        //   return;
        // case "FINISHSTORY":
        //   player = await createUserEvent(player, e);
        //   return;
        // case "STARTFIGHT":
        //   player = await createUserEvent(player, e);
        //   return;
        // case "ATTACKSPELL":
        //   player = await createUserEvent(player, e);
        //   return;
        deafult: throw new Error("Unknown event formap");
    }
  });
  return player;
};

const userEvents = async (player_id: string): Promise<IUserEvent[]> => {
  const events: IUserEvent[] = await loadPlayerEvents(player_id);

  const res = events.sort(function (a, b) {
    var keyA = new Date(a.created_at),
      keyB = new Date(b.created_at);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  return res;
};

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
