import React from "react";
import { render, screen } from "@testing-library/react";
import { FightResult } from "../Fight/FightResult";
import { gameState } from "../utils/teststates";
import { IResource } from "../utils/types";
import userEvent from "@testing-library/user-event";
import { enemy, fightstory } from "../utils/testobjects";
import { GameContextType, GameContext } from "../App";

const context: GameContextType = {
  adventure: null,
  addition: null,
  setAdventure: jest.fn(),
  story: fightstory,
  setStory: jest.fn(),
  gameState: gameState,
  setGameState: jest.fn(),
  setAdditionScreen: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders FightResult screen for Win", async () => {
  const playerResources = gameState.resources.map((r: IResource) => {
    return { ...r, quantity: 1 };
  });
  const setGameState = jest.fn();
  render(
    <GameContext.Provider
      value={{
        ...context,
        story: fightstory,
        setGameState: setGameState,
      }}
    >
      <FightResult result={"Won"} rewards={playerResources} enemy={enemy} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/You Won/)).toBeInTheDocument();
  expect(screen.getByText(/Your prize/)).toBeInTheDocument();
  expect(screen.getByText(/Sparks/)).toBeInTheDocument();
  expect(screen.getByText(/Lava Rock/)).toBeInTheDocument();
  userEvent.click(screen.getByText("exit"));
  expect(setGameState.mock.calls.length).toBe(1);
});

test("Renders FightResult screen for Lost", async () => {
  const playerResources = gameState.resources.map((r: IResource) => {
    return { ...r, quantity: 1 };
  });
  const setGameState = jest.fn();
  render(
    <GameContext.Provider
      value={{
        ...context,
        story: fightstory,
        setGameState: setGameState,
      }}
    >
      <FightResult result={"Lost"} rewards={playerResources} enemy={enemy} />{" "}
    </GameContext.Provider>
  );
  expect(screen.getByText(/You Lost/)).toBeInTheDocument();
  expect(screen.getByText(/Life lost/)).toBeInTheDocument();
  expect(screen.queryByText(/Your prize/)).not.toBeInTheDocument();
  userEvent.click(screen.getByText("exit"));
  expect(setGameState.mock.calls.length).toBe(1);
});
