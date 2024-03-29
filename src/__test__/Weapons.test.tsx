import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { Weapons } from "../Weapons";
import { testPlayer, testServer } from "../utils/testDB";
import userEvent from "@testing-library/user-event";

const context: GameContextType = {
  player: testPlayer,
  server: testServer,
  mutate: jest.fn(),
  screen: {
    screen: "weapons",
    weaponId: 0,
    materialId: null,
  },
  setScreen: jest.fn(),
};
test("Renders home screen correctly with relevant adventures", async () => {
  const user = userEvent.setup();
  render(
    <GameContext.Provider value={context}>
      <Weapons />
    </GameContext.Provider>
  );
  expect(screen.getByTestId("top-menu")).toBeInTheDocument();
  // await user.click(screen.getAllByTestId("weapon-selection")[0]);
  // expect(screen.getByTestId("popup-screen")).toBeInTheDocument();
  // expect(screen.getByTestId("weapon-popup")).toBeInTheDocument();
  // expect(screen.getAllByTestId("weapon-screen").length).toBe(5);
  // eslint-disable-next-line testing-library/no-debugging-utils
  // screen.debug();
});
