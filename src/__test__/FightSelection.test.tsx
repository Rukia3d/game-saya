import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { gameRestrictedCharacters, gameState } from "../utils/teststates";
import { IHero } from "../utils/types";
import { FightSelection } from "../Fight/FightSelection";

const context: GameContextType = {
  adventure: gameState.adventures[1],
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
  gameRestrictedCharacters.player.heroes.map(
    (h: IHero) => (h.selected = false)
  );
  const story =
    //@ts-ignore
    gameRestrictedCharacters.adventures[1].storyGroups[0].stories[0];
  const fight = gameRestrictedCharacters.fights[0];
  // console.log("Story", story);
  // console.log("Fight", fight);
  render(
    <GameContext.Provider
      value={{
        ...context,
        gameState: gameRestrictedCharacters,
        adventure: gameRestrictedCharacters.adventures[1],
      }}
    >
      <FightSelection
        setSelectionError={setSelectionError}
        setSpellSelect={jest.fn()}
        story={story}
        fight={fight}
      />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Select heroes/)).toBeInTheDocument();
});
