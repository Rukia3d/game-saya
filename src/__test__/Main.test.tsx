import React from "react";
import { render, screen } from "@testing-library/react";
import { City } from "../Main/City";
import { GameContext, GameContextType } from "../App";
import { gameState } from "../utils/teststates";
import userEvent from "@testing-library/user-event";
import { Main } from "../Main/Main";

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
  expect(screen.getByAltText("intro_background")).toBeInTheDocument();
  expect(screen.getByLabelText("hero_maya")).toBeInTheDocument();
  expect(screen.getByLabelText("hero_tara")).toBeInTheDocument();
  expect(screen.getByAltText("maya_story")).toBeInTheDocument();
  expect(screen.getByAltText("tara_story")).toBeInTheDocument();
});
