import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fight } from "../Fight";
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
const player = { id: 1, cards: playerCards };
const enemyData = enemies.find((e: any) => e.id === story.enemy);

test("Renders Fight screen", () => {
  const backToStory = jest.fn();

  render(<Fight clearScreen={backToStory} story={story} player={player} />);
  expect(screen.getByText(/Your opponent/)).toBeInTheDocument();
  // TODO check the correct element was assigned
  expect(screen.getByText(/Current element/)).toBeInTheDocument();
  // correct number of enemy life
  expect(screen.getByTestId("enemy_life").innerHTML).toMatch(
    enemyData.life.toString()
  );
  // correct hero health
  expect(screen.getByTestId("hero_life").innerHTML).toMatch(heroHealth);
  // correct number of cards in hand
  // info on card is correct
  // info on opponent is correct
  // info on attacking card is correct
  // info on defending card is correct
});
