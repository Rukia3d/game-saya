export type DBFightElement = {
  element_id: number;
  fight_id: number;
};

export type DBLine = {
  dialogue_id: number;
  id: number;
  character_id: number;
  image: string;
  position: string;
  text: string;
};

export type DBDialogue = {
  id: number;
  story_id: number | null;
  background: string;
  layout: string;
};

export type DBFight = {
  id: number;
  story_id: number | null;
  base_hero_num: number;
  background: string;
  enemy_id: number;
};

export type DBReel = {};

export type DBStory = {
  id: number;
  adventure_id: number;
  item_id: number;
  type: string;
  name: string;
  next_id: number | null;
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

export type DBPCreateEvent = {
  id: number;
  event: string;
  player_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type DBPFinishStoryEvent = {
  id: number;
  event: string;
  player_id: number;
  story_id: number;
  adventure_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type DBPStartFightEvent = {
  id: number;
  event: string;
  player_id: number;
  fight_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type DBPAttackSpellEvent = {
  id: number;
  event: string;
  player_id: number;
  spell_id: number;
  spell_index: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type DBPEvent =
  | DBPCreateEvent
  | DBPFinishStoryEvent
  | DBPStartFightEvent
  | DBPAttackSpellEvent;
