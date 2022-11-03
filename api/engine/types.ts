export interface ISpell {
  id: number;
  elementId: number;
  element: elementName;
  strength: number;
  symbol: string; // Unknown for now
  state: spellState;
  name: string;
}

export interface ICharacter {
  id: number;
  name: string;
  weapon: weaponName;
  element: elementName;
}

export interface IWeapon {
  id: number;
  name: weaponName;
  elementName: elementName;
  elementId: number;
  charge: number;
  maxCharge: number;
  state: "open" | "closed";
}

export type ISpellListing = {
  listingId: number;
  spell: ISpellOpen;
  price: number;
  currency: "ETH" | "USDC" | "TOKEN";
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
  name: materialName;
  element: null | elementName;
}

export type IMaterialQuant = IMaterial & { quantity: number };

export interface IQuest {
  id: number;
  state: questState;
  levels: []; //Unknown for now
}

export type IQuestListing = IQuest & { price: number; owner: number };

export interface IEndless {
  id: number;
  elementId: number;
  mode: gameMode;
  energy: number;
  checkpoint: number | null;
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

export interface IAdventure {
  id: number;
  name: string;
  description: string;
  elementId: number;
  stories: IStory[];
}

export interface IStory {
  id: number;
  elementId: number;
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

export interface IElement {
  character: ICharacter;
  id: number;
  adventures: IAdventure[];
  endless: IEndless[];
  quests: IQuest[];
}

export interface IArena {
  events: IArenaEvent[];
  resultTime: number;
  mode: gameMode;
}

export interface IArenaEvent {
  index: number;
  stake: IMaterialQuant[];
  mode: gameMode;
  level: string; //Unknown for now
  rewardPool: IMaterialQuant[];
  results: IArenaResult[];
}

export interface IArenaResultPool {
  place: number;
  reward: IMaterialQuant[];
}

export type IArenaEventWithTime = IArenaEvent & { resultTime: number };

export interface IArenaResult {
  playerName: string;
  playerId: number;
  time: number;
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
    element: number;
  };
  materials?: IMaterialQuant[];
  arena?: {
    mode: gameMode;
    index: number;
    startTime: number;
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
  players: IPlayer[];
}

export interface IGamePlayer {
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
  elements: IElement[];
  weapons: IWeapon[];
  goals: IGoal[];
  collections: ICollection[];
  messages: IMessage[];
  currentState: ICurrentState;
  claims: IClaimReward[];
}

export interface IPage {
  title: string;
  text: string;
  image?: string;
}

export interface ICollection {
  id: number;
  title: string;
  pages: IPage[];
}

export interface IGoal {
  id: number;
  title: string;
  description: string;
  state: "new" | "started" | "claimable";
  screenToGo: string;
  reward: IMaterialQuant[];
  condition: IGoalCondition;
}

export interface IGoalCondition {
  type: goalType;
  goal: number;
  current: number;
}

export interface IMessage {
  header: string;
  text: string;
  read: boolean;
  claimId?: number;
}

export interface IClaimReward {
  id: number;
  prize: IMaterialQuant[];
  claimed: boolean;
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
  | IListSpellEvent
  | IDelistSpellEvent
  | IBuySpellEvent
  | IStartEndlessEvent
  | IPassCheckpointEvent
  | IMissCheckpointEvent
  | IServerArenaStartEvent
  | IServerArenaEndEvent
  | IArenaStartEvent
  | IArenaEndEvent;

export type IEventDB = {
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
  playerId: number;
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
  playerId: number;
  elementId: number;
  mode: gameMode;
  levelId: number;
};

export type IStartLevelData = {
  playerId: number;
  created: number;
  type: "STARTLEVEL";
  data: {
    elementId: number;
    mode: gameMode;
    levelId: number;
  };
};

export type IStartLevelEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "STARTLEVEL";
  elementId: number;
  mode: gameMode;
  levelId: number;
};

// WINLEVEL
export type IWinLevelDB = {
  eventId: number;
  playerId: number;
  elementId: number;
  mode: gameMode;
  levelId: number;
};

export type IWinLevelData = {
  playerId: number;
  created: number;
  type: "WINLEVEL";
  data: {
    elementId: number;
    mode: gameMode;
    levelId: number;
  };
};

export type IWinLevelEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "WINLEVEL";
  elementId: number;
  mode: gameMode;
  levelId: number;
};

// OPENSPELL
export type IOpenSpellDB = {
  eventId: number;
  playerId: number;
  elementId: number;
  spellId: number;
};

export type IOpenSpellData = {
  playerId: number;
  created: number;
  type: "OPENSPELL";
  data: {
    elementId: number;
    spellId: number;
  };
};

export type IOpenSpellEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "OPENSPELL";
  elementId: number;
  spellId: number;
};

// UPDATESPELL
export type IUpdateSpellDB = {
  eventId: number;
  playerId: number;
  elementId: number;
  spellId: number;
};

export type IUpdateSpellData = {
  playerId: number;
  created: number;
  type: "UPDATESPELL";
  data: {
    elementId: number;
    spellId: number;
  };
};

export type IUpdateSpellEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "UPDATESPELL";
  elementId: number;
  spellId: number;
};

// LISTSPELL
export type IListSpellDB = {
  eventId: number;
  playerId: number;
  spellId: number;
  currency: "ETH" | "USDC" | "TOKEN";
  price: number;
};

export type IListSpellData = {
  playerId: number;
  created: number;
  type: "LISTSPELL";
  data: {
    spellId: number;
    price: number;
    currency: "ETH" | "USDC" | "TOKEN";
  };
};

export type IListSpellEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "LISTSPELL";
  spellId: number;
  price: number;
  currency: "ETH" | "USDC" | "TOKEN";
};

// DELISTSPELL
export type IDelistSpellDB = {
  eventId: number;
  playerId: number;
  listingId: number;
};

export type IDelistSpellData = {
  playerId: number;
  created: number;
  type: "DELISTSPELL";
  data: {
    listingId: number;
  };
};

export type IDelistSpellEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "DELISTSPELL";
  listingId: number;
};

// BUYSPELL
export type IBuySpellDB = {
  eventId: number;
  playerId: number;
  listingId: number;
};

export type IBuySpellData = {
  playerId: number;
  created: number;
  type: "BUYSPELL";
  data: {
    listingId: number;
  };
};

export type IBuySpellEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "BUYSPELL";
  listingId: number;
};

// STARTENDLESS
export type IStartEndlessDB = {
  eventId: number;
  playerId: number;
  elementId: number;
  mode: gameMode;
};

export type IStartEndlessData = {
  playerId: number;
  created: number;
  type: "STARTENDLESS";
  data: {
    elementId: number;
    mode: gameMode;
  };
};

export type IStartEndlessEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "STARTENDLESS";
  elementId: number;
  mode: gameMode;
};

// PASSCHECKPOINT
export type IPassCheckpointDB = {
  eventId: number;
  playerId: number;
  elementId: number;
  mode: gameMode;
  checkpoint: number;
};

export type IPassCheckpointData = {
  playerId: number;
  created: number;
  type: "PASSCHECKPOINT";
  data: {
    elementId: number;
    mode: gameMode;
    checkpoint: number;
  };
};

export type IPassCheckpointEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "PASSCHECKPOINT";
  elementId: number;
  mode: gameMode;
  checkpoint: number;
};

// MISSCHECKPOINT
export type IMissCheckpointDB = {
  eventId: number;
  playerId: number;
  elementId: number;
  mode: gameMode;
};

export type IMissCheckpointData = {
  playerId: number;
  created: number;
  type: "MISSCHECKPOINT";
  data: {
    elementId: number;
    mode: gameMode;
  };
};

export type IMissCheckpointEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "MISSCHECKPOINT";
  elementId: number;
  mode: gameMode;
};

// PLAYER ARENA
export type IArenaStartDB = {
  eventId: number;
  playerId: number;
  mode: gameMode;
  index: number;
};

export type IArenaStartData = {
  playerId: number;
  created: number;
  type: "ARENASTART";
  data: {
    mode: gameMode;
    index: number;
  };
};

export type IArenaStartEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "ARENASTART";
  mode: gameMode;
  index: number;
};

export type IArenaEndDB = {
  eventId: number;
  playerId: number;
  mode: gameMode;
  index: number;
};

export type IArenaEndData = {
  playerId: number;
  created: number;
  type: "ARENAEND";
  data: {
    mode: gameMode;
    index: number;
  };
};

export type IArenaEndEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "ARENAEND";
  mode: gameMode;
  index: number;
};

// ARENA
export type IServerArenaStartDB = {
  eventId: number;
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
  start: number;
  end: number;
  created: number;
};

export type IServerArenaEndDB = {
  eventId: number;
  created: number;
};

export type IServerArenaEndEvent = {
  eventId: number;
  type: "SERVERARENAEND";
  created: number;
};

export type IPlayerArenaStartDB = {
  eventId: number;
  playerId: number;
  index: number;
  mode: gameMode;
};
export type elementName =
  | "jade"
  | "garnet"
  | "obsidian"
  | "moonstone"
  | "amber";

export type weaponName =
  | "chakram"
  | "greatsword"
  | "scythe"
  | "scroll"
  | "daggers";

export type materialName =
  | "Gold"
  | "Soul Stone"
  | "Jade"
  | "Garnet"
  | "Obsidian"
  | "Moonstone"
  | "Amber";

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
export type eventType =
  | "CREATEPLAYER"
  | "STARTLEVEL"
  | "WINLEVEL"
  | "OPENSPELL"
  | "UPDATESPELL"
  | "LISTSPELL"
  | "DELISTSPELL"
  | "BUYSPELL"
  | "STARTENDLESS"
  | "PASSCHECKPOINT"
  | "MISSCHECKPOINT"
  | "ARENASTART"
  | "ARENAEND"
  | "SERVERARENASTART"
  | "SERVERARENAEND";

export type goalType =
  | "any_story_levels"
  | "arcana_one_story_levels"
  | "arcana_two_story_levels"
  | "arcana_three_story_levels"
  | "arcana_four_story_levels"
  | "arcana_five_story_levels"
  | "new_story_levels"
  | "material_money_get"
  | "material_resource1_get"
  | "material_resource2_get"
  | "material_resource3_get"
  | "material_resource4_get"
  | "material_resource5_get"
  | "any_arena_levels"
  | "arena_run_levels"
  | "arena_fight_levels"
  | "any_endless"
  | "arcana_one_endless"
  | "arcana_two_endless"
  | "arcana_three_endless"
  | "arcana_four_endless"
  | "arcana_five_endless"
  | "spell_open"
  | "spell_update"
  | "spell_list";
