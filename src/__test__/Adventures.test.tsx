import React from "react";
import { render, screen } from "@testing-library/react";
import { Adventures } from "../Main/Adventures";
import { GameContext } from "../App";
import { debug } from "console";

const gameState = {
  sceneCharacters: [],
  dialogues: [],
  player: {
    id: 1,
    cards: [],
    experience: 300,
    lifes: 3,
    heroes: [],
    resources: [],
  },
  adventures: [
    {
      id: "character",
      name: "Character",
      image: "character.jpg",
      state: "open" as "open",
      form: "character",
      stories: [],
    },
    {
      id: "story",
      name: "Act 1",
      image: "story.jpg",
      state: "open" as "open",
      form: "story",
      stories: [],
    },
    {
      id: "arena",
      name: "Arena",
      image: "arena.jpg",
      state: "closed" as "closed",
      form: "arena",
      stories: [],
    },
    {
      id: "torunament",
      name: "Tournament",
      image: "tournament.jpg",
      state: "closed" as "closed",
      form: "torunament",
      stories: [],
    },
    {
      id: "event",
      name: "Event",
      image: "event.jpg",
      state: "closed" as "closed",
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
  setGameState: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("Renders Heroes screen with characters ready for a dialogue", () => {
  render(
    <GameContext.Provider value={context}>
      <Adventures />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("adventures_background")).toBeInTheDocument();
  debug();
  expect(screen.getByAltText("adventure_character")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_arena")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_story")).toBeInTheDocument();
  expect(screen.getByAltText("adventure_event")).toBeInTheDocument();
});
