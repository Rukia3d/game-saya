import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { gameState } from "../utils/test_states";
import userEvent from "@testing-library/user-event";
import { IResource } from "../utils/types";
import { enemy, fightstory } from "../utils/test_gameobjects";
import { FightLost } from "../Fight/FightLost";

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
  const setGameState = jest.fn();
  render(
    <GameContext.Provider value={{ ...context, setGameState: setGameState }}>
      <FightLost />
    </GameContext.Provider>
  );
  expect(screen.getByText(/I am Life lost animation/)).toBeInTheDocument();
  expect(screen.getByTestId("exit_fight")).toBeInTheDocument();
  userEvent.click(screen.getByText("exit"));
  expect(setGameState.mock.calls.length).toBe(1);
});

test("Throws correct error with no context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={{ ...context, story: null }}>
        <FightLost />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");

  jest.restoreAllMocks();
});
