import {
  elementName,
  gameMode,
  IAdventure,
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
} from "../engine/types";
import { arenaFight, arenaRun } from "./testDBArena";

function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export const basePlayer: IPlayer = {
  id: 0,
  name: "",
  exprience: 0,
  energy: 0,
  maxEnergy: 0,
  loungeId: null,
  materials: [],
  elements: [],
  weapons: [],
  goals: [],
  messages: [],
  claims: [],
  currentState: { state: "MAIN" },
};

export const baseServer: IServer = {
  arenaRun: arenaRun,
  arenaFight: arenaFight,
  arenaRunHistory: [],
  arenaFightHistory: [],
};

export const baseGame = { players: [basePlayer], server: baseServer };

export const materials: IMaterial[] = [
  { id: 0, name: "Gold", element: null },
  { id: 1, name: "Soul Stone", element: null },
  { id: 2, name: "Turquoise", element: "turquoise" },
  { id: 3, name: "Garnet", element: "garnet" },
  { id: 4, name: "Obsidian", element: "obsidian" },
  { id: 5, name: "Moonstone", element: "moonstone" },
  { id: 6, name: "Amber", element: "amber" },
];

export const characters: ICharacter[] = [
  { name: "Saya", id: 0, weapon: "chakram", element: "turquoise" },
  { name: "Nell", id: 1, weapon: "greatsword", element: "garnet" },
];

export const stories: IStory[] = [0, 1, 2].map((n: number) => {
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
export const adventures: IAdventure[][] = characters.map((n: ICharacter) => {
  return [
    {
      id: n.id,
      elementId: n.id,
      stories: stories,
      name: "SomeName",
      description: "SomeDescription",
    },
  ];
});

export const endless: IEndless[] = ["run", "fight"].map(
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

export const weapons: IWeapon[] = [];
["chakram", "greatsword"].map((s: string, n: number) => {
  ["turquoise", "garnet", "obsidian", "moonstone", "amber"].map(
    (e: string, i: number) => {
      weapons.push({
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

export const elements: IElement[] = [
  {
    character: characters[0],
    id: 0,
    adventures: adventures[0],
    endless: endless,
    quests: [],
  },
  {
    character: characters[1],
    id: 1,
    adventures: adventures[1],
    endless: endless,
    quests: [],
  },
];

export const goals: IGoal[] = [
  {
    id: 0,
    title: "Complete 3 story levels",
    description: "Complete any 3 story levels",
    state: "new",
    screenToGo: "arcana",
    condition: { type: "any_story_levels", goal: 3, current: 0 },
    reward: [
      { ...materials[0], quantity: 30 },
      { ...materials[2], quantity: 25 },
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
      { ...materials[0], quantity: 30 },
      { ...materials[3], quantity: 25 },
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
      { ...materials[0], quantity: 30 },
      { ...materials[4], quantity: 25 },
    ],
  },
];
