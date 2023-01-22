import { mapToScreen } from "../../src/utils/helpers";
import {
  ICell,
  ILevel,
  IReel,
  IRun,
  IMapEnemyCell,
  IMapTriggerCell,
  IDialogue,
  IMapTrigger,
} from "../engine/types";

export const testReelsPanel: IReel[] = [
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
export const testReelsDial: IReel[] = [];

const testDialogue: IDialogue[] = [
  {
    id: 0,
    lines: [
      { id: 0, text: ["Hello", "World"], image: "saya1" },
      { id: 1, text: ["Hello", "World"], image: "enemy1" },
      { id: 2, text: ["Hello", "World"], image: "saya1" },
    ],
    background: "dialogue1",
  },
  {
    id: 1,
    lines: [
      { id: 0, text: ["Hello1", "World1"], image: "saya1" },
      { id: 1, text: ["Hello1", "World1"], image: "enemy2" },
    ],
    background: "dialogue2",
  },
  {
    id: 2,
    lines: [{ id: 0, text: ["Hello2", "World2"], image: "saya1" }],
    background: "dialogue3",
  },
];

const triggersContent: IMapTrigger[] = [
  { id: 0, type: "win", active: true },
  { id: 1, type: "restart", active: true, data: { x: 96 } },
  { id: 2, type: "dialogue", active: true, data: { dialogueId: 0 } },
  { id: 3, type: "coin", active: true, data: { value: 3 } },
];

export const triggersMap: IMapTriggerCell[] = [
  { x: 0, y: 0, triggerId: 0 },
  { x: 1, y: 0, triggerId: 0 },
  { x: 2, y: 0, triggerId: 0 },
  { x: 3, y: 0, triggerId: 0 },
  { x: 4, y: 0, triggerId: 0 },
  { x: 0, y: 80, triggerId: 0 },
  { x: 1, y: 80, triggerId: 0 },
  { x: 2, y: 80, triggerId: 0 },
  { x: 3, y: 80, triggerId: 0 },
  { x: 4, y: 80, triggerId: 0 },
  { x: 0, y: 96, triggerId: 1 },
  { x: 1, y: 96, triggerId: 1 },
  { x: 2, y: 96, triggerId: 1 },
  { x: 3, y: 96, triggerId: 1 },
  { x: 4, y: 96, triggerId: 1 },
  { x: 2, y: 88, triggerId: 3 },
  { x: 3, y: 90, triggerId: 3 },
  { x: 0, y: 100, triggerId: 2 },
  { x: 1, y: 100, triggerId: 2 },
  { x: 2, y: 100, triggerId: 2 },
  { x: 3, y: 100, triggerId: 2 },
  { x: 4, y: 100, triggerId: 2 },
].map((trigger) => {
  const s = mapToScreen({ x: trigger.x, y: trigger.y }, testCells);
  return {
    type: "trigger",
    triggerId: trigger.triggerId,
    point: s,
    size: { x: 80, y: 80 },
  };
});

export const enemiesMap: IMapEnemyCell[] = [
  { x: 2, y: 2, enemyId: 0 },
  { x: 3, y: 5, enemyId: 1 },
  { x: 4, y: 9, enemyId: 0 },
  { x: 2, y: 12, enemyId: 0 },
  { x: 1, y: 15, enemyId: 1 },
  { x: 3, y: 21, enemyId: 1 },
  { x: 4, y: 23, enemyId: 0 },
  { x: 3, y: 26, enemyId: 1 },
  { x: 0, y: 31, enemyId: 1 },
  { x: 1, y: 34, enemyId: 0 },
  { x: 2, y: 35, enemyId: 0 },
  { x: 4, y: 40, enemyId: 1 },
  { x: 4, y: 42, enemyId: 0 },
  { x: 1, y: 46, enemyId: 1 },
  { x: 4, y: 49, enemyId: 0 },
  { x: 1, y: 52, enemyId: 0 },
  { x: 0, y: 53, enemyId: 1 },
  { x: 2, y: 58, enemyId: 0 },
  { x: 4, y: 61, enemyId: 0 },
  { x: 3, y: 64, enemyId: 1 },
  { x: 0, y: 66, enemyId: 0 },
  { x: 1, y: 70, enemyId: 1 },
  { x: 0, y: 72, enemyId: 0 },
  { x: 1, y: 74, enemyId: 1 },
  { x: 0, y: 77, enemyId: 0 },
  { x: 0, y: 85, enemyId: 1 },
  { x: 1, y: 89, enemyId: 1 },
  { x: 3, y: 97, enemyId: 1 },
].map((enemy, n): IMapEnemyCell => {
  const s = mapToScreen(enemy, testCells);
  return {
    type: "enemy",
    point: s,
    size: { x: 80, y: 80 },
    enemyId: enemy.enemyId,
  };
});

export const testCells: ICell[][] = [];

export const testRun: IRun = {
  settingName: "Wood",
  setting: "forest",
  map: testCells,
  entities: [],
  obstacles: [],
  enemiesContent: [{ id: 0 }, { id: 1 }],
  triggersContent: triggersContent,
  enemies: enemiesMap,
  triggers: triggersMap,
  type: "run",
  musicAddress: "testmusic",
  dialogues: testDialogue,
  collections: [],
};

export const testLevel: ILevel = {
  levels: [testRun],
  element: [{ id: 0, name: "jade" }],
  opening: testReelsPanel,
  ending: testReelsPanel,
};
