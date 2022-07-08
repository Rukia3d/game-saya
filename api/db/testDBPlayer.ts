import {
  IPlayerEvent,
  ICreatePlayerEvent,
  IStartLevelEvent,
  IWinLevelEvent,
  arcanaName,
  IMaterial,
  IArcana,
  IOpenSpellEvent,
  IUpdateSpellEvent,
  IStartEndlessEvent,
  IEventReward,
  IStoryReward,
  IPassCheckpointEvent,
  IMissCheckpointEvent,
} from "../engine/types";
import { eventTowerRewards, storyRewards } from "./testDBLevels";

// const testLevel = new Array(131).fill(new Array(9));
// for (let i = 0; i < testLevel.length; i++) {
//   for (let j = 0; j < testLevel[i].length; i++) {
//     testLevel[i][j] = "o";
//     if (i === 50 || i === 95 || i === 131) {
//       testLevel[i][j] = "t";
//     }
//   }
// }
// console.log(testLevel);

function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}
export const materials: IMaterial[] = [
  { id: 0, name: "Coin" },
  { id: 1, name: "Black Soul Stone" },
  { id: 2, name: "White Soul Stone" },
  { id: 3, name: "Rings" },
  { id: 4, name: "Wands" },
  { id: 5, name: "Swords" },
  { id: 6, name: "Cups" },
  { id: 7, name: "Dimonds" },
];

export const arcanas: IArcana[] = [
  {
    arcanaName: "rings" as arcanaName,
    id: 0,
    characterName: "Saya",
    stories: [
      {
        id: 0,
        level: "",
        name: "Saya story 1",
        mode: "story",
        state: "open",
        allowedRewards: ensure(
          storyRewards.find(
            (s: IStoryReward) =>
              s.id === 0 && s.arcanaId === 0 && s.storyId === 0
          )
        ).reward,
        experience: 10,
        energy: 5,
      },
      {
        id: 1,
        level: "",
        name: "Saya story 2",
        mode: "story",
        state: "closed",
        allowedRewards: ensure(
          storyRewards.find(
            (s: IStoryReward) =>
              s.id === 0 && s.arcanaId === 0 && s.storyId === 1
          )
        ).reward,
        experience: 10,
        energy: 5,
      },
      {
        id: 2,
        level: "",
        name: "Saya story 3",
        mode: "story",
        state: "closed",
        allowedRewards: ensure(
          storyRewards.find(
            (s: IStoryReward) =>
              s.id === 0 && s.arcanaId === 0 && s.storyId === 2
          )
        ).reward,
        experience: 10,
        energy: 5,
      },
    ],
    legend: ["Saya story line 1", "Saya story line 2"],
    currentQuests: [],
    currentEvents: [
      {
        id: 0,
        level: "",
        mode: "tournament",
        energy: 10,
        checkpoint: -1,
        allowedRewards: ensure(
          eventTowerRewards.find(
            (s: IEventReward) => s.id === 0 && s.arcanaId === 0
          )
        ).reward,
      },
      {
        id: 0,
        level: "",
        mode: "tower",
        energy: 10,
        checkpoint: -1,
        allowedRewards: [
          { id: 0, upTo: 5 },
          { id: 3, upTo: 1 },
        ],
      },
    ],
  },
  {
    arcanaName: "wands" as arcanaName,
    id: 1,
    characterName: "Nell",
    stories: [
      {
        id: 0,
        level: "",
        name: "Wands story 1",
        mode: "story",
        state: "closed",
        allowedRewards: [
          { id: 0, upTo: 50 },
          { id: 3, upTo: 3 },
          { id: 4, upTo: 3 },
        ],
        experience: 10,
        energy: 5,
      },
      {
        id: 1,
        level: "",
        name: "Wands story 2",
        mode: "story",
        state: "closed",
        allowedRewards: [
          { id: 0, upTo: 50 },
          { id: 3, upTo: 3 },
          { id: 4, upTo: 3 },
        ],
        energy: 5,
        experience: 10,
      },
    ],
    legend: ["Nell story line 1", "Nell story line 2"],
    currentQuests: [],
    currentEvents: [
      {
        id: 0,
        level: "",
        mode: "tournament",
        energy: 10,
        checkpoint: -1,
        allowedRewards: [
          { id: 0, upTo: 5 },
          { id: 3, upTo: 1 },
        ],
      },
      {
        id: 0,
        level: "",
        mode: "tower",
        energy: 10,
        checkpoint: -1,
        allowedRewards: [
          { id: 0, upTo: 5 },
          { id: 3, upTo: 1 },
        ],
      },
    ],
  },
];

export const allEvents: IPlayerEvent[] = [
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
  { playerId: 1, eventId: 0, type: "OPENSPELL", created: new Date(1654347302) },
  {
    playerId: 2,
    eventId: 1,
    type: "CREATEPLAYER",
    created: new Date(1654347310),
  },
];

export const createPlayerEvents: ICreatePlayerEvent[] = [
  { eventId: 0, playerName: "player 1 name" },
  { eventId: 1, playerName: "player 2 name" },
];

export const startLevelEvents: IStartLevelEvent[] = [
  { eventId: 0, arcanaId: 0, levelId: 0, mode: "story" },
];

export const winLevelEvents: IWinLevelEvent[] = [
  { eventId: 0, arcanaId: 0, levelId: 0, mode: "story" },
];

export const openSpellEvents: IOpenSpellEvent[] = [
  {
    eventId: 0,
    arcanaId: 0,
    spellId: 0,
  },
];
export const updateSpellEvents: IUpdateSpellEvent[] = [
  {
    eventId: 0,
    arcanaId: 0,
    spellId: 0,
  },
];

export const startEldessEvents: IStartEndlessEvent[] = [
  {
    eventId: 0,
    arcanaId: 0,
    mode: "tournament",
  },
];

export const passCheckpointEvents: IPassCheckpointEvent[] = [
  {
    eventId: 0,
    arcanaId: 0,
    mode: "tournament",
    checkpoint: 0,
  },
];

export const missCheckpointEvents: IMissCheckpointEvent[] = [
  {
    eventId: 0,
    arcanaId: 0,
    mode: "tournament",
  },
];
