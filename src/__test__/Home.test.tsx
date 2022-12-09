import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { Home } from "../Home";
import { testPlayer, testServer } from "../utils/helpers";

const context: GameContextType = {
  player: testPlayer,
  server: testServer,
  mutate: jest.fn(),
  game: null,
  setGame: jest.fn(),
};
test("Renders home screen correctly with relevant adventures", () => {
  render(
    <GameContext.Provider value={context}>
      <Home setScreen={jest.fn()} />
    </GameContext.Provider>
  );
  expect(screen.getByTestId("home-screen").childNodes.length).toBe(3);
  expect(screen.getByTestId("home-items").childNodes.length).toBe(5);
  expect(screen.getByTestId("home-adventures").childNodes.length).toBe(2);
  expect(screen.getByTestId("home-menues").childNodes.length).toBe(4);
  // eslint-disable-next-line testing-library/no-debugging-utils
  //screen.debug();
});
