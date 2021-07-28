import React from "react";
import { render, screen } from "@testing-library/react";
import { ForgeCard } from "../UI/ForgeCard";
import userEvent from "@testing-library/user-event";

import { enemy, gameState, mayaCard, spellUpdates } from "../utils/testobjects";
import { GameState, Resource } from "../utils/types";
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
  enemies: [enemy],
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
    { id: "gold", name: "Gold", image: "../", commonality: 2, quantity: 5 },
    { id: "iron", name: "Iron", image: "../", commonality: 5, quantity: 10 },
    { id: "silk", name: "Silk", image: "../", commonality: 3, quantity: 0 },
  ];
  const newCard = { ...mayaCard, type: "base_hit_maya", level: 0 };
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
  expect(screen.getByText(/silk/)).toHaveAttribute("style", "color: red;");
  expect(screen.queryByLabelText("spell_update_arrow")).not.toBeInTheDocument();
});

test("Renders Forge Card screen with fully achieved update", async () => {
  context.gameState.player.resources = [
    { id: "gold", name: "Gold", image: "../", commonality: 1, quantity: 10 },
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

test("Updates Forge Card", async () => {
  const newCard = { ...mayaCard, type: "base_hit1", level: 0 };
  context.gameState.player.cards = [newCard];
  context.gameState.player.resources = [
    { id: "gold", name: "Gold", image: "../", commonality: 1, quantity: 10 },
    { id: "iron", name: "Iron", image: "../", commonality: 1, quantity: 10 },
    { id: "silk", name: "Iron", image: "../", commonality: 1, quantity: 10 },
  ];

  const requirementsForCard = spellUpdates[1];
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
  expect(screen.getByLabelText("resource_iron_value").innerHTML).toEqual(
    requirementsForCard.updates[0][1].toString()
  );
  expect(screen.getByLabelText("resource_gold_value").innerHTML).toEqual(
    requirementsForCard.updates[1][1].toString()
  );
  expect(screen.getByLabelText("resource_silk_value").innerHTML).toEqual(
    requirementsForCard.updates[2][1].toString()
  );
  expect(screen.getByLabelText("spell_update_arrow")).toBeInTheDocument();
  userEvent.click(screen.getAllByLabelText("spell_card_border")[0]);
  expect(context.setGameState.mock.calls.length).toBe(1);
  const newUpdates =
    context.setGameState.mock.calls[0][0].player.cardUpdates[1];

  // Iron updated
  expect(newUpdates.updates[0][0]).toEqual("iron");
  const resource1: Resource | null =
    gameState.resources.find((r: Resource) => r.id === "iron") || null;
  expect(resource1).not.toBeNull();
  const multiplierForIron = resource1?.commonality || 0;
  expect(newUpdates.updates[0][1]).toEqual(
    requirementsForCard.updates[0][1] * multiplierForIron
  );

  // Gold updated
  expect(newUpdates.updates[1][0]).toEqual("gold");
  const resource2: Resource | null =
    gameState.resources.find((r: Resource) => r.id === "gold") || null;
  expect(resource2).not.toBeNull();
  const multiplierForGold = resource2?.commonality || 0;
  expect(newUpdates.updates[1][1]).toEqual(
    requirementsForCard.updates[1][1] * multiplierForGold
  );
});
