import React from "react";
import { render, screen } from "@testing-library/react";
import { ForgeCard } from "../UI/ForgeCard";
import userEvent from "@testing-library/user-event";

import { gameState, mayaCard } from "../utils/testobjects";
import { GameState } from "../utils/types";
import { GameContext } from "../App";

const context = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  dialogue: null,
  setDialogue: jest.fn(),
  setGameState: jest.fn((s: GameState) => s),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("Renders Forge Card screen", async () => {
  const newCard = { ...mayaCard, type: "base_hit1", level: 1 };
  const setForge = jest.fn();
  render(
    <GameContext.Provider value={context}>
      <ForgeCard item={newCard} setForge={setForge} />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("card_name_header").innerHTML).toEqual(
    "Maya Hit 1"
  );
  expect(screen.getByText(/earth/)).toBeInTheDocument();
  expect(screen.getByText(/Equiped/)).toBeInTheDocument();
  expect(screen.getByText(/Requirements/)).toBeInTheDocument();
  expect(screen.getByText(/gold/)).toBeInTheDocument();
  expect(screen.getByText(/iron/)).toBeInTheDocument();
  expect(screen.getByText(/silk/)).toBeInTheDocument();
  userEvent.click(screen.getByTestId("close_button"));
  expect(setForge.mock.calls.length).toBe(1);
});

test("Renders Forge Card screen with partially achieved update", async () => {
  context.gameState.player.resources = [
    { id: "gold", name: "Gold", image: "../", commonality: 2, quantity: 2 },
    { id: "iron", name: "Iron", image: "../", commonality: 5, quantity: 10 },
  ];
  const newCard = { ...mayaCard, type: "base_hit1", level: 0 };
  const setForge = jest.fn();
  render(
    <GameContext.Provider value={context}>
      <ForgeCard item={newCard} setForge={setForge} />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("card_name_header").innerHTML).toEqual(
    "Maya Hit 1"
  );
  expect(screen.getByText(/gold/)).toHaveAttribute("style", "color: green;");
  expect(screen.getByText(/iron/)).toHaveAttribute("style", "color: green;");
  expect(screen.getByText(/silk/)).toHaveAttribute("style", "color: red;");
  expect(screen.queryByLabelText("spell_update_arrow")).not.toBeInTheDocument();
});

test("Renders Forge Card screen with fully achieved update", async () => {
  context.gameState.player.resources = [
    { id: "gold", name: "Gold", image: "../", commonality: 1, quantity: 2 },
    { id: "iron", name: "Iron", image: "../", commonality: 1, quantity: 10 },
    { id: "silk", name: "Iron", image: "../", commonality: 1, quantity: 10 },
  ];
  const newCard = { ...mayaCard, type: "base_hit1", level: 0 };
  const setForge = jest.fn();
  render(
    <GameContext.Provider value={context}>
      <ForgeCard item={newCard} setForge={setForge} />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("card_name_header").innerHTML).toEqual(
    "Maya Hit 1"
  );
  expect(screen.getByText(/gold/)).toHaveAttribute("style", "color: green;");
  expect(screen.getByText(/iron/)).toHaveAttribute("style", "color: green;");
  expect(screen.getByText(/silk/)).toHaveAttribute("style", "color: green;");
  expect(screen.getByLabelText("spell_update_arrow")).toBeInTheDocument();
});
