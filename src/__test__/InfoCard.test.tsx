import React from "react";
import { render, screen } from "@testing-library/react";
import { InfoCard } from "../Info/InfoCard";
import { heroes, mayaCard, spellUpdates } from "../utils/testobjects";
import { elementType, GameState, ISpell } from "../utils/types";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { gameState } from "../utils/teststates";

const context: GameContextType = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  setGameState: jest.fn(),
  addition: null,
  setAdditionScreen: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders Item if it's a card", async () => {
  const setInfo = jest.fn();
  render(
    <GameContext.Provider value={context}>
      <InfoCard item={mayaCard} setInfo={setInfo} />
    </GameContext.Provider>
  );
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
  expect(screen.getByText(/Updated/)).toBeInTheDocument();
  expect(screen.getByText(/Updates/)).toBeInTheDocument();
  expect(screen.getByText(/SomeName0/)).toBeInTheDocument();
  expect(screen.getByAltText("update-fire_0")).toHaveAttribute(
    "src",
    expect.stringContaining("fire_0")
  );
  expect(screen.getByLabelText("update-mana")).toHaveTextContent(/1/);
  expect(screen.getByLabelText("update-resource")).toHaveTextContent(/0/);
});

test("Renders Updates if it's an Update", async () => {
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

test("Renders Hero if it's a hero", async () => {
  const setInfo = jest.fn();
  render(
    <GameContext.Provider value={context}>
      <InfoCard item={heroes[0]} setInfo={setInfo} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/maya/)).toBeInTheDocument();
});

test.skip("Renders Enemy if it's an Enemy", async () => {
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

test.skip("Closes properly", async () => {
  const setInfo = jest.fn();
  render(
    <GameContext.Provider value={context}>
      <InfoCard item={mayaCard} setInfo={setInfo} />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("info_card"));
  expect(setInfo.mock.calls.length).toBe(1);
});
