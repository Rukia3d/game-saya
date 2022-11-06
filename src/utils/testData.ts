import {
  elementName,
  gameMode,
  IAdventure,
  IArena,
  ICharacter,
  ICollection,
  IElement,
  IEndless,
  IGoal,
  IMaterial,
  IMessage,
  IPlayer,
  IQuest,
  IServer,
  IStory,
  IWeapon,
  weaponName,
} from "../../api/engine/types";

export const testCharacters: ICharacter[] = [
  { name: "Saya", id: 0, weapon: "chakram", element: "jade" },
  { name: "Nell", id: 1, weapon: "greatsword", element: "garnet" },
];

export const testStories: IStory[] = [0, 1, 2].map((n: number) => {
  return {
    id: n,
    elementId: 0,
    level: "",
    name: "Story" + n,
    mode: "story",
    state: "open",
    allowedRewards: [
      { id: 0, upTo: 5 },
      { id: 3, upTo: 1 },
    ],
    experience: 10,
    energy: 5,
  };
});

export const testAdventures: IAdventure[][] = testCharacters.map(
  (n: ICharacter) => {
    return [
      {
        id: n.id,
        elementId: n.id,
        stories: testStories,
        name: "SomeName",
        description: "SomeDescription",
      },
    ];
  }
);

export const testEndless: IEndless[] = ["run", "fight"].map(
  (s: string, n: number) => {
    return {
      id: n,
      elementId: 0,
      level: "",
      mode: s as gameMode,
      energy: 10,
      checkpoint: null,
      allowedRewards: [
        { id: 0, upTo: 5 },
        { id: 3, upTo: 1 },
      ],
    };
  }
);

export const testQuests: IQuest[] = [0, 1, 3].map((n: number) => {
  return {
    id: n,
    state: n === 0 ? "new" : "rented",
    name: n === 0 ? "New Quest" : "Rented Quest" + n,
    description:
      n === 0 ? "New Quest Descriotion" : "Rented Quest " + n + " Description",
    elementId: 0,
    stories: testStories,
  };
});

const testMaterials: IMaterial[] = [
  { id: 0, name: "Gold", element: null },
  { id: 1, name: "Soul Stone", element: null },
  { id: 2, name: "Jade", element: "jade" },
  { id: 3, name: "Garnet", element: "garnet" },
  { id: 4, name: "Obsidian", element: "obsidian" },
  { id: 5, name: "Moonstone", element: "moonstone" },
  { id: 6, name: "Amber", element: "amber" },
];

const testElements: IElement[] = [
  {
    character: testCharacters[0],
    id: 0,
    adventures: testAdventures[0],
    endless: testEndless,
    quests: testQuests,
  },
  {
    character: testCharacters[1],
    id: 1,
    adventures: testAdventures[1],
    endless: testEndless,
    quests: [],
  },
];

export const testWeapons: IWeapon[] = [];
["chakram", "greatsword"].map((s: string, n: number) => {
  ["jade", "garnet", "obsidian", "moonstone", "amber"].map(
    (e: string, i: number) => {
      testWeapons.push({
        name: s as weaponName,
        id: n,
        elementId: i,
        elementName: e as elementName,
        charge: i === 0 ? 40 : 100,
        maxCharge: 100,
        state: i < 2 ? "open" : "closed",
      });
    }
  );
});

export const collections: ICollection[] = [0, 1, 2].map((n: number) => {
  return {
    id: n,
    title: "Story" + n,
    maxPages: n === 0 ? 4 : 10,
    pages: [0, 1, 2, 3].map((i: number) => {
      return {
        id: i,
        title: "Story " + n + " Page title " + i,
        text: "Some text",
        image: i < 2 ? undefined : "img",
      };
    }),
  };
});

export const goals: IGoal[] = [
  {
    id: 0,
    title: "Complete 3 story levels",
    description: "Complete any 3 story levels",
    state: "new",
    screenToGo: "arcana",
    condition: { type: "any_story_levels", goal: 3, current: 1 },
    reward: [
      { ...testMaterials[0], quantity: 30 },
      { ...testMaterials[2], quantity: 25 },
    ],
  },
  {
    id: 1,
    title: "Participate in arena",
    description: "Stake and participate in arena event",
    state: "new",
    screenToGo: "arena",
    condition: { type: "any_arena_levels", goal: 1, current: 0 },
    reward: [
      { ...testMaterials[0], quantity: 30 },
      { ...testMaterials[3], quantity: 25 },
    ],
  },
  {
    id: 2,
    title: "Play 2 endless events",
    description: "Play 2 endless events",
    state: "claimable",
    screenToGo: "arcana",
    condition: { type: "any_endless", goal: 2, current: 2 },
    reward: [
      { ...testMaterials[0], quantity: 30 },
      { ...testMaterials[4], quantity: 25 },
    ],
    claimId: 0,
  },
];

export const testArenaRun: IArena = {
  resultTime: new Date(new Date().valueOf() + 50 * 1000).valueOf(),
  mode: "run",
  events: [
    {
      index: 0,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 25 },
        { id: 3, name: "Jade", element: "jade", quantity: 5 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 1,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 50 },
        { id: 3, name: "Jade", element: "jade", quantity: 15 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 2,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 100 },
        { id: 3, name: "Jade", element: "jade", quantity: 20 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
  ],
};

export const messages: IMessage[] = [0, 1].map((n: number) => {
  return {
    text:
      n === 1
        ? "You've completed 2 endless events, please claim your goal"
        : "Tomorrow the server will be in maintenance mode from 2 to 3 PM, no arena events will be hosted",
    read: false,
    claimId: n === 1 ? 0 : undefined,
  };
});

export const testArenaFight: IArena = {
  resultTime: new Date(new Date().valueOf() + 4 * 60 * 60 * 1000).valueOf(),
  mode: "fight",
  events: [
    {
      index: 0,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 25 },
        { id: 3, name: "Jade", element: "jade", quantity: 5 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 1,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 50 },
        { id: 3, name: "Jade", element: "jade", quantity: 15 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 2,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 100 },
        { id: 3, name: "Jade", element: "jade", quantity: 20 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
  ],
};

export const testPlayer: IPlayer = {
  id: 0,
  name: "TestPlayer0",
  exprience: 100,
  energy: 70,
  maxEnergy: 70,
  loungeId: null,
  materials: testMaterials.map((m: IMaterial) => {
    return { ...m, quantity: 10 };
  }),
  elements: testElements,
  weapons: testWeapons,
  goals: goals,
  collections: collections,
  messages: messages,
  currentState: { state: "MAIN" },
  claims: [],
};

export const testServer: IServer = {
  arenaRun: testArenaRun,
  arenaFight: testArenaFight,
  arenaRunHistory: [],
  arenaFightHistory: [],
};
