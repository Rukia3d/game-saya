import { arcanas, materials } from "../db/testDBPlayer";
import { spells } from "../db/testDBSpells";
import { processEvent } from "../engine/engine";
import {
  currentState,
  gameMode,
  IGenericEvent,
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
  arena: [],
  spells: [],
  missions: [],
  messages: [],
  currentState: { state: "MAIN" },
};

test("Process CREATEPLAYER event correctly", () => {
  const newPlayer: IPlayer = { ...basePlayer, arcanas: arcanas };
  const event: IGenericEvent = {
    playerId: 3,
    data: { name: "Player 3 name" },
    type: "CREATEPLAYER",
    created: new Date(),
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
  const event: IGenericEvent = {
    playerId: 3,
    data: { arcana: 0, mode: "story", level: 0 },
    type: "STARTLEVEL",
    created: new Date(),
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
  const event: IGenericEvent = {
    playerId: 3,
    data: { arcana: 0, mode: "story", level: 0 },
    type: "WINLEVEL",
    created: new Date(),
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
  const event: IGenericEvent = {
    playerId: 3,
    data: { arcana: 0, spell: 0 },
    type: "OPENSPELL",
    created: new Date(),
  };
  const res = processEvent(newPlayer, event);
  expect(res.id).toEqual(3);
  expect(res.currentState.state).toEqual("SPELLS");
  expect(res.spells[0]).toBeDefined();
  expect(res.spells[0]).toHaveProperty("updatePrice");
  expect(res.spells[0]).toHaveProperty("requiredStrength");
});
