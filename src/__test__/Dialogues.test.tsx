import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { gameState, dialogue } from "../utils/testobjects";
import userEvent from "@testing-library/user-event";
import { Dialogues } from "../Dialogues/Dialogues";
import { elementType, storyChangeType } from "../utils/types";

const context: GameContextType = {
  adventure: gameState.adventures[0],
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  dialogue: dialogue,
  addition: null,
  reel: null,
  setReel: jest.fn(),
  setAdditionScreen: jest.fn(),
  setDialogue: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("Renders dialogue page", async () => {
  const setDialogue = jest.fn();
  render(
    <GameContext.Provider value={{ ...context, setDialogue: setDialogue }}>
      <Dialogues />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("dialogue_background")).toBeInTheDocument();
  expect(screen.getByAltText("character_image_olija")).toBeInTheDocument();
  expect(screen.getByLabelText("dialogue_line_0")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("dialogue_line_0"));
  expect(
    screen.queryByAltText("character_image_olija")
  ).not.toBeInTheDocument();
  expect(screen.queryByLabelText("dialogue_line_0")).not.toBeInTheDocument();
  expect(screen.getByAltText("character_image_maya")).toBeInTheDocument();
  expect(screen.getByLabelText("dialogue_line_1")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("dialogue_line_1"));
  expect(setDialogue.mock.calls.length).toBe(1);
});

test("Renders dialogue page and triggers Character screen", async () => {
  const setAdditionScreen = jest.fn();
  const newDialogue = {
    ...dialogue,
    action: [{ type: "addHero" as storyChangeType, id: "nell", data: "fire" }],
  };
  const newGameState = {
    ...gameState,
    player: {
      ...gameState.player,
      heroes: [
        {
          element: "earth" as elementType,
          id: "maya",
          image: "maya",
          name: "Maya",
          selected: true,
        },
      ],
    },
  };
  const newContext = {
    ...context,
    gameState: newGameState,
    dialogue: newDialogue,
    setAdditionScreen: setAdditionScreen,
  };
  render(
    <GameContext.Provider value={newContext}>
      <Dialogues />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("dialogue_background")).toBeInTheDocument();
  expect(screen.getByAltText("character_image_olija")).toBeInTheDocument();
  expect(screen.getByLabelText("dialogue_line_0")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("dialogue_line_0"));
  expect(screen.getByLabelText("dialogue_line_1")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("dialogue_line_1"));
  expect(setAdditionScreen.mock.calls.length).toBe(1);
});
