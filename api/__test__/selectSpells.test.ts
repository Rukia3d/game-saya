import { selectSpells } from "../engine/actions";
import { testPlayerSpells } from "./testdata";

test("selectSpells selects spells correctly when none selected", () => {
  const res = selectSpells(testPlayerSpells, [1, 2, 3], 3);
  expect(res.length).toBe(5);
  expect(res[0].selected).toBeFalsy();
  expect(res[1].selected).toBeTruthy();
  expect(res[2].selected).toBeTruthy();
  expect(res[3].selected).toBeTruthy();
  expect(res[4].selected).toBeFalsy();
});

test("selectSpells selects spells correctly when removing selection", () => {
  const newPlayerSpells = JSON.parse(JSON.stringify(testPlayerSpells));
  newPlayerSpells[0].selected = true;
  newPlayerSpells[1].selected = true;
  newPlayerSpells[4].selected = true;
  const res = selectSpells(testPlayerSpells, [1, 2, 3], 3);
  expect(res.length).toBe(5);
  expect(res[0].selected).toBeFalsy();
  expect(res[1].selected).toBeTruthy();
  expect(res[2].selected).toBeTruthy();
  expect(res[3].selected).toBeTruthy();
  expect(res[4].selected).toBeFalsy();
});

test("selectSpells throws an error if no player spells provided", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => selectSpells(null, [1, 2, 3], 3)).toThrow(
    "Can't select spells, not enough spells provided"
  );
  jest.restoreAllMocks();
});

test("selectSpells throws an error if no indexes to select are provided", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => selectSpells(testPlayerSpells, [], 3)).toThrow(
    "Can't select spells, no spells indexes provide"
  );
  jest.restoreAllMocks();
});

test("selectSpells throws an error if indexes for selection are not unique", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => selectSpells(testPlayerSpells, [1, 2, 2], 3)).toThrow(
    "Can't select the same spell twice"
  );
  jest.restoreAllMocks();
});
