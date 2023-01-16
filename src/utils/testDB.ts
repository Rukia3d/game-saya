import {
  boolState,
  gameMode,
  IPlayer,
  IServer,
  levelState,
  cellType,
  IAdventure,
  IChapter,
  IMapEnemyCell,
  IMapEnemy,
  IMapTriggerCell,
  IMapTrigger,
} from "../../api/engine/types";

const map = [
  [
    {
      type: "space" as cellType,
    },
    {
      type: "space" as cellType,
    },
    {
      type: "space" as cellType,
    },
    {
      type: "space" as cellType,
    },
    {
      type: "space" as cellType,
    },
  ],
  [
    {
      type: "obstacle" as cellType,
    },
    {
      type: "space" as cellType,
    },
    {
      type: "space" as cellType,
    },
    {
      type: "space" as cellType,
    },
    {
      type: "space" as cellType,
    },
  ],
  [
    {
      type: "obstacle" as cellType,
    },
    {
      type: "obstacle" as cellType,
    },
    {
      type: "obstacle" as cellType,
    },
    {
      type: "space" as cellType,
    },
    {
      type: "space" as cellType,
    },
  ],
  [
    {
      type: "space" as cellType,
    },
    {
      type: "space" as cellType,
    },
    {
      type: "space" as cellType,
    },
    {
      type: "space" as cellType,
    },
    {
      type: "space" as cellType,
    },
  ],
];

const enemiesCoordinates = [
  {
    type: "enemy" as const,
    enemyId: 0,
    point: { x: 160, y: 7839 },
    size: { x: 80, y: 80 },
  },
];

const enemiesContent = [{ id: 0 }];

const triggersContent = [
  { id: 0, type: "dialogue" as const, active: true, data: { dialogueId: 0 } },
];

const triggersCoordinates = [
  {
    type: "trigger" as const,
    triggerId: 0,
    point: { x: 0, y: 7999 },
    size: { x: 80, y: 80 },
  },
];

const opening = [
  {
    layout: "4topRiht",
    panels: [
      {
        imageAddress: "4topRiht-test1",
      },
      {
        imageAddress: "4topRiht-test2",
      },
      {
        imageAddress: "4topRiht-test3",
      },
      {
        imageAddress: "4topRiht-test4",
      },
    ],
  },
  {
    layout: "5top3",
    panels: [
      {
        imageAddress: "5top3-test1",
      },
      {
        imageAddress: "5top3-test2",
      },
      {
        imageAddress: "5top3-test3",
      },
      {
        imageAddress: "5top3-test4",
      },
      {
        imageAddress: "5top3-test5",
      },
    ],
  },
  {
    layout: "1full",
    panels: [
      {
        imageAddress: "1full-test1",
      },
    ],
  },
  {
    layout: "4bottomRight",
    panels: [
      {
        imageAddress: "4bottomRiht-test1",
      },
      {
        imageAddress: "4bottomRiht-test2",
      },
      {
        imageAddress: "4bottomRiht-test3",
      },
      {
        imageAddress: "4bottomRiht-test4",
      },
    ],
  },
];

const firstTimeRewards = [
  {
    id: 1,
    name: "gold",
    quantity: 50,
    initial: true,
  },
  {
    id: 5,
    name: "jade",
    quantity: 50,
    initial: true,
  },
  {
    id: 3,
    name: "blackstone",
    quantity: 5,
    initial: true,
  },
];

const staticRewards = [
  {
    id: 1,
    name: "gold",
    quantity: 25,
    initial: false,
  },
  {
    id: 5,
    name: "jade",
    quantity: 25,
    initial: false,
  },
];

const chapters: IChapter[] = [
  {
    id: 0,
    mode: "run" as gameMode,
    name: "Lake",
    state: "open" as levelState,
    level: {
      levels: [
        {
          settingName: "Wood",
          setting: "forest",
          map: map,
          entities: [],
          enemiesContent: enemiesContent,
          triggersContent: triggersContent,
          enemies: enemiesCoordinates,
          triggers: triggersCoordinates,
          type: "run" as gameMode,
          musicAddress: "testmusic",
          dialogues: [
            {
              id: 0,
              lines: [{ id: 0, text: ["Hello", "World"], image: "address" }],
              background: "address",
            },
          ],
          collections: [{ id: 0 }],
        },
      ],
      element: [
        {
          id: 0,
          name: "jade",
        },
      ],
      opening: opening,
      ending: opening,
    },
    firstTimeRewards: firstTimeRewards,
    staticRewards: staticRewards,
    energy: 5,
    storyId: 0,
    adventureId: 0,
  },
];

const adventures: IAdventure[] = [
  {
    character: {
      id: 0,
      name: "Sayuri",
      weapon: "Chakram",
      material: {
        id: 5,
        name: "jade",
      },
    },
    id: 0,
    stories: [
      {
        name: "Chapter 0 of Story 0",
        id: 0,
        chapters: chapters,
      },
    ],
    endless: [],
    quests: [],
  },
];

const materials = [
  {
    id: 0,
    name: "energy",
    quantity: 50,
  },
  {
    id: 1,
    name: "gold",
    quantity: 0,
  },
  {
    id: 2,
    name: "experience",
    quantity: 0,
  },
  {
    id: 3,
    name: "blackstone",
    quantity: 0,
  },
  {
    id: 4,
    name: "whitestone",
    quantity: 0,
  },
  {
    id: 5,
    name: "jade",
    quantity: 0,
  },
  {
    id: 6,
    name: "garnet",
    quantity: 0,
  },
  {
    id: 7,
    name: "obsidian",
    quantity: 0,
  },
  {
    id: 8,
    name: "moonstone",
    quantity: 0,
  },
  {
    id: 9,
    name: "amber",
    quantity: 0,
  },
];

const weapons = [
  {
    id: 0,
    name: "Chakram",
    materials: [
      {
        id: 4,
        name: "whitestone",
        charge: 100,
        maxCharge: 100,
        state: "open" as boolState,
      },
      {
        id: 5,
        name: "jade",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 6,
        name: "garnet",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 7,
        name: "obsidian",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 8,
        name: "moonstone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 9,
        name: "amber",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
    ],
  },
  {
    id: 1,
    name: "Longsword",
    materials: [
      {
        id: 4,
        name: "whitestone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 5,
        name: "jade",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 6,
        name: "garnet",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 7,
        name: "obsidian",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 8,
        name: "moonstone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 9,
        name: "amber",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
    ],
  },
  {
    id: 2,
    name: "Scythe",
    materials: [
      {
        id: 4,
        name: "whitestone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 5,
        name: "jade",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 6,
        name: "garnet",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 7,
        name: "obsidian",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 8,
        name: "moonstone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 9,
        name: "amber",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
    ],
  },
  {
    id: 3,
    name: "Scroll",
    materials: [
      {
        id: 4,
        name: "whitestone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 5,
        name: "jade",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 6,
        name: "garnet",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 7,
        name: "obsidian",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 8,
        name: "moonstone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 9,
        name: "amber",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
    ],
  },
  {
    id: 4,
    name: "Daggers",
    materials: [
      {
        id: 4,
        name: "whitestone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 5,
        name: "jade",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 6,
        name: "garnet",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 7,
        name: "obsidian",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 8,
        name: "moonstone",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
      {
        id: 9,
        name: "amber",
        charge: 100,
        maxCharge: 100,
        state: "closed" as boolState,
      },
    ],
  },
];

export const testPlayer: IPlayer = {
  id: 0,
  name: "BASEPLAYER",
  loungeId: null,
  maxEnergy: 100,
  materials: materials,
  adventures: adventures,
  weapons: weapons,
  goals: [],
  collections: [],
  messages: [],
  currentState: { state: "MAIN" },
  claims: [],
  lastActive: new Date().valueOf(),
};

export const testServer: IServer = {
  arenaRun: { events: [], resultTime: 1654347193, mode: "run" },
  arenaFight: { events: [], resultTime: 1654347193, mode: "fight" },
  arenaRunHistory: [],
  arenaFightHistory: [],
  nextLiveDistribution: (Date.now() + 5000).valueOf(),
};
