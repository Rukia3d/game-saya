import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { characterToAdd, gameState, spellUpdates } from "../utils/testobjects";
import { AdditionScreen } from "../UI/AdditionScreen";
import userEvent from "@testing-library/user-event";

const context: GameContextType = {
  adventure: gameState.adventures[0],
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  dialogue: null,
  addition: characterToAdd,
  reel: null,
  setReel: jest.fn(),
  setAdditionScreen: jest.fn(),
  setDialogue: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("Renders Character screen", async () => {
  const fireSpells = [
    {
      id: "base_hit1_fire",
      name: "Fire Hit 1",
      strength: 1,
      element: "fire" as "fire",
      image: "../img/Spells/spell1.jpg",
      selected: true,
      mana: 0,
      owner: "hero" as "hero",
      type: "",
      level: 0,
      description: "",
      updates: [],
    },
  ];

  const newContext: GameContextType = {
    ...context,
    gameState: {
      ...gameState,
      dialogues: gameState.dialogues,
      player: {
        ...gameState.player,
        spells: gameState.player.spells.concat(fireSpells),
      },
    },
  };
  render(
    <GameContext.Provider value={newContext}>
      <AdditionScreen />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Nell/)).toBeInTheDocument();
  expect(screen.getByText(/joined the party/)).toBeInTheDocument();
  expect(screen.getByText(/New spells/)).toBeInTheDocument();
  expect(screen.getByText(/Fire Hit 1/)).toBeInTheDocument();
});

test("Throws no character if none provided", async () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const newContext = { ...context, addition: null };
  expect(() =>
    render(
      <GameContext.Provider value={newContext}>
        <AdditionScreen />
      </GameContext.Provider>
    )
  ).toThrow("No data");
  jest.restoreAllMocks();
});

test("Throws incorrectly formatted character if some data is missing", async () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const newContext = {
    ...context,
    addition: { ...characterToAdd, element: undefined },
  };
  expect(() =>
    render(
      <GameContext.Provider value={newContext}>
        <AdditionScreen />
      </GameContext.Provider>
    )
  ).toThrow("Incorrectly formatted character");
  jest.restoreAllMocks();
});

test("Renders Update screen", async () => {
  const setAdditionScreen = jest.fn();
  const newContext: GameContextType = {
    ...context,
    gameState: {
      ...gameState,
      dialogues: gameState.dialogues,
    },
    addition: spellUpdates[0],
    setAdditionScreen: setAdditionScreen,
  };
  render(
    <GameContext.Provider value={newContext}>
      <AdditionScreen />
    </GameContext.Provider>
  );
  expect(screen.getByText(/New spell updates/)).toBeInTheDocument();
  expect(screen.getByText(/SomeName1/)).toBeInTheDocument();
  expect(screen.getByText(/Some description1/)).toBeInTheDocument();
  expect(screen.getByText(/Ash: 1/)).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("character_card"));
  expect(setAdditionScreen.mock.calls.length).toBe(1);
});
