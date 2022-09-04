import * as readers from "../db/readers";

test("Reads player events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readers.gameEvents(3)).toThrow("No events found for 3");
  jest.restoreAllMocks();
});

test("Reads create player events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readers.createPlayerEvent(3)).toThrow("No create player event");
  jest.restoreAllMocks();
});

test("Reads start player events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readers.startLevelEvent(3)).toThrow("No start level event");
  jest.restoreAllMocks();
});

test("Reads win player events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readers.winLevelEvent(3)).toThrow("No win level event");
  jest.restoreAllMocks();
});

test("Reads open spell player events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readers.openSpellEvent(3)).toThrow("No open spell event");
  jest.restoreAllMocks();
});

test("Reads update spell player events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readers.updateSpellEvent(3)).toThrow("No update spell event");
  jest.restoreAllMocks();
});

test("Reads start endless events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readers.startEndlessEvent(3)).toThrow("No start endless event");
  jest.restoreAllMocks();
});

test("Reads pass checkpoint events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readers.passCheckpointEvent(3)).toThrow(
    "No pass checkpoint event"
  );
  jest.restoreAllMocks();
});

test("Reads miss checkpoint events correctly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => readers.missCheckpointEvent(3)).toThrow(
    "No miss checkpoint event"
  );
  jest.restoreAllMocks();
});
