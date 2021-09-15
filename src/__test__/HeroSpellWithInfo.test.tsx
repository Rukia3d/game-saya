import React from "react";
import { render, screen } from "@testing-library/react";
import { gameState, mayaCard, story } from "../utils/testobjects";
import { HeroSpellWithInfo } from "../Fight/HeroSpellWithInfo";
import userEvent from "@testing-library/user-event";
import { GameContext } from "../App";

const context = {
  adventure: null,
  setAdventure: jest.fn(),
  story: story,
  setStory: jest.fn(),
  gameState: gameState,
  setGameState: jest.fn(),
  dialogue: null,
  character: null,
  setCharacter: jest.fn(),
  setDialogue: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("Renders a spell and a spell can be selected", async () => {
  const selectCard = jest.fn();
  render(
    <GameContext.Provider value={context}>
      <HeroSpellWithInfo
        card={mayaCard}
        forge={true}
        element={mayaCard.element}
        selectCard={selectCard}
        setInfo={jest.fn()}
      />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  expect(screen.getByText(/Info/)).toBeInTheDocument();
  expect(screen.getByText(/forge/)).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("spell_card_border"));
  expect(selectCard.mock.calls.length).toEqual(1);
});

test("Renders a spell with a frame and a spell info can be clicked", async () => {
  const setInfo = jest.fn();
  const updatedCard = { ...mayaCard, updates: ["some_update"] };
  render(
    <GameContext.Provider value={context}>
      <HeroSpellWithInfo
        card={updatedCard}
        forge={true}
        element={updatedCard.element}
        setInfo={setInfo}
        selectCard={jest.fn()}
      />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  expect(screen.getByAltText("spellimage_frame0")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("hero_card_info"));
  expect(setInfo.mock.calls.length).toEqual(1);
});
