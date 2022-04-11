import { Database } from "sqlite3";
import { writeOneLine } from "./db_helpers";

export const writeCreatePlayer = async (player_id: number, db: Database) => {
  console.log("writeCreatePlayer");
  const currentDate = Date.now();
  const player_event =
    "player_event(event, player_id, created_at, updated_at, deleted_at)";
  const newPlayer = ["CREATEUSER", player_id, currentDate, currentDate, "null"];
  const event_id = await writeOneLine(player_event, newPlayer, db);
  const event_createuser =
    "player_event_createuser(player_id, player_event_id)";
  const newEvent = [player_id, event_id];
  await writeOneLine(event_createuser, newEvent, db);
};
export const writeFinishStory = async (
  player_id: number,
  adv_id: number,
  story_id: number,
  db: Database
) => {
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
  const event_createuser =
    "player_event_finishstory(player_id, player_event_id, story_id, adventure_id)";
  const newEvent = [player_id, event_id, story_id, adv_id];
  console.log("newEvent", newEvent);
  await writeOneLine(event_createuser, newEvent, db);
};
