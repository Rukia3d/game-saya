import React from "react";
import { render, screen } from "@testing-library/react";
import { Fight } from "../Fight/Fight";
import { GameContext, GameContextType } from "../App";
import { enemy, fightstory } from "../utils/testobjects";
import { gameState } from "../utils/teststates";
const context: GameContextType = {
  adventure: null,
  addition: null,
  setAdventure: jest.fn(),
  story: fightstory,
  setStory: jest.fn(),
  gameState: gameState,
  setGameState: jest.fn(),
  setAdditionScreen: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders Fight screen", () => {
  render(
    <GameContext.Provider
      value={{
        ...context,
        story: fightstory,
      }}
    >
      <Fight />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Dude/)).toBeInTheDocument();
  // TODO check the correct element was assigned
  expect(screen.getByText(/earth/)).toBeInTheDocument();
  // correct number of enemy life
  expect(screen.getByTestId("enemy-life").innerHTML).toMatch(
    enemy.life.toString()
  );
  // Correct hero and enemy data
  expect(screen.getByLabelText("life_value").innerHTML).toMatch(
    gameState.player.data.life.toString()
  );
  expect(screen.getByLabelText("mana_value").innerHTML).toMatch(
    gameState.player.data.mana.toString()
  );
  expect(screen.getByLabelText("Deck").childElementCount).toEqual(5);
});

test("Throws error if no data provided in context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const contextNoStory = { ...context, story: null };
  expect(() =>
    render(
      <GameContext.Provider value={contextNoStory}>
        <Fight />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  const contextNoGameState = { ...context, gameState: null };
  expect(() =>
    render(
      <GameContext.Provider value={contextNoGameState}>
        <Fight />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");

  const fightNoEnemy = { ...gameState.fights[0], enemy: "some" };
  const contextNoEmeny = {
    ...context,
    story: fightstory,
    gameState: { ...gameState, fights: [fightNoEnemy] },
  };
  expect(() =>
    render(
      <GameContext.Provider value={contextNoEmeny}>
        <Fight />
      </GameContext.Provider>
    )
  ).toThrow("No enemy for this fight, something went very wrong");

  jest.restoreAllMocks();
});

test("Throws error if fightState generated incorrectly", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const newPlayer = { ...gameState.player, spells: [] };
  const context1 = {
    ...context,
    gameState: {
      ...gameState,
      player: newPlayer,
    },
  };
  expect(() =>
    render(
      <GameContext.Provider value={context1}>
        <Fight />
      </GameContext.Provider>
    )
  ).toThrow("Couldn't generate cards for player");

  const newPlayer2 = {
    ...gameState.player,
    enemies: [{ ...enemy, spells: [] }],
  };
  const context2 = {
    ...context,
    gameState: {
      ...gameState,
      player: newPlayer2,
    },
  };
  expect(() =>
    render(
      <GameContext.Provider value={context2}>
        <Fight />
      </GameContext.Provider>
    )
  ).toThrow("Couldn't generate cards for enemy");

  jest.restoreAllMocks();
});
