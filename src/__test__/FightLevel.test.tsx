import React from "react";
import { render, screen } from "@testing-library/react";
import { FightLevel } from "../Fight/FightLevel";
import userEvent from "@testing-library/user-event";
import { fightState, gameState } from "../utils/teststates";
import { GameContext, GameContextType } from "../App";
import { enemy, fightstory } from "../utils/testobjects";

const context: GameContextType = {
  adventure: gameState.adventures[0],
  setAdventure: jest.fn(),
  story: fightstory,
  setStory: jest.fn(),
  gameState: gameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
};
const enemyAct = jest.fn();

test("Renders Fight Level Scene with characters", async () => {
  render(
    <GameContext.Provider value={context}>
      <FightLevel
        fightState={fightState}
        enemyAct={enemyAct}
        animation={null}
      />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("life_value").innerHTML).toBe("3");
  expect(screen.getByLabelText("mana_value").innerHTML).toBe("10");
  expect(screen.getByTestId("enemy-name").innerHTML).toBe("Dude: ");
  expect(screen.getByTestId("enemy-element").innerHTML).toBe("grey: ");
  // expect(screen.getByTestId("enemy-life").innerHTML).toMatch(
  //   enemy.life.toString()
  // );
  expect(screen.getByLabelText("opponent")).toBeInTheDocument();
  expect(screen.getAllByLabelText("animatedSprite").length).toEqual(4);
});

test("Throws correct error", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={{ ...context, gameState: null }}>
        <FightLevel
          fightState={fightState}
          enemyAct={enemyAct}
          animation={null}
        />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");

  jest.restoreAllMocks();
});
