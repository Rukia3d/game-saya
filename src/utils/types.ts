export interface ISpell {
  id: string;
  name: string;
  strength: number;
  element: IElement;
  description: string;
}

export type IElement = {
  code: string;
  color: colorType;
  description: string;
  school: ISchool;
};

export type ISchool = {
  id: schoolType;
  description: string;
  name: string;
};

export type IPlayerSpell = ISpell & {
  copy: number;
  selected: boolean;
  owner: "hero" | "enemy";
  updates: ISpellUpdate[];
  created_at: Date;
};

export type IPlayerResource = IResource & {
  quantity: number;
  created_at: Date;
};
export type INPC = ICharacter & {
  image: string;
  dialogue: string | null;
  created_at: Date;
};
export type IHero = ICharacter & {
  element: IElement;
};
export type IPlayerHero = IHero & { selected: boolean; created_at: Date };

export type IEnemy = ICharacter & {
  element: IElement;
};

export type IEnemyFight = IEnemy & { spells: ISpell[] };

export type ISpellUpdateResource = IResource & { quantity: number };

export type ISpellUpdate = ISpellUpdateData & {
  resource_base: ISpellUpdateResource[];
};

export type IUpdateAction = {
  item: spellUpdateEffect;
  data: number | string;
};
export type ISpellUpdateData = {
  id: string;
  school: ISchool;
  mana: number;
  effect: spellEffectType;
  action: IUpdateAction;
  price: { action: spellUpdatePrice; strength: number | string } | null;
  name: string;
  description: string;
};
export type PlayerData = {
  id: string;
  experience: number;
  life: number;
  maxlife: number;
  mana: number;
  maxmana: number;
  created_at: Date;
  rank: number;
};
export type Player = {
  data: PlayerData;
  npcs: INPC[];
  heroes: IHero[];
  spells: ISpell[];
  spellUpdates: ISpellUpdate[];
  adventures: IPlayerAdventure[];
  resources: IPlayerResource[];
};

export type GameStateData = {
  dialogues: IDialogue[];
  fights: IFight[];
  reels: IReel[];
  resources: IResource[];
  spells: ISpell[];
  adventures: IAdventure[];
  characters: ICharacter[];
  heroes: IHero[];
  updates: ISpellUpdate[];
};

export type GameState = {
  player: Player;
  game: GameStateData;
};

export type IDialogueLine = {
  id: string;
  character: string;
  image: string;
  position: dialogueCharacterPosition;
  text: string;
};

export type IDialogue = {
  id: string;
  lines: IDialogueLine[];
  background: string;
  layout: dialogueLayout;
  character_ids: string[];
};

export type IStoryAction = {
  id: string;
  type: storyChangeType;
  item: string;
  data?: string | null;
};

export type ICharacter = {
  id: string;
  name: string;
  description: string;
};

export type IAdventure = {
  id: adventureType;
  type: string;
  name: string;
  image: string;
  storyGroups: IStoryGroup[] | null;
};
export type IPlayerAdventure = IAdventure & { open: boolean; created_at: Date };

export type IReel = {
  id: string;
  type: string;
  imageGroups: IReelGroup[];
  action: IStoryAction[];
};

export type IReelGroup = {
  id: number;
  layout: number;
  images: IReelImage[];
};

export type IReelImage = {
  id: string;
  image: string;
  direction: "up" | "down" | "left" | "right";
};

export type IStoryGroup = {
  id: string;
  name: string;
  stories: IStory[];
  group: number;
};

export type IStory = {
  type: storyType;
  id: string;
  nextStory: string;
  name: string;
  image: string;
  actions: IStoryAction[];
  open?: boolean;
};

export type IFight = {
  id: string;
  name: string;
  hero_num: number;
  enemy: IEnemy;
  hero_elements: colorType[];
};

export type FightState = {
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
};

export type IResource = {
  id: string;
  name: string;
  school: ISchool;
  description: string;
  commonality: number;
};

export type storyType = "dialogue" | "fight" | "reel";

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
export type dialogueCharacterPosition = "L" | "R" | "M";
