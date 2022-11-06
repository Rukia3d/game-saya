import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { testPlayer, testServer } from "../utils/testDBPlayer";
import userEvent from "@testing-library/user-event";
import { Collections } from "../Collections";

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
      <Collections setScreen={jest.fn()} />
    </GameContext.Provider>
  );
  expect(screen.getByTestId("top-menu")).toBeInTheDocument();
  expect(screen.getByTestId("collections-list")).toBeInTheDocument();
  expect(screen.getByTestId("collections-list").childNodes.length).toBe(3);
});
