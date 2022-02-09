import {
  adventureType,
  colorType,
  dialogueLayout,
  IDialogueLine,
  IStory,
  IStoryAction,
  schoolType,
} from "../../src/utils/types";

export type AdventureDB = {
  id: string;
  adventure_name: string;
  form: string;
  storygroup_id: string;
  visual: number;
  storygroup_name: string;
};

export type AdventureGroups = {
  id: string;
  name: string;
  form: string;
  storyGroups: StoryGroupsForAdventure[];
};

export type StoryGroupDB = {
  id: string;
  storygroup_id: string;
  name: string;
  image: string;
  story_type: string;
  next: string;
};

export type StoryGroupsById = { id: string; stories: IStory[] };

export type StoryActionByID = { id: string; actions: IStoryAction[] };

export type StoryGroupsForAdventure = {
  id: string;
  name: string;
  stories: IStory[];
  visual: number;
};

export type StoryActionDB = {
  story_id: string;
  id: string;
  type: string;
  item: string;
  data: string;
};

export type DialogueDB = {
  dialogue_id: string;
  background: string;
  layout: string;
  line_id: string;
  image: string;
  text: string;
  position: string;
  character_id: string;
};

export type DialogueLines = {
  id: string;
  background: string;
  layout: dialogueLayout;
  lines: IDialogueLine[];
  character_ids: string[];
};

export type FightDB = {
  fight_id: string;
  enemy_id: string;
  hero_num: number;
  hero_element: colorType;
  enemy_element: colorType;
  name: string;
};

export type ElementDB = {
  id: string;
  code: string;
  name: string;
  description: string;
  school_id: string;
  school_name: string;
  school_description: string;
};

export type ResourceDB = {
  id: string;
  name: string;
  description: string;
  commonality: number;
  school_id: schoolType;
};

export type HeroDB = {
  character_id: string;
  name: string;
  description: string;
  element_id: colorType;
};

export type SpellDB = {
  id: string;
  name: string;
  description: string;
  strength: number;
  element_id: colorType;
};

export type SpellUpdateDB = {
  id: string;
  name: string;
  description: string;
  effect: string;
  mana: number;
  school_id: string;
  action_id: string;
};

export type SpellUpdateResourceDB = {
  spellupdate_id: string;
  resource_id: string;
  quantity: number;
};

export type CharacterDB = {
  id: string;
  name: string;
  description: string;
};

export type ActionDB = {
  id: string;
  item: string;
  data: string;
};

export type PlayerDB = {
  id: string;
  experience: number;
  maxlife: number;
  maxmana: number;
  life: number;
  mana: number;
  created_at: Date;
  rank: number;
};

export type PlayerAdventureDB = {
  player_id: string;
  adventure_id: adventureType;
  state: number;
  created_at: Date;
};

export type PlayerStoryDB = {
  story_id: adventureType;
  created_at: Date;
};

export type PlayerResourceDB = {
  resource_id: string;
  quantity: number;
  created_at: Date;
};

export type PlayerHeroDB = {
  hero_id: string;
  selected: number;
  created_at: Date;
};

export type PlayerSpellDB = {
  spell_id: string;
  copy: number;
  selected: number;
  created_at: Date;
};

export type PlayerSpellUpdateDB = {
  spellupdate_id: string;
  created_at: Date;
};

export type PlayerSpellAppliedUpdateDB = {
  spellupdate_id: string;
  spell_id: string;
  copy_id: number;
  created_at: Date;
};

export type PlayerNpcDialogues = {
  npc_id: string;
  dialogue_id: string;
  image: string;
  created_at: Date;
};
