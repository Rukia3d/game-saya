import React from "react";
import { render, screen } from "@testing-library/react";
import { Library } from "../Main/Library";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { baseCards15 } from "../utils/testobjects";
import { GameState, ISpell } from "../utils/types";
import { gameState } from "../utils/teststates";

const mayaSpells: ISpell[] = new Array(3).fill(0).map((x, n) => ({
  ...baseCards15[0],
  id: "base_hit" + n,
  name: "Base Hit " + n,
  element: "earth",
}));

const taraSpells: ISpell[] = new Array(3).fill(0).map((x, n) => ({
  ...baseCards15[0],
  id: "some" + n,
  name: "Some Hit " + n,
  element: "metal",
}));
const newSpells = mayaSpells.concat(taraSpells);
const newGameState: GameState = {
  ...JSON.parse(JSON.stringify(gameState)),
  player: { ...gameState.player, spells: newSpells },
};

const context: GameContextType = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: newGameState,
  setGameState: jest.fn(),
  addition: null,
  setAdditionScreen: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders Hero Spells", () => {
  render(
    <GameContext.Provider value={context}>
      <Library />
    </GameContext.Provider>
  );
  expect(screen.getByText(/maya/)).toBeInTheDocument();
  expect(screen.getByText(/Hero/)).toBeInTheDocument();
  expect(screen.getByText(/Spells/)).toBeInTheDocument();
  expect(screen.getByText(/Updates/)).toBeInTheDocument();
  expect(screen.getByText(/Resources/)).toBeInTheDocument();
});
