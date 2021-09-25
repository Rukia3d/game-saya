import React from "react";
import { render, screen } from "@testing-library/react";
import { InfoCard } from "../UI/InfoCard";
import { mayaCard } from "../utils/testobjects";

test("Renders Item if it's a card", async () => {
  const setInfo = jest.fn();
  render(<InfoCard item={mayaCard} setInfo={setInfo} />);
  expect(screen.getByText(/Maya Hit 1/)).toBeInTheDocument();
  expect(screen.getByText(/Element earth/)).toBeInTheDocument();
  expect(screen.getByText(/Equiped/)).toBeInTheDocument();
});

test("Renders Error if it's not a card", async () => {
  const setInfo = jest.fn();
  render(<InfoCard item={{ example: "some" }} setInfo={setInfo} />);
  expect(screen.getByText(/I am not a card/)).toBeInTheDocument();
});
