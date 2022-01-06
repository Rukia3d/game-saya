import React from "react";
import { render, screen } from "@testing-library/react";
import { stories } from "../utils/testobjects";
import { GameContext, GameContextType } from "../App";
import { StoryPanel } from "../Stories/StoryPanel";
import { gameState } from "../utils/teststates";
import userEvent from "@testing-library/user-event";

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
test("Renders 3 panels for a story", async () => {
  render(
    <GameContext.Provider value={context}>
      <StoryPanel
        group={stories[0]}
        setSelectionError={jest.fn()}
        selectStory={jest.fn()}
      />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("story_dialogue0")).toBeInTheDocument();
  expect(screen.getByAltText("story_dialogue10")).toBeInTheDocument();
  expect(screen.getByAltText("story_arena0")).toBeInTheDocument();
});

test("Throws error if no data provided in context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const context1 = { ...context, gameState: null };
  const invalidStory = {
    ...stories[0],
    stories: stories[0].stories.slice(0, 1),
  };
  expect(() =>
    render(
      <GameContext.Provider value={context1}>
        <StoryPanel
          group={stories[0]}
          setSelectionError={jest.fn()}
          selectStory={jest.fn()}
        />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  expect(() =>
    render(
      <GameContext.Provider value={context}>
        <StoryPanel
          group={invalidStory}
          setSelectionError={jest.fn()}
          selectStory={jest.fn()}
        />
      </GameContext.Provider>
    )
  ).toThrow("Number of stories in panel name0 is incorrect");

  jest.restoreAllMocks();
});
