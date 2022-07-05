import * as readers from "../db/readers";
import { elements, materials } from "../db/testDBPlayer";
import { spells } from "../db/testDBSpells";
import * as writers from "../db/writers";
import { currentState, gameMode, IMaterial, IPlayer } from "../engine/types";

const basePlayer: IPlayer = {
  id: 3,
  name: "",
  exprience: 0,
  energy: 0,
  maxEnergy: 0,
  loungeId: null,
  materials: [],
  elements: [],
  spells: [],
  missions: [],
  messages: [],
  currentState: { state: "MAIN" },
};

test("Writes createPlayerEvent correctly", () => {
  const res = writers.createPlayerEvent({
    created: new Date(),
    type: "CREATEPLAYER",
    data: { name: "Created player test" },
  });
  expect(res.playerId).toEqual(3);
  expect(res.eventId).toEqual(2);
  expect(res.type).toEqual("CREATEPLAYER");
  const res2 = readers.createPlayerEvent(res.eventId);
  expect(res2.eventId).toEqual(2);
  expect(res2.playerName).toEqual("Created player test");
});

test("Writes startLevelEvent correctly", () => {
  const newPlayer = {
    ...basePlayer,
    elements: JSON.parse(JSON.stringify(elements)),
  };
  const res = writers.startLevelEvent(newPlayer, {
    playerId: 3,
    created: new Date(),
    type: "STARTLEVEL",
    data: { elementId: 0, levelId: 0, mode: "story" },
  });
  expect(res.playerId).toEqual(3);
  expect(res.eventId).toEqual(1);
  expect(res.type).toEqual("STARTLEVEL");
  const res2 = readers.startLevelEvent(res.eventId);
  expect(res2.eventId).toEqual(1);
  expect(res2.elementId).toEqual(0);
  expect(res2.levelId).toEqual(0);
  expect(res2.mode).toEqual("story");
});

test("Writes winLevelEvent correctly", () => {
  const newPlayer = {
    ...basePlayer,
    elements: JSON.parse(JSON.stringify(elements)),
    currentState: {
      state: "PLAY" as currentState,
      level: { elementId: 0, levelId: 0, mode: "story" as gameMode },
    },
  };
  const res = writers.winLevelEvent(newPlayer, {
    playerId: 3,
    created: new Date(),
    type: "WINLEVEL",
    data: { elementId: 0, levelId: 0, mode: "story" },
  });
  expect(res.playerId).toEqual(3);
  expect(res.eventId).toEqual(1);
  expect(res.type).toEqual("WINLEVEL");
  const res2 = readers.winLevelEvent(res.eventId);
  expect(res2.eventId).toEqual(1);
  expect(res2.elementId).toEqual(0);
  expect(res2.levelId).toEqual(0);
  expect(res2.mode).toEqual("story");
});

test("Writest openSpellEvent correctly", () => {
  const newPlayer = {
    ...basePlayer,
    elements: JSON.parse(JSON.stringify(elements)),
    spells: JSON.parse(JSON.stringify(spells)),
    materials: JSON.parse(
      JSON.stringify(
        materials.map((m: IMaterial) => {
          return { ...m, quantity: 10 };
        })
      )
    ),
  };
  newPlayer.spells[0].price = [
    { id: 0, name: "Coin", quantity: 5 },
    { id: 3, name: "Air essence", quantity: 1 },
  ];

  const res = writers.openSpellEvent(newPlayer, {
    playerId: 3,
    created: new Date(),
    type: "OPENSPELL",
    data: { elementId: 0, spellId: 0 },
  });
  expect(res.playerId).toEqual(3);
  expect(res.eventId).toEqual(1);
  expect(res.type).toEqual("OPENSPELL");
  const res2 = readers.openSpellEvent(res.eventId);
  expect(res2.eventId).toEqual(1);
  expect(res2.elementId).toEqual(0);
  expect(res2.spellId).toEqual(0);
});

test("Writest updateSpellEvent correctly", () => {
  const newPlayer = {
    ...basePlayer,
    elements: JSON.parse(JSON.stringify(elements)),
    spells: JSON.parse(JSON.stringify(spells)),
    materials: JSON.parse(
      JSON.stringify(
        materials.map((m: IMaterial) => {
          return { ...m, quantity: 10 };
        })
      )
    ),
  };
  newPlayer.spells[0].price = [
    { id: 0, name: "Coin", quantity: 5 },
    { id: 3, name: "Air essence", quantity: 1 },
  ];
  newPlayer.spells[0].updatePrice = [
    { id: 0, name: "Coin", quantity: 5 },
    { id: 3, name: "Air essence", quantity: 1 },
  ];
  newPlayer.spells[0].requiredStrength = 1;

  const res = writers.updateSpellEvent(newPlayer, {
    playerId: 3,
    created: new Date(),
    type: "UPDATESPELL",
    data: { elementId: 0, spellId: 0 },
  });
  expect(res.playerId).toEqual(3);
  expect(res.eventId).toEqual(1);
  expect(res.type).toEqual("UPDATESPELL");
  const res2 = readers.openSpellEvent(res.eventId);
  expect(res2.eventId).toEqual(1);
  expect(res2.elementId).toEqual(0);
  expect(res2.spellId).toEqual(0);
});
