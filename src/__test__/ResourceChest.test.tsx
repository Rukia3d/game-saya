import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { gameState } from "../utils/teststates";
import userEvent from "@testing-library/user-event";
import { ResourceChest } from "../Fight/ResourceChest";
import { IResource } from "../utils/types";
import { enemy, fightstory } from "../utils/testobjects";

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
  const playerResources = gameState.resources.map((r: IResource) => {
    return { ...r, quantity: 1 };
  });
  render(
    <GameContext.Provider value={context}>
      <ResourceChest rewards={playerResources} enemy={enemy} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Your prize/)).toBeInTheDocument();
  expect(screen.getByTestId("exit_fight")).toBeInTheDocument();
});

test("Throws correct error with no context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const playerResources = gameState.resources.map((r: IResource) => {
    return { ...r, quantity: 1 };
  });
  expect(() =>
    render(
      <GameContext.Provider value={{ ...context, story: null }}>
        <ResourceChest rewards={playerResources} enemy={enemy} />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");

  jest.restoreAllMocks();
});
