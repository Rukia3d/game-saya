import React from "react";
import { render, screen } from "@testing-library/react";
import { InfoCard } from "../UI/InfoCard";
import { gameState, mayaCard, spellUpdates } from "../utils/testobjects";
import { elementType, Spell } from "../utils/types";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";

test("Renders Item if it's a card", async () => {
  const setInfo = jest.fn();
  render(<InfoCard item={mayaCard} setInfo={setInfo} />);
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  expect(screen.getByText(/Element earth/)).toBeInTheDocument();
  expect(screen.getByText(/Equiped/)).toBeInTheDocument();
});

test("Renders Item card updates", async () => {
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
  const setInfo = jest.fn();
  const fireCard: Spell = {
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
  expect(screen.getByText(/Element fire/)).toBeInTheDocument();
  expect(screen.getByText(/Equiped/)).toBeInTheDocument();
  expect(screen.getByText(/Update/)).toBeInTheDocument();
  expect(screen.getByText(/SomeName1/)).toBeInTheDocument();
});

test("Renders Error if it's not a card", async () => {
  const setInfo = jest.fn();
  render(<InfoCard item={{ example: "some" }} setInfo={setInfo} />);
  expect(screen.getByText(/I am not a card/)).toBeInTheDocument();
});

test("Closes properly", async () => {
  const setInfo = jest.fn();
  render(<InfoCard item={mayaCard} setInfo={setInfo} />);
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("info_card"));
  expect(setInfo.mock.calls.length).toBe(1);
});
