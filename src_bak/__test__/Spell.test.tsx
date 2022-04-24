import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mayaCard } from "../utils/testobjects";
import { Spell } from "../Spells/Spell";

test("Renders Element Spell", async () => {
  const selectSpell = jest.fn();
  render(<Spell spell={mayaCard} selectSpell={selectSpell} withName />);
  expect(screen.getByText("Maya Hit 1")).toBeInTheDocument();
});
