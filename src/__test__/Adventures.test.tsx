import React from "react";
import { render, screen } from "@testing-library/react";
import { Adventures } from "../Main/Adventures";
import { GameContext } from "../App";
import { debug } from "console";
import userEvent from "@testing-library/user-event";
const stories = require("../data/storiesAct1.json");

const gameState = {
  sceneCharacters: [],
  dialogues: [],
  player: {
    id: 1,
    cards: [],
    experience: 300,
    mana: 3,
    maxMana: 5,
    heroes: [],
    resources: [],
  },
  adventures: [
    {
      id: "character",
      name: "Character",
      image: "character.jpg",
      open: true,
      form: "character",
      stories: [],
    },
    {
      id: "story",
      name: "Water Problems",
      image: "story.jpg",
      open: true,
      form: "story",
      stories: stories,
    },
    {
      id: "arena",
      name: "Arena",
      image: "arena.jpg",
      open: false,
      form: "arena",
      stories: [],
    },
    {
      id: "torunament",
      name: "Tournament",
      image: "tournament.jpg",
      open: false,
      form: "torunament",
      stories: [],
    },
    {
      id: "event",
      name: "Event",
      image: "event.jpg",
      open: false,
      form: "event",
      stories: [],
    },
  ],
  heroes: [],
};

const context = {
  adventure: null,
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

test("Renders Adventures with character quest and correct state", () => {
  render(
    <GameContext.Provider value={context}>
      <Adventures />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("adventures_background")).toBeInTheDocument();
  debug();
  expect(screen.getByAltText("adventure_character")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_character")).toHaveAttribute(
    "style",
    "opacity: 1;"
  );
  expect(screen.getByAltText("adventure_arena")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_arena")).toHaveAttribute(
    "style",
    "opacity: 0.3;"
  );
  expect(screen.getByAltText("adventure_story")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_event")).toBeInTheDocument();
});

test("Renders Adventures with no character quest and correct state", () => {
  context.gameState.adventures.shift();
  render(
    <GameContext.Provider value={context}>
      <Adventures />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("adventures_background")).toBeInTheDocument();
  expect(screen.queryByAltText("adventure_character")).not.toBeInTheDocument();
  expect(screen.getByAltText("adventure_arena")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_arena")).toHaveAttribute(
    "style",
    "opacity: 0.3;"
  );
  expect(screen.getByAltText("adventure_story")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_event")).toBeInTheDocument();
});

test("Renders StoryPanels for adventure", async () => {
  render(
    <GameContext.Provider value={context}>
      <Adventures />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("adventure_story")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("adventure_border_story"));
  expect(context.setAdventure.mock.calls.length).toBe(1);
});
