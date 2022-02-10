import React from "react";
import { render, screen } from "@testing-library/react";
import { FightDeck } from "../Fight/FightDeck";

import { fightState, gameState, testAdventure } from "../utils/test_states";
import { GameContext, GameContextType } from "../App";
import { fightstory } from "../utils/test_gameobjects";

const context: GameContextType = {
  adventure: testAdventure,
  setAdventure: jest.fn(),
  story: fightstory,
  setStory: jest.fn(),
  gameState: gameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders FightDeck screen", async () => {
  const selectSpell = jest.fn();
  render(
    <GameContext.Provider value={context}>
      <FightDeck fightState={fightState} selectSpell={selectSpell} />
    </GameContext.Provider>
  );
  expect(screen.getAllByLabelText("spell_card").length).toEqual(2);
});
