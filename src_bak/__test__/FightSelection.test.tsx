import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { gameState, testAdventure } from "../utils/test_states";
import { IPlayerHero, Player } from "../utils/types";
import { FightSelection } from "../Fight/FightSelection";
import { fights, fightstory } from "../utils/test_gameobjects";
import { playerHeroes } from "../utils/test_playerobjects";

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

test("Renders HerosSelection if 0 characters", async () => {
  const setSelectionError = jest.fn();
  const noHeroesSelected: IPlayerHero[] = playerHeroes.map((p: IPlayerHero) => {
    return { ...p, selected: false };
  });
  const newPlayer: Player = { ...gameState.player, heroes: noHeroesSelected };
  render(
    <GameContext.Provider
      value={{
        ...context,
        gameState: { ...gameState, player: newPlayer },
      }}
    >
      <FightSelection
        setSelectionError={setSelectionError}
        setSpellSelect={jest.fn()}
        story={fightstory}
        fight={fights[0]}
      />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Select heroes/)).toBeInTheDocument();
});
