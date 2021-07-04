import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fight } from "../Fight/Fight";
const playerCards = require("../data/heroCards.json");
const enemies = require("../data/enemies.json");
const heroHealth = "15";
const story = {
  id: "fight1",
  type: "fight" as "fight",
  image: "../img/arena_1.png",
  enemy: "dude",
  state: "open" as "open",
  characters: ["maya", "tara"],
};
const enemyData = enemies.find((e: any) => e.id === story.enemy);
const gameState = {
  sceneCharacters: [],
  player: {
    id: 1,
    cards: playerCards,
    experience: 300,
    lifes: 3,
    resources: [
      { id: "iron", name: "Iron", image: "../", commonality: 5, quantity: 1 },
    ],
  },
  adventures: [],
  heroes: [],
};

test("Renders Fight screen", () => {
  const backToStory = jest.fn();
  const setGameState = jest.fn();
  render(
    <Fight
      gameState={gameState}
      clearScreen={backToStory}
      story={story}
      setGameState={setGameState}
    />
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
  const backToStory = jest.fn();
  const setGameState = jest.fn();
  render(
    <Fight
      gameState={gameState}
      clearScreen={backToStory}
      story={story}
      setGameState={setGameState}
    />
  );
  userEvent.click(screen.getByLabelText("opponent"));
  expect(screen.getAllByLabelText("display_card").length).toEqual(1);
  userEvent.click(screen.getAllByLabelText("spell_card")[0]);
  expect(screen.getAllByLabelText("display_card").length).toEqual(2);
});

test("Settings screen switches on and off", async () => {
  const backToStory = jest.fn();
  const setGameState = jest.fn();
  render(
    <Fight
      gameState={gameState}
      clearScreen={backToStory}
      story={story}
      setGameState={setGameState}
    />
  );
  expect(screen.queryByLabelText("settings_screen")).not.toBeInTheDocument();
  expect(screen.getByTestId("settings_button")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("settings_button"));
  expect(screen.getByLabelText("settings_screen")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("settings_button"));
  expect(screen.queryByLabelText("settings_screen")).not.toBeInTheDocument();
});
