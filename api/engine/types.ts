import { EventType } from "@testing-library/user-event/dist/types/event";

export interface ISpell {
  id: number;
  elementId: number;
  enemy: elementName;
  strength: number;
  symbol: string; // Unknown for now
  state: spellState;
  name: string;
}

export type ISpellListing = {
  spellId: number;
  spellElementId: number;
  price: number;
  owner: number;
};

export type ISpellPrice = {
  spellId: number;
  elementId: number;
  price: IMaterialQuant[];
};

export type ISpellUpdate = {
  spellId: number;
  elementId: number;
  updatePrice: IMaterialQuant[];
  requiredStrength: number;
};

export type ISpellClosed = ISpell & { price: IMaterialQuant[] };
export type ISpellOpen = ISpell & {
  updatePrice: IMaterialQuant[];
  requiredStrength: number;
};

export interface IMaterial {
  id: number;
  name: string;
}

export type IMaterialQuant = IMaterial & { quantity: number };

export interface IQuest {
  id: number;
  state: questState;
  levels: []; //Unknown for now
}

export type IQuestListing = IQuest & { price: number; owner: number };

export interface IEvent {
  id: number;
  mode: gameMode;
  energy: number;
  checkpoint: number;
  level: string; //Unknown for now
  allowedRewards: IAllowedRewards[];
}

export interface IStoryReward {
  id: number;
  elementId: number;
  storyId: number;
  reward: IAllowedRewards[];
}

export interface IEventReward {
  id: number;
  elementId: number;
  reward: IAllowedRewards[];
}

export interface IStory {
  id: number;
  name: string;
  state: levelState;
  level: string;
  allowedRewards: IAllowedRewards[];
  experience: number;
  energy: number;
}

export interface IAllowedRewards {
  id: number;
  upTo: number;
}

export interface IElement {
  elementName: elementName;
  id: number;
  characterName: string;
  legend: string[];
  stories: IStory[]; //Unknown for now
  currentQuests: IStory[]; //Unknown for now
  currentEvents: IEvent[];
}

export interface IMessage {
  header: string;
  text: string;
  read: boolean;
  reward?: IMaterial[];
}

export interface IMission {
  name: string;
  reward: IMaterial;
  completed: boolean;
  progress: number;
}

export interface ICurrentState {
  state: currentState;
  level?: {
    levelId: number;
    mode: gameMode;
    elementId: number;
  };
  materials?: IMaterialQuant[];
}

export interface IPlayer {
  id: number;
  name: string;
  exprience: number;
  energy: number;
  maxEnergy: number;
  loungeId: number | null;
  materials: IMaterialQuant[];
  elements: IElement[];
  spells: (ISpellOpen | ISpellClosed | ISpell)[];
  missions: [];
  messages: [];
  currentState: ICurrentState;
}

export type IGenericEvent = {
  playerId: number;
  created: Date;
  type: eventType;
  data: any;
};

export type IPlayerEvent = {
  playerId: number;
  eventId: number;
  type: eventType;
  created: Date;
};

export type ICreatePlayerEvent = {
  eventId: number;
  playerName: string;
};

export type IStartLevelEvent = {
  eventId: number;
  elementId: number;
  mode: gameMode;
  levelId: number;
};

export type IWinLevelEvent = {
  eventId: number;
  elementId: number;
  mode: gameMode;
  levelId: number;
};

export type IOpenSpellEvent = {
  eventId: number;
  elementId: number;
  spellId: number;
};

export type IUpdateSpellEvent = {
  eventId: number;
  elementId: number;
  spellId: number;
};

export type IStartEndlessEvent = {
  eventId: number;
  elementId: number;
  mode: gameMode;
};

export type IWinLevelEventTimed = IWinLevelEvent & { time: Date };
export type ICreatePlayerEventId = ICreatePlayerEvent & { playerId: number };

export type elementName = "fire" | "water" | "air" | "stone" | "metal";
export type spellState = "closed" | "open" | "listed";
export type questState = "open" | "rented" | "new";
export type gameMode = "story" | "quest" | "tower" | "tournament";
export type levelState = "open" | "closed" | "complete";
export type currentState = "MAIN" | "PLAY" | "SPELLS" | "WINMATERIAL";
export type eventType =
  | "CREATEPLAYER"
  | "STARTLEVEL"
  | "WINLEVEL"
  | "OPENSPELL"
  | "UPDATESPELL"
  | "STARTENDLESS"
  | "PASSCHECKPOINT";
