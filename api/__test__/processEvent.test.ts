import dayjs from "dayjs";
import { arcanas } from "../db/testDBArcanes";
import { arenaRun } from "../db/testDBArena";
import { materials } from "../db/testDBPlayer";
import { spells } from "../db/testDBSpells";
import { processEvent } from "../engine/engine";
import {
  currentState,
  gameMode,
  IGenericPlayerEvent,
  IMaterial,
  IPlayer,
  ISpell,
} from "../engine/types";

const basePlayer: IPlayer = {
  id: 1,
  name: "",
  exprience: 0,
  energy: 0,
  maxEnergy: 0,
  loungeId: null,
  materials: [],
  arcanas: [],
  arenaRun: { events: [], resultTime: 0, type: "run" },
  arenaFight: { events: [], resultTime: 0, type: "fight" },
  spells: [],
  missions: [],
  messages: [],
  currentState: { state: "MAIN" },
};

test("Process CREATEPLAYER event correctly", () => {
  const newPlayer: IPlayer = { ...basePlayer, arcanas: arcanas };
  const event: IGenericPlayerEvent = {
    playerId: 3,
    data: { name: "Player 3 name" },
    type: "CREATEPLAYER",
    created: new Date().valueOf(),
  };
  const res = processEvent(newPlayer, event);
  expect(res.id).toEqual(3);
  expect(res.name).toEqual("Player 3 name");
  expect(res.exprience).toEqual(0);
  expect(res.energy).toEqual(50);
  expect(res.materials.length).toEqual(8);
  expect(res.spells.length).toEqual(4);
});

test("Process STARTLEVEL event correctly", () => {
  const newPlayer: IPlayer = {
    ...basePlayer,
    id: 3,
    arcanas: arcanas,
    energy: 50,
  };
  const event: IGenericPlayerEvent = {
    playerId: 3,
    data: { arcana: 0, mode: "story", level: 0 },
    type: "STARTLEVEL",
    created: new Date().valueOf(),
  };
  const res = processEvent(newPlayer, event);
  expect(res.id).toEqual(3);
  expect(res.currentState.state).toEqual("PLAY");
  expect(res.currentState.level?.arcana).toEqual(0);
  expect(res.currentState.level?.level).toEqual(0);
  expect(res.currentState.level?.mode).toEqual("story");
});

test("Process WINLEVEL event correctly", () => {
  const playState = {
    state: "PLAY" as currentState,
    level: { arcana: 0, mode: "story" as gameMode, level: 0 },
  };
  const newPlayer: IPlayer = {
    ...basePlayer,
    id: 3,
    arcanas: arcanas,
    materials: materials.map((m: IMaterial) => {
      return { ...m, quantity: 10 };
    }),
    energy: 50,
    currentState: playState,
  };
  const event: IGenericPlayerEvent = {
    playerId: 3,
    data: { arcana: 0, mode: "story", level: 0 },
    type: "WINLEVEL",
    created: new Date().valueOf(),
  };
  const res = processEvent(newPlayer, event);
  expect(res.id).toEqual(3);
  expect(res.currentState.state).toEqual("WINMATERIAL");
  expect(res.currentState.materials?.length).toEqual(2);
});

test("Process OPENSPELL event correctly", () => {
  const newPlayer: IPlayer = {
    ...basePlayer,
    id: 3,
    arcanas: arcanas,
    materials: materials.map((m: IMaterial) => {
      return { ...m, quantity: 10 };
    }),
    energy: 50,
    spells: spells.map((s: ISpell) => {
      return {
        ...s,
        price: [
          { id: 0, name: "Coin", quantity: 5 },
          { id: 3, name: "Rings", quantity: 1 },
        ],
      };
    }),
  };
  const event: IGenericPlayerEvent = {
    playerId: 3,
    data: { arcana: 0, spell: 0 },
    type: "OPENSPELL",
    created: new Date().valueOf(),
  };
  const res = processEvent(newPlayer, event);
  expect(res.id).toEqual(3);
  expect(res.currentState.state).toEqual("SPELLS");
  expect(res.spells[0]).toBeDefined();
  expect(res.spells[0]).toHaveProperty("updatePrice");
  expect(res.spells[0]).toHaveProperty("requiredStrength");
});

test("Process ARENASTART event correctly", () => {
  const newPlayer: IPlayer = {
    ...basePlayer,
    id: 3,
    arcanas: arcanas,
    arenaRun: arenaRun,
    materials: materials.map((m: IMaterial) => {
      return { ...m, quantity: 50 };
    }),
  };
  const event: IGenericPlayerEvent = {
    playerId: 3,
    data: { mode: "run", index: 0 },
    type: "ARENASTART",
    created: new Date().valueOf(),
  };
  const res = processEvent(newPlayer, event);
  expect(res.materials[0].quantity).toEqual(25);
  expect(res.materials[3].quantity).toEqual(45);
  expect(res.currentState.state).toEqual("ARENAPLAY");
  expect(res.currentState.arena?.index).toEqual(0);
  expect(res.currentState.arena?.mode).toEqual("run");
  expect(res.arenaRun.events[0].rewardPool.length).toEqual(2);
});

test("Process ARENAEND event correctly", () => {
  const newArenaRun = JSON.parse(JSON.stringify(arenaRun));
  const runEnd = new Date().valueOf();
  const runStart = dayjs(runEnd).subtract(191436, "millisecond").valueOf();
  newArenaRun.events[0].rewardPool = [
    { id: 0, name: "Coin", quantity: 25 },
    { id: 3, name: "Rings", quantity: 5 },
  ];
  const newPlayer: IPlayer = {
    ...basePlayer,
    name: "Base player",
    id: 3,
    arcanas: arcanas,
    arenaRun: newArenaRun,
    materials: materials.map((m: IMaterial) => {
      return { ...m, quantity: 50 };
    }),
    currentState: {
      state: "ARENAPLAY",
      arena: { mode: "run", index: 0, time: runStart },
    },
  };
  const event: IGenericPlayerEvent = {
    playerId: 3,
    data: { mode: "run", index: 0 },
    type: "ARENAEND",
    created: runEnd,
  };
  const res = processEvent(newPlayer, event);
  expect(res.arenaRun.events[0].results.length).toEqual(1);
  expect(res.arenaRun.events[0].results[0].playerName).toEqual("Base player");
  expect(res.arenaRun.events[0].results[0].time).toEqual(191436);
});
