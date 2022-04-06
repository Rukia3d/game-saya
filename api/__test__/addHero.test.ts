import { addHero } from "../engine/actions";
import { testHeroes, testPlayerHeroes } from "./testdata";
test("heroAdd adds hero 0 with no preexisting heros and no expiration date", () => {
  const res = addHero(null, testHeroes, 0);
  expect(res[0]).toBeDefined();
  expect(res[0].id).toEqual(0);
  expect(res[0].selected).toBeFalsy();
  expect(res[0].created_at).toBeDefined();
  expect(res[0].expires_at).toBeNull();
});

test("heroAdd adds hero 0 with existig heros and no expiration date", () => {
  const res = addHero([testPlayerHeroes[1]], testHeroes, 0);
  expect(res.length).toBe(2);
  expect(res[0].id).toEqual(1);
  expect(res[1].id).toEqual(0);
  expect(res[1].selected).toBeFalsy();
  expect(res[1].created_at).toBeDefined();
  expect(res[1].expires_at).toBeNull();
});

test("heroAdd adds hero 0 with existig heros and expiration date", () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  const res = addHero([testPlayerHeroes[1]], testHeroes, 0, date);
  expect(res[0].id).toEqual(1);
  expect(res[1].id).toEqual(0);
  expect(res[1].selected).toBeFalsy();
  expect(res[1].created_at).toBeDefined();
  expect(res[1].expires_at).toEqual(date);
});

test("heroAdd throws a warning when adding the same hero", () => {
  const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
  addHero(testPlayerHeroes, testHeroes, 0);
  expect(warn).toBeCalledWith(
    "Trying to add hero with id 0 that is already owned"
  );
  warn.mockReset();
});

test("heroAdd throws an error when adding hero that doesn't exist", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => addHero(testPlayerHeroes, testHeroes, 4)).toThrow(
    "Hero with id 4 doesn't exist in all heroes database"
  );
  jest.restoreAllMocks();
});
