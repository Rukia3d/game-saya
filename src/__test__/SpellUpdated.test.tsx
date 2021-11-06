import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { spellUpdates } from "../utils/testobjects";
import { SpellUpdated } from "../Spells/SpellUpdated";
import { gameState } from "../utils/teststates";

const context: GameContextType = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders Updated state", () => {
  render(
    <GameContext.Provider value={context}>
      <SpellUpdated update={spellUpdates[0]} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Update/)).toBeInTheDocument();
  expect(screen.getByText(/SomeName0/)).toBeInTheDocument();
});

test("Throws error if there's a problem with a context", async () => {
  const newContext = { ...context, gameState: null };
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={newContext}>
        <SpellUpdated update={spellUpdates[0]} />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  jest.restoreAllMocks();
});
