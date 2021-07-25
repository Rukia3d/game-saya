export interface Spell {
  id: string;
  image: string;
  name: string;
  strength: number;
  mana: number;
  effect?: [effectValue, number];
  trump?: [trumpValue, number];
  character: null | string;
  selected: boolean;
  element: null | element;
  owner: "hero" | "enemy";
  type: string;
  level: number;
  description: string;
}
export type trumpValue = "strength";
export type effectValue = "heal" | "remove";

export type OwnedResource = Resource & { quantity: number };

export interface Player {
  id: number;
  cards: Spell[];
  experience: number;
  mana: number;
  cardUpdates: ForgeReq[];
  maxMana: number;
  resources: OwnedResource[];
  heroes: Character[];
}

export interface DialogueLine {
  character: string;
  image?: string;
  pos?: "L" | "R" | "M";
  text: string;
}
export interface Dialogue {
  id: string;
  lines: DialogueLine[];
  background?: string;
}

export interface Character {
  id: string;
  name: string;
  image: string;
  selected?: boolean;
  state?: string;
  dial?: string;
}

export interface Adventure {
  id: string;
  form: string;
  name: string;
  image: string;
  open: boolean;
  stories?: StoryGroup[];
}

export interface StoryGroup {
  stories: Story[];
  group: number;
}

export interface Story {
  type: "dialogue" | "fight";
  id: string;
  name?: string;
  image: string;
  open: boolean;
  enemy?: string;
  characters?: string[];
}

export interface GameState {
  sceneCharacters: Character[];
  player: Player;
  adventures: Adventure[];
  dialogues: Dialogue[];
}

export interface ForgeReq {
  itemType: string;
  updates: [resourceType, number][];
  effect: "strengthen";
}

export interface ForgeEffect {
  id: string;
  parameter: "strength" | "mana";
  change: number;
}

export interface Enemy {
  id: string;
  name: string;
  element: string;
  // exp defines how hard this enemy to kill
  experience: enemyExpLevel;
  cards: Spell[];
  // defines how many cards enemy is given
  life: number;
}

export interface FightState {
  hero: {
    health: number;
    currentHealth: number;
    mana: number;
    currentMana: number;
  };
  enemy: Enemy;
  heroDeck: Spell[];
  heroDrop: Spell[];
  heroHand: Spell[];
  enemyDeck: Spell[];
  enemyDrop: Spell[];
  element: element | null;
  elements: element[];
}

export interface Resource {
  id: resourceType;
  name: string;
  image: string;
  commonality: number;
}

export type screenState = "start" | "opening" | "main" | "dialogue";
export type enemyExpLevel =
  | "novice"
  | "apprentice"
  | "practitioner"
  | "master"
  | "grandmaster";
export type element = "fire" | "earth" | "metal" | "water" | "air";
export type resourceType =
  | "gold"
  | "iron"
  | "dimond"
  | "silk"
  | "rdust"
  | "rflower";
