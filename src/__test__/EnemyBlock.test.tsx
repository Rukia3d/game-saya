import React from "react";
import { render, screen } from "@testing-library/react";
import { EnemyBlock } from "../Fight/EnemyBlock";
import userEvent from "@testing-library/user-event";
import { fightState } from "../utils/teststates";

test("Renders Character Box", async () => {
  const setInfo = jest.fn();
  const enemyAct = jest.fn();
  render(
    <EnemyBlock fightState={fightState} enemyAct={enemyAct} setInfo={setInfo} />
  );
  expect(screen.getByTestId("enemy_life").innerHTML).toEqual(
    fightState.enemyDeck.length.toString()
  );
  userEvent.click(screen.getByLabelText("opponent_info"));
  expect(setInfo.mock.calls.length).toBe(1);
  userEvent.click(screen.getByLabelText("opponent"));
  expect(enemyAct.mock.calls.length).toBe(1);
});
