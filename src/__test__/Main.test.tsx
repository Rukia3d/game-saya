import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { Main } from "../Main";

const context = {};
test("Renders main correctly with context", () => {
  render(<Main playerId="1" />);
  expect(screen.getByTestId("main-screen")).toBeInTheDocument();
});
