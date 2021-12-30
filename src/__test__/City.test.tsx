import React from "react";
import { render, screen } from "@testing-library/react";
import { City } from "../Main/City";
import { GameContext, GameContextType } from "../App";
import { gameState } from "../utils/teststates";
import userEvent from "@testing-library/user-event";

const newPlayer = { ...gameState.player, heroes: [gameState.player.heroes[0]] };
const newGameState = {
  ...JSON.parse(JSON.stringify(gameState)),
  player: newPlayer,
};

const context: GameContextType = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: newGameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders Heroes screen with a hero and a dialogue preview", () => {
  render(
    <GameContext.Provider value={context}>
      <City />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("city-background")).toHaveAttribute(
    "style",
    expect.stringContaining("main_background")
  );
  expect(screen.getByLabelText("main-screen-hero-maya")).toBeInTheDocument();
  expect(screen.getByAltText("dialogue-maya-story")).toBeInTheDocument();
});

test("Dialogue is triggered when clicking on panel and closes correctly", () => {
  render(
    <GameContext.Provider value={context}>
      <City />
    </GameContext.Provider>
  );
  userEvent.click(screen.getByAltText("dialogue-maya-story"));
  expect(screen.getByLabelText("dialogue_background")).toHaveAttribute(
    "style",
    expect.stringContaining("dialogue_background")
  );
});

test("Throws error if no data provided in context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const context1 = { ...context, gameState: null };
  expect(() =>
    render(
      <GameContext.Provider value={context1}>
        <City />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");

  jest.restoreAllMocks();
});
