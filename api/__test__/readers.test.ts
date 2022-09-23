import * as readers from "../db/readers";

test("Won't read create player if no event with this ID", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.createPlayerEvent({
      eventId: 3,
      created: new Date().valueOf(),
      type: "CREATEPLAYER",
    })
  ).toThrow("No create player event");
  jest.restoreAllMocks();
});

test("Won't read start level if no event with this ID", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.startLevelEvent({
      eventId: 0,
      created: new Date().valueOf(),
      type: "STARTLEVEL",
    })
  ).toThrow("No start level event");
  jest.restoreAllMocks();
});

test("Won't read win level if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.winLevelEvent({
      eventId: 0,
      created: new Date().valueOf(),
      type: "WINLEVEL",
    })
  ).toThrow("No win level event");
  jest.restoreAllMocks();
});

test("Won't read open spell if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.openSpellEvent({
      eventId: 0,
      created: new Date().valueOf(),
      type: "OPENSPELL",
    })
  ).toThrow("No open spell event");
  jest.restoreAllMocks();
});

test("Won't read update spell if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.updateSpellEvent({
      eventId: 0,
      created: new Date().valueOf(),
      type: "UPDATESPELL",
    })
  ).toThrow("No update spell event");
  jest.restoreAllMocks();
});

test("Won't read start endless if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.startEndlessEvent({
      eventId: 0,
      created: new Date().valueOf(),
      type: "STARTENDLESS",
    })
  ).toThrow("No start endless event");
  jest.restoreAllMocks();
});

test("Won't read pass checkpoint if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.passCheckpointEvent({
      eventId: 0,
      created: new Date().valueOf(),
      type: "PASSCHECKPOINT",
    })
  ).toThrow("No pass checkpoint event");
  jest.restoreAllMocks();
});

test("Won't read miss checkpoint if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.missCheckpointEvent({
      eventId: 0,
      created: new Date().valueOf(),
      type: "MISSCHECKPOINT",
    })
  ).toThrow("No miss checkpoint event");
  jest.restoreAllMocks();
});

test("Won't read arena start if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.startArenaEvent({
      eventId: 0,
      created: new Date().valueOf(),
      type: "ARENASTART",
    })
  ).toThrow("No player start arena event");
  jest.restoreAllMocks();
});

test("Won't read arena end if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.endArenaEvent({
      eventId: 0,
      created: new Date().valueOf(),
      type: "ARENAEND",
    })
  ).toThrow("No player end arena event");
  jest.restoreAllMocks();
});

test("Won't read server arena start if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.serverArenaStartEvent({
      eventId: 0,
      created: new Date().valueOf(),
      type: "SERVERARENASTART",
    })
  ).toThrow("No start server arena event");
  jest.restoreAllMocks();
});

test("Won't read server arena end if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.serverArenaStartEvent({
      eventId: 0,
      created: new Date().valueOf(),
      type: "SERVERARENAEND",
    })
  ).toThrow("No start server arena event");
  jest.restoreAllMocks();
});
