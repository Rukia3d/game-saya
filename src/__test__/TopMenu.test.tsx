import React from "react";
import { render, screen } from "@testing-library/react";
import { TopMenu } from "../UI/TopMenu";
import { GameContext } from "../App";
import { gameState } from "../utils/testobjects";

test("Renders Top menu with high mana", () => {
  render(
    <GameContext.Provider
      value={{
        adventure: null,
        setAdventure: jest.fn(),
        story: null,
        setStory: jest.fn(),
        gameState: { ...gameState, player: { ...gameState.player, mana: 5 } },
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
  expect(screen.getByLabelText("mana_value").innerHTML).toEqual("5");
  expect(screen.getByLabelText("mana_value")).toHaveAttribute(
    "style",
    "color: green;"
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
  expect(screen.getByLabelText("mana_value").innerHTML).toEqual("3");
  expect(screen.getByLabelText("mana_value")).toHaveAttribute(
    "style",
    "color: orange;"
  );
});

test("Renders Top menu with low mana", () => {
  render(
    <GameContext.Provider
      value={{
        adventure: null,
        setAdventure: jest.fn(),
        story: null,
        setStory: jest.fn(),
        gameState: { ...gameState, player: { ...gameState.player, mana: 1 } },
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
