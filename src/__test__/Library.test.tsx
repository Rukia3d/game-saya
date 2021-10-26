import React from "react";
import { render, screen } from "@testing-library/react";
import { Library } from "../Main/Library";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { gameState, baseCards15 } from "../utils/testobjects";
import { GameState, Spell } from "../utils/types";

const mayaSpells: Spell[] = new Array(3).fill(0).map((x, n) => ({
  ...baseCards15[0],
  id: "base_hit" + n,
  name: "Base Hit " + n,
  element: "earth",
}));

const taraSpells: Spell[] = new Array(3).fill(0).map((x, n) => ({
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
  dialogue: null,
  addition: null,
  reel: null,
  setReel: jest.fn(),
  setAdditionScreen: jest.fn(),
  setDialogue: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("Renders Hero Spells", () => {
  render(
    <GameContext.Provider value={context}>
      <Library />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("image_earth_spells")).toBeInTheDocument();
  expect(screen.getByAltText("image_metal_spells")).toBeInTheDocument();
  userEvent.click(screen.getByAltText("image_earth_spells"));
  expect(screen.getByText("Earth spells")).toBeInTheDocument();
  expect(screen.getByLabelText("character_spells").children.length).toEqual(3);
  const firstCardName = screen.getAllByLabelText("spell_card")[0].innerHTML;
  userEvent.click(screen.getAllByTestId("hero_card_info")[0]);
  expect(screen.getByLabelText("card_name_header").innerHTML).toEqual(
    firstCardName
  );
});
