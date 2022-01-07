import React from "react";
import { render, screen } from "@testing-library/react";
import { SpellBig } from "../Fight/SpellBig";
import userEvent from "@testing-library/user-event";

import { mayaCard } from "../utils/testobjects";
import { ISpell } from "../utils/types";

test("Renders Big Card screen with strength 1 and earth", async () => {
  const setInfo = jest.fn();
  const earthCard: ISpell = { ...mayaCard, element: "earth", strength: 1 };
  render(<SpellBig spell={earthCard} setInfo={setInfo} />);
  expect(screen.getByAltText("spellimage_base_hit1_maya")).toBeInTheDocument();
  expect(screen.getAllByLabelText("spell-strength").length).toEqual(1);
  expect(screen.getByLabelText("spell-strength")).toHaveAttribute(
    "style",
    expect.stringContaining("rgb(254, 222, 8)")
  );
});

test("Renders Big Card screen with strength 3 and fire", async () => {
  const setInfo = jest.fn();
  const earthCard: ISpell = { ...mayaCard, element: "fire", strength: 3 };
  render(<SpellBig spell={earthCard} setInfo={setInfo} />);
  expect(screen.getByAltText("spellimage_base_hit1_maya")).toBeInTheDocument();
  expect(screen.getAllByLabelText("spell-strength").length).toEqual(3);
  expect(screen.getAllByLabelText("spell-strength")[0]).toHaveAttribute(
    "style",
    expect.stringContaining("rgb(255, 0, 0)")
  );
});

test("Renders Big Card screen with strength 2 and air", async () => {
  const setInfo = jest.fn();
  const earthCard: ISpell = { ...mayaCard, element: "air", strength: 2 };
  render(<SpellBig spell={earthCard} setInfo={setInfo} />);
  expect(screen.getByAltText("spellimage_base_hit1_maya")).toBeInTheDocument();
  expect(screen.getAllByLabelText("spell-strength").length).toEqual(2);
  expect(screen.getAllByLabelText("spell-strength")[0]).toHaveAttribute(
    "style",
    expect.stringContaining("rgb(8, 254, 221)")
  );
});
