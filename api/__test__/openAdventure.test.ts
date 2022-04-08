import { openAdventure } from "../engine/actions";
import { IPlayerAdventure } from "../engine/types";
import { testPlayerAdventures, testAdventures } from "./testdata";

test("openAdventure adds adventure if no adventures provided", () => {
  const res = openAdventure(null, testAdventures, 0);
  expect(res[0].id).toEqual(0);
  expect(res[0].open).toBeTruthy();
});

test("openAdventure adds adventure if there's less than max adventures", () => {
  const res = openAdventure([testPlayerAdventures[0]], testAdventures, 1);
  expect(res[0].id).toEqual(0);
  expect(res[0].open).toBeTruthy();
  expect(res[0].name).toEqual("story");
  expect(res[1].id).toEqual(1);
  expect(res[1].open).toBeTruthy();
  expect(res[1].name).toEqual("character");
});

test("openAdventure adds adventure if there's one expired", () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  const newPlayerAdventures = JSON.parse(
    JSON.stringify(
      testPlayerAdventures.concat(testPlayerAdventures).slice(0, 5)
    )
  );
  newPlayerAdventures[2].id = 4;
  newPlayerAdventures[2].expires_at = date;
  newPlayerAdventures[3].id = 5;
  newPlayerAdventures[4].id = 6;
  const res = openAdventure(newPlayerAdventures, testAdventures, 2);
  expect(res[4].id).toEqual(2);
  expect(res[4].open).toBeTruthy();
  expect(res[4].name).toEqual("event");
});

test("openAdventure warns when trying to add adventure that's already open", () => {
  const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
  openAdventure(testPlayerAdventures, testAdventures, 0);
  expect(warn).toBeCalledWith("Trying to add adventure that is already added");
  warn.mockReset();
});

test("openAdventure throws an error if no adventure with this id exists", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => openAdventure(null, testAdventures, 5)).toThrow(
    "Adventure with id 5 doesn't exist in all adventures database"
  );
  jest.restoreAllMocks();
});

test("openAdventure throws an error if no adventure to move out exists", () => {
  let date = new Date();
  date.setDate(date.getDate() + 2);
  const newPlayerAdventures = JSON.parse(
    JSON.stringify(
      testPlayerAdventures.concat(testPlayerAdventures).slice(0, 5)
    )
  ).map((a: IPlayerAdventure, n: number) => ({
    ...a,
    id: n + 1,
    expires_at: date,
  }));
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => openAdventure(newPlayerAdventures, testAdventures, 0)).toThrow(
    "Can't add a new adventure with id 0 - old adventures haven't expired"
  );
  jest.restoreAllMocks();
});
