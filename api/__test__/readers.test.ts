import {
  readCreatePlayerEvent,
  readOpenSpellEvent,
  readPlayerEvents,
  readStartLevelEvent,
  readUpdateSpellEvent,
  readWinLevelEvent,
} from "../db/readers";

test("Reads player events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readPlayerEvents(3)).toThrow("No events found for 3");
  jest.restoreAllMocks();
});

test("Reads create player events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readCreatePlayerEvent(3)).toThrow("No create player event");
  jest.restoreAllMocks();
});

test("Reads start player events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readStartLevelEvent(3)).toThrow("No start level event");
  jest.restoreAllMocks();
});

test("Reads win player events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readWinLevelEvent(3)).toThrow("No win level event");
  jest.restoreAllMocks();
});

test("Reads open spell player events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readOpenSpellEvent(3)).toThrow("No open spell event");
  jest.restoreAllMocks();
});

test("Reads update spell player events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readUpdateSpellEvent(3)).toThrow("No update spell event");
  jest.restoreAllMocks();
});
