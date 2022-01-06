import React from "react";
import { render, screen } from "@testing-library/react";
import { TopMenu } from "../UI/TopMenu";
import { GameContext, GameContextType } from "../App";
import { gameState } from "../utils/teststates";

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

test("Renders Top menu with high mana and life", () => {
  const newPlayerData = { ...gameState.player.data, mana: 13 };
  const newPlayer = { ...gameState.player, data: newPlayerData };
  render(
    <GameContext.Provider
      value={{
        ...context,
        gameState: { ...gameState, player: newPlayer },
      }}
    >
      <TopMenu />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("mana_icon")).toBeInTheDocument();
  expect(screen.getByLabelText("mana_value")).toBeInTheDocument();
  expect(screen.getByLabelText("life_icon")).toBeInTheDocument();
  expect(screen.getByLabelText("life_value")).toBeInTheDocument();
  expect(screen.getByLabelText("mana_value").innerHTML).toEqual("13");
  expect(screen.getByLabelText("life_value").innerHTML).toEqual("3");
  expect(screen.getByLabelText("mana_value")).toHaveAttribute(
    "style",
    "color: green;"
  );
  expect(screen.getByLabelText("life_value")).toHaveAttribute(
    "style",
    "color: red;"
  );
});

test("Renders Top menu with medium mana", () => {
  render(
    <GameContext.Provider value={context}>
      <TopMenu />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("mana_icon")).toBeInTheDocument();
  expect(screen.getByLabelText("mana_value")).toBeInTheDocument();
  expect(screen.getByLabelText("mana_value").innerHTML).toEqual("10");
  expect(screen.getByLabelText("mana_value")).toHaveAttribute(
    "style",
    "color: orange;"
  );
});

test("Renders Top menu with low mana", () => {
  const newPlayerData = { ...gameState.player.data, mana: 1 };
  const newPlayer = { ...gameState.player, data: newPlayerData };
  render(
    <GameContext.Provider
      value={{
        ...context,
        gameState: { ...gameState, player: newPlayer },
      }}
    >
      <TopMenu />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("mana_icon")).toBeInTheDocument();
  expect(screen.getByLabelText("mana_value")).toBeInTheDocument();
  expect(screen.getByLabelText("mana_value").innerHTML).toEqual("1");
  expect(screen.getByLabelText("mana_value")).toHaveAttribute(
    "style",
    "color: red;"
  );
});

test("Throws No Data", async () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const newContext = {
    ...context,
    gameState: null,
  };
  expect(() =>
    render(
      <GameContext.Provider value={newContext}>
        <TopMenu />
      </GameContext.Provider>
    )
  ).toThrow("No Data in Context");
  jest.restoreAllMocks();
});
