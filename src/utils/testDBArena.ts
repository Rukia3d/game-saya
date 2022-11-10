import { testLevel } from "../../api/db/testDBLevelMaps";
import { elementName, IArena } from "../../api/engine/types";

export const elements: { id: number; name: elementName }[] = [
  { id: 0, name: "jade" },
  { id: 1, name: "garnet" },
  { id: 2, name: "obsidian" },
  { id: 3, name: "moonstone" },
  { id: 4, name: "amber" },
];

export const testArenaRun: IArena = {
  resultTime: new Date(new Date().valueOf() + 50 * 1000).valueOf(),
  mode: "run",
  events: [
    {
      index: 0,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 25 },
        { id: 3, name: "Jade", element: elements[0], quantity: 5 },
      ],
      level: testLevel,
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 1,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 50 },
        { id: 3, name: "Jade", element: elements[0], quantity: 15 },
      ],
      level: testLevel,
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 2,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 100 },
        { id: 3, name: "Jade", element: elements[0], quantity: 20 },
      ],
      level: testLevel,
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
        { id: 3, name: "Jade", element: elements[0], quantity: 5 },
      ],
      level: testLevel,
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 1,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 50 },
        { id: 3, name: "Jade", element: elements[0], quantity: 15 },
      ],
      level: testLevel,
      rewardPool: [],
      results: [],
      mode: "run",
    },
    {
      index: 2,
      stake: [
        { id: 0, name: "Gold", element: null, quantity: 100 },
        { id: 3, name: "Jade", element: elements[0], quantity: 20 },
      ],
      level: testLevel,
      rewardPool: [],
      results: [],
      mode: "run",
    },
  ],
};
