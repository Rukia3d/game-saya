import React from "react";
import { render, screen } from "@testing-library/react";
import { Shop } from "../Main/Shop";
import { GameContext } from "../App";
import { gameState, mayaCard } from "../utils/testobjects";
import { SpellUpdateOptions } from "../Spells/SpellUpdateOptions";
import { elementType } from "../utils/types";

const context = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  dialogue: null,
  character: null,
  setCharacter: jest.fn(),
  setDialogue: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};
const enoughResourcesStyle = "color: green;";
const notenoughResourcesStyle = "color: red;";
test("Renders All Updates available in the correct color", async () => {
  const fireCard = { ...mayaCard, element: "fire" as elementType };
  const newContext = {
    ...context,
    gameState: {
      ...context.gameState,
      player: {
        ...context.gameState.player,
        resources: [
          {
            id: "ash",
            name: "Ash",
            commonality: 10,
            image: "ash",
            quantity: 1,
          },
        ],
      },
    },
  };
  render(
    <GameContext.Provider value={newContext}>
      <SpellUpdateOptions item={fireCard} setForge={jest.fn()} />
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
});

test("Skips and update if it's already applied", async () => {
  const fireCard = {
    ...mayaCard,
    element: "fire" as elementType,
    updates: ["fire_1"],
  };
  render(
    <GameContext.Provider value={context}>
      <SpellUpdateOptions item={fireCard} setForge={jest.fn()} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  expect(screen.getByText(/Ash: 2/)).toBeInTheDocument();
  expect(screen.getByText(/Ash: 3/)).toBeInTheDocument();
  expect(screen.queryByText(/Ash: 1/)).not.toBeInTheDocument();
});
