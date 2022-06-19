import {
  readCreatePlayerEvent,
  readOpenSpellEvent,
  readPlayerEvents,
  readStartLevelEvent,
  readUpdateSpellEvent,
  readWinLevelEvent,
} from "../db/readers";
import {
  writeCreatePlayerEvent,
  writeOpenSpellEvent,
  writeStartLevelEvent,
  writeUpdateSpellEvent,
  writeWinLevelEvent,
} from "../db/writers";

test("Writes a series of events correctly", () => {
  const create = writeCreatePlayerEvent("new test player");
  expect(create).toEqual(3);
  const created = readPlayerEvents(3);
  expect(created[0].playerId).toEqual(3);
  expect(created[0].eventId).toEqual(2);
  expect(created[0].type).toEqual(`CREATEPLAYER`);
  const creationEvent = readCreatePlayerEvent(2);
  expect(creationEvent.playerName).toEqual("new test player");

  const start0 = writeStartLevelEvent(3, 0, "story", 0);
  expect(start0).toEqual(2);
  const started0 = readPlayerEvents(3);
  expect(started0[1].playerId).toEqual(3);
  expect(started0[1].eventId).toEqual(2);
  expect(started0[1].type).toEqual(`STARTLEVEL`);
  const startEvent0 = readStartLevelEvent(2);
  expect(startEvent0.eventId).toEqual(2);
  expect(startEvent0.elementId).toEqual(0);
  expect(startEvent0.mode).toEqual(`story`);
  expect(startEvent0.levelId).toEqual(0);

  const win0 = writeWinLevelEvent(3, 0, "story", 0);
  expect(win0).toEqual(3);
  const won0 = readPlayerEvents(3);
  expect(won0[2].playerId).toEqual(3);
  expect(won0[2].eventId).toEqual(3);
  expect(won0[2].type).toEqual(`WINLEVEL`);
  const winEvent0 = readWinLevelEvent(3);
  expect(winEvent0.eventId).toEqual(3);
  expect(winEvent0.elementId).toEqual(0);
  expect(winEvent0.mode).toEqual(`story`);
  expect(winEvent0.levelId).toEqual(0);

  const open0 = writeOpenSpellEvent(3, 0, 0);
  expect(open0).toEqual(1);
  const opened0 = readPlayerEvents(3);
  expect(opened0[3].playerId).toEqual(3);
  expect(opened0[3].eventId).toEqual(1);
  expect(opened0[3].type).toEqual(`OPENSPELL`);
  const openEvent = readOpenSpellEvent(1);
  expect(openEvent.eventId).toEqual(1);
  expect(openEvent.elementId).toEqual(0);
  expect(openEvent.spellId).toEqual(0);

  const update0 = writeUpdateSpellEvent(3, 0, 0);
  expect(update0).toEqual(1);
  const updated0 = readPlayerEvents(3);
  expect(updated0[4].playerId).toEqual(3);
  expect(updated0[4].eventId).toEqual(1);
  expect(updated0[4].type).toEqual(`UPDATESPELL`);
  const updateEvent = readUpdateSpellEvent(1);
  expect(updateEvent.eventId).toEqual(1);
  expect(updateEvent.elementId).toEqual(0);
  expect(updateEvent.spellId).toEqual(0);
});
