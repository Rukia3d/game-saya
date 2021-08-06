import React from "react";
import { render, screen } from "@testing-library/react";
import { Intro } from "../Main/Intro";
import { GameContext } from "../App";
import { gameState } from "../utils/testobjects";
import userEvent from "@testing-library/user-event";
import { CharacterNPC } from "../utils/types";

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
      <Intro />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("intro_background")).toBeInTheDocument();
  expect(screen.getByAltText("hero_maya")).toBeInTheDocument();
  expect(screen.getByAltText("hero_tara")).toBeInTheDocument();
  expect(screen.getByAltText("maya_story")).toBeInTheDocument();
  expect(screen.getByAltText("tara_story")).toBeInTheDocument();
});

test("Dialogue is triggered when clicking on panel and closes correctly", () => {
  render(
    <GameContext.Provider value={context}>
      <Intro />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("intro_background")).toBeInTheDocument();
  userEvent.click(screen.getByAltText("maya_story"));
  expect(context.setDialogue.mock.calls.length).toBe(1);
});

test("Throws error if no data provided in context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const context1 = { ...context, gameState: null };
  expect(() =>
    render(
      <GameContext.Provider value={context1}>
        <Intro />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");

  jest.restoreAllMocks();
});
