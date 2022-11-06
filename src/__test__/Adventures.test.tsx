import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { testPlayer, testServer } from "../utils/testData";
import userEvent from "@testing-library/user-event";
import { Adventures } from "../Adventures";

const context: GameContextType = {
  player: testPlayer,
  server: testServer,
  mutate: jest.fn(),
  game: null,
  setGame: jest.fn(),
};
test("Renders home screen correctly with relevant adventures", async () => {
  const user = userEvent.setup();
  render(
    <GameContext.Provider value={context}>
      <Adventures setScreen={jest.fn()} />
    </GameContext.Provider>
  );
  expect(screen.getByTestId("top-menu")).toBeInTheDocument();
  expect(screen.getByTestId("adventures-list")).toBeInTheDocument();
  expect(screen.getByTestId("adventures-list").childNodes.length).toBe(3);
});
