import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext } from "../App";
import { gameState, dialogue } from "../utils/testobjects";
import userEvent from "@testing-library/user-event";
import { Dialogues } from "../Dialogues/Dialogues";
import { Story, storyChangeType } from "../utils/types";

const context = {
  adventure: gameState.adventures[0],
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  dialogue: dialogue,
  character: null,
  setCharacter: jest.fn(),
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
  expect(context.setDialogue.mock.calls.length).toBe(1);
});

test("Renders dialogue page and triggers Character screen", async () => {
  const newDialogue = {
    ...dialogue,
    action: [{ type: "addHero" as storyChangeType, id: "nell", data: "fire" }],
  };
  const newContext = { ...context, dialogue: newDialogue };
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
  expect(context.setCharacter.mock.calls.length).toBe(1);
});
