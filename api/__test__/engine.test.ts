import { playerEvents } from "../db/testDB";
import { applyEvents } from "../engine/engine";
import { IPlayerEvent } from "../engine/types";

test("Series of events applies correctly", () => {
  const newEvents = JSON.parse(
    JSON.stringify(playerEvents.filter((p: IPlayerEvent) => p.playerId === 1))
  );
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
