import { DBCharacter, DBPSpell, DBPSpellUpdate, DBSchool } from "./db_types";

export type ISchool = DBSchool;

export type IAction = {
  id: number;
  type: string;
  item: string;
  data: string | null;
};

export type IStory = {
  id: number;
  type: string;
  name: string;
  next: string | null;
  open: boolean;
  actions: null | IAction[];
};

export type IAdventure = {
  id: number;
  type: string;
  name: string;
  description: string;
  stories: null | IStory[];
};

export type IElement = {
  id: number;
  name: string;
  description: string;
  code: string;
  school: ISchool;
};

export type IHero = {
  id: number;
  name: string;
  description: string;
  element: IElement;
};

export type ISpell = {
  id: number;
  name: string;
  description: string;
  base_strength: number;
  element: IElement;
};

export type ICharacter = DBCharacter;

export type IResource = {
  id: number;
  school: ISchool;
  name: string;
  description: string;
  commonality: number;
};

export type IUpdateResource = IResource & { base_quantity: number };

export type IUpdate = {
  id: number;
  name: string;
  description: string;
  effect: string;
  base_mana: number;
  school: ISchool;
  resource_base: IUpdateResource[];
  actions: IAction[];
};

export type IPUpdatedSpell = {
  spell: DBPSpell;
  updates: DBPSpellUpdate[] | [];
};

export type IPCharacter = {
  id: number;
  image: string;
  dialogue_id: number;
  created_at: Date;
  expires_at: Date;
};
export type IPAdventure = {
  id: number;
  last_story_id: number | null;
  open: boolean;
  created_at: Date;
  expires_at: Date;
};

export type IPHero = {
  id: number;
  selected: boolean;
  created_at: Date;
  expires_at: Date;
};

export type IPUpdate = {
  id: number;
  expires_at: Date;
  created_at: Date;
};

export type IPResource = {
  id: number;
  quantity: number;
  created_at: Date;
};
