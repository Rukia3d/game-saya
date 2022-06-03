export interface ISpell {
  id: number;
  element: elementName;
  strength: number;
  symbol: ""; // Unknown for now
  state: spellState;
}

export type ISpellListing = ISpell & { price: number; owner: number };

export interface IMaterial {
  id: number;
  name: string;
}

export type IMaterialOwned = IMaterial & { quantity: number };

export interface IQuest {
  id: number;
  state: questState;
  levels: []; //Unknown for now
}

export type IQuestListing = IQuest & { price: number; owner: number };

export interface IEvent {
  id: number;
  level: ""; //Unknown for now
}

export interface IStory {
  id: number;
  name: string;
  level: "";
}

export interface ICharacter {
  element: elementName;
  id: number;
  name: string;
  story: IStory[]; //Unknown for now
  currentQuests: []; //Unknown for now
  currentTournament: IEvent;
  currentTower: IEvent;
}

export interface IPlayer {
  id: number;
  name: string;
  exprience: number;
  energy: number;
  maxEnergy: number;
  loungeId: number | null;
  materials: IMaterialOwned[];
  characters: ICharacter[];
  spells: ISpell[];
}

export type elementName = "fire" | "water" | "air" | "stone" | "metal";
export type spellState = "closed" | "open" | "listed";
export type questState = "open" | "rented" | "new";
