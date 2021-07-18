import React from "react";
import { render, screen } from "@testing-library/react";
import { BigCard } from "../Fight/BigCard";
import userEvent from "@testing-library/user-event";

const card = {
  id: "base_hit1_maya",
  name: "Maya Hit 1",
  strength: 1,
  character: "maya",
  element: "earth" as "earth",
  image: "../img/Spells/spell1.jpg",
  selected: true,
  mana: 0,
  owner: "hero" as "hero",
};

test("Renders Big Card screen", async () => {
  const setInfo = jest.fn();
  render(<BigCard card={card} setInfo={setInfo} />);
  expect(screen.getByText("Maya Hit 1")).toBeInTheDocument();
  expect(screen.getByText("Info")).toBeInTheDocument();
  userEvent.click(screen.getByText("Info"));
  expect(setInfo.mock.calls.length).toBe(1);
});
