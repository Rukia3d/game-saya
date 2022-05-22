import { Database } from "sqlite3";
import { writeOneLine } from "./db_helpers";

export const writeCreatePlayer = async (player_id: number, db: Database) => {
  // console.log("trying to write a new player");
  const currentDate = Date.now();
  const player_event =
    "player_event(event, player_id, created_at, updated_at, deleted_at)";
  const newPlayer = ["CREATEUSER", player_id, currentDate, currentDate, "null"];
  const event_id = await writeOneLine(player_event, newPlayer, db);
  // console.log("player_event last ID", event_id);
  const event_createuser =
    "player_event_createuser(player_id, player_event_id)";
  const newEvent = [player_id, event_id];
  const res = await writeOneLine(event_createuser, newEvent, db);
  // console.log("create_player_event last ID", res);
};

export const writeStartFight = async (
  player_id: number,
  adv_id: number,
  fight_id: number,
  heroes: string,
  spells: string,
  db: Database
) => {
  // console.log("trying to write start fight");
  const currentDate = Date.now();
  const player_event =
    "player_event(event, player_id, created_at, updated_at, deleted_at)";
  const startFight = [
    "STARTFIGHT",
    player_id,
    currentDate,
    currentDate,
    "null",
  ];
  const event_id = await writeOneLine(player_event, startFight, db);
  // console.log("player_event last ID", event_id);
  const player_event_startfight =
    "player_event_startfight(event_id, fight_id, adventure_id, heroes, spells)";
  const newEvent = [event_id, fight_id, adv_id, heroes, spells];
  const res = await writeOneLine(player_event_startfight, newEvent, db);
  // console.log("start_fight_event last ID", res);
};

export const writeFinishDialogue = async (
  player_id: number,
  adv_id: number,
  story_id: number,
  db: Database
) => {
  // console.log("trying to write finish dialogue");
  const currentDate = Date.now();
  const player_event =
    "player_event(event, player_id, created_at, updated_at, deleted_at)";
  const finishStory = [
    "FINISHDIALOGUE",
    player_id,
    currentDate,
    currentDate,
    "null",
  ];
  const event_id = await writeOneLine(player_event, finishStory, db);
  // console.log("player_event last ID", event_id);
  const event_finishstory =
    "player_event_finishdialogue(event_id, story_id, adventure_id)";
  const newEvent = [event_id, story_id, adv_id];
  const res = await writeOneLine(event_finishstory, newEvent, db);
  // console.log("player_event_finishdialogue last ID", res);
};

export const writeFinishReel = async (
  player_id: number,
  adv_id: number,
  story_id: number,
  db: Database
) => {
  // console.log("trying to write finish reel");
  const currentDate = Date.now();
  const player_event =
    "player_event(event, player_id, created_at, updated_at, deleted_at)";
  const finishStory = [
    "FINISHREEL",
    player_id,
    currentDate,
    currentDate,
    "null",
  ];
  const event_id = await writeOneLine(player_event, finishStory, db);
  // console.log("player_event last ID", event_id);
  const event_finishstory =
    "player_event_finishreel(event_id, story_id, adventure_id)";
  const newEvent = [event_id, story_id, adv_id];
  const res = await writeOneLine(event_finishstory, newEvent, db);
  // console.log("player_event_finishreel last ID", res);
};

export const writeWinFight = async (
  player_id: number,
  adv_id: number,
  story_id: number,
  db: Database
) => {
  // console.log("trying to write win fight");
  const currentDate = Date.now();
  const player_event =
    "player_event(event, player_id, created_at, updated_at, deleted_at)";
  const finishStory = ["WINFIGHT", player_id, currentDate, currentDate, "null"];
  const event_id = await writeOneLine(player_event, finishStory, db);
  // console.log("player_event last ID", event_id);
  const event_finishstory =
    "player_event_winfight(event_id, story_id, adventure_id)";
  const newEvent = [event_id, story_id, adv_id];
  const res = await writeOneLine(event_finishstory, newEvent, db);
  // console.log("player_event_winfight last ID", res);
};

export const writelOSEFight = async (
  player_id: number,
  adv_id: number,
  story_id: number,
  db: Database
) => {
  // console.log("trying to write lose fight");
  const currentDate = Date.now();
  const player_event =
    "player_event(event, player_id, created_at, updated_at, deleted_at)";
  const finishStory = ["WINFIGHT", player_id, currentDate, currentDate, "null"];
  const event_id = await writeOneLine(player_event, finishStory, db);
  // console.log("player_event last ID", event_id);
  const event_finishstory =
    "player_event_loosefight(event_id, story_id, adventure_id)";
  const newEvent = [event_id, story_id, adv_id];
  const res = await writeOneLine(event_finishstory, newEvent, db);
  // console.log("player_event_losefight last ID", res);
};
