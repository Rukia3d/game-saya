import * as fs from "fs";
import parse from "csv-parse/lib/sync";
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
  DBDialogue,
  DBLine,
  DBFight,
  DBReel,
  DBFightElement,
} from "./db_types";

type csvType = { [key: string]: string };

const readAllRows = async (address: string): Promise<csvType[]> => {
  const data = fs.readFileSync(`./data/${address}`, {
    encoding: "utf8",
    flag: "r",
  });
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
};

export const getAllAdventures = async (): Promise<DBAdventure[]> => {
  const address = "DBAdventure.csv";
  const res = await readAllRows(address);
  const adventures: DBAdventure[] = res.map((a: csvType) => ({
    id: parseInt(a.id),
    type: a.type,
    name: a.name,
    description: a.description,
  }));
  return adventures;
};

export const getAllDialogues = async (): Promise<DBDialogue[]> => {
  const address = "DBDialogue.csv";
  const res = await readAllRows(address);
  const dialogues: DBDialogue[] = res.map((a: csvType) => ({
    id: parseInt(a.id),
    story_id: a.story_id.length > 0 ? parseInt(a.story_id) : null,
    background: a.background,
    layout: a.layout,
  }));
  return dialogues;
};

export const getAllLines = async (): Promise<DBLine[]> => {
  const address = "DBLine.csv";
  const res = await readAllRows(address);
  const lines: DBLine[] = res.map((a: csvType) => ({
    dialogue_id: parseInt(a.dialogue_id),
    id: parseInt(a.id),
    character_id: parseInt(a.character_id),
    image: a.image,
    position: a.position,
    text: a.text,
  }));
  return lines;
};

export const getAllFightElements = async (): Promise<DBFightElement[]> => {
  const address = "DBFightElement.csv";
  const res = await readAllRows(address);
  const fight_elements: DBFightElement[] = res.map((a: csvType) => ({
    element_id: parseInt(a.element_id),
    fight_id: parseInt(a.fight_id),
  }));
  return fight_elements;
};

export const getAllFights = async (): Promise<DBFight[]> => {
  const address = "DBFight.csv";
  const res = await readAllRows(address);
  const fights: DBFight[] = res.map((a: csvType) => ({
    id: parseInt(a.id),
    story_id: a.story_id.length > 0 ? parseInt(a.story_id) : null,
    background: a.background,
    layout: a.layout,
    enemy_id: parseInt(a.enemy_id),
    base_hero_num: parseInt(a.base_hero_num),
  }));
  return fights;
};

export const getAllReels = async (): Promise<DBReel[]> => {
  const address = "DBFight.csv";
  const res = await readAllRows(address);
  // TODO figure out reels format
  const reels: DBReel[] = res.map((a: csvType) => ({}));
  return reels;
};

export const getAllStories = async (): Promise<DBStory[]> => {
  const address = "DBStory.csv";
  const res = await readAllRows(address);
  const stories: DBStory[] = res.map((a: csvType) => ({
    id: parseInt(a.id),
    adventure_id: parseInt(a.adventure_id),
    type: a.type,
    item_id: parseInt(a.item_id),
    name: a.name,
    next_id: a.next_id.length > 0 ? parseInt(a.next_id) : null,
  }));
  return stories;
};

export const getAllActions = async (): Promise<DBAction[]> => {
  const address = "DBAction.csv";
  const res = await readAllRows(address);
  const actions: DBAction[] = res.map((a: csvType) => ({
    id: parseInt(a.id),
    parent_id: parseInt(a.parent_id),
    parent_type: a.parent_type,
    type: a.type,
    item_id: parseInt(a.item_id),
    data_id: a.data_id.length > 0 ? parseInt(a.item_id) : undefined,
  }));
  return actions;
};

export const getAction = async (action_id: string): Promise<DBAction> => {
  const all = await getAllActions();
  const res = all.find((a: DBAction) => a.id === parseInt(action_id));
  if (!res) throw new Error(`Can't find action with id ${action_id}`);
  return res;
};

export const getAllCharacters = async (): Promise<DBCharacter[]> => {
  const address = "DBCharacter.csv";
  const res = await readAllRows(address);
  const characters: DBCharacter[] = res.map((a: csvType) => ({
    id: parseInt(a.id),
    name: a.name,
    description: a.description,
  }));
  return characters;
};

export const getAllHeroes = async (): Promise<DBHero[]> => {
  const address = "DBHero.csv";
  const res = await readAllRows(address);
  const heroes: DBHero[] = res.map((a: csvType) => ({
    character_id: parseInt(a.character_id),
    element_id: parseInt(a.element_id),
  }));
  return heroes;
};

export const getAllElements = async (): Promise<DBElement[]> => {
  const address = "DBElement.csv";
  const res = await readAllRows(address);
  const elements: DBElement[] = res.map((a: csvType) => ({
    id: parseInt(a.id),
    school_id: parseInt(a.school_id),
    name: a.name,
    description: a.description,
    code: a.code,
  }));
  return elements;
};

export const getAllSchools = async (): Promise<DBSchool[]> => {
  const address = "DBSchool.csv";
  const res = await readAllRows(address);
  const schools: DBSchool[] = res.map((a: csvType) => ({
    id: parseInt(a.id),
    name: a.name,
    description: a.description,
    code: a.code,
  }));
  return schools;
};

export const getAllSpells = async (): Promise<DBSpell[]> => {
  const address = "DBSpell.csv";
  const res = await readAllRows(address);
  const spells: DBSpell[] = res.map((a: csvType) => ({
    id: parseInt(a.id),
    element_id: parseInt(a.element_id),
    name: a.name,
    description: a.description,
    base_strength: parseInt(a.base_strength),
  }));
  return spells;
};

export const getAllUpdates = async (): Promise<DBUpdate[]> => {
  const address = "DBUpdate.csv";
  const res = await readAllRows(address);
  const updates: DBUpdate[] = res.map((a: csvType) => ({
    id: parseInt(a.id),
    name: a.name,
    description: a.description,
    school_id: parseInt(a.school_id),
    action_id: parseInt(a.action_id),
    effect: a.effect,
    base_mana: parseInt(a.base_mana),
  }));
  return updates;
};

export const getAllUpdateResources = async (): Promise<DBUpdateResource[]> => {
  const address = "DBUpdateResource.csv";
  const res = await readAllRows(address);
  const update_resources: DBUpdateResource[] = res.map((a: csvType) => ({
    resource_id: parseInt(a.resource_id),
    update_id: parseInt(a.update_id),
    quantity: parseInt(a.quantity),
  }));
  return update_resources;
};

export const getAllResources = async (): Promise<DBResource[]> => {
  const address = "DBResource.csv";
  const res = await readAllRows(address);
  const resources: DBResource[] = res.map((a: csvType) => ({
    id: parseInt(a.id),
    school_id: parseInt(a.school_id),
    name: a.name,
    description: a.description,
    commonality: parseInt(a.commonality),
  }));
  return resources;
};
