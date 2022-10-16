import { arcanas } from "../db/testDBArcanas";
import { applyEvent } from "../engine/engine";
import {
  serverArenaStart,
  createPlayer,
  startLevel,
  winLevel,
  startEndless,
  passCheckpoint,
  missCheckpoint,
  openSpell,
  updateSpell,
  startArena,
  endArena,
} from "../engine/events";
import { IGame, IPlayer, IServer, IStartLevelEvent } from "../engine/types";
import * as readers from "../db/readers";

const basePlayer: IPlayer = {
  id: 1,
  name: "",
  exprience: 0,
  energy: 0,
  maxEnergy: 0,
  loungeId: null,
  materials: [],
  arcanas: [],
  spells: [],
  goals: [],
  messages: [],
  claims: [],
  currentState: { state: "MAIN" },
};
const baseServer: IServer = {
  arenaRun: { events: [], resultTime: 0, mode: "run" },
  arenaFight: { events: [], resultTime: 0, mode: "fight" },
  arenaRunHistory: [],
  arenaFightHistory: [],
  listings: [],
};

const LASTEVENTID = readers.gameEvents().length - 1;
const BASEQUANTITY = 50;

test("Applies a single event correctly", () => {
  const newPlayer = { ...basePlayer, arcanas: arcanas };
  const newServer = { ...baseServer };
  const startLevelEvent: IStartLevelEvent = {
    playerId: 1,
    eventId: 1,
    type: "STARTLEVEL",
    created: new Date().valueOf(),
    arcanaId: 0,
    mode: "story",
    levelId: 0,
  };
  const res = applyEvent(
    { server: newServer, players: [newPlayer] },
    startLevelEvent
  );
  expect(res.players[0].currentState.state).toEqual("PLAY");
  expect(res.players[0].currentState.level?.arcana).toEqual(0);
  expect(res.players[0].currentState.level?.mode).toEqual("story");
  expect(res.players[0].currentState.level?.level).toEqual(0);
});

test("Applies a series of events correctly", () => {
  let currentGame: IGame = { server: baseServer, players: [] };
  const now = new Date().valueOf();
  currentGame = serverArenaStart(
    {
      eventId: LASTEVENTID + 1,
      type: "SERVERARENASTART",
      start: now,
      end: now + 60000,
      created: now,
    },
    currentGame
  );
  expect(currentGame.server.arenaRunHistory.length).toEqual(1);
  expect(currentGame.server.arenaRun.resultTime).toEqual(now + 60000);

  currentGame = createPlayer(
    {
      playerId: 5,
      eventId: LASTEVENTID + 2,
      created: now + 1,
      type: "CREATEPLAYER",
      playerName: "Player 5 name",
    },
    currentGame
  );
  expect(currentGame.players[0].id).toEqual(5);
  expect(currentGame.players[0].energy).toEqual(50);
  expect(currentGame.players[0].currentState.state).toEqual("MAIN");
  expect(currentGame.players[0].arcanas[0].stories[0].state).toEqual("open");

  currentGame = startLevel(
    {
      playerId: 5,
      eventId: LASTEVENTID + 3,
      created: now + 2,
      type: "STARTLEVEL",
      arcanaId: 0,
      mode: "story",
      levelId: 0,
    },
    currentGame
  );

  expect(currentGame.players[0].currentState.state).toEqual("PLAY");
  expect(currentGame.players[0].currentState.level?.arcana).toEqual(0);
  expect(currentGame.players[0].currentState.level?.level).toEqual(0);

  currentGame = winLevel(
    {
      playerId: 5,
      eventId: 0,
      created: now + 3,
      type: "WINLEVEL",
      arcanaId: 0,
      mode: "story",
      levelId: 0,
    },
    currentGame
  );
  expect(currentGame.players[0].currentState.state).toEqual("WINMATERIAL");
  expect(currentGame.players[0].exprience).toEqual(10);
  expect(currentGame.players[0].currentState.materials?.length).toEqual(2);
  expect(currentGame.players[0].arcanas[0].stories[1].state).toEqual("open");
  expect(currentGame.players[0].arcanas[0].stories[0].state).toEqual(
    "complete"
  );
  expect(currentGame.players[0].materials[0].quantity).toEqual(
    BASEQUANTITY + 20
  );

  currentGame = startLevel(
    {
      playerId: 5,
      eventId: 1,
      created: now + 5,
      type: "STARTLEVEL",
      arcanaId: 0,
      mode: "story",
      levelId: 1,
    },
    currentGame
  );
  expect(currentGame.players[0].currentState.state).toEqual("PLAY");
  expect(currentGame.players[0].currentState.level?.arcana).toEqual(0);
  expect(currentGame.players[0].currentState.level?.level).toEqual(1);

  currentGame = winLevel(
    {
      playerId: 5,
      eventId: 1,
      created: now + 6,
      type: "WINLEVEL",
      arcanaId: 0,
      mode: "story",
      levelId: 1,
    },
    currentGame
  );
  expect(currentGame.players[0].exprience).toEqual(20);
  expect(currentGame.players[0].currentState.state).toEqual("WINMATERIAL");
  expect(currentGame.players[0].currentState.materials?.length).toEqual(3);
  expect(currentGame.players[0].materials[0].quantity).toEqual(
    BASEQUANTITY + 38
  );
  expect(currentGame.players[0].arcanas[0].stories[1].state).toEqual(
    "complete"
  );
  expect(currentGame.players[0].arcanas[0].stories[2].state).toEqual("open");

  currentGame = startEndless(
    {
      playerId: 5,
      eventId: 0,
      created: now + 7,
      type: "STARTENDLESS",
      arcanaId: 0,
      mode: "run",
    },
    currentGame
  );
  expect(currentGame.players[0].energy).toEqual(40);
  expect(currentGame.players[0].currentState.level?.arcana).toBe(0);
  expect(currentGame.players[0].currentState.level?.level).not.toBeDefined();

  currentGame = passCheckpoint(
    {
      playerId: 5,
      eventId: 0,
      created: now + 8,
      type: "PASSCHECKPOINT",
      arcanaId: 0,
      mode: "run",
      checkpoint: 0,
    },
    currentGame
  );
  expect(currentGame.players[0].exprience).toEqual(30);
  expect(currentGame.players[0].arcanas[0].currentEvents[0].checkpoint).toEqual(
    0
  );

  currentGame = passCheckpoint(
    {
      playerId: 5,
      eventId: 1,
      created: now + 9,
      type: "PASSCHECKPOINT",
      arcanaId: 0,
      mode: "run",
      checkpoint: 1,
    },
    currentGame
  );
  expect(currentGame.players[0].exprience).toEqual(40);
  expect(currentGame.players[0].arcanas[0].currentEvents[0].checkpoint).toEqual(
    1
  );

  currentGame = missCheckpoint(
    {
      playerId: 5,
      eventId: 1,
      created: now + 9,
      type: "MISSCHECKPOINT",
      arcanaId: 0,
      mode: "run",
    },
    currentGame
  );
  expect(currentGame.players[0].exprience).toEqual(40);
  expect(currentGame.players[0].arcanas[0].currentEvents[0].checkpoint).toEqual(
    1
  );
  expect(currentGame.players[0].currentState.state).toEqual("WINMATERIAL");
  expect(currentGame.players[0].currentState.materials?.length).toEqual(2);
  expect(currentGame.players[0].materials[0].quantity).toEqual(
    BASEQUANTITY + 42
  );

  currentGame = openSpell(
    {
      playerId: 5,
      eventId: 1,
      created: now + 10,
      type: "OPENSPELL",
      arcanaId: 0,
      spellId: 0,
    },
    currentGame
  );
  expect(currentGame.players[0].spells[0].state).toEqual("open");
  expect(currentGame.players[0].spells[0].strength).toEqual(1);
  expect(currentGame.players[0].spells[0]).toHaveProperty("updatePrice");
  expect(currentGame.players[0].spells[0]).toHaveProperty("requiredStrength");

  currentGame = updateSpell(
    {
      playerId: 5,
      eventId: 1,
      created: now + 10,
      type: "UPDATESPELL",
      arcanaId: 0,
      spellId: 0,
    },
    currentGame
  );
  expect(currentGame.players[0].spells[0].strength).toEqual(2);

  currentGame = startArena(
    {
      playerId: 5,
      eventId: 0,
      created: now + 11,
      type: "ARENASTART",
      mode: "run",
      index: 0,
    },
    currentGame
  );
  // TEST PLAYER may not have enough resources but they will pass checks
  expect(currentGame.server.arenaRun.events[0].rewardPool.length).toEqual(2);
  expect(currentGame.players[0].materials[0].quantity).toEqual(
    BASEQUANTITY + 7
  );

  currentGame = endArena(
    {
      playerId: 5,
      eventId: 0,
      created: now + 20,
      type: "ARENAEND",
      mode: "run",
      index: 0,
    },
    currentGame
  );
  expect(currentGame.server.arenaRun.events[0].results.length).toEqual(1);
});
