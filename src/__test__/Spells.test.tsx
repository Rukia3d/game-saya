import React from "react";
import { render, screen } from "@testing-library/react";
import { Spells } from "../Main/Spells";
import { GameContext } from "../App";
import userEvent from "@testing-library/user-event";
import { gameState, baseCards15 } from "../utils/testobjects";
import { Spell } from "../utils/types";

const mayaSpells: Spell[] = new Array(3).fill(0).map((x, n) => ({
  ...baseCards15[0],
  id: "base_hit" + n,
  name: "Base Hit " + n,
  element: "earth",
}));

const taraSpells: Spell[] = new Array(3).fill(0).map((x, n) => ({
  ...baseCards15[0],
  id: "base_hit" + n,
  name: "Base Hit " + n,
  element: "metal",
}));

const newGameState = {
  ...JSON.parse(JSON.stringify(gameState)),
  player: { ...gameState.player, cards: mayaSpells.concat(taraSpells) },
};

const context = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: newGameState,
  setGameState: jest.fn(),
  dialogue: null,
  setDialogue: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("Renders Hero Spells", () => {
  render(
    <GameContext.Provider value={context}>
      <Spells />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("image_earth_spells")).toBeInTheDocument();
  expect(screen.getByAltText("image_metal_spells")).toBeInTheDocument();
  userEvent.click(screen.getByAltText("image_earth_spells"));
  expect(screen.getByText("Earth spells")).toBeInTheDocument();
  expect(screen.getByLabelText("character_spells").children.length).toEqual(3);
  const firstCardName = screen.getAllByLabelText("spell_card")[0].innerHTML;
  userEvent.click(screen.getAllByTestId("hero_card_info")[0]);
  expect(screen.getByLabelText("item_name").innerHTML).toEqual(firstCardName);
});
