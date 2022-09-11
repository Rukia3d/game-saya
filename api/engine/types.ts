export interface ISpell {
  id: number;
  arcanaId: number;
  enemy: arcanaName;
  strength: number;
  symbol: string; // Unknown for now
  state: spellState;
  name: string;
}

export type ISpellListing = {
  spellId: number;
  spellarcanaId: number;
  price: number;
  owner: number;
};

export type ISpellPrice = {
  spellId: number;
  arcanaId: number;
  price: IMaterialQuant[];
};

export type ISpellUpdate = {
  spellId: number;
  arcanaId: number;
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
  checkpoint: number | null;
  level: string; //Unknown for now
  allowedRewards: IAllowedRewards[];
}

export interface IStoryReward {
  id: number;
  arcanaId: number;
  storyId: number;
  reward: IAllowedRewards[];
}

export interface IEventReward {
  id: number;
  arcanaId: number;
  reward: IAllowedRewards[];
}

export interface IStory {
  id: number;
  mode: gameMode;
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

export interface IArcana {
  arcanaName: arcanaName;
  id: number;
  characterName: string;
  legend: string[];
  stories: IStory[]; //Unknown for now
  currentQuests: IStory[]; //Unknown for now
  currentEvents: IEvent[];
}

export interface IArena {
  events: IArenaEvent[];
  resultTime: number;
  type: arenaType;
}

export interface IArenaEvent {
  index: number;
  stake: IMaterialQuant[];
  mode: gameMode;
  level: string; //Unknown for now
  rewardPool: IMaterialQuant[];
  results: IArenaResult[];
}

export interface IArenaResult {
  playerName: string;
  playerId: number;
  time: number;
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
    level?: number;
    mode: gameMode;
    arcana: number;
  };
  materials?: IMaterialQuant[];
  arena?: {
    mode: gameMode;
    index: number;
    time: number;
  };
  arenaResult?: {
    results: IArenaResult[];
    result: number;
  };
}

export interface IServer {
  arenaRun: IArena;
  arenaFight: IArena;
  arenaRunHistory: IArena[];
  arenaFightHistory: IArena[];
}

export interface IGame {
  server: IServer;
  player: IPlayer;
}

export interface IPlayer {
  id: number;
  name: string;
  exprience: number;
  energy: number;
  maxEnergy: number;
  loungeId: number | null;
  materials: IMaterialQuant[];
  arcanas: IArcana[];
  spells: (ISpellOpen | ISpellClosed | ISpell)[];
  missions: [];
  messages: [];
  currentState: ICurrentState;
}

export type IServerEvent = {
  id: number;
  eventId: number;
  type: eventType;
  created: number;
};

export type IGameEvent =
  | ICreatePlayerEvent
  | IStartLevelEvent
  | IWinLevelEvent
  | IOpenSpellEvent
  | IUpdateSpellEvent
  | IStartEndlessEvent
  | IPassCheckpointEvent
  | IMissCheckpointEvent
  | IServerArenaStartEvent;

export type IEventDB = {
  playerId: number | null;
  eventId: number;
  type: eventType;
  created: number;
};

// CREATEPLAYER
export type ICreatePlayerData = {
  created: number;
  type: "CREATEPLAYER";
  data: {
    name: string;
  };
};

export type ICreatePlayerDB = {
  eventId: number;
  playerName: string;
};

export type ICreatePlayerEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "CREATEPLAYER";
  playerName: string;
};

// STARTLEVEL
export type IStartLevelDB = {
  eventId: number;
  arcanaId: number;
  mode: gameMode;
  levelId: number;
};

export type IStartLevelData = {
  playerId: number;
  created: number;
  type: "STARTLEVEL";
  data: {
    arcanaId: number;
    mode: gameMode;
    levelId: number;
  };
};

export type IStartLevelEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "STARTLEVEL";
  arcanaId: number;
  mode: gameMode;
  levelId: number;
};

// WINLEVEL
export type IWinLevelDB = {
  eventId: number;
  arcanaId: number;
  mode: gameMode;
  levelId: number;
};

export type IWinLevelData = {
  playerId: number;
  created: number;
  type: "WINLEVEL";
  data: {
    arcanaId: number;
    mode: gameMode;
    levelId: number;
  };
};

export type IWinLevelEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "WINLEVEL";
  arcanaId: number;
  mode: gameMode;
  levelId: number;
};

// OPENSPELL
export type IOpenSpellDB = {
  eventId: number;
  arcanaId: number;
  spellId: number;
};

export type IOpenSpellData = {
  playerId: number;
  created: number;
  type: "OPENSPELL";
  data: {
    arcanaId: number;
    spellId: number;
  };
};

export type IOpenSpellEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "OPENSPELL";
  arcanaId: number;
  spellId: number;
};

// UPDATESPELL
export type IUpdateSpellDB = {
  eventId: number;
  arcanaId: number;
  spellId: number;
};

export type IUpdateSpellData = {
  playerId: number;
  created: number;
  type: "UPDATESPELL";
  data: {
    arcanaId: number;
    spellId: number;
  };
};

export type IUpdateSpellEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "UPDATESPELL";
  arcanaId: number;
  spellId: number;
};

// STARTENDLESS
export type IStartEndlessDB = {
  eventId: number;
  arcanaId: number;
  mode: gameMode;
};

export type IStartEndlessData = {
  playerId: number;
  created: number;
  type: "STARTENDLESS";
  data: {
    arcanaId: number;
    mode: gameMode;
  };
};

export type IStartEndlessEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "STARTENDLESS";
  arcanaId: number;
  mode: gameMode;
};

// PASSCHECKPOINT
export type IPassCheckpointDB = {
  eventId: number;
  arcanaId: number;
  mode: gameMode;
  checkpoint: number;
};

export type IPassCheckpointData = {
  playerId: number;
  created: number;
  type: "PASSCHECKPOINT";
  data: {
    arcanaId: number;
    mode: gameMode;
    checkpoint: number;
  };
};

export type IPassCheckpointEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "PASSCHECKPOINT";
  arcanaId: number;
  mode: gameMode;
  checkpoint: number;
};

// MISSCHECKPOINT
export type IMissCheckpointDB = {
  eventId: number;
  arcanaId: number;
  mode: gameMode;
};

export type IMissCheckpointData = {
  playerId: number;
  created: number;
  type: "MISSCHECKPOINT";
  data: {
    arcanaId: number;
    mode: gameMode;
  };
};

export type IMissCheckpointEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "MISSCHECKPOINT";
  arcanaId: number;
  mode: gameMode;
};

// ARENA
export type IServerArenaStartDB = {
  eventId: number;
  mode: gameMode;
  created: number;
  start: number;
  end: number;
};

export type IServerArenaStartData = {
  startDate: number;
  endDate: number;
};

export type IServerArenaStartEvent = {
  eventId: number;
  type: "SERVERARENASTART";
  mode: gameMode;
  start: number;
  end: number;
  created: number;
};

export type IPlayerArenaStartDB = {
  eventId: number;
  playerId: number;
  index: number;
  mode: gameMode;
};

export type arcanaName = "rings" | "cups" | "wands" | "swords" | "dimonds";
export type spellState = "closed" | "open" | "listed";
export type questState = "open" | "rented" | "new";
export type gameMode = "story" | "quest" | "run" | "fight";
export type levelState = "open" | "closed" | "complete";
export type arenaType = "run" | "fight";
export type currentState =
  | "MAIN"
  | "PLAY"
  | "SPELLS"
  | "WINMATERIAL"
  | "ARENAPLAY";
export type eventType = genericEventType | playerEventType;
export type genericEventType = "CREATEARENARUN";
export type playerEventType =
  | "CREATEPLAYER"
  | "STARTLEVEL"
  | "WINLEVEL"
  | "OPENSPELL"
  | "UPDATESPELL"
  | "STARTENDLESS"
  | "PASSCHECKPOINT"
  | "MISSCHECKPOINT"
  | "ARENASTART"
  | "ARENAEND"
  | "SERVERARENASTART";
