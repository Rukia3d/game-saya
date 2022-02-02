export interface ISpell {
  id: string;
  name: string;
  strength: number;
  selected: boolean;
  color: colorType;
  school: schoolType;
  owner: "hero" | "enemy";
  description: string;
  updates: ISpellUpdate[];
}

export type IOwnedResource = IResource & { quantity: number };
export type INPC = ICharacter & { image: string; dial: string | null };
export type IHero = ICharacter & {
  selected: boolean;
  code: string;
  color: colorType;
  image: string;
  school: schoolType;
};
export type IEnemy = ICharacter & {
  color: colorType;
  spells: ISpell[];
  school: schoolType;
};

export type ISpellUpdateResource = [string, number];

export interface ISpellUpdate {
  id: string;
  school: schoolType;
  mana: number;
  resource_base: ISpellUpdateResource[];
  effect: spellEffectType;
  action: { action: spellUpdateEffect; strength: number | string };
  price: { action: spellUpdatePrice; strength: number } | null;
  name: string;
  description: string;
}

export interface Player {
  data: {
    id: number;
    experience: number;
    life: number;
    maxLife: number;
    mana: number;
    maxMana: number;
  };
  npcs: INPC[];
  heroes: IHero[];
  spells: ISpell[];
  spellUpdates: ISpellUpdate[];
  adventures: IAdventure[];
  enemies: IEnemy[];
  resources: IOwnedResource[];
}

export interface GameState {
  player: Player;
  dialogues: IDialogue[];
  fights: IFight[];
  enemies: IEnemy[];
  reels: IReel[];
  resources: IResource[];
  spells: ISpell[];
  heroes: IHero[];
  spellUpdates: ISpellUpdate[];
  adventures: IAdventure[];
  npcs: INPC[];
}

export interface IDialogueLine {
  id: string;
  character: string;
  image: string;
  pos?: "L" | "R" | "M";
  text: string;
}

export interface IDialogue {
  id: string;
  lines: IDialogueLine[];
  background: string;
  action?: IStoryAction[];
  layout: dialogueLayout;
  characters: string[];
}

export interface IStoryAction {
  type: storyChangeType;
  id: string;
  data?: string | null;
}

export interface ICharacter {
  id: string;
  name: string;
  description: string;
}

export interface IAdventure {
  id: adventureType;
  type: string;
  name: string;
  image: string;
  open: boolean;
  storyGroups?: IStoryGroup[];
}

export interface IReel {
  id: string;
  type: string;
  imageGroups: IReelGroup[];
  action: IStoryAction[];
}

export interface IReelGroup {
  id: number;
  layout: number;
  images: IReelImage[];
}

export interface IReelImage {
  id: string;
  image: string;
  direction: "up" | "down" | "left" | "right";
}

export interface IStoryGroup {
  id: string;
  name: string;
  stories: IStory[];
  group: number;
}

export interface IStory {
  type: "dialogue" | "fight" | "reel";
  id: string;
  nextStory: string;
  name?: string;
  image: string;
  open: boolean;
  action: IStoryAction[];
}

export interface IFight {
  id: string;
  name: string;
  image: string;
  enemy: string;
  characters: string[];
}

export interface FightState {
  hero: {
    life: number;
    maxLife: number;
    mana: number;
    maxMana: number;
  };
  heroes: IHero[];
  enemy: IEnemy;
  heroDeck: ISpell[];
  heroCardIndex: number | null;
  heroDrop: ISpell[];
  heroHand: ISpell[];
  enemyDeck: ISpell[];
  enemyDrop: ISpell[];
  enemyCardIndex: number | null;
  element: colorType;
  elements: colorType[];
}

export interface IResource {
  id: string;
  name: string;
  school: schoolType;
  commonality: number;
}

export type adventureType =
  | "character"
  | "story"
  | "arena"
  | "torunament"
  | "event";
export type screenState = "start" | "opening" | "main" | "dialogue";
export type enemyExpLevel =
  | "novice"
  | "apprentice"
  | "practitioner"
  | "master"
  | "grandmaster";
export type colorType =
  | "violet"
  | "grey"
  | "red"
  | "indigo"
  | "green"
  | "blue"
  | "white"
  | "orange"
  | "yellow"
  | "rose"
  | "teal"
  | "sand"
  | "lime"
  | "black"
  | "brown";
export type storyChangeType =
  | "addNpc"
  | "setAdventure"
  | "openStory"
  | "addHero"
  | "addSpells"
  | "addUpdate";

export type spellEffectType =
  | "h_heal"
  | "h_trumpremove"
  | "h_trumpset"
  | "h_redraw"
  | "h_mana"
  | "e_redraw"
  | "e_drop"
  | "e_reduice"
  | "h_enforce";

export type herosSelectionError = "none" | "less" | "more" | "incorrect" | null;
export type spellUpdateEffect =
  | "health"
  | "trump"
  | "redraw"
  | "mana"
  | "drop"
  | "strength";
export type spellUpdatePrice = "health";
export type dialogueLayout = "single" | "double" | "triple";
export type schoolType =
  | "restoration"
  | "amplification"
  | "oblation"
  | "alteration"
  | "deception";
