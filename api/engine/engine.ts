import { Database } from "sqlite3";
import { writeCreatePlayer } from "../storage/dynamic_data_writers";
import {
  loadAdventures,
  loadCharacters,
  loadDialogues,
  loadHeroes,
  loadPlayerEvents,
  loadResources,
  loadSpells,
} from "../storage/storage";
import { createUserEvent, finishStoryEvent } from "./events";
import {
  IUserEvent,
  IPFinishStoryEvent,
  IGameData,
  IEventPlayer,
} from "./types";

const BASEPLAYER = {
  experience: 0,
  life: 0,
  maxlife: 0,
  mana: 0,
  maxmana: 0,
  created_at: new Date("10-10-2010"),
  updated_at: new Date("10-10-2010"),
  rank: 0,
};

export const userEvents = async (
  player_id: string,
  db: Database
): Promise<IUserEvent[]> => {
  const events: IUserEvent[] = await loadPlayerEvents(parseInt(player_id), db);
  //console.log("userEvents from DB", events);
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

const staticGameData = async (): Promise<IGameData> => {
  const heroes = await loadHeroes();
  const adventures = await loadAdventures();
  const characters = await loadCharacters();
  const dialogues = await loadDialogues();
  const spells = await loadSpells();
  const resources = await loadResources();

  return { heroes, adventures, characters, dialogues, spells, resources };
};

export const applyUserEvents = async (
  player_id: string,
  db: Database
): Promise<IEventPlayer> => {
  let player: IEventPlayer = {
    player: { ...BASEPLAYER, id: parseInt(player_id) },
    adventures: [],
    heroes: [],
    spells: [],
    resources: [],
    updates: null,
    npcs: [],
  };
  const gameData = await staticGameData();
  let events = await userEvents(player_id, db);
  if (events.length === 0) {
    console.warn(`No events found, new user ${player_id} will be created`);
    await writeCreatePlayer(parseInt(player_id), db);
    events = await userEvents(player_id, db);
  }
  //console.log("events", events);

  for (let i = 0; i < events.length; i++) {
    switch (events[i].event) {
      case "CREATEUSER":
        player = await createUserEvent(gameData, player, events[i]);
        break;
      case "FINISHSTORY":
        player = await finishStoryEvent(
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
