import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext } from "../App";
import userEvent from "@testing-library/user-event";
import { Spell } from "../utils/types";
import { CharacterSpells } from "../Main/CharacterSpells";

const baseCards: Spell[] = new Array(7).fill(0).map((x, n) => ({
  id: "base_hit" + n,
  name: "Base Hit " + n,
  strength: 1,
  quantity: 1,
  character: null,
  element: null,
  image: "",
  selected: true,
  owner: "hero" as "hero",
}));

const gameState = {
  sceneCharacters: [],
  dialogues: [],
  player: {
    id: 1,
    cards: baseCards,
    experience: 300,
    lifes: 3,
    heroes: [],
    resources: [],
  },
  adventures: [],
  heroes: [],
};

const context = {
  adventure: gameState.adventures[1],
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  dialogue: null,
  setDialogue: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("CharacterSpells renders correctly for Base character", async () => {
  render(
    <GameContext.Provider value={context}>
      <CharacterSpells hero="Base" spells={baseCards} setHero={jest.fn()} />
    </GameContext.Provider>
  );
  expect(screen.getByText("Basic spells")).toBeInTheDocument();
  expect(screen.getAllByLabelText("spell_card").length).toEqual(7);
  expect(screen.getAllByLabelText("spell_card_border")[0]).toHaveClass(
    "active"
  );
  userEvent.click(screen.getAllByLabelText("spell_card_border")[0]);
  expect(
    context.setGameState.mock.calls[0][0].player.cards[0].selected
  ).not.toBeTruthy();
});
