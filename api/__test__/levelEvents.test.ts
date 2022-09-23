import { arcanas } from "../db/testDBArcanas";
import { arenaFight, arenaRun } from "../db/testDBArena";
import { materials } from "../db/testDBPlayer";
import * as events from "../engine/events";
import { IGame, IMaterial, IPlayer, IServer } from "../engine/types";

const basePlayer: IPlayer = {
  id: 0,
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
  claims: [],
  currentState: { state: "MAIN" },
};
const baseServer: IServer = {
  arenaRun: arenaRun,
  arenaFight: arenaFight,
  arenaRunHistory: [],
  arenaFightHistory: [],
};
const game: IGame = { players: [], server: baseServer };

test("story starts and wins for player 1 outside tutorial", async () => {
  const newGame: IGame = events.createPlayer(
    {
      eventId: 0,
      playerName: "player 1 name",
      playerId: 1,
      created: new Date().valueOf(),
      type: "CREATEPLAYER",
    },
    game
  );
  const res: IGame = events.startLevel(
    {
      eventId: 0,
      mode: "story",
      arcanaId: 0,
      levelId: 2,
      playerId: 1,
      created: new Date().valueOf(),
      type: "STARTLEVEL",
    },
    newGame
  );

  expect(res.players[0].energy).toEqual(45);
  expect(res.players[0].currentState.state).toEqual("PLAY");
  expect(res.players[0].currentState.level?.arcana).toEqual(0);
  expect(res.players[0].currentState.level?.level).toEqual(2);
  expect(res.players[0].currentState.level?.mode).toEqual("story");
});

test("eventWinLevel for player 1", async () => {
  const res: IGame = events.winLevel(
    {
      eventId: 1,
      mode: "story",
      arcanaId: 0,
      levelId: 0,
      created: new Date().valueOf(),
      type: "WINLEVEL",
      playerId: 1,
    },
    {
      players: [
        {
          ...basePlayer,
          id: 1,
          currentState: {
            state: "PLAY",
            level: { mode: "story", arcana: 0, level: 0 },
          },
          arcanas: JSON.parse(JSON.stringify(arcanas)),
          materials: JSON.parse(JSON.stringify(materials)).map(
            (m: IMaterial) => {
              return { ...m, quantity: 1 };
            }
          ),
        },
      ],
      server: baseServer,
    }
  );
  expect(res.players[0].exprience).toEqual(10);
  expect(res.players[0].materials[0].quantity).toEqual(15);
  expect(res.players[0].materials[3].quantity).toEqual(7);
  expect(res.players[0].arcanas[0].stories[0].state).toEqual("complete");
  expect(res.players[0].arcanas[0].stories[1].state).toEqual("open");
  expect(res.players[0].currentState.state).toEqual("WINMATERIAL");
  expect(res.players[0].currentState.materials?.length).toEqual(2);
});

test("Endless flow tournament for player 1", async () => {
  const newGame: IGame = events.createPlayer(
    {
      eventId: 0,
      playerName: "player 1 name",
      playerId: 1,
      type: "CREATEPLAYER",
      created: new Date().valueOf(),
    },
    game
  );
  const startEvent: IGame = events.startEndless(
    {
      eventId: 1,
      arcanaId: 0,
      mode: "run",
      created: new Date().valueOf(),
      type: "STARTENDLESS",
      playerId: 1,
    },
    newGame
  );
  expect(startEvent.players[0].energy).toEqual(40);
  expect(startEvent.players[0].currentState.state).toEqual("PLAY");
  expect(startEvent.players[0].currentState.level?.arcana).toEqual(0);
  expect(startEvent.players[0].currentState.level?.mode).toEqual("run");
  const passChec0: IGame = events.passCheckpoint(
    {
      eventId: 2,
      checkpoint: 0,
      mode: "run",
      arcanaId: 0,
      playerId: 1,
      type: "PASSCHECKPOINT",
      created: new Date().valueOf(),
    },
    { ...startEvent }
  );
  expect(passChec0.players[0].arcanas[0].currentEvents[0].checkpoint).toEqual(
    0
  );
  expect(passChec0.players[0].exprience).toEqual(10);
  expect(
    passChec0.players[0].arcanas[0].currentEvents[0].allowedRewards[0].upTo
  ).toEqual(5);
  expect(
    passChec0.players[0].arcanas[0].currentEvents[0].allowedRewards[1].upTo
  ).toEqual(1);
  const passChec1: IGame = events.passCheckpoint(
    {
      eventId: 3,
      checkpoint: 1,
      mode: "run",
      arcanaId: 0,
      created: new Date().valueOf(),
      playerId: 1,
      type: "PASSCHECKPOINT",
    },
    { ...passChec0 }
  );
  expect(passChec1.players[0].exprience).toEqual(20);
  expect(passChec1.players[0].arcanas[0].currentEvents[0].checkpoint).toEqual(
    1
  );
  expect(
    passChec1.players[0].arcanas[0].currentEvents[0].allowedRewards[0].upTo
  ).toEqual(10);
  expect(
    passChec1.players[0].arcanas[0].currentEvents[0].allowedRewards[1].upTo
  ).toEqual(5);
  const missCheck: IGame = events.missCheckpoint(
    {
      eventId: 1,
      mode: "run",
      arcanaId: 0,
      type: "MISSCHECKPOINT",
      playerId: 1,
      created: new Date().valueOf(),
    },
    passChec1
  );
  expect(missCheck.players[0].exprience).toEqual(20);
  expect(missCheck.players[0].arcanas[0].currentEvents[0].checkpoint).toEqual(
    1
  );
  expect(
    missCheck.players[0].arcanas[0].currentEvents[0].allowedRewards[0].upTo
  ).toEqual(10);
  expect(
    missCheck.players[0].arcanas[0].currentEvents[0].allowedRewards[1].upTo
  ).toEqual(5);
  expect(missCheck.players[0].currentState.state).toEqual("WINMATERIAL");
  expect(missCheck.players[0].currentState.materials?.length).toEqual(2);
});
