import {
  IPlayerEvent,
  ICreatePlayerEvent,
  IStartLevelEvent,
  IWinLevelEvent,
  elementName,
  ICharacter,
  IMaterial,
} from "../engine/types";

export const materials: IMaterial[] = [
  { id: 0, name: "Coin" },
  { id: 1, name: "Black Soul Stone" },
  { id: 2, name: "White Soul Stone" },
  { id: 3, name: "Air essence" },
  { id: 4, name: "Fire essence" },
  { id: 5, name: "Metal essence" },
  { id: 6, name: "Stone essence" },
  { id: 7, name: "Water essence" },
];

export const characters: ICharacter[] = [
  {
    element: "air" as elementName,
    id: 0,
    name: "Saya",
    stories: [
      {
        id: 0,
        level: "",
        name: "air story0",
        state: "open",
        allowedRewards: [
          { id: 0, upTo: 10 },
          { id: 3, upTo: 3 },
        ],
        experience: 10,
      },
      {
        id: 1,
        level: "",
        name: "air story1",
        state: "closed",
        allowedRewards: [
          { id: 0, upTo: 50 },
          { id: 3, upTo: 3 },
          { id: 4, upTo: 3 },
        ],
        experience: 10,
      },
      {
        id: 2,
        level: "",
        name: "air story2",
        state: "closed",
        allowedRewards: [
          { id: 0, upTo: 50 },
          { id: 3, upTo: 3 },
          { id: 4, upTo: 3 },
        ],
        experience: 10,
      },
    ],
    legend: ["Saya story line 1", "Saya story line 2"],
    currentQuests: [],
    currentTournament: { id: 0, level: "" },
    currentTower: { id: 0, level: "" },
  },
  {
    element: "fire" as elementName,
    id: 1,
    name: "Nell",
    stories: [
      {
        id: 0,
        level: "",
        name: "fire some0",
        state: "closed",
        allowedRewards: [
          { id: 0, upTo: 50 },
          { id: 3, upTo: 3 },
          { id: 4, upTo: 3 },
        ],
        experience: 10,
      },
      {
        id: 1,
        level: "",
        name: "fire some1",
        state: "closed",
        allowedRewards: [
          { id: 0, upTo: 50 },
          { id: 3, upTo: 3 },
          { id: 4, upTo: 3 },
        ],
        experience: 10,
      },
    ],
    legend: ["Nell story line 1", "Nell story line 2"],
    currentQuests: [],
    currentTournament: { id: 0, level: "" },
    currentTower: { id: 0, level: "" },
  },
];

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
