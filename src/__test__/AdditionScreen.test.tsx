import React from "react";
import { render, screen } from "@testing-library/react";
import { Adventures } from "../Main/Adventures";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { gameState } from "../utils/teststates";
import { AdditionScreen } from "../UI/AdditionScreen";
import { mayaCard } from "../utils/testobjects";

const context: GameContextType = {
  adventure: null,
  story: null,
  gameState: gameState,
  addition: mayaCard,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  setStory: jest.fn(),
  setAdventure: jest.fn(),
  backToMain: jest.fn(),
};

test("Addition screen shows and hides", () => {
  const setAdditionScreen = jest.fn();
  render(
    <GameContext.Provider
      value={{ ...context, setAdditionScreen: setAdditionScreen }}
    >
      <AdditionScreen />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("info_card")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("close_button"));
  expect(setAdditionScreen.mock.calls.length).toBe(1);
});

test("Addition throws correct error", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider
        //@ts-ignore
        value={{ ...context, setAdditionScreen: null }}
      >
        <AdditionScreen />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  jest.restoreAllMocks();
});
