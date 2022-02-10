import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { gameState, testAdventure } from "../utils/test_states";
import { SpellUpdates } from "../Spells/SpellUpdates";
import { IResource } from "../utils/types";
import {
  playerResources,
  playerSpellUpdates,
} from "../utils/test_playerobjects";

const context: GameContextType = {
  adventure: testAdventure,
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
  const newPlayerResource = { ...playerResources[0], quantity: 10 };
  const newContext = {
    ...context,
    gameState: {
      ...gameState,
      player: {
        ...gameState.player,
        resources: [newPlayerResource],
      },
    },
  };
  render(
    <GameContext.Provider value={newContext}>
      <SpellUpdates
        updateSpell={updateSpell}
        spellUpgrades={gameState.player.updates}
      />
    </GameContext.Provider>
  );
  expect(screen.getByText(/SomeName1/)).toBeInTheDocument();
});

test("Throws error if there's a problem with a context", async () => {
  const newContext = { ...context, gameState: null };
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={newContext}>
        <SpellUpdates
          updateSpell={jest.fn()}
          spellUpgrades={gameState.player.updates}
        />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  jest.restoreAllMocks();
});

test("Throws error if can't find the correct resource", async () => {
  const newUpdate = playerSpellUpdates[0];
  newUpdate.resource_base = [{ ...playerResources[0], id: "thing" }];
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
