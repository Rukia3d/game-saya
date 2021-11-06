import React from "react";
import { render, screen } from "@testing-library/react";
import { gameState, mayaCard, spellUpdates } from "../utils/testobjects";
import { SpellWithInfo } from "../Spells/SpellWithInfo";
import userEvent from "@testing-library/user-event";
import { GameContext, GameContextType } from "../App";

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

test("Renders a spell and a spell can be selected", async () => {
  const selectCard = jest.fn();
  render(
    <GameContext.Provider value={context}>
      <SpellWithInfo
        spell={mayaCard}
        forge={true}
        element={mayaCard.element}
        selectSpell={selectCard}
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
  const updatedCard = { ...mayaCard, updates: [spellUpdates[0]] };
  render(
    <GameContext.Provider value={context}>
      <SpellWithInfo
        spell={updatedCard}
        forge={true}
        element={updatedCard.element}
        setInfo={setInfo}
        selectSpell={jest.fn()}
      />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  expect(screen.getByAltText("spellimage_frame1")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("hero_card_info"));
  expect(setInfo.mock.calls.length).toEqual(1);
});

test("Renders inactive spell and forge can be displayed", async () => {
  const selectCard = jest.fn();
  const setForge = jest.fn();
  const unselectedCard = { ...mayaCard, selected: false };
  render(
    <GameContext.Provider value={context}>
      <SpellWithInfo
        spell={unselectedCard}
        forge={true}
        element={unselectedCard.element}
        selectSpell={selectCard}
        setInfo={jest.fn()}
        setForge={setForge}
      />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  expect(screen.getByText(/forge/)).toBeInTheDocument();
  userEvent.click(screen.getByTestId("forge_card"));
  expect(setForge.mock.calls.length).toEqual(1);
});
