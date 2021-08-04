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
export type CharacterNPC = Character & { dial: string };

export interface Player {
  data: {
    id: number;
    experience: number;
    life: number;
    maxLife: number;
    mana: number;
    maxMana: number;
  };
  npcs: CharacterNPC[];
  heroes: Character[];
  cards: Spell[];
  cardUpdates: ForgeReq[];
  adventures: Adventure[];
  enemies: Enemy[];
  resources: OwnedResource[];
}

export interface GameState {
  player: Player;
  dialogues: Dialogue[];
  enemies: Enemy[];
  resources: Resource[];
  cards: Spell[];
  forgeEffects: ForgeEffect[];
  cardUpdates: ForgeReq[];
  adventures: Adventure[];
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
  action?: StoryAction[];
}

export interface StoryAction {
  type: "setNpcState" | "setAdventure" | "openStory";
  id: string;
  data?: string;
}

export interface Character {
  id: string;
  name: string;
  image: string;
  selected?: boolean;
}

export interface Adventure {
  id: adventureType;
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
  action?: StoryAction[];
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
    life: number;
    maxLife: number;
    mana: number;
    maxMana: number;
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
export type element = "fire" | "earth" | "metal" | "water" | "air";
export type resourceType =
  | "gold"
  | "iron"
  | "dimond"
  | "silk"
  | "rdust"
  | "rflower";
