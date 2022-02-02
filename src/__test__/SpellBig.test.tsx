import React from "react";
import { render, screen } from "@testing-library/react";
import { SpellBig } from "../Fight/SpellBig";
import userEvent from "@testing-library/user-event";

import { fightstory, mayaCard } from "../utils/testobjects";
import { ISpell } from "../utils/types";
import { gameState } from "../utils/teststates";
import { GameContext, GameContextType } from "../App";

const context: GameContextType = {
  adventure: gameState.adventures[0],
  setAdventure: jest.fn(),
  story: fightstory,
  setStory: jest.fn(),
  gameState: gameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders Big Card screen with strength 1 and earth", async () => {
  const earthCard: ISpell = { ...mayaCard, school: "restoration", strength: 1 };
  render(
    <GameContext.Provider value={context}>
      <SpellBig spell={earthCard} />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("spellimage_base_hit1_maya")).toBeInTheDocument();
  expect(screen.getAllByLabelText("spell-strength").length).toEqual(1);
  expect(screen.getByLabelText("spell-strength")).toHaveAttribute(
    "style",
    expect.stringContaining("rgb(254, 222, 8)")
  );
});

test("Renders Big Card screen with strength 3 and fire", async () => {
  const earthCard: ISpell = { ...mayaCard, school: "oblation", strength: 3 };
  render(
    <GameContext.Provider value={context}>
      <SpellBig spell={earthCard} />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("spellimage_base_hit1_maya")).toBeInTheDocument();
  expect(screen.getAllByLabelText("spell-strength").length).toEqual(3);
  expect(screen.getAllByLabelText("spell-strength")[0]).toHaveAttribute(
    "style",
    expect.stringContaining("rgb(255, 0, 0)")
  );
});

test("Renders Big Card screen with strength 2 and air", async () => {
  const earthCard: ISpell = { ...mayaCard, school: "deception", strength: 2 };
  render(
    <GameContext.Provider value={context}>
      <SpellBig spell={earthCard} />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("spellimage_base_hit1_maya")).toBeInTheDocument();
  expect(screen.getAllByLabelText("spell-strength").length).toEqual(2);
  expect(screen.getAllByLabelText("spell-strength")[0]).toHaveAttribute(
    "style",
    expect.stringContaining("rgb(8, 254, 221)")
  );
  expect(screen.getByLabelText("big-spell-frame")).toHaveAttribute(
    "style",
    expect.stringContaining("opacity: 1")
  );
});

test("Renders Big Card screen and shows the info", async () => {
  const earthCard: ISpell = { ...mayaCard, school: "alteration", strength: 2 };
  const setAdditionScreen = jest.fn();
  render(
    <GameContext.Provider
      value={{ ...context, setAdditionScreen: setAdditionScreen }}
    >
      <SpellBig spell={earthCard} transparency />
    </GameContext.Provider>
  );
  expect(screen.getByAltText("spellimage_base_hit1_maya")).toBeInTheDocument();
  expect(screen.getAllByLabelText("spell-strength").length).toEqual(2);
  expect(screen.getAllByLabelText("spell-strength")[0]).toHaveAttribute(
    "style",
    expect.stringContaining("rgb(0, 39, 194)")
  );
  expect(screen.getByLabelText("big-spell-frame")).toHaveAttribute(
    "style",
    expect.stringContaining("opacity: 0.5")
  );
  userEvent.click(screen.getByLabelText("big-spell"));
  expect(setAdditionScreen.mock.calls.length).toBe(1);
});
