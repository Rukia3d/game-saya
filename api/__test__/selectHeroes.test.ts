import { selectHeroes } from "../engine/actions";
import { testPlayerHeroes } from "./testdata";

test("selectHeroes when 1 is selected and 1 allowed - reselect", () => {
  const newHeroes = JSON.parse(JSON.stringify(testPlayerHeroes));
  newHeroes[1].selected = false;
  const res = selectHeroes(newHeroes, [1], 1);
  expect(res[0].selected).toBeFalsy();
  expect(res[1].selected).toBeTruthy();
  expect(res[2].selected).toBeFalsy();
});

test("selectHeroes when 1 is selected and 2 allowed - add select", () => {
  const newHeroes = JSON.parse(JSON.stringify(testPlayerHeroes));
  newHeroes[0].selected = false;
  const res = selectHeroes(newHeroes, [2], 2);
  expect(res[2].selected).toBeTruthy();
  expect(res[0].selected).toBeFalsy();
  expect(res[1].selected).toBeTruthy();
});

test("selectHeroes throws error if no heroes provided for selection", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => selectHeroes([], [2], 2)).toThrow(
    "Can't select heroes, no heroes provided"
  );
  jest.restoreAllMocks();
});

test("selectHeroes throws error if no selection provided for heroes", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => selectHeroes(testPlayerHeroes, [], 2)).toThrow(
    "Can't select heroes, no select indexes provided"
  );
  jest.restoreAllMocks();
});

test("selectHeroes throws error when not enough is selected", () => {
  const newHeroes = JSON.parse(JSON.stringify(testPlayerHeroes));
  newHeroes[0].selected = false;
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => selectHeroes(newHeroes, [1, 2], 3)).toThrow(
    "Not enough heroes, 2 is selected, max is 3"
  );
  jest.restoreAllMocks();
});

test("selectHeroes throws error when trying to select the same hero twice", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => selectHeroes(testPlayerHeroes, [2, 2], 2)).toThrow(
    "Can't select the same hero twice"
  );
  jest.restoreAllMocks();
});

test("selectHeroes throws error if selection provided doesn't contain the hero we want", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => selectHeroes(testPlayerHeroes, [2, 4], 2)).toThrow(
    "Can't add hero with the index higher than all player heroes"
  );
  jest.restoreAllMocks();
});
