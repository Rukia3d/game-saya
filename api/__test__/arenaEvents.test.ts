import { arenaFight, arenaRun } from "../db/testDBArena";
import { serverArenaEnd, serverArenaStart } from "../engine/events";
import {
  IArenaEvent,
  IPlayer,
  IServer,
  IServerArenaEndEvent,
  IServerArenaStartEvent,
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
  arenaRun: arenaRun,
  arenaFight: arenaFight,
  arenaRunHistory: [],
  arenaFightHistory: [],
};

test("Creates arena event correctly", () => {
  const now = new Date().valueOf();
  const event: IServerArenaStartEvent = {
    eventId: 1,
    type: "SERVERARENASTART" as "SERVERARENASTART",
    start: now + 10000,
    end: now + 600000,
    created: now,
  };
  const res = serverArenaStart(event, baseServer);
  expect(res.arenaRunHistory.length).toEqual(1);
  expect(res.arenaRun.resultTime).toEqual(now + 600000);
  expect(res.arenaRun.events.length).toEqual(3);
  expect(res.arenaRun.events[0].index).toEqual(0);
  expect(res.arenaRun.events[0].stake[0].name).toEqual("Coin");
  expect(res.arenaRun.events[0].stake[0].quantity).toEqual(25);
  expect(res.arenaRun.events[0].stake[1].quantity).toEqual(5);
  expect(res.arenaRun.events[1].stake[0].name).toEqual("Coin");
  expect(res.arenaRun.events[1].stake[0].quantity).toEqual(50);
  expect(res.arenaRun.events[1].stake[1].quantity).toEqual(10);
});

test("Ends arena event correctly and rewards correct players", () => {
  const server = { ...baseServer, arenaRun: { ...arenaRun } };
  server.arenaRun.events.map((e: IArenaEvent) => {
    e.rewardPool = [
      { id: 0, name: "Coin", quantity: 25 * 4 },
      { id: 3, name: "Rings", quantity: 5 * 4 },
    ];
    e.results = [
      { playerName: "Winner 1", playerId: 1, time: 15151515 },
      { playerName: "Winner 2", playerId: 2, time: 17171717 },
      { playerName: "Winner 3", playerId: 3, time: 19191919 },
      { playerName: "Winner 4", playerId: 4, time: 20000000 },
    ];
  });
  const now = new Date().valueOf();
  const event: IServerArenaEndEvent = {
    eventId: 1,
    type: "SERVERARENEND" as "SERVERARENAEND",
    created: now,
  };
  console.log(
    "game.server.arenaRun.events",
    server.arenaRun.events[0].rewardPool
  );
  const res = serverArenaEnd(event, server);
  console.log("res", res);
});
