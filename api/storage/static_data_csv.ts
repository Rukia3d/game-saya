import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";
import {
  DBAdventure,
  DBStory,
  DBAction,
  DBCharacter,
  DBHero,
  DBElement,
  DBSchool,
  DBSpell,
  DBUpdate,
  DBUpdateResource,
  DBResource,
} from "./db_types";

const csvStream = csv.format({ headers: true });

csvStream.pipe(process.stdout).on("end", () => process.exit());

export const getAllAdventures = async (): Promise<DBAdventure[]> => {
  const adventures: DBAdventure[] = [];
  fs.createReadStream(
    path.resolve(__dirname, "data", "Story Data - DBAction.csv")
  )
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => adventures.push(row))
    .on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
  return adventures;
};

export const getAllStories = async (): Promise<DBStory[]> => {
  const stories: DBStory[] = [];
  return stories;
};

export const getAllActions = async (): Promise<DBAction[]> => {
  const actions: DBAction[] = [];
  return actions;
};

export const getAllCharacters = async (): Promise<DBCharacter[]> => {
  const characters: DBCharacter[] = [];
  return characters;
};

export const getAllHeroes = async (): Promise<DBHero[]> => {
  const heroes: DBHero[] = [];
  return heroes;
};

export const getAllElements = async (): Promise<DBElement[]> => {
  const elements: DBElement[] = [];
  return elements;
};

export const getAllSchools = async (): Promise<DBSchool[]> => {
  const schools: DBSchool[] = [];
  return schools;
};

export const getAllSpells = async (): Promise<DBSpell[]> => {
  const spells: DBSpell[] = [];
  return spells;
};

export const getAllUpdates = async (): Promise<DBUpdate[]> => {
  const updates: DBUpdate[] = [];
  return updates;
};

export const getAllUpdateResources = async (): Promise<DBUpdateResource[]> => {
  const update_resources: DBUpdateResource[] = [];
  return update_resources;
};

export const getAllResources = async (): Promise<DBResource[]> => {
  const resources: DBResource[] = [];
  return resources;
};
