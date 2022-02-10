import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { gameState } from "../utils/test_states";
import userEvent from "@testing-library/user-event";
import { FightWon } from "../Fight/FightWon";
import { IResource } from "../utils/types";
import { enemy, fightstory } from "../utils/test_gameobjects";
import { playerResources } from "../utils/test_playerobjects";

const context: GameContextType = {
  adventure: null,
  setAdventure: jest.fn(),
  story: fightstory,
  setStory: jest.fn(),
  gameState: gameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders Winning screen with a button", () => {
  render(
    <GameContext.Provider value={context}>
      <FightWon rewards={playerResources} enemy={enemy} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Your prize/)).toBeInTheDocument();
  expect(screen.getByTestId("exit_fight")).toBeInTheDocument();
});

test("Throws correct error with no context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={{ ...context, story: null }}>
        <FightWon rewards={playerResources} enemy={enemy} />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");

  jest.restoreAllMocks();
});
