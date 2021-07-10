import React from "react";
import { render, screen } from "@testing-library/react";
import { Heroes } from "../Main/Heroes";
import { GameContext } from "../App";

const gameState = {
  sceneCharacters: [
    { id: "maya", name: "Maya", image: "../img/maya.png", state: "story" },
    { id: "tara", name: "Tara", image: "../img/tara.png", state: "story" },
  ],
  dialogues: [],
  player: {
    id: 1,
    cards: [],
    experience: 300,
    lifes: 3,
    heroes: [
      {
        id: "maya",
        name: "Maya",
        image: "../img/maya_spells.png",
      },
    ],
    resources: [
      { id: "iron", name: "Iron", image: "../", commonality: 5, quantity: 1 },
    ],
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

test("Renders Heroes screen with characters ready for a dialogue", () => {
  render(
    <GameContext.Provider value={context}>
      <Heroes />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("heroes_background")).toBeInTheDocument();
  expect(screen.getByAltText("hero_maya")).toBeInTheDocument();
  expect(screen.getByAltText("hero_tara")).toBeInTheDocument();
});
