import React from "react";
import { render, screen } from "@testing-library/react";
import { College } from "../Main/College";
import { GameContext } from "../App";
import userEvent from "@testing-library/user-event";
const stories = require("../data/storiesAct1.json");

const gameState = {
  sceneCharacters: [],
  dialogues: [],
  player: {
    id: 1,
    maxMana: 5,
    cards: [],
    experience: 300,
    mana: 3,
    heroes: [],
    resources: [],
  },
  adventures: [],
  heroes: [],
};

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
      <College />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("college_background")).toBeInTheDocument();
});
