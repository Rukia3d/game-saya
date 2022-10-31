import {
  elementName,
  gameMode,
  IAdventure,
  IArena,
  ICharacter,
  IElement,
  IEndless,
  IGoal,
  IMaterial,
  IPlayer,
  IServer,
  IStory,
  IWeapon,
  weaponName,
} from "../../api/engine/types";

export const testCharacters: ICharacter[] = [
  { name: "Saya", id: 0, weapon: "chakram", element: "turquoise" },
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

const testMaterials: IMaterial[] = [
  { id: 0, name: "Gold", element: null },
  { id: 1, name: "Soul Stone", element: null },
  { id: 2, name: "Turquoise", element: "turquoise" },
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
    quests: [],
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
  ["turquoise", "garnet", "obsidian", "moonstone", "amber"].map(
    (e: string, i: number) => {
      testWeapons.push({
        name: s as weaponName,
        id: n,
        elementId: i,
        elementName: e as elementName,
        charge: 100,
        maxCharge: 100,
        state: i === 0 ? "open" : "closed",
      });
    }
  );
});

export const goals: IGoal[] = [
  {
    id: 0,
    title: "Complete 3 story levels",
    description: "Complete any 3 story levels",
    state: "new",
    screenToGo: "arcana",
    condition: { type: "any_story_levels", goal: 3, current: 0 },
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
    state: "new",
    screenToGo: "arcana",
    condition: { type: "any_endless", goal: 2, current: 0 },
    reward: [
      { ...testMaterials[0], quantity: 30 },
      { ...testMaterials[4], quantity: 25 },
    ],
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
        { id: 3, name: "Turquoise", element: "turquoise", quantity: 5 },
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
        { id: 3, name: "Turquoise", element: "turquoise", quantity: 15 },
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
        { id: 3, name: "Turquoise", element: "turquoise", quantity: 20 },
      ],
      level: "some",
      rewardPool: [],
      results: [],
      mode: "run",
    },
  ],
};

export const testArenaFight: IArena = {
  resultTime: new Date(new Date().valueOf() + 4 * 60 * 60 * 1000).valueOf(),
  mode: "fight",
  events: [
    {
      index: 0,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 25 },
        { id: 3, name: "Turquoise", element: "turquoise", quantity: 5 },
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
        { id: 3, name: "Turquoise", element: "turquoise", quantity: 15 },
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
        { id: 3, name: "Turquoise", element: "turquoise", quantity: 20 },
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
  messages: [],
  currentState: { state: "MAIN" },
  claims: [],
};

export const testServer: IServer = {
  arenaRun: testArenaRun,
  arenaFight: testArenaFight,
  arenaRunHistory: [],
  arenaFightHistory: [],
};
