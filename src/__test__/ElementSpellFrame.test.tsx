import React from "react";
import { render, screen } from "@testing-library/react";

import { mayaCard } from "../utils/testobjects";
import { ElementSpellFrame } from "../Spells/ElementSpellFrame";

test("Renders Element Spell Frame based on level 1", async () => {
  const cardL1 = { ...mayaCard, updates: ["update1"] };
  render(<ElementSpellFrame card={cardL1} />);
  expect(screen.getByAltText("spellimage_base_hit1_maya")).toBeInTheDocument();
  expect(screen.getByAltText("spellimage_frame1")).toBeInTheDocument();
});

test("Renders Element Spell Frame based on level 2", async () => {
  const cardL2 = { ...mayaCard, updates: ["update1", "update2"] };
  render(<ElementSpellFrame card={cardL2} />);
  expect(screen.getByAltText("spellimage_base_hit1_maya")).toBeInTheDocument();
  expect(screen.getByAltText("spellimage_frame2")).toBeInTheDocument();
});
