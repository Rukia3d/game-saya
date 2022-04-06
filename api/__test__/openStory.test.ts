import { openStory } from "../engine/actions";
import { testPlayerAdventures } from "./testdata";

test("openStory throws an error if no adventure provided", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => openStory(null, 1, 5)).toThrow(
    "Can't open a story, no adventures provided"
  );
  jest.restoreAllMocks();
});

test("openStory throws an error if incorrect adventure index provided", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => openStory(testPlayerAdventures, 5, 5)).toThrow(
    "Adventure with id 5 doesn't exist in player adventures"
  );
  jest.restoreAllMocks();
});

test("openStory throws an error if provided adventure has no story", () => {
  const newPlayerAdventures = JSON.parse(JSON.stringify(testPlayerAdventures));
  newPlayerAdventures[1].stories = null;
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => openStory(newPlayerAdventures, 1, 2)).toThrow(
    "Adventure with id 1 doesn't contain any stories"
  );
  jest.restoreAllMocks();
});

test("openStory throws an error if provided story doesn't exist in adventure", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() => openStory(testPlayerAdventures, 1, 5)).toThrow(
    "Story with id 5 doesn't exist in adventure 1"
  );
  jest.restoreAllMocks();
});

test("openStory opens a story correctly", () => {
  const res = openStory(testPlayerAdventures, 0, 2);
  expect(res[0].open).toBeTruthy();
});
