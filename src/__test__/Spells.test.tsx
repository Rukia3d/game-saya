import React from "react";
import { render, screen } from "@testing-library/react";
import { Spells } from "../Main/Spells";
import { GameContext } from "../App";
import userEvent from "@testing-library/user-event";

const spells = [
  {
    id: "base_hit1_maya",
    name: "Maya Hit 1",
    strength: 1,
    quantity: 1,
    character: "maya",
    element: "earth",
    image: "../img/Spells/spell1.jpg",
    selected: true,
    owner: "hero" as "hero",
  },
  {
    id: "base_hit2",
    name: "Base Hit 2",
    strength: 2,
    quantity: 2,
    character: null,
    element: null,
    image: "../img/Spells/spell2.jpg",
    selected: true,
    owner: "hero" as "hero",
  },
  {
    id: "base_hit3_maya",
    name: "Maya Hit 3",
    strength: 3,
    quantity: 1,
    character: "maya",
    element: "earth",
    image: "../img/Spells/spell3.jpg",
    selected: true,
    owner: "hero" as "hero",
  },
  {
    id: "base_hit1_tara",
    name: "Tara Hit 1",
    strength: 1,
    quantity: 1,
    character: "tara",
    element: "metal",
    owner: "hero" as "hero",
    image: "../img/Spells/spell8.jpg",
    selected: true,
  },
];
const gameState = {
  sceneCharacters: [
    { id: "maya", name: "Maya", image: "../img/maya.png", state: "story" },
    { id: "tara", name: "Tara", image: "../img/tara.png", state: "story" },
  ],
  dialogues: [],
  player: {
    id: 1,
    cards: spells,
    experience: 300,
    lifes: 3,
    heroes: [
      {
        id: "maya",
        name: "Maya",
        image: "../img/maya_spells.png",
      },
      {
        id: "tara",
        name: "Tara",
        image: "../img/tara_spells.png",
      },
    ],
    resources: [
      { id: "iron", name: "Iron", image: "../", commonality: 5, quantity: 1 },
    ],
  },
  adventures: [],
  heroes: [],
};

const context = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  setGameState: jest.fn(),
  dialogue: null,
  setDialogue: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("Renders Heroes screen with characters ready for a dialogue", () => {
  render(
    <GameContext.Provider value={context}>
      <Spells />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("image_base_spells")).toBeInTheDocument();
  expect(screen.getByAltText("image_maya_spells")).toBeInTheDocument();
  expect(screen.getByAltText("image_tara_spells")).toBeInTheDocument();
  userEvent.click(screen.getByAltText("image_base_spells"));
  expect(screen.getByText("Basic spells")).toBeInTheDocument();
  expect(screen.getByLabelText("character_spells").children.length).toEqual(1);
  const firstCardName = screen.getAllByLabelText("spell_card")[0].innerHTML;
  userEvent.click(screen.getAllByTestId("hero_card_info")[0]);
  expect(screen.getByLabelText("item_name").innerHTML).toEqual(firstCardName);
});
