import { ARENAEVENTINTERVAL } from "../cronjobs";
import * as readers from "../db/readers";
import { arcanas } from "../db/testDBArcanes";
import { arenaRun } from "../db/testDBArena";
import { materials } from "../db/testDBPlayer";
import { spells } from "../db/testDBSpells";
import * as writers from "../db/writers";
import {
  currentState,
  gameMode,
  IMaterial,
  IPlayer,
  IServer,
} from "../engine/types";

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
const baseServer: IServer = {
  arenaRun: { events: [], resultTime: 0, type: "run" },
  arenaFight: { events: [], resultTime: 0, type: "fight" },
  arenaRunHistory: [],
  arenaFightHistory: [],
};

test("Writes createPlayerEvent correctly", () => {
  const writeCreate = writers.createPlayerEvent({
    created: new Date().valueOf(),
    type: "CREATEPLAYER",
    data: { name: "Created player test" },
  });
  expect(writeCreate.playerId).toEqual(3);
  expect(writeCreate.eventId).toEqual(2);
  expect(writeCreate.type).toEqual("CREATEPLAYER");
  const readCreate = readers.createPlayerEvent({
    playerId: 3,
    eventId: 2,
    created: new Date().valueOf(),
    type: "CREATEPLAYER",
  });
  expect(readCreate.eventId).toEqual(2);
  expect(readCreate.playerName).toEqual("Created player test");
});

test("Writes startLevelEvent correctly", () => {
  const game = {
    player: {
      ...basePlayer,
      energy: 100,
      arcanas: JSON.parse(JSON.stringify(arcanas)),
    },
    server: { ...baseServer },
  };
  const writeStart = writers.startLevelEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "STARTLEVEL",
    data: { arcanaId: 0, levelId: 0, mode: "story" },
  });
  expect(writeStart.playerId).toEqual(3);
  expect(writeStart.eventId).toEqual(1);
  expect(writeStart.type).toEqual("STARTLEVEL");

  const readStart = readers.startLevelEvent({
    playerId: 3,
    eventId: 1,
    created: new Date().valueOf(),
    type: "STARTLEVEL",
  });
  expect(readStart.eventId).toEqual(1);
  expect(readStart.arcanaId).toEqual(0);
  expect(readStart.levelId).toEqual(0);
  expect(readStart.mode).toEqual("story");
});

test("Writes winLevelEvent correctly", () => {
  const game = {
    player: {
      ...basePlayer,
      arcanas: JSON.parse(JSON.stringify(arcanas)),
      currentState: {
        state: "PLAY" as currentState,
        level: { arcana: 0, level: 0, mode: "story" as gameMode },
      },
    },
    server: { ...baseServer },
  };
  const writeWin = writers.winLevelEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "WINLEVEL",
    data: { arcanaId: 0, levelId: 0, mode: "story" },
  });
  expect(writeWin.playerId).toEqual(3);
  expect(writeWin.eventId).toEqual(1);
  expect(writeWin.type).toEqual("WINLEVEL");

  const readWin = readers.winLevelEvent({
    playerId: 3,
    eventId: 1,
    created: new Date().valueOf(),
    type: "WINLEVEL",
  });
  expect(readWin.eventId).toEqual(1);
  expect(readWin.arcanaId).toEqual(0);
  expect(readWin.levelId).toEqual(0);
  expect(readWin.mode).toEqual("story");
});

test("Writes openSpellEvent correctly", () => {
  const game = {
    player: {
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
    },
    server: { ...baseServer },
  };
  game.player.spells[0].price = [
    { id: 0, name: "Coin", quantity: 5 },
    { id: 3, name: "Air essence", quantity: 1 },
  ];

  const writeOpen = writers.openSpellEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "OPENSPELL",
    data: { arcanaId: 0, spellId: 0 },
  });
  expect(writeOpen.playerId).toEqual(3);
  expect(writeOpen.eventId).toEqual(1);
  expect(writeOpen.type).toEqual("OPENSPELL");

  const readOpen = readers.openSpellEvent({
    playerId: 3,
    eventId: 1,
    created: new Date().valueOf(),
    type: "OPENSPELL",
  });
  expect(readOpen.eventId).toEqual(1);
  expect(readOpen.arcanaId).toEqual(0);
  expect(readOpen.spellId).toEqual(0);
});

test("Writest updateSpellEvent correctly", () => {
  const game = {
    player: {
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
    },
    server: { ...baseServer },
  };
  game.player.spells[0].price = [
    { id: 0, name: "Coin", quantity: 5 },
    { id: 3, name: "Air essence", quantity: 1 },
  ];
  game.player.spells[0].updatePrice = [
    { id: 0, name: "Coin", quantity: 5 },
    { id: 3, name: "Air essence", quantity: 1 },
  ];
  game.player.spells[0].requiredStrength = 1;

  const writeUpdate = writers.updateSpellEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "UPDATESPELL",
    data: { arcanaId: 0, spellId: 0 },
  });
  expect(writeUpdate.playerId).toEqual(3);
  expect(writeUpdate.eventId).toEqual(1);
  expect(writeUpdate.type).toEqual("UPDATESPELL");

  const readUpdate = readers.updateSpellEvent({
    playerId: 3,
    eventId: 1,
    created: new Date().valueOf(),
    type: "UPDATESPELL",
  });
  expect(readUpdate.eventId).toEqual(1);
  expect(readUpdate.arcanaId).toEqual(0);
  expect(readUpdate.spellId).toEqual(0);
});

test("Writes startEndlessEvent correctly", () => {
  const game = {
    player: {
      ...basePlayer,
      energy: 100,
      arcanas: JSON.parse(JSON.stringify(arcanas)),
      currentState: {
        state: "PLAY" as currentState,
        level: {
          arcana: 0,
          mode: "run" as gameMode,
        },
      },
    },
    server: { ...baseServer },
  };
  const writeStart = writers.startEndlessEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "STARTENDLESS",
    data: { arcanaId: 0, mode: "run" },
  });
  expect(writeStart.playerId).toEqual(3);
  expect(writeStart.eventId).toEqual(2);
  expect(writeStart.type).toEqual("STARTENDLESS");

  const readStart = readers.startEndlessEvent({
    playerId: 3,
    eventId: 2,
    created: new Date().valueOf(),
    type: "STARTENDLESS",
  });
  expect(readStart.eventId).toEqual(2);
  expect(readStart.arcanaId).toEqual(0);
  expect(readStart.mode).toEqual("run");
});

test("Writes passCheckpoint event correctly", () => {
  const game = {
    player: {
      ...basePlayer,
      energy: 100,
      arcanas: JSON.parse(JSON.stringify(arcanas)),
      currentState: {
        state: "PLAY" as currentState,
        level: {
          arcana: 0,
          mode: "run" as gameMode,
        },
      },
    },
    server: { ...baseServer },
  };
  const writePass = writers.passCheckpointEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "PASSCHECKPOINT",
    data: { arcanaId: 0, mode: "run", checkpoint: 0 },
  });
  expect(writePass.playerId).toEqual(3);
  expect(writePass.eventId).toEqual(1);
  expect(writePass.type).toEqual("PASSCHECKPOINT");

  const readPass = readers.passCheckpointEvent({
    playerId: 3,
    eventId: 1,
    created: new Date().valueOf(),
    type: "PASSCHECKPOINT",
  });
  expect(readPass.eventId).toEqual(1);
  expect(readPass.arcanaId).toEqual(0);
  expect(readPass.checkpoint).toEqual(0);
  expect(readPass.mode).toEqual("run");
});

test("Writes arenaStartEvent correctly", () => {
  const game = {
    player: {
      ...basePlayer,
      energy: 100,
      arcanas: JSON.parse(JSON.stringify(arcanas)),
      materials: JSON.parse(
        JSON.stringify(
          materials.map((m: IMaterial) => {
            return { ...m, quantity: 50 };
          })
        )
      ),
    },
    server: { ...baseServer, arenaRun: arenaRun },
  };
  const writeStart = writers.arenaStartEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "ARENASTART",
    data: { mode: "run", index: 0 },
  });
  expect(writeStart.playerId).toEqual(3);
  expect(writeStart.eventId).toEqual(1);
  expect(writeStart.type).toEqual("ARENASTART");

  const readStart = readers.arenaStartEvent({
    playerId: 3,
    eventId: 1,
    created: new Date().valueOf(),
    type: "ARENASTART",
  });
  expect(readStart.eventId).toEqual(1);
  expect(readStart.index).toEqual(0);
  expect(readStart.mode).toEqual("run");
});

test("Writes arenaEndEvent correctly", () => {
  const game = {
    player: {
      ...basePlayer,
      energy: 100,
      arcanas: JSON.parse(JSON.stringify(arcanas)),
      materials: JSON.parse(
        JSON.stringify(
          materials.map((m: IMaterial) => {
            return { ...m, quantity: 50 };
          })
        )
      ),
      currentState: {
        state: "ARENAPLAY" as currentState,
        arena: {
          mode: "run" as "run",
          index: 0,
          startTime: new Date().valueOf(),
        },
      },
    },
    server: { ...baseServer, arenaRun: arenaRun },
  };
  const writeEnd = writers.arenaEndEvent(game, {
    playerId: 3,
    created: new Date().valueOf() + 15000,
    type: "ARENAEND",
    data: { mode: "run", index: 0 },
  });
  expect(writeEnd.playerId).toEqual(3);
  expect(writeEnd.eventId).toEqual(1);
  expect(writeEnd.type).toEqual("ARENAEND");

  const readEnd = readers.arenaStartEvent({
    playerId: 3,
    eventId: 1,
    created: new Date().valueOf(),
    type: "ARENAEND",
  });
  expect(readEnd.eventId).toEqual(1);
  expect(readEnd.index).toEqual(0);
  expect(readEnd.mode).toEqual("run");
});

test("Writes missCheckpointEvent event correctly", () => {
  const game = {
    player: {
      ...basePlayer,
      energy: 100,
      arcanas: JSON.parse(JSON.stringify(arcanas)),
      currentState: {
        state: "PLAY" as currentState,
        level: {
          arcana: 0,
          mode: "run" as gameMode,
        },
      },
    },
    server: { ...baseServer },
  };
  const writeMiss = writers.missCheckpointEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "MISSCHECKPOINT",
    data: { arcanaId: 0, mode: "run" },
  });
  expect(writeMiss.playerId).toEqual(3);
  expect(writeMiss.eventId).toEqual(1);
  expect(writeMiss.type).toEqual("MISSCHECKPOINT");

  const readMiss = readers.passCheckpointEvent({
    playerId: 3,
    eventId: 1,
    created: new Date().valueOf(),
    type: "MISSCHECKPOINT",
  });
  expect(readMiss.eventId).toEqual(1);
  expect(readMiss.arcanaId).toEqual(0);
  expect(readMiss.checkpoint).toEqual(0);
  expect(readMiss.mode).toEqual("run");
});

test("Writes serverStartArena event correctly", () => {
  const now = new Date().valueOf();
  const game = {
    player: {
      ...basePlayer,
    },
    server: { ...baseServer },
  };
  const writeStart = writers.serverStartArena(game, {
    startDate: now,
    endDate: now + ARENAEVENTINTERVAL,
  });
  expect(writeStart.eventId).toEqual(1);
  expect(writeStart.start).toEqual(now);
  expect(writeStart.end).toEqual(now + ARENAEVENTINTERVAL);

  const readStart = readers.serverArenaStartEvent({
    playerId: 3,
    eventId: 1,
    created: new Date().valueOf(),
    type: "SERVERARENASTART",
  });
  expect(readStart.eventId).toEqual(1);
  expect(readStart.start).toEqual(now);
  expect(readStart.end).toEqual(now + ARENAEVENTINTERVAL);
});

test("Writes serverEndArena event correctly", () => {
  const game = {
    player: {
      ...basePlayer,
    },
    server: { ...baseServer },
  };

  const writeEnd = writers.serverEndArena(game);
  expect(writeEnd.eventId).toEqual(1);

  const readEnd = readers.serverArenaEndEvent({
    playerId: 3,
    eventId: 1,
    created: new Date().valueOf(),
    type: "SERVERARENAEND",
  });
  expect(readEnd.eventId).toEqual(1);
});
