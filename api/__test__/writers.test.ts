import * as readers from "../db/readers";
import * as writers from "../db/writers";

const LASTEVENTID = readers.gameEvents().length - 1;
test("Writes createPlayerEvent correctly", () => {
  const writeCreate = writers.createPlayerEvent({
    created: new Date().valueOf(),
    type: "CREATEPLAYER",
    data: { name: "Created player test" },
  });

  expect(writeCreate.playerId).toEqual(3);
  expect(writeCreate.eventId).toEqual(LASTEVENTID + 1);
  expect(writeCreate.type).toEqual("CREATEPLAYER");
  const readCreate = readers.createPlayerEvent({
    eventId: LASTEVENTID + 1,
    created: new Date().valueOf(),
    type: "CREATEPLAYER",
  });
  expect(readCreate.playerId).toEqual(3);
  expect(readCreate.eventId).toEqual(LASTEVENTID + 1);
  expect(readCreate.playerName).toEqual("Created player test");
});

/*
test("Writes startLevelEvent correctly", () => {
  const game: IGame = {
    players: [
      {
        ...basePlayer,
        id: 3,
        energy: 100,
        arcanas: JSON.parse(JSON.stringify(arcanas)),
      },
    ],
    server: { ...baseServer },
  };
  const writeStart = writers.startLevelEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "STARTLEVEL",
    data: { elementId: 0, levelId: 0, mode: "story" },
  });
  expect(writeStart.playerId).toEqual(3);
  expect(writeStart.eventId).toEqual(LASTEVENTID + 2);
  expect(writeStart.type).toEqual("STARTLEVEL");

  const readStart = readers.startLevelEvent({
    eventId: LASTEVENTID + 2,
    created: new Date().valueOf(),
    type: "STARTLEVEL",
  });
  expect(writeStart.playerId).toEqual(3);
  expect(readStart.eventId).toEqual(LASTEVENTID + 2);
  expect(readStart.elementId).toEqual(0);
  expect(readStart.levelId).toEqual(0);
  expect(readStart.mode).toEqual("story");
});

test("Writes winLevelEvent correctly", () => {
  const game: IGame = {
    players: [
      {
        ...basePlayer,
        id: 3,
        arcanas: JSON.parse(JSON.stringify(arcanas)),
        currentState: {
          state: "PLAY" as currentState,
          level: { arcana: 0, level: 0, mode: "story" as gameMode },
        },
      },
    ],
    server: { ...baseServer },
  };
  const writeWin = writers.winLevelEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "WINLEVEL",
    data: { elementId: 0, levelId: 0, mode: "story" },
  });
  expect(writeWin.playerId).toEqual(3);
  expect(writeWin.eventId).toEqual(LASTEVENTID + 3);
  expect(writeWin.type).toEqual("WINLEVEL");

  const readWin = readers.winLevelEvent({
    eventId: LASTEVENTID + 3,
    created: new Date().valueOf(),
    type: "WINLEVEL",
  });
  expect(readWin.playerId).toEqual(3);
  expect(readWin.eventId).toEqual(LASTEVENTID + 3);
  expect(readWin.elementId).toEqual(0);
  expect(readWin.levelId).toEqual(0);
  expect(readWin.mode).toEqual("story");
});

test("Writes openSpellEvent correctly", () => {
  const game: IGame = {
    players: [
      {
        ...basePlayer,
        id: 3,
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
    ],
    server: { ...baseServer },
  };
  //@ts-ignore
  game.players[0].spells[0].price = [
    { id: 0, name: "Coin", quantity: 5 },
    { id: 3, name: "Air essence", quantity: 1 },
  ];

  const writeOpen = writers.openSpellEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "OPENSPELL",
    data: { elementId: 0, spellId: 0 },
  });
  expect(writeOpen.playerId).toEqual(3);
  expect(writeOpen.eventId).toEqual(LASTEVENTID + 4);
  expect(writeOpen.type).toEqual("OPENSPELL");

  const readOpen = readers.openSpellEvent({
    eventId: LASTEVENTID + 4,
    created: new Date().valueOf(),
    type: "OPENSPELL",
  });
  expect(readOpen.playerId).toEqual(3);
  expect(readOpen.eventId).toEqual(LASTEVENTID + 4);
  expect(readOpen.elementId).toEqual(0);
  expect(readOpen.spellId).toEqual(0);
});

test("Writest updateSpellEvent correctly", () => {
  const game: IGame = {
    players: [
      {
        ...basePlayer,
        id: 3,
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
    ],
    server: { ...baseServer },
  };
  //@ts-ignore
  game.players[0].spells[0].price = [
    { id: 0, name: "Coin", quantity: 5 },
    { id: 3, name: "Air essence", quantity: 1 },
  ];
  //@ts-ignore
  game.players[0].spells[0].updatePrice = [
    { id: 0, name: "Coin", quantity: 5 },
    { id: 3, name: "Air essence", quantity: 1 },
  ];
  //@ts-ignore
  game.players[0].spells[0].requiredStrength = 1;

  const writeUpdate = writers.updateSpellEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "UPDATESPELL",
    data: { elementId: 0, spellId: 0 },
  });
  expect(writeUpdate.playerId).toEqual(3);
  expect(writeUpdate.eventId).toEqual(LASTEVENTID + 5);
  expect(writeUpdate.type).toEqual("UPDATESPELL");

  const readUpdate = readers.updateSpellEvent({
    eventId: LASTEVENTID + 5,
    created: new Date().valueOf(),
    type: "UPDATESPELL",
  });
  expect(readUpdate.playerId).toEqual(3);
  expect(readUpdate.eventId).toEqual(LASTEVENTID + 5);
  expect(readUpdate.elementId).toEqual(0);
  expect(readUpdate.spellId).toEqual(0);
});

test("Writes startEndlessEvent correctly", () => {
  const game: IGame = {
    players: [
      {
        ...basePlayer,
        id: 3,
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
    ],
    server: { ...baseServer },
  };
  const writeStart = writers.startEndlessEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "STARTENDLESS",
    data: { elementId: 0, mode: "run" },
  });
  expect(writeStart.playerId).toEqual(3);
  expect(writeStart.eventId).toEqual(LASTEVENTID + 6);
  expect(writeStart.type).toEqual("STARTENDLESS");

  const readStart = readers.startEndlessEvent({
    eventId: LASTEVENTID + 6,
    created: new Date().valueOf(),
    type: "STARTENDLESS",
  });
  expect(readStart.playerId).toEqual(3);
  expect(readStart.eventId).toEqual(LASTEVENTID + 6);
  expect(readStart.elementId).toEqual(0);
  expect(readStart.mode).toEqual("run");
});

test("Writes passCheckpoint event correctly", () => {
  const game: IGame = {
    players: [
      {
        ...basePlayer,
        id: 3,
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
    ],
    server: { ...baseServer },
  };
  const writePass = writers.passCheckpointEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "PASSCHECKPOINT",
    data: { elementId: 0, mode: "run", checkpoint: 0 },
  });
  expect(writePass.playerId).toEqual(3);
  expect(writePass.eventId).toEqual(LASTEVENTID + 7);
  expect(writePass.type).toEqual("PASSCHECKPOINT");

  const readPass = readers.passCheckpointEvent({
    eventId: LASTEVENTID + 7,
    created: new Date().valueOf(),
    type: "PASSCHECKPOINT",
  });
  expect(readPass.playerId).toEqual(3);
  expect(readPass.eventId).toEqual(LASTEVENTID + 7);
  expect(readPass.elementId).toEqual(0);
  expect(readPass.checkpoint).toEqual(0);
  expect(readPass.mode).toEqual("run");
});

test("Writes missCheckpointEvent event correctly", () => {
  const game: IGame = {
    players: [
      {
        ...basePlayer,
        id: 3,
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
    ],
    server: { ...baseServer },
  };
  const writeMiss = writers.missCheckpointEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "MISSCHECKPOINT",
    data: { elementId: 0, mode: "run" },
  });
  expect(writeMiss.playerId).toEqual(3);
  expect(writeMiss.eventId).toEqual(LASTEVENTID + 8);
  expect(writeMiss.type).toEqual("MISSCHECKPOINT");

  const readMiss = readers.missCheckpointEvent({
    eventId: LASTEVENTID + 8,
    created: new Date().valueOf(),
    type: "MISSCHECKPOINT",
  });
  expect(readMiss.playerId).toEqual(3);
  expect(readMiss.eventId).toEqual(LASTEVENTID + 8);
  expect(readMiss.elementId).toEqual(0);
  expect(readMiss.mode).toEqual("run");
});

test("Writes serverStartArena event correctly", () => {
  const now = new Date().valueOf();
  const game: IGame = {
    players: [
      {
        ...basePlayer,
        id: 3,
      },
    ],
    server: { ...baseServer },
  };
  const writeStart = writers.serverStartArena(game, {
    startDate: now,
    endDate: now + ARENAEVENTINTERVAL,
  });
  expect(writeStart.eventId).toEqual(LASTEVENTID + 9);
  expect(writeStart.start).toEqual(now);
  expect(writeStart.end).toEqual(now + ARENAEVENTINTERVAL);

  const readStart = readers.serverArenaStartEvent({
    eventId: LASTEVENTID + 9,
    created: new Date().valueOf(),
    type: "SERVERARENASTART",
  });
  expect(readStart.eventId).toEqual(LASTEVENTID + 9);
  expect(readStart.start).toEqual(now);
  expect(readStart.end).toEqual(now + ARENAEVENTINTERVAL);
});

test("Writes serverEndArena event correctly", () => {
  const game: IGame = {
    players: [
      {
        ...basePlayer,
        id: 3,
      },
    ],
    server: { ...baseServer },
  };

  const writeEnd = writers.serverEndArena(game);
  expect(writeEnd.eventId).toEqual(LASTEVENTID + 10);

  const readEnd = readers.serverArenaEndEvent({
    eventId: LASTEVENTID + 10,
    created: new Date().valueOf(),
    type: "SERVERARENAEND",
  });
  expect(readEnd.eventId).toEqual(LASTEVENTID + 10);
});

test("Writes startArenaEvent correctly", () => {
  const game: IGame = {
    players: [
      {
        ...basePlayer,
        id: 3,
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
    ],
    server: { ...baseServer, arenaRun: arenaRun },
  };
  const writeStart = writers.startArenaEvent(game, {
    playerId: 3,
    created: new Date().valueOf(),
    type: "ARENASTART",
    data: { mode: "run", index: 0 },
  });
  expect(writeStart.playerId).toEqual(3);
  expect(writeStart.eventId).toEqual(LASTEVENTID + 11);
  expect(writeStart.type).toEqual("ARENASTART");

  const readStart = readers.startArenaEvent({
    eventId: LASTEVENTID + 11,
    created: new Date().valueOf(),
    type: "ARENASTART",
  });
  expect(readStart.playerId).toEqual(3);
  expect(readStart.eventId).toEqual(LASTEVENTID + 11);
  expect(readStart.index).toEqual(0);
  expect(readStart.mode).toEqual("run");
});

test("Writes endArenaEvent correctly", () => {
  const game: IGame = {
    players: [
      {
        ...basePlayer,
        id: 3,
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
    ],
    server: { ...baseServer, arenaRun: arenaRun },
  };
  const writeEnd = writers.endArenaEvent(game, {
    playerId: 3,
    created: new Date().valueOf() + 15000,
    type: "ARENAEND",
    data: { mode: "run", index: 0 },
  });
  expect(writeEnd.playerId).toEqual(3);
  expect(writeEnd.eventId).toEqual(LASTEVENTID + 12);
  expect(writeEnd.type).toEqual("ARENAEND");

  const readEnd = readers.endArenaEvent({
    eventId: LASTEVENTID + 12,
    created: new Date().valueOf(),
    type: "ARENAEND",
  });
  expect(readEnd.playerId).toEqual(3);
  expect(readEnd.eventId).toEqual(LASTEVENTID + 12);
  expect(readEnd.index).toEqual(0);
  expect(readEnd.mode).toEqual("run");
});
*/
