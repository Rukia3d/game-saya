import { arenaRun } from "../db/testDBArena";
import { baseGame, basePlayer, baseServer } from "../db/testDBPlayer";
import { serverArenaEnd, serverArenaStart } from "../engine/events";
import {
  IArenaEvent,
  IServerArenaEndEvent,
  IServerArenaStartEvent,
} from "../engine/types";

test("Creates arena event correctly", () => {
  const now = new Date().valueOf();
  const event: IServerArenaStartEvent = {
    eventId: 1,
    type: "SERVERARENASTART" as "SERVERARENASTART",
    start: now + 10000,
    end: now + 600000,
    created: now,
  };
  const res = serverArenaStart(event, baseGame);
  expect(res.server.arenaRunHistory.length).toEqual(1);
  expect(res.server.arenaRun.resultTime).toEqual(now + 600000);
  expect(res.server.arenaRun.events.length).toEqual(3);
  expect(res.server.arenaRun.events[0].index).toEqual(0);
  expect(res.server.arenaRun.events[0].stake[0].name).toEqual("money");
  expect(res.server.arenaRun.events[0].stake[0].quantity).toEqual(25);
  expect(res.server.arenaRun.events[0].stake[1].quantity).toEqual(5);
  expect(res.server.arenaRun.events[1].stake[0].name).toEqual("money");
  expect(res.server.arenaRun.events[1].stake[0].quantity).toEqual(50);
  expect(res.server.arenaRun.events[1].stake[1].quantity).toEqual(10);
});

test("Ends arena event correctly and rewards correct players", () => {
  const server = { ...baseServer, arenaRun: { ...arenaRun } };
  const players = [
    { ...basePlayer, id: 1 },
    { ...basePlayer, id: 2 },
    { ...basePlayer, id: 3 },
    { ...basePlayer, id: 4 },
  ];
  server.arenaRun.events.map((e: IArenaEvent) => {
    e.rewardPool = [
      { id: 0, name: "money", quantity: 25 * 4 },
      { id: 3, name: "resource1", quantity: 5 * 4 },
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
  const res = serverArenaEnd(event, { players: players, server: server });
  expect(res.players[0].claims.length).toEqual(1);
  expect(res.players[0].claims[0].claimed).not.toBeTruthy();
  expect(res.players[0].claims[0].prize.length).toEqual(2);
  expect(res.players[0].claims[0].id).toEqual(0);
  expect(res.players[0].messages.length).toEqual(1);
  expect(res.players[0].messages[0].read).not.toBeTruthy();
  expect(res.players[0].messages[0].claimId).toEqual(0);
  expect(res.players[3].claims.length).toEqual(0);
});
