export interface Card {
  id: string;
  image: string;
  name: string;
  strength: number;
  quantity: number;
  character: null | string;
  element: null | string;
  selected: boolean;
}

export interface Spell {
  id: string;
  image: string;
  name: string;
  strength: number;
  character: null | string;
  element: null | string;
  owner: "hero" | "enemy";
}

export type OwnedResource = Resource & { quantity: number };
export interface Player {
  id: number;
  cards: Card[];
  experience: number;
  lifes: number;
  resources: OwnedResource[];
  heroes: Character[];
}

export interface Character {
  id: string;
  name: string;
  image: string;
  state?: string;
}

export interface Adventure {
  id: string;
  name: string;
  image: string;
  state: "open" | "closed";
  stories: Story[];
}

export interface Story {
  type: "dialogue" | "fight";
  id: string;
  image: string;
  state: "open" | "closed";
  enemy?: string;
  characters: string[];
}

export interface GameState {
  sceneCharacters: Character[];
  player: Player;
  adventures: Adventure[];
  heroes: string[];
}

export interface Enemy {
  id: string;
  name: string;
  element: string;
  // exp defines how hard this enemy to kill
  experience: enemyExpLevel;
  cards: Card[];
  // defines how many cards enemy is given
  life: number;
}

export interface FightState {
  hero: {
    health: number;
    currentHealth: number;
  };
  enemy: Enemy;
  heroDeck: Spell[];
  heroDrop: Spell[];
  heroHand: Spell[];
  enemyDeck: Spell[];
  enemyDrop: Spell[];
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
