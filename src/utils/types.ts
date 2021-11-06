export interface ISpell {
  id: string;
  image: string;
  name: string;
  strength: number;
  mana: number;
  selected: boolean;
  element: elementType;
  owner: "hero" | "enemy";
  type: string;
  level: number;
  description: string;
  updates: ISpellUpdate[];
}

export type IOwnedResource = IResource & { quantity: number };
export type INPC = IHero & { dial: string | null };

export type ISpellUpdateResource = [string, number];

export interface ISpellUpdate {
  id: string;
  element: elementType;
  mana: number;
  resource_base: ISpellUpdateResource[];
  effect: spellEffectType;
  action: string;
  price: string | null;
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
  npcs: IHero[];
}

export interface IDialogueLine {
  id: string;
  character: string;
  image?: string;
  pos?: "L" | "R" | "M";
  text: string;
}

export interface IDialogue {
  id: string;
  lines: IDialogueLine[];
  background: string;
  action?: IStoryAction[];
}

export interface IStoryAction {
  type: storyChangeType;
  id: string;
  data?: string | null;
}

export interface IHero {
  id: string;
  name: string;
  image: string;
  selected?: boolean;
  element?: elementType;
}

export interface IAdventure {
  id: adventureType;
  form: string;
  name: string;
  image: string;
  open: boolean;
  storyGroups?: IStoryGroup[];
}

export interface IReel {
  id: string;
  imageGroups: IReelGroup[];
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

export interface IEnemy {
  id: string;
  name: string;
  element: elementType;
  // exp defines how hard this enemy to kill
  experience: enemyExpLevel;
  spells: ISpell[];
  // defines how many cards enemy is given
  life: number;
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
  element: elementType;
  elements: elementType[];
}

export interface IResource {
  id: string;
  name: string;
  image: string;
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
export type elementType = "fire" | "earth" | "metal" | "water" | "air";
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
