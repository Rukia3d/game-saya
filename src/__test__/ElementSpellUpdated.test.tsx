import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { gameState } from "../utils/testobjects";
import { ElementSpellUpdated } from "../Spells/ElementSpellUpdated";

const context: GameContextType = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  dialogue: null,
  addition: null,
  setAdditionScreen: jest.fn(),
  setDialogue: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("Renders Updated state", () => {
  render(
    <GameContext.Provider value={context}>
      <ElementSpellUpdated updateId={"fire_1"} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Update/)).toBeInTheDocument();
  expect(screen.getByText(/SomeName1/)).toBeInTheDocument();
});

test("Throws error if there's a problem with a context", async () => {
  const newContext = { ...context, gameState: null };
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={newContext}>
        <ElementSpellUpdated updateId={"fire_1"} />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  jest.restoreAllMocks();
});

test("Throws error if can't find an update", async () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={context}>
        <ElementSpellUpdated updateId={"fire_0"} />
      </GameContext.Provider>
    )
  ).toThrow("Can't find an update to display");
  jest.restoreAllMocks();
});
