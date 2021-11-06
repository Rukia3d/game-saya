import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { gameState } from "../utils/teststates";
import { SpellUpdates } from "../Spells/SpellUpdates";
import { IResource } from "../utils/types";

const context: GameContextType = {
  adventure: gameState.adventures[1],
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders Element spell updates", async () => {
  const updateSpell = jest.fn();
  const playerResources = gameState.resources.map((r: IResource) => {
    return { ...r, quantity: 10 };
  });
  const newContext = {
    ...context,
    gameState: {
      ...gameState,
      player: {
        ...gameState.player,
        resources: playerResources,
      },
    },
  };
  render(
    <GameContext.Provider value={newContext}>
      <SpellUpdates
        updateSpell={updateSpell}
        spellUpgrades={gameState.spellUpdates}
      />
    </GameContext.Provider>
  );
  expect(screen.getByText(/SomeName1/)).toBeInTheDocument();
  expect(screen.getByText(/Ash: 1/)).toBeInTheDocument();
  expect(screen.getAllByText(/Update/).length).toEqual(3);
  userEvent.click(screen.getAllByText(/Update/)[0]);
  expect(updateSpell.mock.calls.length).toBe(1);
});

test("Throws error if there's a problem with a context", async () => {
  const newContext = { ...context, gameState: null };
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={newContext}>
        <SpellUpdates
          updateSpell={jest.fn()}
          spellUpgrades={gameState.spellUpdates}
        />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  jest.restoreAllMocks();
});

test("Throws error if can't find the correct resource", async () => {
  const newUpdate = gameState.spellUpdates[0];
  newUpdate.resource_base = [["thing", 1]];
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={context}>
        <SpellUpdates updateSpell={jest.fn()} spellUpgrades={[newUpdate]} />
      </GameContext.Provider>
    )
  ).toThrow("Can't find a resource to display");
  jest.restoreAllMocks();
});
