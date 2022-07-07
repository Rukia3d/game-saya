import { arcanas, materials } from "../db/testDBPlayer";
import {
  canBuySpell,
  findEnergyPrice,
  findLevelIndex,
} from "../engine/helpers";
import {
  IMaterial,
  IMaterialQuant,
  IWinLevelEventTimed,
} from "../engine/types";

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
    arcanaId: 1,
    mode: "story",
    levelId: 0,
    time: new Date(),
  };
  const res = findLevelIndex(winLevelEvent, arcanas);
  expect(res[0]).toEqual(1);
  expect(res[1]).toEqual(0);

  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    findLevelIndex({ ...winLevelEvent, arcanaId: 7 }, arcanas)
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
  const res = canBuySpell(owned, price);
  expect(res).toBeTruthy();
  const res2 = canBuySpell(
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
    canBuySpell(owned, [{ id: 55, name: "Coin", quantity: 1 }])
  ).toThrow("Price of an item contains non-existant materia");
  jest.restoreAllMocks();
});
