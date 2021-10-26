import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { gameState, mayaCard, spellUpdates } from "../utils/testobjects";
import { elementType } from "../utils/types";
import userEvent from "@testing-library/user-event";
import { ElementSpellLibrary } from "../Spells/ElementSpellLibrary";

const setForge = jest.fn();
const context: GameContextType = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  dialogue: null,
  addition: null,
  reel: null,
  setReel: jest.fn(),
  setAdditionScreen: jest.fn(),
  setDialogue: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};
const enoughResourcesStyle = "color: green;";
const notenoughResourcesStyle = "color: red;";

test("Renders All Updates available in the correct color", async () => {
  const setGameState = jest.fn();
  const fireCard = { ...mayaCard, element: "fire" as elementType };
  const newSpells = gameState.player.spells.concat([fireCard]);
  const newContext = {
    ...context,
    gameState: {
      ...gameState,
      player: {
        ...gameState.player,
        resources: [
          {
            id: "ash",
            name: "Ash",
            commonality: 10,
            image: "ash",
            quantity: 1,
          },
        ],
        spells: newSpells,
      },
    },
    setGameState: setGameState,
  };
  render(
    <GameContext.Provider value={newContext}>
      <ElementSpellLibrary item={fireCard} setForge={setForge} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  expect(screen.getByText(/Ash: 1/)).toHaveAttribute(
    "style",
    enoughResourcesStyle
  );
  expect(screen.getByText(/Ash: 2/)).toHaveAttribute(
    "style",
    notenoughResourcesStyle
  );
  userEvent.click(screen.getAllByTestId("update_button")[0]);
  expect(setGameState.mock.calls[0][0].player.spells[15].updates[0].id).toEqual(
    "fire_1"
  );
  userEvent.click(screen.getByTestId("close_button"));
  expect(setForge.mock.calls.length).toBe(1);
});

test("Skips and update if it's already applied", async () => {
  const fireCard = {
    ...mayaCard,
    element: "fire" as elementType,
    updates: [spellUpdates[0]],
  };
  render(
    <GameContext.Provider value={context}>
      <ElementSpellLibrary item={fireCard} setForge={jest.fn()} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  expect(screen.getByText(/Ash: 2/)).toBeInTheDocument();
  expect(screen.getByText(/Ash: 3/)).toBeInTheDocument();
  expect(screen.queryByText(/Ash: 1/)).not.toBeInTheDocument();
});

test("Throws error if there's a problem with a context", async () => {
  const newContext = { ...context, gameState: null };
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={newContext}>
        <ElementSpellLibrary item={mayaCard} setForge={jest.fn()} />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  jest.restoreAllMocks();
});
