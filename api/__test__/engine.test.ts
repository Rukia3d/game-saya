import { writeStartLevelEvent, writeWinLevelEvent } from "../db/writers";
import { applyEvents } from "../engine/engine";
import { IPlayerEvent } from "../engine/types";

test("Series of 3 basic events applies correctly", () => {
  const newEvents: IPlayerEvent[] = [
    {
      playerId: 1,
      eventId: 0,
      type: "CREATEPLAYER",
      created: new Date(1654347193),
    },
    {
      playerId: 1,
      eventId: 0,
      type: "STARTLEVEL",
      created: new Date(1654347300),
    },
    {
      playerId: 1,
      eventId: 0,
      type: "WINLEVEL",
      created: new Date(1654347302),
    },
  ];
  const res = applyEvents(newEvents);
  expect(res.id).toEqual(1);
  expect(res.name).toEqual(`player 0 name`);
  expect(res.exprience).toEqual(10);
  expect(res.energy).toEqual(50);
  expect(res.materials.length).toEqual(8);
  expect(res.materials[0].quantity).toEqual(18);
  expect(res.materials[1].quantity).toEqual(0);
  expect(res.materials[3].quantity).toEqual(6);
  expect(res.elements.length).toEqual(1);
  expect(res.elements[0].id).toEqual(0);
  expect(res.elements[0].characterName).toEqual(`Saya`);
  expect(res.elements[0].stories.length).toEqual(3);
  expect(res.elements[0].stories[0].state).toEqual(`complete`);
  expect(res.elements[0].stories[1].state).toEqual(`open`);
  expect(res.elements[0].stories[2].state).toEqual(`closed`);
});

test("Series of 5 advanced events applies correctly", () => {
  writeStartLevelEvent(1, 0, "story", 1);
  writeWinLevelEvent(1, 0, "story", 1);
  const newEvents: IPlayerEvent[] = [
    {
      playerId: 5,
      eventId: 0,
      type: "CREATEPLAYER",
      created: new Date(1654347193),
    },
    {
      playerId: 5,
      eventId: 0,
      type: "STARTLEVEL",
      created: new Date(1654347300),
    },
    {
      playerId: 5,
      eventId: 0,
      type: "WINLEVEL",
      created: new Date(1654347302),
    },
    {
      playerId: 5,
      eventId: 0,
      type: "OPENSPELL",
      created: new Date(1654347302),
    },
    {
      playerId: 5,
      eventId: 1,
      type: "STARTLEVEL",
      created: new Date(1654347300),
    },
    {
      playerId: 5,
      eventId: 1,
      type: "WINLEVEL",
      created: new Date(1654347302),
    },
    {
      playerId: 1,
      eventId: 0,
      type: "UPDATESPELL",
      created: new Date(1654347302),
    },
  ];
  const res = applyEvents(newEvents);
  expect(res.id).toEqual(5);
  expect(res.name).toEqual(`player 0 name`);
  expect(res.exprience).toEqual(20);
  expect(res.energy).toEqual(50);
  expect(res.materials[0].quantity).toEqual(24);
  expect(res.materials[3].quantity).toEqual(4);
  expect(res.spells[0].strength).toEqual(2);
  expect(res.spells[0]).toHaveProperty("updatePrice");
  expect(res.spells[0]).toHaveProperty("requiredStrength");
});
