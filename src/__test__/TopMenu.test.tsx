import React from "react";
import { render, screen } from "@testing-library/react";
import { TopMenu } from "../UI/TopMenu";
import { GameContext } from "../App";
import { gameState } from "../utils/testobjects";

test("Renders Top menu with high mana and life", () => {
  const newPlayerData = { ...gameState.player.data, mana: 13 };
  const newPlayer = { ...gameState.player, data: newPlayerData };
  render(
    <GameContext.Provider
      value={{
        adventure: null,
        setAdventure: jest.fn(),
        story: null,
        setStory: jest.fn(),
        gameState: { ...gameState, player: newPlayer },
        dialogue: null,
        setDialogue: jest.fn(),
        setGameState: jest.fn(),
        backToMain: jest.fn(),
        backToStory: jest.fn(),
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
    <GameContext.Provider
      value={{
        adventure: null,
        setAdventure: jest.fn(),
        story: null,
        setStory: jest.fn(),
        gameState: gameState,
        dialogue: null,
        setDialogue: jest.fn(),
        setGameState: jest.fn(),
        backToMain: jest.fn(),
        backToStory: jest.fn(),
      }}
    >
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
        adventure: null,
        setAdventure: jest.fn(),
        story: null,
        setStory: jest.fn(),
        gameState: { ...gameState, player: newPlayer },
        dialogue: null,
        setDialogue: jest.fn(),
        setGameState: jest.fn(),
        backToMain: jest.fn(),
        backToStory: jest.fn(),
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

test("Renders Top menu with resources", () => {
  render(
    <GameContext.Provider
      value={{
        adventure: null,
        setAdventure: jest.fn(),
        story: null,
        setStory: jest.fn(),
        gameState: gameState,
        dialogue: null,
        setDialogue: jest.fn(),
        setGameState: jest.fn(),
        backToMain: jest.fn(),
        backToStory: jest.fn(),
      }}
    >
      <TopMenu />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("top_resources")).toBeInTheDocument();
  expect(screen.getAllByLabelText("top_resource").length).toEqual(3);
  expect(screen.getByText(/Gold/)).toBeInTheDocument();
  expect(screen.getByText(/Dimonds/)).toBeInTheDocument();
  expect(screen.getByText(/Iron/)).toBeInTheDocument();
});
