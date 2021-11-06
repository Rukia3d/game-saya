import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mayaCard } from "../utils/testobjects";
import { Spell } from "../Spells/Spell";

test("Renders Element Spell", async () => {
  const selectSpell = jest.fn();
  render(
    <Spell
      spell={mayaCard}
      selectSpell={selectSpell}
      element={mayaCard.element}
    />
  );
  expect(screen.getByText("Maya Hit 1")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("spell_card_border"));
  expect(selectSpell.mock.calls.length).toBe(1);
});
