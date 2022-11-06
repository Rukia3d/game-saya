import React from "react";
import { render, screen } from "@testing-library/react";
import { Main } from "../Main";

test.skip("Renders main correctly with error for no data", () => {
  render(<Main playerId="1" />);
  expect(screen.getByTestId("main-screen-error")).toBeInTheDocument();
});
