import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { dialstory } from "../utils/testobjects";
import { Stories } from "../Stories/Stories";
import { gameState } from "../utils/teststates";
import { IHero, IStoryGroup } from "../utils/types";
import { Heroes } from "../Main/Heroes";

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

const game = JSON.parse(JSON.stringify(gameState));
game.adventures[1].storyGroups = [
  {
    id: "test_group_1",
    name: "test group 1",
    group: 0,
    stories: new Array(3).fill(0).map((x, i) => ({
      id: "test_arena" + i,
      type: "fight",
      image: "arena",
      open: i === 0,
      name: "Test Arena" + i,
      action: [],
      nextStory: "test_arena" + (i + 1),
    })),
  },
];
game.fights = [
  {
    id: "test_arena0",
    name: "Test Arena 0",
    image: "../img/arena_1.png",
    enemy: "test-dude",
    characters: ["maya", "tara"],
  },
  {
    id: "test_arena1",
    name: "Test Arena 1",
    image: "../img/arena_1.png",
    enemy: "test-dude",
    characters: ["maya", "any", "any"],
  },
  {
    id: "test_arena2",
    image: "../img/arena_1.png",
    enemy: "test-dude",
    characters: ["any", "any", "any"],
  },
];
test("If no characters selected, show error No heros selected", () => {
  game.player.heroes.map((h: IHero) => (h.selected = false));
  render(
    <GameContext.Provider
      value={{ ...context, gameState: game, adventure: game.adventures[1] }}
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

test("If less characters selected, show error You need more heroes for this fight", () => {
  game.player.heroes.map((h: IHero) => (h.selected = false));
  game.player.heroes[0].selected = true;
  render(
    <GameContext.Provider
      value={{ ...context, gameState: game, adventure: game.adventures[1] }}
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

test("If no characters selected, show error Number of heroes for this fight is limited", () => {
  game.player.heroes.map((h: IHero) => (h.selected = false));
  game.player.heroes[0].selected = true;
  game.player.heroes[1].selected = true;
  game.player.heroes[2].selected = true;
  render(
    <GameContext.Provider
      value={{ ...context, gameState: game, adventure: game.adventures[1] }}
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

test("If no characters selected, show error This fight is restricted", () => {
  game.player.heroes.map((h: IHero) => (h.selected = false));
  game.player.heroes[2].selected = true;
  game.player.heroes[4].selected = true;
  render(
    <GameContext.Provider
      value={{ ...context, gameState: game, adventure: game.adventures[1] }}
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
