export interface Spell {
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
  updates: SpellUpdate[];
}

export type OwnedResource = Resource & { quantity: number };
export type CharacterNPC = Hero & { dial: string | null };

export type SpellUpdateResource = [string, number];

export interface SpellUpdate {
  id: string;
  element: elementType;
  mana: number;
  resource_base: SpellUpdateResource[];
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
  npcs: CharacterNPC[];
  heroes: Hero[];
  spells: Spell[];
  spellUpdates: SpellUpdate[];
  adventures: Adventure[];
  enemies: Enemy[];
  resources: OwnedResource[];
}

export interface GameState {
  player: Player;
  dialogues: Dialogue[];
  enemies: Enemy[];
  resources: Resource[];
  spells: Spell[];
  heroes: Hero[];
  spellUpdates: SpellUpdate[];
  adventures: Adventure[];
  npcs: Hero[];
}

export interface DialogueLine {
  id: string;
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
  type: storyChangeType;
  id: string;
  data?: string | null;
}

export interface Hero {
  id: string;
  name: string;
  image: string;
  selected?: boolean;
  element?: elementType;
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
  id: string;
  name: string;
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
  action: StoryAction[];
}

export interface Enemy {
  id: string;
  name: string;
  element: elementType;
  // exp defines how hard this enemy to kill
  experience: enemyExpLevel;
  spells: Spell[];
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
  heroes: Hero[];
  enemy: Enemy;
  heroDeck: Spell[];
  heroCardIndex: number | null;
  heroDrop: Spell[];
  heroHand: Spell[];
  enemyDeck: Spell[];
  enemyDrop: Spell[];
  enemyCardIndex: number | null;
  element: elementType;
  elements: elementType[];
}

export interface Resource {
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
