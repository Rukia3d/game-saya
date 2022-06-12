import {
  readCreatePlayerEvent,
  readPlayerEvents,
  readStartLevelEvent,
  readWinLevelEvent,
} from "../db/readers";
import {
  writeCreatePlayerEvent,
  writeStartLevelEvent,
  writeWinLevelEvent,
} from "../db/writers";

test("Writes player creation events correctly", () => {
  const res = writeCreatePlayerEvent("new test player");
  expect(res).toEqual(3);
  const playerEvents = readPlayerEvents(3);
  expect(playerEvents[0].playerId).toEqual(3);
  expect(playerEvents[0].eventId).toEqual(2);
  expect(playerEvents[0].type).toEqual(`CREATEPLAYER`);
  const creationEvent = readCreatePlayerEvent(2);
  expect(creationEvent.playerName).toEqual("new test player");
});

test("Writes start level events correctly", () => {
  const res = writeStartLevelEvent(3, 0, "story", 0);
  expect(res).toEqual(1);
  const playerEvents = readPlayerEvents(3);
  expect(playerEvents[1].playerId).toEqual(3);
  expect(playerEvents[1].eventId).toEqual(1);
  expect(playerEvents[1].type).toEqual(`STARTLEVEL`);
  const startEvent = readStartLevelEvent(1);
  expect(startEvent.eventId).toEqual(1);
  expect(startEvent.elementId).toEqual(0);
  expect(startEvent.mode).toEqual(`story`);
  expect(startEvent.levelId).toEqual(0);
});

test("Writes win level events correctly", () => {
  const res = writeWinLevelEvent(3, 0, "story", 0);
  expect(res).toEqual(2);
  const playerEvents = readPlayerEvents(3);
  expect(playerEvents[2].playerId).toEqual(3);
  expect(playerEvents[2].eventId).toEqual(2);
  expect(playerEvents[2].type).toEqual(`WINLEVEL`);
  const startEvent = readWinLevelEvent(2);
  expect(startEvent.eventId).toEqual(2);
  expect(startEvent.elementId).toEqual(0);
  expect(startEvent.mode).toEqual(`story`);
  expect(startEvent.levelId).toEqual(0);
});
