import {
  loadAdventures,
  loadCharacters,
  loadDialogues,
  loadHeroes,
  loadPlayerEvents,
  loadResources,
  loadSpells,
} from "../storage/storage";
import {
  IAdventure,
  ICharacter,
  IDialogue,
  IDialogueCharacter,
  IHero,
  IResource,
  ISpell,
} from "../storage/types";
import {
  addHero,
  openAdventure,
  selectHeroes,
  openStory,
  updateNPCs,
  addSpells,
  selectSpells,
  addResources,
} from "./actions";
import {
  IPlayerAdventure,
  IPlayerHero,
  IPlayerSpell,
  IPlayerResource,
  IPlayer,
  IUserEvent,
  IPFinishStoryEvent,
} from "./types";

type IEventPlayer = {
  player: IPlayer;
  adventures: IPlayerAdventure[] | null;
  heroes: IPlayerHero[] | null;
  spells: IPlayerSpell[] | null;
  resources: IPlayerResource[] | null;
  updates: null;
  npcs: IDialogueCharacter[] | null;
};

type IGameData = {
  heroes: IHero[];
  adventures: IAdventure[];
  characters: ICharacter[];
  dialogues: IDialogue[];
  spells: ISpell[];
  resources: IResource[];
};

const BASEPLAYER: IPlayer = {
  id: 0,
  experience: 0,
  life: 0,
  maxlife: 0,
  mana: 0,
  maxmana: 0,
  created_at: new Date("10-10-2010"),
  updated_at: new Date("10-10-2010"),
  rank: 0,
};

const createUserEvent = async (
  gameData: IGameData,
  player: IEventPlayer,
  event: IUserEvent
): Promise<IEventPlayer> => {
  console.log("createUserEvent");
  let newPlayer = player;
  const initNPC = { npc_id: 0, dialogue_id: 6 };
  const initResources = [
    { resource_id: 8, quantity: 5 },
    { resource_id: 9, quantity: 5 },
    { resource_id: 5, quantity: 3 },
  ];
  const initHero = 0;
  const initAdv = 0;
  newPlayer.player.created_at = new Date(event.created_at);
  newPlayer.player.updated_at = new Date();
  newPlayer.player.id = event.player_id;
  newPlayer.player.life = 10;
  newPlayer.player.maxlife = 10;
  newPlayer.player.mana = 10;
  newPlayer.player.maxmana = 10;
  newPlayer.player.rank = 1;

  newPlayer.heroes = addHero(newPlayer.heroes, gameData.heroes, initHero);
  newPlayer.heroes = selectHeroes(newPlayer.heroes, [initHero], 1);
  newPlayer.adventures = openAdventure(
    newPlayer.adventures,
    gameData.adventures,
    initAdv
  );
  newPlayer.adventures = openStory(newPlayer.adventures, initAdv, 0);
  newPlayer.npcs = updateNPCs(
    newPlayer.npcs,
    gameData.characters,
    gameData.dialogues,
    [initNPC]
  );
  newPlayer.spells = addSpells(
    newPlayer.spells,
    gameData.spells,
    [7, 7, 7, 8, 8, 9]
  );
  newPlayer.spells = selectSpells(newPlayer.spells, [0, 1, 2, 3, 4, 5], 6);
  newPlayer.resources = addResources(
    newPlayer.resources,
    gameData.resources,
    initResources
  );
  return newPlayer;
};

const finishStory = async (
  gameData: IGameData,
  player: IEventPlayer,
  event: IPFinishStoryEvent
): Promise<IEventPlayer> => {
  let newPlayer = player;
  console.log("finishStoryEvent", event);
  switch (event.story_id) {
    case 0:
      newPlayer.npcs = updateNPCs(
        newPlayer.npcs,
        gameData.characters,
        gameData.dialogues,
        [
          { npc_id: 0, dialogue_id: null },
          { npc_id: 6, dialogue_id: 7 },
        ]
      );
      newPlayer.heroes = addHero(newPlayer.heroes, gameData.heroes, 1);
      newPlayer.spells = addSpells(
        newPlayer.spells,
        gameData.spells,
        [10, 10, 10, 11, 11, 12]
      );
      break;
    default:
      newPlayer.adventures = openStory(
        newPlayer.adventures,
        event.adventure_id,
        event.story_id
      );
  }
  return newPlayer;
};

const readGameData = async (): Promise<IGameData> => {
  const heroes = await loadHeroes();
  const adventures = await loadAdventures();
  const characters = await loadCharacters();
  const dialogues = await loadDialogues();
  const spells = await loadSpells();
  const resources = await loadResources();

  return { heroes, adventures, characters, dialogues, spells, resources };
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
  const gameData = await readGameData();
  const events: IUserEvent[] = await userEvents(player_id);

  for (let i = 0; i < events.length; i++) {
    switch (events[i].event) {
      case "CREATEUSER":
        player = await createUserEvent(gameData, player, events[i]);
        break;
      case "FINISHSTORY":
        player = await finishStory(
          gameData,
          player,
          events[i] as IPFinishStoryEvent
        );
        break;
      case "STARTFIGHT":
        break;
      case "ATTACKSPELL":
        break;
      default:
        throw new Error(`Unknown event format: ${events[i].event}`);
    }
  }
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
