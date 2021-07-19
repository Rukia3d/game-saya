import React from "react";
import { render, screen } from "@testing-library/react";
import { CharacterBox } from "../Fight/CharacterBox";
import userEvent from "@testing-library/user-event";
import { fightState } from "../utils/testobjects";

test("Renders Character Box", async () => {
  const setInfo = jest.fn();
  const enemyAct = jest.fn();
  render(
    <CharacterBox
      fightState={fightState}
      enemyAct={enemyAct}
      setInfo={setInfo}
    />
  );
  expect(screen.getByTestId("enemy_life").innerHTML).toEqual("2");
  expect(screen.getByTestId("hero_life").innerHTML).toEqual("15");
  userEvent.click(screen.getByLabelText("opponent_info"));
  expect(setInfo.mock.calls.length).toBe(1);
  userEvent.click(screen.getByLabelText("opponent"));
  expect(enemyAct.mock.calls.length).toBe(1);
});
