import React from "react";
import { render, screen } from "@testing-library/react";
import { LibraryUpdates } from "../Library/LibraryUpdates";
import { gameState } from "../utils/test_states";
import { GameContext, GameContextType } from "../App";
import { heroes } from "../utils/test_gameobjects";
const context: GameContextType = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  setGameState: jest.fn(),
  addition: null,
  setAdditionScreen: jest.fn(),
  backToMain: jest.fn(),
};
test("Library update throws correct error when gameState is missing in context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={{ ...context, gameState: null }}>
        <LibraryUpdates hero={heroes[0]} />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  jest.restoreAllMocks();
});
