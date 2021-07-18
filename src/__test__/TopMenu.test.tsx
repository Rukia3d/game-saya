import React from "react";
import { render, screen } from "@testing-library/react";
import { TopMenu } from "../UI/TopMenu";
import { GameContext } from "../App";

const gameState = {
  sceneCharacters: [],
  dialogues: [],
  player: {
    id: 1,
    cards: [],
    experience: 300,
    mana: 3,
    maxMana: 5,
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

test("Renders Top menu with max mana", () => {
  render(
    <GameContext.Provider value={context}>
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
