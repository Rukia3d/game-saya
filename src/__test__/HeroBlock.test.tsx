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
  expect(screen.getAllByLabelText("spell_card").length).toEqual(2);
});
