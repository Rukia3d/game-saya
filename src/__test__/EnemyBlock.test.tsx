import React from "react";
import { render, screen } from "@testing-library/react";
import { EnemyBlock } from "../Fight/EnemyBlock";
import userEvent from "@testing-library/user-event";
import { gameState, fightState } from "../utils/testobjects";

test("Renders Character Box", async () => {
  const setInfo = jest.fn();
  const enemyAct = jest.fn();
  render(
    <EnemyBlock fightState={fightState} enemyAct={enemyAct} setInfo={setInfo} />
  );
  const player = gameState.player.data;
  expect(screen.getByTestId("enemy_life").innerHTML).toEqual(
    fightState.enemyDeck.length.toString()
  );
  expect(screen.getByTestId("hero_life").innerHTML).toEqual(
    player.life.toString()
  );
  expect(screen.getByTestId("hero_mana").innerHTML).toEqual(
    player.mana.toString()
  );
  userEvent.click(screen.getByLabelText("opponent_info"));
  expect(setInfo.mock.calls.length).toBe(1);
  userEvent.click(screen.getByLabelText("opponent"));
  expect(enemyAct.mock.calls.length).toBe(1);
});
