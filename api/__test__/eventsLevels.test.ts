import { arcanas } from "../db/testDBArcanes";
import { materials } from "../db/testDBPlayer";
import * as events from "../engine/events";
import { IMaterial, IPlayer } from "../engine/types";

const basePlayer: IPlayer = {
  id: 0,
  name: "",
  exprience: 0,
  energy: 0,
  maxEnergy: 0,
  loungeId: null,
  materials: [],
  arenaRun: { events: [], resultTime: 0, type: "run" },
  arenaFight: { events: [], resultTime: 0, type: "fight" },
  arcanas: [],
  spells: [],
  missions: [],
  messages: [],
  currentState: { state: "MAIN" },
};

test("story starts and wins for player 1 outside tutorial", async () => {
  const player: IPlayer = events.createPlayer(
    { eventId: 0, playerName: "player 1 name", playerId: 1 },
    basePlayer
  );
  const res: IPlayer = events.startLevel(
    { eventId: 0, mode: "story", arcanaId: 0, levelId: 2 },
    { ...player, energy: 100 }
  );
  expect(res.energy).toEqual(95);
  expect(res.currentState.state).toEqual("PLAY");
  expect(res.currentState.level?.arcana).toEqual(0);
  expect(res.currentState.level?.level).toEqual(2);
  expect(res.currentState.level?.mode).toEqual("story");
});

test("eventWinLevel for player 1", async () => {
  const res: IPlayer = events.winLevel(
    {
      eventId: 1,
      mode: "story",
      arcanaId: 0,
      levelId: 0,
      time: 1654347902,
    },
    {
      ...basePlayer,
      currentState: {
        state: "PLAY",
        level: { mode: "story", arcana: 0, level: 0 },
      },
      arcanas: JSON.parse(JSON.stringify(arcanas)),
      materials: JSON.parse(JSON.stringify(materials)).map((m: IMaterial) => {
        return { ...m, quantity: 1 };
      }),
    }
  );
  expect(res.exprience).toEqual(10);
  expect(res.materials[0].quantity).toEqual(15);
  expect(res.materials[3].quantity).toEqual(7);
  expect(res.arcanas[0].stories[0].state).toEqual("complete");
  expect(res.arcanas[0].stories[1].state).toEqual("open");
  expect(res.currentState.state).toEqual("WINMATERIAL");
  expect(res.currentState.materials?.length).toEqual(2);
});

test("Endless flow tournament for player 1", async () => {
  const player: IPlayer = events.createPlayer(
    { eventId: 0, playerName: "player 1 name", playerId: 1 },
    basePlayer
  );
  const startEvent = events.startEndless(
    { eventId: 1, arcanaId: 0, mode: "run" },
    { ...player }
  );
  expect(startEvent.energy).toEqual(40);
  expect(startEvent.currentState.state).toEqual("PLAY");
  expect(startEvent.currentState.level?.arcana).toEqual(0);
  expect(startEvent.currentState.level?.mode).toEqual("run");
  const passChec0 = events.passCheckpoint(
    { eventId: 2, checkpoint: 0, mode: "run", arcanaId: 0 },
    { ...startEvent }
  );
  expect(passChec0.arcanas[0].currentEvents[0].checkpoint).toEqual(0);
  expect(passChec0.exprience).toEqual(10);
  expect(passChec0.arcanas[0].currentEvents[0].allowedRewards[0].upTo).toEqual(
    5
  );
  expect(passChec0.arcanas[0].currentEvents[0].allowedRewards[1].upTo).toEqual(
    1
  );
  const passChec1 = events.passCheckpoint(
    { eventId: 3, checkpoint: 1, mode: "run", arcanaId: 0 },
    { ...passChec0 }
  );
  expect(passChec1.exprience).toEqual(20);
  expect(passChec1.arcanas[0].currentEvents[0].checkpoint).toEqual(1);
  expect(passChec1.arcanas[0].currentEvents[0].allowedRewards[0].upTo).toEqual(
    10
  );
  expect(passChec1.arcanas[0].currentEvents[0].allowedRewards[1].upTo).toEqual(
    5
  );
  const missCheck = events.missCheckpoint(
    { eventId: 1, mode: "run", arcanaId: 0 },
    passChec1
  );
  expect(missCheck.exprience).toEqual(20);
  expect(missCheck.arcanas[0].currentEvents[0].checkpoint).toEqual(1);
  expect(missCheck.arcanas[0].currentEvents[0].allowedRewards[0].upTo).toEqual(
    10
  );
  expect(missCheck.arcanas[0].currentEvents[0].allowedRewards[1].upTo).toEqual(
    5
  );
  expect(missCheck.currentState.state).toEqual("WINMATERIAL");
  expect(missCheck.currentState.materials?.length).toEqual(2);
});
