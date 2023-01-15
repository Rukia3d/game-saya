export type IPoint = { x: number; y: number; name?: string };

export type ISizedPoint = {
  point: IPoint;
  size: IPoint;
};

// GAME

export interface IReel {
  layout: string;
  panels: IReelPanel[];
}

export interface IReelPanel {
  imageAddress: string;
  text?: string;
  name?: string;
}

export interface IEntity extends ISizedPoint {
  type: "bullet" | "enemy" | "coin";
  id: number;
  lifetime: number | null;
  initiateCollisions: boolean;
  movement: {
    type: null | "line";
  };
}

export interface IRun {
  settingName: string;
  setting: string;
  map: ICell[][];
  enemies: {
    coordinates: IMapEnemyCell[];
    content: IMapEnemy[];
  };
  entities: IEntity[];
  type: gameMode;
  musicAddress: string;
  triggers: {
    coordinates: IMapTriggerCell[];
    content: IMapTrigger[];
  };
  dialogues: IDialogue[];
  collections: { id: number }[];
}

export interface ILine {
  id: number;
  text: string[];
  image: string;
}

export interface IDialogue {
  id: number;
  lines: ILine[];
  background: string;
}

export interface IFight {
  settingName: string;
  setting: string;
  map: ICell[][];
  type: gameMode;
  enemies: {
    map: { type: "enemy"; x: number; y: number }[];
    content: { id: number }[];
  };
  musicAddress: string;
  triggers: {
    type: "trigger";
    x: number;
    y: number;
    triggerId: number;
  }[];
  dialogues: { id: number }[];
  collections: { id: number }[];
}

export type ILayout = IRun;

export type cellType = "space" | "trigger" | "obstacle" | "enemy";

export interface ILevel {
  levels: ILayout[];
  element: { id: number; name: string }[];
  opening?: IReel[];
  ending?: IReel[];
}

export type ICell = { type: cellType };

//-//-//-//-//
export interface ICharacter {
  id: number;
  name: string;
  weapon: string;
  material: { id: number; name: string };
}

export interface IWeaponMaterial {
  id: number;
  name: string;
  charge: number;
  maxCharge: number;
  state: boolState;
}

export interface IWeapon {
  id: number;
  name: string;
  materials: IWeaponMaterial[];
}

export interface IInventory {
  id: number;
  name: string;
}

export type IInventoryQuant = IInventory & { quantity: number };

export interface IQuest {
  id: number;
  state: questState;
  name: string;
  description: string;
  element: { id: number; name: string };
  stories: IStory[];
}

export type IQuestListing = IQuest & { price: number; owner: number };

export interface IEndless {
  id: number;
  element: { id: number; name: string };
  mode: gameMode;
  energy: number;
  checkpoint: number | null;
  level: ILevel;
  allowedRewards: IInventoryQuant[];
}

export interface IStoryReward {
  id: number;
  elementId: number;
  storyId: number;
  reward: IInventoryQuant[];
}

export interface IEventReward {
  id: number;
  elementId: number;
  reward: IInventoryQuant[];
}

export interface IStory {
  name: string;
  id: number;
  chapters: IChapter[];
}

export interface IChapter {
  id: number;
  mode: string;
  name: string;
  state: levelState;
  level: ILevel;
  firstTimeRewards: IInventoryQuant[];
  staticRewards: IInventoryQuant[];
  energy: number;
  storyId: number;
  adventureId: number;
}

export interface IAdventure {
  character: ICharacter;
  id: number;
  stories: IStory[];
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
  stake: IInventoryQuant[];
  mode: gameMode;
  level: ILevel;
  rewardPool: IInventoryQuant[];
  results: IArenaResult[];
}

export interface IArenaResultPool {
  place: number;
  reward: IInventoryQuant[];
}

export type IArenaEventWithTime = IArenaEvent & { resultTime: number };

export interface IArenaResult {
  playerName: string;
  playerId: number;
  time: number;
}

export interface IMission {
  name: string;
  reward: IInventory;
  completed: boolean;
  progress: number;
}

export interface ICurrentState {
  state: currentState;
  story?: {
    storyId: number;
    chapterId: number;
    adventureId: number;
  };
  materials?: IInventoryQuant[];
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
  nextLiveDistribution: number;
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
  loungeId: number | null;
  maxEnergy: number;
  materials: IInventoryQuant[];
  adventures: IAdventure[];
  weapons: IWeapon[];
  goals: IGoal[];
  collections: ICollection[];
  messages: IMessage[];
  currentState: ICurrentState;
  claims: IClaimReward[];
  lastActive: number;
}

export interface IPage {
  id: number;
  title: string;
  text: string;
  image?: string;
}

export interface ICollection {
  id: number;
  title: string;
  pages: IPage[];
  maxPages: number;
}

export interface IGoal {
  id: number;
  title: string;
  description: string;
  state: "new" | "started" | "claimable";
  screenToGo: string;
  reward: IInventoryQuant[];
  condition: IGoalCondition;
  claimId?: number;
}

export interface IGoalCondition {
  type: goalType;
  goal: number;
  current: number;
}

export interface IMessage {
  text: string;
  read: boolean;
  claimId?: number;
}

export interface IClaimReward {
  id: number;
  prize: IInventoryQuant[];
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
  | IServerDistributeLivesEvent
  | IArenaStartEvent
  | IArenaEndEvent
  | IClaimRewardEvent;

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
  chapterId: number;
  storyId: number;
  adventureId: number;
};

export type IStartLevelData = {
  playerId: number;
  created: number;
  type: "STARTLEVEL";
  data: {
    chapterId: number;
    adventureId: number;
    storyId: number;
  };
};

export type IStartLevelEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "STARTLEVEL";
  chapterId: number;
  storyId: number;
  adventureId: number;
};

// WINLEVEL
export type IWinLevelDB = {
  eventId: number;
  playerId: number;
  elementId: number;
  adventureId: number;
  mode: gameMode;
  storyId: number;
};

export type IWinLevelData = {
  playerId: number;
  created: number;
  type: "WINLEVEL";
  data: {
    chapterId: number;
    adventureId: number;
    storyId: number;
  };
};

export type IWinLevelEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "WINLEVEL";
  chapterId: number;
  adventureId: number;
  storyId: number;
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
  adventureId: number;
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

// CLAIM REWARD
export type IClaimRewardDB = {
  eventId: number;
  playerId: number;
  claimId: number;
};

export type IClaimRewardData = {
  playerId: number;
  created: number;
  type: "CLAIMREWARD";
  data: {
    claimId: number;
  };
};

export type IClaimRewardEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "CLAIMREWARD";
  claimId: number;
};

// PLAYER ARENA
export type IArenaStartDB = {
  eventId: number;
  playerId: number;
  mode: arenaMode;
  index: number;
};

export type IArenaStartData = {
  playerId: number;
  created: number;
  type: "ARENASTART";
  data: {
    mode: arenaMode;
    index: number;
  };
};

export type IArenaStartEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "ARENASTART";
  mode: arenaMode;
  index: number;
};

export type IArenaEndDB = {
  eventId: number;
  playerId: number;
  mode: arenaMode;
  index: number;
};

export type IArenaEndData = {
  playerId: number;
  created: number;
  type: "ARENAEND";
  data: {
    mode: arenaMode;
    index: number;
  };
};

export type IArenaEndEvent = {
  playerId: number;
  eventId: number;
  created: number;
  type: "ARENAEND";
  mode: arenaMode;
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
  created: number;
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

export type IServerDistributeLivesDB = {
  eventId: number;
  created: number;
};

export type IServerDistributeLivesData = {
  created: number;
};

export type IServerDistributeLivesEvent = {
  eventId: number;
  type: "DISTRIBUTELIVES";
  created: number;
};

export type IMapEnemy = { id: number };
export type IMapTrigger = {
  id: number;
  type: triggerType;
  active: boolean;
  data?: { dialogueId?: number; x?: number; value?: number };
};
export type IMapDialogue = { id: number };
export type IMapEnemyCell = ISizedPoint & {
  type: "enemy";
  enemyId: number;
};
export type IMapTriggerCell = ISizedPoint & {
  type: "trigger";
  triggerId: number;
};

export type materialName =
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

export type spellState = "closed" | "open" | "listed";
export type questState = "owned" | "rented" | "new";
export type gameMode = "story" | "quest" | "run" | "fight";
export type levelState = "open" | "closed" | "complete";
export type boolState = "open" | "closed";
export type arenaMode = "run" | "fight";
export type triggerType = "dialogue" | "win" | "coin" | "restart";
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
  | "SERVERARENAEND"
  | "DISTRIBUTELIVES";

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
