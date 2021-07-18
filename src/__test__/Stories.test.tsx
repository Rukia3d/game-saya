import React from "react";
import { render, screen } from "@testing-library/react";
import { Stories } from "../Main/Stories";
import { GameContext } from "../App";
import userEvent from "@testing-library/user-event";
const stories = require("../data/storiesAct1.json");

const gameState = {
  sceneCharacters: [],
  dialogues: [],
  player: {
    id: 1,
    maxMana: 5,
    cards: [],
    experience: 300,
    mana: 3,
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

test("Stories renders StoryPanels for adventure", async () => {
  render(
    <GameContext.Provider value={context}>
      <Stories />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("story_background")).toBeInTheDocument();
  expect(screen.getByTestId("scroll_button")).toBeInTheDocument();
  expect(screen.getByLabelText("stories_list")).toBeInTheDocument();
  expect(screen.getByLabelText("stories_list").children.length).toEqual(4);
  userEvent.click(screen.getByTestId("scroll_button"));
  expect(screen.getByLabelText("stories_list").children.length).toEqual(5);
  expect(screen.getAllByTestId("scroll_button").length).toEqual(2);
});
