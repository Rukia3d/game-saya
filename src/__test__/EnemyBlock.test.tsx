import React from "react";
import { render, screen } from "@testing-library/react";
import { EnemyBlock } from "../Fight/EnemyBlock";
import userEvent from "@testing-library/user-event";
import { fightState, gameState } from "../utils/teststates";
import { GameContext, GameContextType } from "../App";
import { enemy, fightstory } from "../utils/testobjects";

test("Renders Character Box", async () => {
  const setInfo = jest.fn();
  const enemyAct = jest.fn();
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
  render(
    <GameContext.Provider value={context}>
      <EnemyBlock
        fightState={fightState}
        enemyAct={enemyAct}
        setInfo={setInfo}
        animation={null}
      />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("life_value").innerHTML).toBe("3");
  expect(screen.getByLabelText("mana_value").innerHTML).toBe("10");
  expect(screen.getByTestId("enemy-name").innerHTML).toBe("Dude: ");
  expect(screen.getByTestId("enemy-element").innerHTML).toBe("earth: ");
  expect(screen.getByTestId("enemy-life").innerHTML).toMatch(
    enemy.life.toString()
  );
  expect(screen.getByLabelText("opponent")).toBeInTheDocument();
  expect(screen.getAllByLabelText("animatedSprite").length).toEqual(4);
});
