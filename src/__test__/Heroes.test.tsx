import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Heroes } from "../Main/Heroes";

const scene = [
  { id: "maya", name: "Maya", image: "../img/maya.png", state: "story" },
  { id: "tara", name: "Tara", image: "../img/tara.png", state: "story" },
];

test("Renders Heroes screen with characters ready for a dialogue", () => {
  render(<Heroes characters={scene} />);
  expect(screen.getByText(/Your Heroes/)).toBeInTheDocument();
  expect(screen.getByAltText("maya_story")).toBeInTheDocument();
  expect(screen.getByAltText("tara_story")).toBeInTheDocument();
});
