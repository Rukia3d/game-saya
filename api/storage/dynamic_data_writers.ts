import { Database } from "sqlite3";
import { writeOneLine } from "./db_helpers";

export const writeCreatePlayer = async (player_id: number, db: Database) => {
  console.log("trying to write a new player");
  const currentDate = Date.now();
  const player_event =
    "player_event(event, player_id, created_at, updated_at, deleted_at)";
  const newPlayer = ["CREATEUSER", player_id, currentDate, currentDate, "null"];
  const event_id = await writeOneLine(player_event, newPlayer, db);
  console.log("player_event last ID", event_id);
  const event_createuser =
    "player_event_createuser(player_id, player_event_id)";
  const newEvent = [player_id, event_id];
  const res = await writeOneLine(event_createuser, newEvent, db);
  console.log("create_player_event last ID", res);
};

export const writeStartFight = async (
  player_id: number,
  adv_id: number,
  fight_id: number,
  db: Database
) => {
  console.log("trying to write start fight");
  const currentDate = Date.now();
  const player_event =
    "player_event(event, player_id, created_at, updated_at, deleted_at)";
  const finishStory = [
    "FINISHSTORY",
    player_id,
    currentDate,
    currentDate,
    "null",
  ];
  const event_id = await writeOneLine(player_event, finishStory, db);
  console.log("player_event last ID", event_id);
  const event_finishstory =
    "player_event_finishstory(player_id, player_event_id, story_id, adventure_id)";
  const newEvent = [player_id, event_id, story_id, adv_id];
  const res = await writeOneLine(event_finishstory, newEvent, db);
  console.log("finish_story_event last ID", res);
};

export const writeFinishStory = async (
  player_id: number,
  adv_id: number,
  story_id: number,
  db: Database
) => {
  console.log("trying to write finish story");
  const currentDate = Date.now();
  const player_event =
    "player_event(event, player_id, created_at, updated_at, deleted_at)";
  const finishStory = [
    "FINISHSTORY",
    player_id,
    currentDate,
    currentDate,
    "null",
  ];
  const event_id = await writeOneLine(player_event, finishStory, db);
  console.log("player_event last ID", event_id);
  const event_finishstory =
    "player_event_finishstory(player_id, player_event_id, story_id, adventure_id)";
  const newEvent = [player_id, event_id, story_id, adv_id];
  const res = await writeOneLine(event_finishstory, newEvent, db);
  console.log("finish_story_event last ID", res);
};
