import { displayAddedHero, displayAddedUpdate } from "../utils/screenLogic";
import { gameState } from "../utils/teststates";
import { storyChangeType } from "../utils/types";
test("displayAddedHero doesn't throw if all arguments are correct", () => {
  const allHeroes = gameState.player.heroes;
  const actions = [
    { type: "addHero" as storyChangeType, id: "nell", data: "fire" },
  ];
  const setAdditionScreen = jest.fn();
  expect(() =>
    displayAddedHero([], allHeroes, actions, setAdditionScreen)
  ).not.toThrow();
  expect(setAdditionScreen.mock.calls.length).toBe(1);
});

test("displayAddedHero throws if actions are incorrect", () => {
  const allHeroes = gameState.player.heroes;
  const actions1 = [
    { type: "addHero" as storyChangeType, id: null, data: "fire" },
  ];
  const actions2 = [
    { type: "addHero" as storyChangeType, id: "nell", data: null },
  ];
  const setAdditionScreen = jest.fn();
  expect(() =>
    //@ts-ignore
    displayAddedHero([], allHeroes, actions1, setAdditionScreen)
  ).toThrow("Update action is missing data - hero name");
  expect(() =>
    //@ts-ignore
    displayAddedHero([], allHeroes, actions2, setAdditionScreen)
  ).toThrow("Update action is missing data - hero element");
});

test("displayAddedUpdate doesn't throw if all arguments are correct", () => {
  const all = gameState.spellUpdates;
  const actions = [
    { type: "addUpdate" as storyChangeType, id: "fire", data: "fire_1" },
  ];
  const setAdditionScreen = jest.fn();
  expect(() =>
    displayAddedUpdate([], all, actions, setAdditionScreen)
  ).not.toThrow();
  expect(setAdditionScreen.mock.calls.length).toBe(1);
});

test("displayAddedUpdate throws if actions are incorrect", () => {
  const all = gameState.spellUpdates;
  const actions1 = [
    { type: "addUpdate" as storyChangeType, id: null, data: "fire_1" },
  ];
  const actions2 = [
    { type: "addUpdate" as storyChangeType, id: "fire", data: null },
  ];
  const setAdditionScreen = jest.fn();
  expect(() =>
    //@ts-ignore
    displayAddedUpdate([], all, actions1, setAdditionScreen)
  ).toThrow("Update action is missing data - update element");
  expect(() =>
    //@ts-ignore
    displayAddedUpdate([], all, actions2, setAdditionScreen)
  ).toThrow("Update action is missing data - update name");
});
