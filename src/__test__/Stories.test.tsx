import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { dialstory } from "../utils/testobjects";
import { Stories } from "../Stories/Stories";
import { gameRestrictedCharacters, gameState } from "../utils/teststates";
import { IHero } from "../utils/types";

const context: GameContextType = {
  adventure: gameState.adventures[1],
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
};

test("Stories renders StoryPanels for adventure", async () => {
  const setStory = jest.fn();
  render(
    <GameContext.Provider
      value={{ ...context, story: dialstory, setStory: setStory }}
    >
      <Stories />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("story_background")).toBeInTheDocument();
  expect(screen.getByTestId("scroll_button")).toBeInTheDocument();
  expect(screen.getByLabelText("stories_list")).toBeInTheDocument();
  expect(screen.getByLabelText("stories_list").children.length).toEqual(4);
  userEvent.click(screen.getByTestId("scroll_button"));
  expect(screen.getByLabelText("stories_list").children.length).toEqual(2);
  expect(screen.getAllByTestId("scroll_button").length).toEqual(1);
  userEvent.click(screen.getByTestId("scroll_button"));
  expect(screen.getByLabelText("stories_list").children.length).toEqual(4);
  userEvent.click(screen.getByAltText("story_dialogue1"));
  expect(setStory.mock.calls.length).toBe(1);
});

test("Throws error if no data provided in context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const context1 = { ...context, gameState: null };
  const context2 = {
    ...context,
    adventure: null,
  };
  expect(() =>
    render(
      <GameContext.Provider value={context1}>
        <Stories />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  expect(() =>
    render(
      <GameContext.Provider value={context2}>
        <Stories />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");

  jest.restoreAllMocks();
});

test("For M and T fight, if no characters selected, show error No heros selected", () => {
  gameRestrictedCharacters.player.heroes.map(
    (h: IHero) => (h.selected = false)
  );
  render(
    <GameContext.Provider
      value={{
        ...context,
        gameState: gameRestrictedCharacters,
        adventure: gameRestrictedCharacters.adventures[1],
      }}
    >
      <Stories />
    </GameContext.Provider>
  );
  const figtIcons = screen.getAllByLabelText("fight-icons");
  expect(figtIcons[0].children.length).toBe(2);
  expect(figtIcons[1].children.length).toBe(3);
  userEvent.click(screen.getByAltText("story_test_arena0"));
  expect(screen.getByText(/No heros selected/)).toBeInTheDocument();
});

test("For M and T fight, if less characters selected, show error You need more heroes for this fight", () => {
  gameRestrictedCharacters.player.heroes.map(
    (h: IHero) => (h.selected = false)
  );
  gameRestrictedCharacters.player.heroes[0].selected = true;
  render(
    <GameContext.Provider
      value={{
        ...context,
        gameState: gameRestrictedCharacters,
        adventure: gameRestrictedCharacters.adventures[1],
      }}
    >
      <Stories />
    </GameContext.Provider>
  );
  const figtIcons = screen.getAllByLabelText("fight-icons");
  expect(figtIcons[0].children.length).toBe(2);
  expect(figtIcons[1].children.length).toBe(3);
  userEvent.click(screen.getByAltText("story_test_arena0"));
  expect(
    screen.getByText(/You need more heroes for this fight/)
  ).toBeInTheDocument();
});

test("For M and T fight, if no characters selected, show error Number of heroes for this fight is limited", () => {
  gameRestrictedCharacters.player.heroes.map(
    (h: IHero) => (h.selected = false)
  );
  gameRestrictedCharacters.player.heroes[0].selected = true;
  gameRestrictedCharacters.player.heroes[1].selected = true;
  gameRestrictedCharacters.player.heroes[2].selected = true;
  render(
    <GameContext.Provider
      value={{
        ...context,
        gameState: gameRestrictedCharacters,
        adventure: gameRestrictedCharacters.adventures[1],
      }}
    >
      <Stories />
    </GameContext.Provider>
  );
  const figtIcons = screen.getAllByLabelText("fight-icons");
  expect(figtIcons[0].children.length).toBe(2);
  expect(figtIcons[1].children.length).toBe(3);
  userEvent.click(screen.getByAltText("story_test_arena0"));
  expect(
    screen.getByText(/Number of heroes for this fight is limited/)
  ).toBeInTheDocument();
});

test("For M and T fight, if no characters selected, show error This fight is restricted", () => {
  gameRestrictedCharacters.player.heroes.map(
    (h: IHero) => (h.selected = false)
  );
  gameRestrictedCharacters.player.heroes[2].selected = true;
  gameRestrictedCharacters.player.heroes[4].selected = true;
  render(
    <GameContext.Provider
      value={{
        ...context,
        gameState: gameRestrictedCharacters,
        adventure: gameRestrictedCharacters.adventures[1],
      }}
    >
      <Stories />
    </GameContext.Provider>
  );
  const figtIcons = screen.getAllByLabelText("fight-icons");
  expect(figtIcons[0].children.length).toBe(2);
  expect(figtIcons[1].children.length).toBe(3);
  userEvent.click(screen.getByAltText("story_test_arena0"));
  expect(screen.getByText(/This fight is restricted/)).toBeInTheDocument();
});

test("For combined fight, if some of the heroes included, show error This fight is restricted", () => {
  //@ts-ignore
  gameRestrictedCharacters.adventures[1].storyGroups[0].stories[1].open = true;
  gameRestrictedCharacters.player.heroes.map(
    (h: IHero) => (h.selected = false)
  );
  gameRestrictedCharacters.player.heroes[0].selected = true;
  gameRestrictedCharacters.player.heroes[3].selected = true;
  //@ts-ignore
  gameRestrictedCharacters.player.heroes[1].selected = true;
  render(
    <GameContext.Provider
      value={{
        ...context,
        gameState: gameRestrictedCharacters,
        adventure: gameRestrictedCharacters.adventures[1],
      }}
    >
      <Stories />
    </GameContext.Provider>
  );
  const figtIcons = screen.getAllByLabelText("fight-icons");
  expect(figtIcons[0].children.length).toBe(2);
  expect(figtIcons[1].children.length).toBe(3);
  userEvent.click(screen.getByAltText("story_test_arena1"));
  expect(screen.getByText(/This fight is restricted/)).toBeInTheDocument();
});

test("For combined fight, if none of the heroes included, show error This fight is restricted", () => {
  //@ts-ignore
  gameRestrictedCharacters.adventures[1].storyGroups[0].stories[1].open = true;
  gameRestrictedCharacters.player.heroes.map(
    (h: IHero) => (h.selected = false)
  );
  gameRestrictedCharacters.player.heroes[2].selected = true;
  gameRestrictedCharacters.player.heroes[3].selected = true;
  gameRestrictedCharacters.player.heroes[1].selected = true;
  render(
    <GameContext.Provider
      value={{
        ...context,
        gameState: gameRestrictedCharacters,
        adventure: gameRestrictedCharacters.adventures[1],
      }}
    >
      <Stories />
    </GameContext.Provider>
  );
  const figtIcons = screen.getAllByLabelText("fight-icons");
  expect(figtIcons[0].children.length).toBe(2);
  expect(figtIcons[1].children.length).toBe(3);
  userEvent.click(screen.getByAltText("story_test_arena1"));
  screen.debug();
  expect(screen.getByText(/This fight is restricted/)).toBeInTheDocument();
});

test("For combined fight, if all of the heroes included, don't show the error", () => {
  //@ts-ignore
  gameRestrictedCharacters.adventures[1].storyGroups[0].stories[1].open = true;
  gameRestrictedCharacters.player.heroes.map(
    (h: IHero) => (h.selected = false)
  );
  gameRestrictedCharacters.player.heroes[0].selected = true;
  gameRestrictedCharacters.player.heroes[4].selected = true;
  gameRestrictedCharacters.player.heroes[1].selected = true;
  const setStory = jest.fn();
  render(
    <GameContext.Provider
      value={{
        ...context,
        gameState: gameRestrictedCharacters,
        adventure: gameRestrictedCharacters.adventures[1],
        setStory: setStory,
      }}
    >
      <Stories />
    </GameContext.Provider>
  );
  const figtIcons = screen.getAllByLabelText("fight-icons");
  expect(figtIcons[0].children.length).toBe(2);
  expect(figtIcons[1].children.length).toBe(3);
  userEvent.click(screen.getByAltText("story_test_arena1"));
  expect(setStory.mock.calls.length).toBe(1);
});
