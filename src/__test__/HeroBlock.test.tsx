import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroBlock } from "../Fight/HeroBlock";
import userEvent from "@testing-library/user-event";

import { fightState } from "../utils/testobjects";

test("Renders HeroBlock screen", async () => {
  const setInfo = jest.fn();
  const selectCard = jest.fn();
  render(
    <HeroBlock
      fightState={fightState}
      setInfo={setInfo}
      selectCard={selectCard}
    />
  );
  expect(screen.getByLabelText("character-maya")).toBeInTheDocument();
  expect(screen.getByLabelText("character-nell")).toBeInTheDocument();
  expect(screen.getByLabelText("character-tara")).toBeInTheDocument();
  userEvent.click(screen.getAllByLabelText("spell_card_border")[0]);
  expect(selectCard.mock.calls.length).toBe(1);
});
