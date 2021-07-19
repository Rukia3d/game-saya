import React from "react";
import { render, screen } from "@testing-library/react";
import { ForgeCard } from "../UI/ForgeCard";

import { mayaCard } from "../utils/testobjects";

test("Renders Big Card screen", async () => {
  const newCard = { ...mayaCard, type: "base_hit1" };
  const setForge = jest.fn();
  render(<ForgeCard item={newCard} setForge={setForge} />);
  expect(screen.getByLabelText("spell_card").innerHTML).toEqual("Maya Hit 1");
  expect(screen.getByText(/earth/)).toBeInTheDocument();
  expect(screen.getByText(/Equiped/)).toBeInTheDocument();
  expect(screen.getByText(/Requirements/)).toBeInTheDocument();
});
