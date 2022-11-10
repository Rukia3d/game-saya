import { elementName } from "../engine/types";
import { ICell, ILevel, IReel, IRun } from "../levelgen";
import { elements } from "./testDBData";

export const testReelsPanel: IReel[] = [
  {
    imageAddress: "test1",
    text: "test1",
    name: "test1",
    type: "panel",
  },
  {
    imageAddress: "test2",
    text: "test2",
    name: "test2",
    type: "panel",
  },
  {
    imageAddress: "test3",
    text: "test3",
    name: "test3",
    type: "panel",
  },
];
export const testReelsDial: IReel[] = [
  {
    imageAddress: "test1",
    text: "test1",
    name: "test1",
    type: "dialogue",
  },
  {
    imageAddress: "test2",
    text: "test2",
    name: "test2",
    type: "dialogue",
  },
  {
    imageAddress: "test3",
    text: "test3",
    name: "test3",
    type: "dialogue",
  },
];
export const testCells: ICell[][] = [
  [
    { type: "trigger" },
    { type: "trigger" },
    { type: "trigger" },
    { type: "trigger" },
    { type: "trigger" },
  ],
  [
    { type: "obstacle" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "obstacle" },
    { type: "obstacle" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "obstacle" },
    { type: "space" },
    { type: "space" },
    { type: "obstacle" },
    { type: "obstacle" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "obstacle" },
    { type: "space" },
    { type: "space" },
    { type: "obstacle" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "obstacle" },
    { type: "obstacle" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
  ],
  [
    { type: "obstacle" },
    { type: "space" },
    { type: "obstacle" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
  ],
  [
    { type: "space" },
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "obstacle" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
  ],
  [
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "obstacle" },
    { type: "space" },
    { type: "space" },
    { type: "obstacle" },
    { type: "obstacle" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
  ],
  [
    { type: "space" },
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "space" },
    { type: "obstacle" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "space" },
    { type: "obstacle" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
  ],
  [
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "obstacle" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "space" },
    { type: "obstacle" },
    { type: "obstacle" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "space" },
    { type: "obstacle" },
    { type: "obstacle" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "enemy" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "obstacle" },
    { type: "obstacle" },
    { type: "space" },
    { type: "obstacle" },
    { type: "obstacle" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
    { type: "space" },
  ],
  [
    { type: "trigger" },
    { type: "trigger" },
    { type: "trigger" },
    { type: "trigger" },
    { type: "trigger" },
  ],
];

export const testRun: IRun = {
  settingName: "Wood",
  setting: "forest",
  map: testCells,
  type: "run",
  enemyType: [{ id: 0, name: "jade" as elementName }],
  musicAddress: "testmusic",
};

export const testLevel: ILevel = {
  levels: [testReelsPanel, testRun, testReelsDial, testRun],
  element: [{ id: 0, name: "jade" as elementName }],
};
