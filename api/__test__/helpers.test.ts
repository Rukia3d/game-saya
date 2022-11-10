import { testPlayer } from "../../src/utils/testDBPlayer";
import { basePlayer } from "../db/testDBData";
import {
  energyPriceForStory,
  findEnergyPrice,
  generateArenaRandom,
  rewardArenaPlayer,
} from "../engine/helpers";
import {
  elementName,
  IMaterial,
  IMaterialQuant,
  IWinLevelEvent,
  materialName,
} from "../engine/types";

test("rewardArenaPlayer works as expected", () => {
  const reward = [
    { id: 0, name: "Gold" as materialName, element: null, quantity: 50 },
    {
      id: 2,
      name: "Jade" as materialName,
      element: { id: 0, name: "jade" as elementName },
      quantity: 10,
    },
  ];
  const res = rewardArenaPlayer(testPlayer, reward, 1);
  expect(res.claims.length).toEqual(1);
  expect(res.claims[0].id).toEqual(0);
  expect(res.claims[0].claimed).toBeFalsy();
  expect(res.claims[0].prize[0].quantity).toEqual(50);
  expect(res.claims[0].prize[0].name).toEqual("Gold");
  expect(res.claims[0].prize[1].quantity).toEqual(10);
  expect(res.claims[0].prize[1].name).toEqual("Jade");
  expect(res.messages.length).toEqual(3);
});

test("energy price is found for a correct mode", () => {
  const res = findEnergyPrice(0, 0, "story", 0);
  expect(res).toEqual(5);

  const res2 = findEnergyPrice(0, 0, "run", 0);
  expect(res2).toEqual(10);

  const res3 = findEnergyPrice(0, 0, "quest", 0);
  expect(res3).toEqual(5);
});

test("energyPriceForStory works correctly", () => {
  const res = energyPriceForStory(testPlayer, 0, 0, "run", 0);
  expect(res).toEqual(0);
  const res1 = energyPriceForStory(testPlayer, 0, 0, "run", 2);
  expect(res1).toEqual(5);
});
/*
test("finds correct index", async () => {
  const winLevelEvent: IWinLevelEvent = {
    playerId: 1,
    created: new Date().valueOf(),
    type: "WINLEVEL",
    eventId: 0,
    elementId: 1,
    mode: "story",
    levelId: 0,
  };
  const res = findLevelIndex(winLevelEvent, arcanas);
  expect(res[0]).toEqual(1);
  expect(res[1]).toEqual(0);

  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    findLevelIndex({ ...winLevelEvent, elementId: 7 }, arcanas)
  ).toThrow("No character 7 found");

  expect(() =>
    findLevelIndex({ ...winLevelEvent, levelId: 7 }, arcanas)
  ).toThrow("No level 7 found");
  jest.restoreAllMocks();
});

test("Can pay for a spell returns correct result", async () => {
  const owned: IMaterialQuant[] = materials.map((m: IMaterial) => {
    return { ...m, quantity: 10 };
  });
  const price: IMaterialQuant[] = [
    { ...materials[0], quantity: 5 },
    { ...materials[1], quantity: 7 },
  ];
  const res = enoughToPay(owned, price);
  expect(res).toBeTruthy();
  const res2 = enoughToPay(
    owned,
    price.concat([{ ...materials[2], quantity: 15 }])
  );
  expect(res2).toBeFalsy();
});

test("Can pay for a spell returns  error if material doesn't exist", async () => {
  const owned: IMaterialQuant[] = materials.map((m: IMaterial) => {
    return { ...m, quantity: 10 };
  });
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    enoughToPay(owned, [{ id: 55, name: "money", quantity: 1 }])
  ).toThrow("Price of an item contains non-existant materia");
  jest.restoreAllMocks();
});

test("Finds correct level for story", () => {
  const playerArcanas = JSON.parse(JSON.stringify(arcanas));
  const res = findLevelForStory(
    {
      playerId: 1,
      created: new Date().valueOf(),
      type: "WINLEVEL",
      eventId: 0,
      elementId: 1,
      mode: "story",
      levelId: 0,
    },
    playerArcanas
  );
  expect(res.id).toEqual(0);
  expect(res.mode).toEqual("story");
});

test("Finds correct level for tournament", () => {
  const playerArcanas = JSON.parse(JSON.stringify(arcanas));
  const res = findLevelForEndless(
    {
      eventId: 0,
      elementId: 0,
      mode: "run",
      playerId: 1,
      created: new Date().valueOf(),
      type: "MISSCHECKPOINT",
    },
    playerArcanas
  );
  expect(res.id).toEqual(0);
  expect(res.mode).toEqual("run");
});
*/
