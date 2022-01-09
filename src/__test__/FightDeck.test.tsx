import React from "react";
import { render, screen } from "@testing-library/react";
import { FightDeck } from "../Fight/FightDeck";
import userEvent from "@testing-library/user-event";

import { fightState, gameState } from "../utils/teststates";
import { GameContext, GameContextType } from "../App";
import { fightstory } from "../utils/testobjects";

const context: GameContextType = {
  adventure: gameState.adventures[0],
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
