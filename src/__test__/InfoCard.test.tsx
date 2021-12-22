import React from "react";
import { render, screen } from "@testing-library/react";
import { InfoCard } from "../Info/InfoCard";
import { mayaCard, spellUpdates } from "../utils/testobjects";
import { elementType, GameState, ISpell } from "../utils/types";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { gameState } from "../utils/teststates";

test("Renders Item if it's a card", async () => {
  const setInfo = jest.fn();
  render(<InfoCard item={mayaCard} setInfo={setInfo} />);
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  expect(screen.getByAltText("spell_image")).toHaveAttribute(
    "src",
    expect.stringContaining("spell2")
  );
  expect(screen.getByText(/Mana/)).toBeInTheDocument();
  expect(screen.getByLabelText("Mana")).toHaveTextContent(/0/);
  expect(screen.getByText(/Strength/)).toBeInTheDocument();
  expect(screen.getByLabelText("Strength")).toHaveTextContent(/1/);
  expect(screen.getByText(/earth/)).toBeInTheDocument();
  expect(screen.getByAltText("selected_spell")).toHaveAttribute(
    "src",
    expect.stringContaining("equipped_item")
  );
});

test("Renders Item card updates", async () => {
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
  const setInfo = jest.fn();
  const fireCard: ISpell = {
    ...mayaCard,
    element: "fire" as elementType,
    updates: [spellUpdates[0]],
  };
  render(
    <GameContext.Provider value={context}>
      <InfoCard item={fireCard} setInfo={setInfo} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  expect(screen.getByText(/Strength/)).toBeInTheDocument();
  expect(screen.getByText(/fire/)).toBeInTheDocument();
  expect(screen.getByText(/Updates/)).toBeInTheDocument();
  expect(screen.getByText(/SomeName0/)).toBeInTheDocument();
  expect(screen.getByAltText("update_image")).toHaveAttribute(
    "src",
    expect.stringContaining("fire_0")
  );
  expect(screen.getByLabelText("UpdateMana")).toHaveTextContent(/1/);
  expect(screen.getByLabelText("UpdateResource")).toHaveTextContent(
    /Ash: 0 of 1/
  );
});

test("Renders Updates if it's an Update", async () => {
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
  const setInfo = jest.fn();
  render(
    <GameContext.Provider value={context}>
      <InfoCard item={spellUpdates[0]} setInfo={setInfo} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/SomeName0/)).toBeInTheDocument();
  expect(screen.getByAltText("element_image")).toHaveAttribute(
    "src",
    expect.stringContaining("fire_0")
  );
  expect(screen.getByText(/Mana/)).toBeInTheDocument();
  expect(screen.getByLabelText("Mana")).toHaveTextContent(/1/);
  expect(screen.getByText(/Some description0/)).toBeInTheDocument();
  expect(screen.getByText(/fire/)).toBeInTheDocument();
  expect(screen.getByText(/Resources/)).toBeInTheDocument();
  expect(screen.getByAltText("resource_image")).toHaveAttribute(
    "src",
    expect.stringContaining("ash")
  );
  expect(screen.getByLabelText("resource_data")).toHaveTextContent(
    /Ash: Very Common/
  );
  expect(screen.getByLabelText("resource_requirements")).toHaveTextContent(
    /You have 0 of 1 needed/
  );
});

test.skip("Renders Hero if it's a hero", async () => {
  const setInfo = jest.fn();
  render(<InfoCard item={mayaCard} setInfo={setInfo} />);
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  expect(screen.getByText(/Element earth/)).toBeInTheDocument();
  expect(screen.getByText(/Equiped/)).toBeInTheDocument();
});

test("Renders Enemy if it's an Enemy", async () => {
  const setInfo = jest.fn();
  render(<InfoCard item={gameState.enemies[0]} setInfo={setInfo} />);
  expect(screen.getByText(/Dude/)).toBeInTheDocument();
  expect(screen.getByAltText("enemy_image")).toHaveAttribute(
    "src",
    expect.stringContaining("test-dude")
  );
  expect(screen.getByLabelText("Spells")).toHaveTextContent(/Spells: 2/);
  expect(screen.getByText(/earth/)).toBeInTheDocument();
  expect(screen.getByLabelText("enemy_experience")).toHaveTextContent(
    /Experience: novice/
  );
  expect(screen.getByText(/Speels/)).toBeInTheDocument();
  expect(screen.getAllByLabelText("spell_card").length).toEqual(2);
  expect(screen.getAllByLabelText("spell_card")[0]).toHaveTextContent(
    /Base Hit 1/
  );
});

test("Closes properly", async () => {
  const setInfo = jest.fn();
  render(<InfoCard item={mayaCard} setInfo={setInfo} />);
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("info_card"));
  expect(setInfo.mock.calls.length).toBe(1);
});

test.only("Renders Update screen Update is possible", async () => {
  const fireCard: ISpell = {
    ...mayaCard,
    element: "fire" as elementType,
    updates: [spellUpdates[0]],
  };
  const newGamestate: GameState = {
    ...gameState,
    player: {
      ...gameState.player,
      resources: [
        { id: "ash", name: "Ash", commonality: 10, image: "ash", quantity: 5 },
      ],
    },
  };
  const context: GameContextType = {
    adventure: null,
    setAdventure: jest.fn(),
    story: null,
    setStory: jest.fn(),
    gameState: newGamestate,
    addition: null,
    setAdditionScreen: jest.fn(),
    setGameState: jest.fn(),
    backToMain: jest.fn(),
  };
  const setInfo = jest.fn();
  render(
    <GameContext.Provider value={context}>
      <InfoCard item={fireCard} setInfo={setInfo} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/SomeName0/)).toBeInTheDocument();
  expect(screen.getByAltText("element_image")).toHaveAttribute(
    "src",
    expect.stringContaining("fire_0")
  );
  expect(screen.getByText(/Mana/)).toBeInTheDocument();
  expect(screen.getByLabelText("Mana")).toHaveTextContent(/1/);
  expect(screen.getByText(/Some description0/)).toBeInTheDocument();
  expect(screen.getByText(/fire/)).toBeInTheDocument();
  expect(screen.getByText(/Resources/)).toBeInTheDocument();
  expect(screen.getByAltText("resource_image")).toHaveAttribute(
    "src",
    expect.stringContaining("ash")
  );
  expect(screen.getByLabelText("resource_data")).toHaveTextContent(
    /Ash: Very Common/
  );
  expect(screen.getByLabelText("resource_requirements")).toHaveTextContent(
    /You have 0 of 1 needed/
  );
});
