import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fight } from "../Fight/Fight";
import { GameContext } from "../App";
const playerCards = require("../data/heroCards.json");
const enemies = require("../data/enemies.json");
const heroHealth = "15";
const story = {
  id: "fight1",
  type: "fight" as "fight",
  image: "../img/arena_1.png",
  enemy: "test-dude",
  state: "open" as "open",
  characters: ["maya", "tara"],
};
const enemyData = enemies.find((e: any) => e.id === story.enemy);
const gameState = {
  sceneCharacters: [
    { id: "maya", name: "Maya", image: "../img/maya.png", state: "story" },
  ],
  dialogues: [],
  player: {
    id: 1,
    cards: playerCards,
    experience: 300,
    lifes: 3,
    heroes: [
      {
        id: "maya",
        name: "Maya",
        image: "../img/maya_spells.png",
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
  story: story,
  setStory: jest.fn(),
  gameState: gameState,
  setGameState: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("Renders Fight screen", () => {
  render(
    <GameContext.Provider value={context}>
      <Fight />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Your opponent/)).toBeInTheDocument();
  // TODO check the correct element was assigned
  expect(screen.getByText(/Current element/)).toBeInTheDocument();
  // correct number of enemy life
  expect(screen.getByTestId("enemy_life").innerHTML).toMatch(
    enemyData.life.toString()
  );
  // Correct hero and enemy data
  expect(screen.getByTestId("hero_life").innerHTML).toMatch(heroHealth);
  expect(screen.getByLabelText("Deck").childElementCount).toEqual(5);

  // Info popup shows correct informatioj
  const firstCardName = screen.getAllByLabelText("spell_card")[0].innerHTML;

  userEvent.click(screen.getAllByTestId("hero_card_info")[0]);
  expect(screen.getByLabelText("item_name").innerHTML).toEqual(firstCardName);
  userEvent.click(screen.getByLabelText("info_card"));
  // TODO info on opponent is correct
  // TODO info on attacking card is correct
  // TODO info on defending card is correct
});

test("Fight works enemy attacks and hero defends", () => {
  render(
    <GameContext.Provider value={context}>
      <Fight />
    </GameContext.Provider>
  );
  userEvent.click(screen.getByLabelText("opponent"));
  expect(screen.getAllByLabelText("display_card").length).toEqual(1);
  userEvent.click(screen.getAllByLabelText("spell_card")[0]);
  expect(screen.getAllByLabelText("display_card").length).toEqual(2);
});

test("Settings screen switches on and off", async () => {
  render(
    <GameContext.Provider value={context}>
      <Fight />
    </GameContext.Provider>
  );
  expect(screen.queryByLabelText("settings_screen")).not.toBeInTheDocument();
  expect(screen.getByTestId("settings_button")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("settings_button"));
  expect(screen.getByLabelText("settings_screen")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("settings_button"));
  expect(screen.queryByLabelText("settings_screen")).not.toBeInTheDocument();
});

test("Fight finish shows the end screen", async () => {
  render(
    <GameContext.Provider value={context}>
      <Fight />
    </GameContext.Provider>
  );
  userEvent.click(screen.getByLabelText("opponent"));
  expect(screen.getByLabelText("display_card")).toBeInTheDocument();
  userEvent.click(screen.getAllByLabelText("spell_card")[0]);
  expect(screen.getAllByLabelText("display_card").length).toEqual(2);
  expect(await screen.findByText("You Won")).toBeInTheDocument();
  expect(screen.getByLabelText("chest_animation")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("chest_animation"));
  expect(await screen.findByText("Your prize")).toBeInTheDocument();
});
