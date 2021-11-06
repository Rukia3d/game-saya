import React from "react";
import { render, screen } from "@testing-library/react";
import { Adventures } from "../Main/Adventures";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { gameState } from "../utils/teststates";

const context: GameContextType = {
  adventure: null,
  story: null,
  gameState: gameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  setStory: jest.fn(),
  setAdventure: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders Adventures with character quest and correct state", () => {
  const newContext = JSON.parse(JSON.stringify(context));
  newContext.gameState.player.adventures[0].open = true;
  newContext.gameState.player.adventures[1].open = true;
  render(
    <GameContext.Provider value={newContext}>
      <Adventures />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("adventures_background")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_character")).toBeInTheDocument();
  expect(screen.getAllByTestId("locked").length).toBe(3);
  expect(screen.getByAltText("adventure_arena")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_story")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_event")).toBeInTheDocument();
});

test("Renders Adventures with no character quest and correct state", () => {
  const newContext = JSON.parse(JSON.stringify(context));
  newContext.gameState.player.adventures[0].open = true;
  newContext.gameState.player.adventures[1].open = false;
  render(
    <GameContext.Provider value={newContext}>
      <Adventures />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("adventures_background")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_character")).toBeInTheDocument();
  expect(screen.getAllByTestId("locked").length).toBe(4);
  expect(screen.getByAltText("adventure_arena")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_story")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_event")).toBeInTheDocument();
});

test("Renders StoryPanels for adventure", async () => {
  const setAdventure = jest.fn();
  render(
    <GameContext.Provider value={{ ...context, setAdventure: setAdventure }}>
      <Adventures />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("adventure_story")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("adventure_border_story"));
  expect(setAdventure.mock.calls.length).toBe(1);
});
