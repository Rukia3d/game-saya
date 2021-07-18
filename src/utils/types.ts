export interface Spell {
  id: string;
  image: string;
  name: string;
  strength: number;
  character: null | string;
  selected: boolean;
  element: null | element;
  owner: "hero" | "enemy";
}

export type OwnedResource = Resource & { quantity: number };
export interface Player {
  id: number;
  cards: Spell[];
  experience: number;
  mana: number;
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
  id: string;
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
