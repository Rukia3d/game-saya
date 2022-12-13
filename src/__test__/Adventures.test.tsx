import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { Adventure } from "../Adventure";
import { testPlayer, testServer } from "../utils/testDB";

const context: GameContextType = {
  player: testPlayer,
  server: testServer,
  mutate: jest.fn(),
  screen: {
    screen: "adventure",
    adventure: testPlayer.adventures[0],
    story: null,
  },
  setScreen: jest.fn(),
};
test("Renders home screen correctly with relevant adventures", async () => {
  render(
    <GameContext.Provider value={context}>
      <Adventure />
    </GameContext.Provider>
  );
  expect(screen.getByTestId("top-menu")).toBeInTheDocument();
  expect(screen.getByTestId("adventures-list")).toBeInTheDocument();
  expect(screen.getByTestId("adventures-list").childNodes.length).toBe(3);
});
