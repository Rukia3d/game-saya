import React from "react";
import { render, screen } from "@testing-library/react";
import { Dialogues } from "../Main/Dialogues";
import { GameContext } from "../App";
import { gameState } from "../utils/testobjects";

const context = {
  adventure: gameState.adventures[0],
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

test("Renders dialogue page", async () => {
  render(
    <GameContext.Provider value={context}>
      <Dialogues />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("dialogue_background")).toBeInTheDocument();
});
