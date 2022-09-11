import { arenaFight, arenaRun } from "../db/testDBArena";
import { serverArenaStart } from "../engine/events";
import { IServer } from "../engine/types";

const baseServer: IServer = {
  arenaRun: arenaRun,
  arenaFight: arenaFight,
  arenaRunHistory: [],
  arenaFightHistory: [],
};

test("Creates arena event correctly", () => {
  const now = new Date().valueOf();
  const event = {
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
