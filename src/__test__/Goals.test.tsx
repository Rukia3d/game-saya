import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { testPlayer, testServer } from "../utils/testDB";
import userEvent from "@testing-library/user-event";
import { Goals } from "../Goals";

const context: GameContextType = {
  player: testPlayer,
  server: testServer,
  mutate: jest.fn(),
  screen: {
    screen: "goals",
  },
  setScreen: jest.fn(),
};
test("Renders home screen correctly with relevant adventures", async () => {
  const user = userEvent.setup();
  render(
    <GameContext.Provider value={context}>
      <Goals />
    </GameContext.Provider>
  );
  expect(screen.getByTestId("top-menu")).toBeInTheDocument();
  expect(screen.getByTestId("goals-list")).toBeInTheDocument();
  //expect(screen.getByTestId("goals-list").childNodes.length).toBe(3);
});
