import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mayaCard } from "../utils/testobjects";
import { ElementSpell } from "../Spells/ElementSpell";

test("Renders Element Spell", async () => {
  const selectCard = jest.fn();
  render(
    <ElementSpell
      card={mayaCard}
      selectCard={selectCard}
      element={mayaCard.element}
    />
  );
  expect(screen.getByText("Maya Hit 1")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("spell_card_border"));
  expect(selectCard.mock.calls.length).toBe(1);
});
