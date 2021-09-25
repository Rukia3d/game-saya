import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { gameState, baseCards15 } from "../utils/testobjects";
import { ElementSpells } from "../Spells/ElementSpells";

const context: GameContextType = {
  adventure: gameState.adventures[1],
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  dialogue: null,
  addition: null,
  setAdditionScreen: jest.fn(),
  setDialogue: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("CharacterSpells renders correctly for Earth set", async () => {
  const setGameState = jest.fn();
  render(
    <GameContext.Provider value={{ ...context, setGameState: setGameState }}>
      <ElementSpells
        element="earth"
        spells={baseCards15}
        setElement={jest.fn()}
      />
    </GameContext.Provider>
  );
  expect(screen.getByText("Earth spells")).toBeInTheDocument();
  expect(screen.getAllByLabelText("spell_card").length).toEqual(15);
  expect(screen.getAllByLabelText("spell_card_border")[0]).toHaveClass(
    "SpellCard"
  );
  userEvent.click(screen.getAllByLabelText("spell_card_border")[0]);
  expect(
    setGameState.mock.calls[0][0].player.cards[0].selected
  ).not.toBeTruthy();
});
