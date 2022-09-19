import * as readers from "../db/readers";

test("Won't read create player if no event with this ID", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.createPlayerEvent({
      playerId: 3,
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
      playerId: 3,
      eventId: 3,
      created: new Date().valueOf(),
      type: "STARTLEVEL",
    })
  ).toThrow("No start level event");
  jest.restoreAllMocks();
});

test("Won't read start level if no player Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.startLevelEvent({
      playerId: null,
      eventId: 0,
      created: new Date().valueOf(),
      type: "STARTLEVEL",
    })
  ).toThrow("No player ID in startLevelEvent");
  jest.restoreAllMocks();
});

test("Won't read win level if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.winLevelEvent({
      playerId: 3,
      eventId: 3,
      created: new Date().valueOf(),
      type: "WINLEVEL",
    })
  ).toThrow("No win level event");
  jest.restoreAllMocks();
});

test("Won't read win level if no player Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.winLevelEvent({
      playerId: null,
      eventId: 0,
      created: new Date().valueOf(),
      type: "WINLEVEL",
    })
  ).toThrow("No player ID in winLevelEvent");
  jest.restoreAllMocks();
});

test("Won't read open spell if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.openSpellEvent({
      playerId: 3,
      eventId: 3,
      created: new Date().valueOf(),
      type: "OPENSPELL",
    })
  ).toThrow("No open spell event");
  jest.restoreAllMocks();
});

test("Won't read open spell if no player Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.openSpellEvent({
      playerId: null,
      eventId: 0,
      created: new Date().valueOf(),
      type: "OPENSPELL",
    })
  ).toThrow("No player ID in openSpellEvent");
  jest.restoreAllMocks();
});

test("Won't read update spell if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.updateSpellEvent({
      playerId: 3,
      eventId: 3,
      created: new Date().valueOf(),
      type: "UPDATESPELL",
    })
  ).toThrow("No update spell event");
  jest.restoreAllMocks();
});

test("Won't read update spell if no player Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.updateSpellEvent({
      playerId: null,
      eventId: 0,
      created: new Date().valueOf(),
      type: "UPDATESPELL",
    })
  ).toThrow("No player ID in updateSpellEvent");
  jest.restoreAllMocks();
});

test("Won't read start endless if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.startEndlessEvent({
      playerId: 3,
      eventId: 3,
      created: new Date().valueOf(),
      type: "STARTENDLESS",
    })
  ).toThrow("No start endless event");
  jest.restoreAllMocks();
});

test("Won't read start endless if  no player Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.startEndlessEvent({
      playerId: null,
      eventId: 0,
      created: new Date().valueOf(),
      type: "STARTENDLESS",
    })
  ).toThrow("No player ID in startEndlessEvent");
  jest.restoreAllMocks();
});

test("Won't read pass checkpoint if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.passCheckpointEvent({
      playerId: 3,
      eventId: 3,
      created: new Date().valueOf(),
      type: "PASSCHECKPOINT",
    })
  ).toThrow("No pass checkpoint event");
  jest.restoreAllMocks();
});

test("Won't read pass checkpoint if  no player Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.passCheckpointEvent({
      playerId: null,
      eventId: 0,
      created: new Date().valueOf(),
      type: "PASSCHECKPOINT",
    })
  ).toThrow("No player ID in passCheckpointEvent");
  jest.restoreAllMocks();
});

test("Won't read miss checkpoint if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.missCheckpointEvent({
      playerId: 3,
      eventId: 3,
      created: new Date().valueOf(),
      type: "MISSCHECKPOINT",
    })
  ).toThrow("No miss checkpoint event");
  jest.restoreAllMocks();
});

test("Won't read miss checkpoint if no player Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.missCheckpointEvent({
      playerId: null,
      eventId: 0,
      created: new Date().valueOf(),
      type: "MISSCHECKPOINT",
    })
  ).toThrow("No player ID in missCheckpointEvent");
  jest.restoreAllMocks();
});

test("Won't read arena start if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.startArenaEvent({
      playerId: 3,
      eventId: 3,
      created: new Date().valueOf(),
      type: "ARENASTART",
    })
  ).toThrow("No player start arena event");
  jest.restoreAllMocks();
});

test("Won't read arena start if no player Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.startArenaEvent({
      playerId: null,
      eventId: 0,
      created: new Date().valueOf(),
      type: "ARENASTART",
    })
  ).toThrow("No player ID in startArenaEvent");
  jest.restoreAllMocks();
});

test("Won't read arena end if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.endArenaEvent({
      playerId: 3,
      eventId: 3,
      created: new Date().valueOf(),
      type: "ARENAEND",
    })
  ).toThrow("No player end arena event");
  jest.restoreAllMocks();
});

test("Won't read arena end if no player Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.endArenaEvent({
      playerId: null,
      eventId: 0,
      created: new Date().valueOf(),
      type: "ARENAEND",
    })
  ).toThrow("No player ID in endArenaEvent");
  jest.restoreAllMocks();
});

test("Won't read server arena start if no event with this Id", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    readers.serverArenaStartEvent({
      playerId: null,
      eventId: 3,
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
      playerId: null,
      eventId: 3,
      created: new Date().valueOf(),
      type: "SERVERARENAEND",
    })
  ).toThrow("No start server arena event");
  jest.restoreAllMocks();
});
