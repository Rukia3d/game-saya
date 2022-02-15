export type DBAction = {
  id: number;
  parent_id: number;
  parent_type: string;
  type: string;
  item: string;
  data: string | null;
};

export type DBStory = {
  id: number;
  adventure_id: number;
  type: string;
  name: string;
  next: string;
};

export type DBAdventure = {
  id: number;
  type: string;
  name: string;
  description: string;
};

export type DBSchool = {
  id: number;
  name: string;
  description: string;
};

export type DBElement = {
  id: number;
  school_id: number;
  name: string;
  description: string;
  code: string;
};

export type DBCharacter = {
  id: number;
  name: string;
  description: string;
};

export type DBHero = {
  character_id: number;
  element_id: number;
};

export type DBResource = {
  id: number;
  school_id: number;
  name: string;
  description: string;
  commonality: number;
};

export type DBUpdateResource = {
  resource_id: number;
  update_id: number;
  quantity: number;
};

export type DBSpell = {
  id: number;
  element_id: number;
  name: string;
  description: string;
  base_strength: number;
};

export type DBUpdate = {
  id: number;
  school_id: number;
  action_id: number;
  name: string;
  description: string;
  effect: string;
  base_mana: number;
};

export type DBPlayer = {
  id: number;
  experience: number;
  life: number;
  maxlife: number;
  mana: number;
  maxmana: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  rank: number;
};

export type DBPAdventure = {
  player_id: number;
  adventure_id: number;
  last_story_id: number;
  state: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  expires_at: string;
};

export type DBPSpell = {
  player_id: number;
  spell_id: number;
  copy_id: number;
  selected: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type DBPUpdate = {
  player_id: number;
  update_id: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type DBPSpellUpdate = DBPUpdate & {
  spell_id: number;
  copy_id: number;
};

export type DBPHero = {
  player_id: number;
  hero_id: number;
  selected: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type DBPCharacter = {
  player_id: number;
  character_id: number;
  image: string;
  dialogue_id: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type DBPResource = {
  player_id: number;
  resource_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};
