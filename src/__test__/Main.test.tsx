import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { gameState } from "../utils/teststates";
import { Main } from "../Main/Main";
import userEvent from "@testing-library/user-event";

const context: GameContextType = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders Heroes screen with characters ready for a dialogue", () => {
  render(
    <GameContext.Provider value={context}>
      <Main />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("mmenu-city-border")).toHaveAttribute(
    "style",
    "background-color: white;"
  );
  expect(screen.getByLabelText("mmenu-city")).toHaveAttribute(
    "style",
    expect.stringContaining("main_background")
  );
  expect(screen.getByLabelText("mmenu-adventure-border")).toHaveAttribute(
    "style",
    "background-color: black;"
  );
  expect(screen.getByLabelText("mmenu-adventure")).toHaveAttribute(
    "style",
    expect.stringContaining("adventure_background")
  );
  expect(screen.getByLabelText("mmenu-library-border")).toHaveAttribute(
    "style",
    "background-color: black;"
  );
  expect(screen.getByLabelText("mmenu-library")).toHaveAttribute(
    "style",
    expect.stringContaining("library_background")
  );
  userEvent.click(screen.getByLabelText("mmenu-adventure-border"));
  expect(screen.getByLabelText("mmenu-city-border")).toHaveAttribute(
    "style",
    "background-color: black;"
  );
  expect(screen.getByLabelText("mmenu-adventure-border")).toHaveAttribute(
    "style",
    "background-color: white;"
  );
});
