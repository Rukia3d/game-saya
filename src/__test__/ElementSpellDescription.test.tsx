import React from "react";
import { render, screen } from "@testing-library/react";

import { mayaCard } from "../utils/testobjects";
import { ElementSpellDescription } from "../Spells/ElementSpellDescription";

test("Renders Element Spell Description", async () => {
  render(<ElementSpellDescription card={mayaCard} />);
  expect(screen.getByText("Maya Hit 1")).toBeInTheDocument();
  expect(screen.getByText(/Strength/)).toBeInTheDocument();
  expect(screen.getByText(/Element/)).toBeInTheDocument();
  expect(screen.getByText(/Equiped/)).toBeInTheDocument();
});
