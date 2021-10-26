import React from "react";
import { render, screen } from "@testing-library/react";
import { gameState, stories } from "../utils/testobjects";
import { GameContext, GameContextType } from "../App";
import { StoryPanel } from "../Stories/Stories";

const context: GameContextType = {
  adventure: gameState.adventures[1],
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  dialogue: null,
  addition: null,
  reel: null,
  setReel: jest.fn(),
  setAdditionScreen: jest.fn(),
  setDialogue: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};
test("Renders 3 panels for a story", async () => {
  render(
    <GameContext.Provider value={context}>
      <StoryPanel loadStory={jest.fn()} group={stories[0]} />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("story_dialogue1")).toBeInTheDocument();
  expect(screen.getByAltText("story_dialogue11")).toBeInTheDocument();
  expect(screen.getByAltText("story_arena1")).toBeInTheDocument();
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
        <StoryPanel loadStory={jest.fn()} group={stories[0]} />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  expect(() =>
    render(
      <GameContext.Provider value={context}>
        <StoryPanel loadStory={jest.fn()} group={invalidStory} />
      </GameContext.Provider>
    )
  ).toThrow("Number of stories in this panel is incorrect");

  jest.restoreAllMocks();
});
