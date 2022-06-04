export type IPlayerEvent = {
  playerId: number;
  eventId: number;
  type: "CREATEPLAYER" | "STARTLEVEL" | "WINLEVEL";
  created: Date;
};

export type ICreatePlayerEvent = {
  eventId: number;
  playerName: string;
};

export type IStartLevelEvent = {
  eventId: number;
  energyPrice: number;
  //   mode: string;
  //   characterId: number;
  //   levelId: number;
};

export type IWinLevelEvent = {
  eventId: number;
  mode: "story" | "quest";
  characterId: number;
  levelId: number;
};

export const playerEvents: IPlayerEvent[] = [
  {
    playerId: 1,
    eventId: 0,
    type: "CREATEPLAYER",
    created: new Date(1654347193),
  },
  {
    playerId: 1,
    eventId: 0,
    type: "STARTLEVEL",
    created: new Date(1654347300),
  },
  { playerId: 1, eventId: 0, type: "WINLEVEL", created: new Date(1654347302) },
  {
    playerId: 2,
    eventId: 1,
    type: "CREATEPLAYER",
    created: new Date(1654347310),
  },
];

export const createPlayerEvents: ICreatePlayerEvent[] = [
  { eventId: 0, playerName: "player 0 name" },
  { eventId: 1, playerName: "player 1 name" },
];

export const startLevelEvents: IStartLevelEvent[] = [
  { eventId: 0, energyPrice: 10 },
];

export const winLevelEvents: IWinLevelEvent[] = [
  { eventId: 0, characterId: 0, mode: "story", levelId: 0 },
];
