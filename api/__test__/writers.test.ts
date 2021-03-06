import * as readers from "../db/readers";
import { arcanas, materials } from "../db/testDBPlayer";
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
  arcanas: [],
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
    energy: 100,
    arcanas: JSON.parse(JSON.stringify(arcanas)),
  };
  const res = writers.startLevelEvent(newPlayer, {
    playerId: 3,
    created: new Date(),
    type: "STARTLEVEL",
    data: { arcana: 0, level: 0, mode: "story" },
  });
  expect(res.playerId).toEqual(3);
  expect(res.eventId).toEqual(1);
  expect(res.type).toEqual("STARTLEVEL");
  const res2 = readers.startLevelEvent(res.eventId);
  expect(res2.eventId).toEqual(1);
  expect(res2.arcanaId).toEqual(0);
  expect(res2.levelId).toEqual(0);
  expect(res2.mode).toEqual("story");
});

test("Writes winLevelEvent correctly", () => {
  const newPlayer = {
    ...basePlayer,
    arcanas: JSON.parse(JSON.stringify(arcanas)),
    currentState: {
      state: "PLAY" as currentState,
      level: { arcana: 0, level: 0, mode: "story" as gameMode },
    },
  };
  const res = writers.winLevelEvent(newPlayer, {
    playerId: 3,
    created: new Date(),
    type: "WINLEVEL",
    data: { arcana: 0, level: 0, mode: "story" },
  });
  expect(res.playerId).toEqual(3);
  expect(res.eventId).toEqual(1);
  expect(res.type).toEqual("WINLEVEL");
  const res2 = readers.winLevelEvent(res.eventId);
  expect(res2.eventId).toEqual(1);
  expect(res2.arcanaId).toEqual(0);
  expect(res2.levelId).toEqual(0);
  expect(res2.mode).toEqual("story");
});

test("Writes openSpellEvent correctly", () => {
  const newPlayer = {
    ...basePlayer,
    arcanas: JSON.parse(JSON.stringify(arcanas)),
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
    data: { arcana: 0, spell: 0 },
  });
  expect(res.playerId).toEqual(3);
  expect(res.eventId).toEqual(1);
  expect(res.type).toEqual("OPENSPELL");
  const res2 = readers.openSpellEvent(res.eventId);
  expect(res2.eventId).toEqual(1);
  expect(res2.arcanaId).toEqual(0);
  expect(res2.spellId).toEqual(0);
});

test("Writest updateSpellEvent correctly", () => {
  const newPlayer = {
    ...basePlayer,
    arcanas: JSON.parse(JSON.stringify(arcanas)),
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
    data: { arcana: 0, spell: 0 },
  });
  expect(res.playerId).toEqual(3);
  expect(res.eventId).toEqual(1);
  expect(res.type).toEqual("UPDATESPELL");
  const res2 = readers.openSpellEvent(res.eventId);
  expect(res2.eventId).toEqual(1);
  expect(res2.arcanaId).toEqual(0);
  expect(res2.spellId).toEqual(0);
});

test("Writes startEndlessEvent correctly", () => {
  const newPlayer = {
    ...basePlayer,
    energy: 100,
    arcanas: JSON.parse(JSON.stringify(arcanas)),
  };
  const res = writers.startEndlessEvent(newPlayer, {
    playerId: 3,
    created: new Date(),
    type: "STARTENDLESS",
    data: { arcana: 0, mode: "tournament" },
  });
  expect(res.playerId).toEqual(3);
  expect(res.eventId).toEqual(2);
  expect(res.type).toEqual("STARTENDLESS");
  const res2 = readers.startEndlessEvent(res.eventId);
  expect(res2.eventId).toEqual(2);
  expect(res2.arcanaId).toEqual(0);
  expect(res2.mode).toEqual("tournament");
});

test("Writes passCheckpoint event correctly", () => {
  const newPlayer = {
    ...basePlayer,
    energy: 100,
    arcanas: JSON.parse(JSON.stringify(arcanas)),
  };
  const res = writers.passCheckpointEvent(newPlayer, {
    playerId: 3,
    created: new Date(),
    type: "PASSCHECKPOINT",
    data: { arcana: 0, mode: "tournament", checkpoint: 0 },
  });
  expect(res.playerId).toEqual(3);
  expect(res.eventId).toEqual(1);
  expect(res.type).toEqual("PASSCHECKPOINT");
  const res2 = readers.passCheckpointEvent(res.eventId);
  expect(res2.eventId).toEqual(1);
  expect(res2.arcanaId).toEqual(0);
  expect(res2.checkpoint).toEqual(0);
  expect(res2.mode).toEqual("tournament");
});

test("Writes missCheckpointEvent event correctly", () => {
  const newPlayer = {
    ...basePlayer,
    energy: 100,
    arcanas: JSON.parse(JSON.stringify(arcanas)),
  };
  const res = writers.missCheckpointEvent(newPlayer, {
    playerId: 3,
    created: new Date(),
    type: "MISSCHECKPOINT",
    data: { arcana: 0, mode: "tournament" },
  });
  expect(res.playerId).toEqual(3);
  expect(res.eventId).toEqual(1);
  expect(res.type).toEqual("MISSCHECKPOINT");
  const res2 = readers.passCheckpointEvent(res.eventId);
  expect(res2.eventId).toEqual(1);
  expect(res2.arcanaId).toEqual(0);
  expect(res2.checkpoint).toEqual(0);
  expect(res2.mode).toEqual("tournament");
});
