import React from "react";
import { render, screen } from "@testing-library/react";
import { Shop } from "../Main/Shop";
import { GameContext } from "../App";
import { gameState } from "../utils/testobjects";

const context = {
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
};

test("Renders College with a background", async () => {
  render(
    <GameContext.Provider value={context}>
      <Shop />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("shop_background")).toBeInTheDocument();
});
