import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { testPlayer, testServer } from "../utils/testDBPlayer";
import userEvent from "@testing-library/user-event";
import { Messages } from "../Messages";

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
      <Messages setScreen={jest.fn()} />
    </GameContext.Provider>
  );
  expect(screen.getByTestId("top-menu")).toBeInTheDocument();
  expect(screen.getByTestId("messages-list")).toBeInTheDocument();
  expect(screen.getByTestId("messages-list").childNodes.length).toBe(2);
});
