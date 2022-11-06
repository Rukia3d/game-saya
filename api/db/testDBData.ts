import { testArenaFight, testArenaRun } from "../../src/utils/testDBArena";
import {
  IMaterial,
  ICharacter,
  IElement,
  IAdventure,
  elementName,
  IStory,
  IEndless,
  gameMode,
  IQuest,
  IPlayer,
  IServer,
} from "../engine/types";

export const elements: { id: number; name: elementName }[] = [
  { id: 0, name: "jade" },
  { id: 1, name: "garnet" },
  { id: 2, name: "obsidian" },
  { id: 3, name: "moonstone" },
  { id: 4, name: "amber" },
];

export const materials: IMaterial[] = [
  { id: 0, name: "Gold", element: null },
  { id: 1, name: "Soul Stone", element: null },
  { id: 2, name: "Jade", element: elements[0] },
  { id: 3, name: "Garnet", element: elements[1] },
  { id: 4, name: "Obsidian", element: elements[2] },
  { id: 5, name: "Moonstone", element: elements[3] },
  { id: 6, name: "Amber", element: elements[4] },
];

export const characters: ICharacter[] = [
  { name: "Sayuri", id: 0, weapon: "chakram", element: elements[0] },
  { name: "Nell", id: 1, weapon: "greatsword", element: elements[1] },
  //   { name: "Ichiro", id: 2, weapon: "scythe", element: elements[2] },
  //   { name: "Akemi", id: 3, weapon: "scroll", element: elements[3] },
  //   { name: "Diane", id: 4, weapon: "daggers", element: elements[4] },
];

export const stories: IStory[] = [
  // Saya stories main
  {
    id: 0,
    element: elements[0],
    mode: "story",
    name: characters[0].name + " Story0",
    state: "closed",
    level: "", // Add generated level
    allowedRewards: [
      { id: 0, upTo: 5 },
      { id: 2, upTo: 1 },
    ],
    experience: 10,
    energy: 5,
  },
  {
    id: 1,
    element: elements[0],
    mode: "story",
    name: characters[0].name + " Story1",
    state: "closed",
    level: "", // Add generated level
    allowedRewards: [
      { id: 0, upTo: 5 },
      { id: 2, upTo: 3 },
    ],
    experience: 10,
    energy: 5,
  },
  {
    id: 2,
    element: elements[0],
    mode: "story",
    name: characters[0].name + " Story2",
    state: "closed",
    level: "", // Add generated level
    allowedRewards: [
      { id: 0, upTo: 10 },
      { id: 2, upTo: 5 },
    ],
    experience: 10,
    energy: 5,
  },
  {
    id: 3,
    element: elements[1],
    mode: "story",
    name: characters[1].name + " Story0",
    state: "closed",
    level: "", // Add generated level
    allowedRewards: [
      { id: 0, upTo: 10 },
      { id: 3, upTo: 1 },
    ],
    experience: 10,
    energy: 5,
  },
  // Nell stories main
  {
    id: 4,
    element: elements[1],
    mode: "story",
    name: characters[1].name + " Story1",
    state: "closed",
    level: "", // Add generated level
    allowedRewards: [
      { id: 0, upTo: 5 },
      { id: 3, upTo: 3 },
    ],
    experience: 10,
    energy: 5,
  },
  {
    id: 5,
    element: elements[1],
    mode: "story",
    name: characters[1].name + " Story2",
    state: "closed",
    level: "", // Add generated level
    allowedRewards: [
      { id: 0, upTo: 10 },
      { id: 3, upTo: 5 },
    ],
    experience: 10,
    energy: 5,
  },
  // Saya stories quest
  {
    id: 6,
    element: elements[0],
    mode: "quest",
    name: characters[0].name + " Quest0",
    state: "closed",
    level: "", // Add generated level
    allowedRewards: [
      { id: 0, upTo: 10 },
      { id: 1, upTo: 1 },
      { id: 2, upTo: 5 },
    ],
    experience: 10,
    energy: 5,
  },
  {
    id: 7,
    element: elements[0],
    mode: "quest",
    name: characters[0].name + " Quest1",
    state: "closed",
    level: "", // Add generated level
    allowedRewards: [
      { id: 0, upTo: 10 },
      { id: 1, upTo: 1 },
      { id: 2, upTo: 5 },
    ],
    experience: 10,
    energy: 5,
  },
];

export const endless: IEndless[] = [
  {
    id: 0,
    element: elements[0],
    level: "",
    mode: "run" as gameMode,
    energy: 10,
    checkpoint: null,
    allowedRewards: [
      { id: 0, upTo: 5 },
      { id: 3, upTo: 1 },
    ],
  },
  {
    id: 1,
    element: elements[0],
    level: "",
    mode: "fight" as gameMode,
    energy: 10,
    checkpoint: null,
    allowedRewards: [
      { id: 0, upTo: 5 },
      { id: 3, upTo: 1 },
    ],
  },
  {
    id: 2,
    element: elements[1],
    level: "",
    mode: "run" as gameMode,
    energy: 10,
    checkpoint: null,
    allowedRewards: [
      { id: 0, upTo: 5 },
      { id: 4, upTo: 1 },
    ],
  },
  {
    id: 3,
    element: elements[1],
    level: "",
    mode: "fight" as gameMode,
    energy: 10,
    checkpoint: null,
    allowedRewards: [
      { id: 0, upTo: 5 },
      { id: 4, upTo: 1 },
    ],
  },
];
export const adventures: IAdventure[] = [
  {
    id: 0,
    element: elements[0],
    stories: [stories[0], stories[1], stories[2]],
  },
  {
    id: 1,
    element: elements[1],
    stories: [stories[3], stories[4], stories[5]],
  },
];

export const quests: IQuest[] = [
  {
    id: 0,
    state: "rented",
    name: elements[0].name + " Quest0",
    description: elements[0].name + " Quest0 Description",
    element: elements[0],
    stories: [stories[6], stories[7]],
  },
  {
    id: 2,
    state: "new",
    name: elements[0].name + " Quest1",
    description: elements[0].name + " Quest1 Description",
    element: elements[0],
    stories: [stories[6], stories[7]],
  },
];

export const elementAdventure: IElement[] = [
  {
    id: 0,
    character: characters[0],
    adventures: [adventures[0]],
    endless: [endless[0], endless[1]],
    quests: [quests[0], quests[1]],
  },
  {
    id: 1,
    character: characters[1],
    adventures: [adventures[1]],
    endless: [endless[2], endless[3]],
    quests: [],
  },
];

export const basePlayer: IPlayer = {
  id: 0,
  name: "",
  exprience: 0,
  energy: 50,
  maxEnergy: 50,
  loungeId: null,
  materials: [],
  elements: [],
  weapons: [],
  goals: [],
  collections: [],
  messages: [],
  currentState: { state: "MAIN" },
  claims: [],
};

export const baseServer: IServer = {
  arenaRun: testArenaRun,
  arenaFight: testArenaFight,
  arenaRunHistory: [],
  arenaFightHistory: [],
};
