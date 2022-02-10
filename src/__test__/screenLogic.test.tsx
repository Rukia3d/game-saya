import { displayAddedHero, displayAddedUpdate } from "../utils/screenLogic";
import { gameState } from "../utils/test_states";
import { IStoryAction, storyChangeType } from "../utils/types";
test("displayAddedHero doesn't throw if all arguments are correct", () => {
  const allHeroes = gameState.player.heroes;
  const actions: IStoryAction[] = [
    {
      type: "addHero" as storyChangeType,
      id: "addHero3",
      item: "nell",
      data: "fire",
    },
  ];
  const setAdditionScreen = jest.fn();
  expect(() =>
    displayAddedHero([], allHeroes, actions, setAdditionScreen)
  ).not.toThrow();
  expect(setAdditionScreen.mock.calls.length).toBe(1);
});

test("displayAddedHero throws if actions are incorrect", () => {
  const allHeroes = gameState.player.heroes;
  const actions1: IStoryAction[] = [
    {
      type: "addHero" as storyChangeType,
      id: "addHero1",
      item: "",
      data: "red",
    },
  ];
  const actions2: IStoryAction[] = [
    {
      type: "addHero" as storyChangeType,
      id: "addHero1",
      item: "nell",
      data: null,
    },
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
  const all = gameState.game.updates;
  const actions: IStoryAction[] = [
    {
      type: "addUpdate" as storyChangeType,
      id: "addUpdate1",
      item: "restoration",
      data: "fire_1",
    },
  ];
  const setAdditionScreen = jest.fn();
  expect(() =>
    displayAddedUpdate([], all, actions, setAdditionScreen)
  ).not.toThrow();
  expect(setAdditionScreen.mock.calls.length).toBe(1);
});

test("displayAddedUpdate throws if actions are incorrect", () => {
  const all = gameState.game.updates;
  const actions1: IStoryAction[] = [
    {
      type: "addUpdate" as storyChangeType,
      id: "addUpdate1",
      item: "red",
      data: "fire_1",
    },
  ];
  const actions2: IStoryAction[] = [
    {
      type: "addUpdate" as storyChangeType,
      id: "addUpdate1",
      item: "fire",
      data: null,
    },
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
