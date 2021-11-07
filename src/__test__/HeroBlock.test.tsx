import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroBlock } from "../Fight/HeroBlock";
import userEvent from "@testing-library/user-event";

import { fightState, gameState } from "../utils/teststates";

test("Renders HeroBlock screen", async () => {
  const setInfo = jest.fn();
  const selectSpell = jest.fn();
  render(
    <HeroBlock
      fightState={fightState}
      setInfo={setInfo}
      selectSpell={selectSpell}
    />
  );
  const player = gameState.player.data;
  expect(screen.getByLabelText("character-maya")).toBeInTheDocument();
  expect(screen.getByLabelText("character-nell")).toBeInTheDocument();
  expect(screen.getByLabelText("character-tara")).toBeInTheDocument();
  userEvent.click(screen.getAllByLabelText("spell_card_border")[0]);
  expect(selectSpell.mock.calls.length).toBe(1);
  expect(screen.getByTestId("hero_life").innerHTML).toEqual(
    player.life.toString()
  );
  expect(screen.getByTestId("hero_mana").innerHTML).toEqual(
    player.mana.toString()
  );
});
