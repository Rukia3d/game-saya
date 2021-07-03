export interface Card {
  id: string;
  name: string;
  quantity: number;
  strength: number;
  character: null | string;
  element: null | string;
}

export interface Player {
  id: number;
  cards: Card[];
  experience: number;
  lifes: number;
}

export interface Character {
  id: string;
  image: string;
  state: string;
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

export interface Card {
  id: string;
  name: string;
  strength: number;
  quantity: number;
  character: null | string;
  element: null | string;
}
export interface Enemy {
  id: string;
  name: string;
  element: string;
  exp: number;
  cards: Card[];
  life: number;
}

export interface Spell {
  id: string;
  name: string;
  strength: number;
  character: null | string;
  element: null | string;
  owner: "hero" | "enemy";
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

export type screenState = "start" | "opening" | "main" | "dialogue";
