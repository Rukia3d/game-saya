import { writeAllLines, writeOneLine } from "./db_helpers";

export const createPlayer = async (player_id: number) => {
  console.log("createPlayer");
  const currentDate = Date.now();
  const player_event =
    "player_event(event, player_id, created_at, updated_at, deleted_at)";
  const newPlayer = ["CREATEUSER", player_id, currentDate, currentDate, "null"];
  const event_id = await writeOneLine(player_event, newPlayer);
  const event_createuser =
    "player_event_createuser(player_id, player_event_id)";
  const newEvent = [player_id, event_id];
  await writeOneLine(event_createuser, newEvent);
};

export const createPlayerAdventures = async (player_id: string) => {
  const currentDate = Date.now();
  const table =
    "player_adventure(player_id, adventure_id, last_story_id, state, created_at, updated_at, deleted_at, expires_at)";
  const newAdventures = [0, 1, 2, 3, 4].map((n) => [
    player_id,
    n,
    n === 0 ? 0 : "NULL",
    n === 0 ? 1 : 0,
    currentDate,
    currentDate,
    "NULL",
    "NULL",
  ]);
  await writeAllLines(table, newAdventures);
};

export const createPlayerSpells = async (player_id: string) => {
  const currentDate = Date.now();
  const table =
    "player_spell(player_id, spell_id, copy_id, selected, created_at, updated_at, deleted_at, expires_at)";
  const newSpells = [
    [7, 0],
    [7, 1],
    [7, 2],
    [8, 0],
    [8, 1],
    [9, 0],
  ].map(([n, j]) => [
    player_id,
    n,
    j,
    1,
    currentDate,
    currentDate,
    "NULL",
    "NULL",
  ]);
  await writeAllLines(table, newSpells);
};

export const addPlayerHero = async (
  player_id: string,
  hero_id: number,
  selected: boolean
) => {
  const currentDate = Date.now();
  const table =
    "player_hero(player_id, hero_id, selected, created_at, updated_at, deleted_at, expires_at)";
  const newHero = [
    player_id,
    hero_id,
    selected ? 1 : 0,
    currentDate,
    currentDate,
    "NULL",
    "NULL",
  ];
  await writeOneLine(table, newHero);
};

export const addPlayerCharacter = async (
  player_id: string,
  character_id: number,
  image: string,
  dialogue: number,
  expires_at?: Date
) => {
  const currentDate = Date.now();
  const table =
    "player_character(player_id, character_id, image, dialogue_id, created_at, updated_at, deleted_at, expires_at)";
  const newCharacter = [
    player_id,
    character_id,
    image,
    dialogue,
    currentDate,
    currentDate,
    "NULL",
    expires_at ? expires_at : "NULL",
  ];
  await writeOneLine(table, newCharacter);
};
