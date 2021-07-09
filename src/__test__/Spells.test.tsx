import React from "react";
import { render, screen } from "@testing-library/react";
import { Spells } from "../Main/Spells";

const heroes = [
  { id: "maya", name: "Maya", image: "../img/maya.png", state: "story" },
  { id: "tara", name: "Tara", image: "../img/tara.png", state: "story" },
];

const spells = [
  {
    id: "base_hit1_maya",
    name: "Maya Hit 1",
    strength: 1,
    quantity: 1,
    character: "maya",
    element: "earth",
    image: "../img/Spells/spell1.jpg",
    selected: true,
  },
  {
    id: "base_hit2",
    name: "Base Hit 2",
    strength: 2,
    quantity: 2,
    character: null,
    element: null,
    image: "../img/Spells/spell2.jpg",
    selected: true,
  },
  {
    id: "base_hit3_maya",
    name: "Maya Hit 3",
    strength: 3,
    quantity: 1,
    character: "maya",
    element: "earth",
    image: "../img/Spells/spell3.jpg",
    selected: true,
  },
  {
    id: "base_hit1_tara",
    name: "Tara Hit 1",
    strength: 1,
    quantity: 1,
    character: "tara",
    element: "metal",
    image: "../img/Spells/spell8.jpg",
    selected: true,
  },
];

test("Renders Heroes screen with characters ready for a dialogue", () => {
  render(<Spells heroes={heroes} spells={spells} />);
  expect(screen.getByAltText("image_base_spells")).toBeInTheDocument();
  expect(screen.getByAltText("image_maya_spells")).toBeInTheDocument();
  expect(screen.getByAltText("image_tara_spells")).toBeInTheDocument();
});
