import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fight } from "../Fight";
const playerCards = require("../data/heroCards.json");

const story = {
  id: "fight1",
  type: "fight" as "fight",
  image: "../img/arena_1.png",
  enemy: "dude",
  state: "open" as "open",
  characters: ["maya", "tara"],
};
const player = { id: 1, cards: playerCards };

test("Renders Fight screen", () => {
  const backToStory = jest.fn();
  render(<Fight clearScreen={backToStory} story={story} player={player} />);
  expect(screen.getByText(/Your opponent/)).toBeInTheDocument();
});
