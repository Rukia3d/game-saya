import React from "react";
import { render, screen } from "@testing-library/react";

import { mayaCard } from "../utils/testobjects";
import { SpellDescription } from "../Spells/SpellDescription";

test("Renders Element Spell Description", async () => {
  render(<SpellDescription spell={mayaCard} />);
  expect(screen.getByText("Maya Hit 1")).toBeInTheDocument();
  expect(screen.getByText(/Strength/)).toBeInTheDocument();
  expect(screen.getByText(/Element/)).toBeInTheDocument();
  expect(screen.getByText(/Equiped/)).toBeInTheDocument();
});
