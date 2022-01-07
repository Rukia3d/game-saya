import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { gameState } from "../utils/teststates";
import userEvent from "@testing-library/user-event";
import { FightWon } from "../Fight/FightWon";
import { IResource } from "../utils/types";
import { dialstory, enemy, fightstory, reelStory } from "../utils/testobjects";
import { GenericStory } from "../Main/GenericStory";

const context: GameContextType = {
  adventure: null,
  setAdventure: jest.fn(),
  story: fightstory,
  setStory: jest.fn(),
  gameState: gameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders Fight story if fight is provided", () => {
  render(
    <GameContext.Provider value={{ ...context, story: fightstory }}>
      <GenericStory />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("fight-screen")).toBeInTheDocument();
});

test("Renders Dialogue if dialogue is provided", () => {
  render(
    <GameContext.Provider value={{ ...context, story: dialstory }}>
      <GenericStory />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("dialogue-screen")).toBeInTheDocument();
});

test("Renders Reel if no other cases", () => {
  render(
    <GameContext.Provider
      value={{
        ...context,
        story: reelStory,
        gameState: { ...gameState, reels: [reelStory] },
      }}
    >
      <GenericStory />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("reel-screen")).toBeInTheDocument();
});

test("Throws correct error with no context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={{ ...context, story: null }}>
        <GenericStory />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");

  jest.restoreAllMocks();
});

test("Throws correct error if dialogue is not set", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider
        value={{ ...context, story: { ...dialstory, id: "some" } }}
      >
        <GenericStory />
      </GameContext.Provider>
    )
  ).toThrow("Couldn't find a dialogue some");

  jest.restoreAllMocks();
});
