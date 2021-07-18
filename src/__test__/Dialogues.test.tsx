import React from "react";
import { render, screen } from "@testing-library/react";
import { Dialogues } from "../Main/Dialogues";
import { GameContext } from "../App";
const dialogues = require("../data/dialogues.json");

const gameState = {
  sceneCharacters: [],
  player: {
    id: 1,
    cards: [],
    experience: 300,
    maxMana: 5,
    mana: 3,
    heroes: [],
    resources: [],
  },
  adventures: [
    {
      id: "story",
      name: "Water Problems",
      image: "story.jpg",
      open: true,
      form: "story",
      stories: [],
    },
  ],
  dialogues: dialogues,
  heroes: [],
};

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
