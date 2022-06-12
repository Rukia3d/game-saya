import {
  readCreatePlayerEvent,
  readPlayerEvents,
  readStartLevelEvent,
  readWinLevelEvent,
} from "../db/readers";
import { IPlayerEvent } from "../engine/types";

test("Reads player events correctly", () => {
  const res = readPlayerEvents(1);
  expect(res.length).toEqual(3);
  res.forEach((r: IPlayerEvent) => r.playerId === 1);

  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readPlayerEvents(3)).toThrow("No events found for 3");
  jest.restoreAllMocks();
});

test("Reads create player events correctly", () => {
  const res = readCreatePlayerEvent(1);
  expect(res.eventId).toEqual(1);
  expect(res.playerName).toEqual("player 1 name");

  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readCreatePlayerEvent(3)).toThrow("No create player event");
  jest.restoreAllMocks();
});

test("Reads start player events correctly", () => {
  const res = readStartLevelEvent(0);
  expect(res.eventId).toEqual(0);
  expect(res.elementId).toEqual(0);
  expect(res.levelId).toEqual(0);
  expect(res.mode).toEqual("story");

  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readStartLevelEvent(3)).toThrow("No start level event");
  jest.restoreAllMocks();
});

test("Reads win player events correctly", () => {
  const res = readWinLevelEvent(0);
  expect(res.eventId).toEqual(0);
  expect(res.elementId).toEqual(0);
  expect(res.levelId).toEqual(0);
  expect(res.mode).toEqual("story");

  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readWinLevelEvent(3)).toThrow("No start level event");
  jest.restoreAllMocks();
});
