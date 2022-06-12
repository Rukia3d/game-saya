import e from "express";
import { elements } from "../db/testDB";
import { findEnergyPrice, findLevelIndex } from "../engine/helpers";
import { IWinLevelEventTimed } from "../engine/types";

test("energy price is found for a correct mode", async () => {
  const res = findEnergyPrice(0, "story", 0);
  expect(res).toEqual(5);

  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => findEnergyPrice(0, "some", 5)).toThrow("Unknown mode");
  jest.restoreAllMocks();
});

test("finds correct index", async () => {
  const winLevelEvent: IWinLevelEventTimed = {
    eventId: 0,
    elementId: 1,
    mode: "story",
    levelId: 0,
    time: new Date(),
  };
  const res = findLevelIndex(winLevelEvent, elements);
  expect(res[0]).toEqual(1);
  expect(res[1]).toEqual(0);

  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    findLevelIndex({ ...winLevelEvent, elementId: 7 }, elements)
  ).toThrow("No character 7 found");

  expect(() =>
    findLevelIndex({ ...winLevelEvent, levelId: 7 }, elements)
  ).toThrow("No level 7 found");
  jest.restoreAllMocks();
});
