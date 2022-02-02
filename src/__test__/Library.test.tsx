import React from "react";
import { render, screen } from "@testing-library/react";
import { Library } from "../Main/Library";
import { GameContext, GameContextType } from "../App";
import userEvent from "@testing-library/user-event";
import { baseCards15 } from "../utils/testobjects";
import { GameState, IResource, ISpell, ISpellUpdate } from "../utils/types";
import { gameState } from "../utils/teststates";

const mayaSpells: ISpell[] = new Array(3).fill(0).map((x, n) => ({
  ...baseCards15[0],
  id: "base_hit" + n,
  name: "Base Hit " + n,
  school: "restoration",
  color: "violet",
}));

const taraSpells: ISpell[] = new Array(3).fill(0).map((x, n) => ({
  ...baseCards15[0],
  id: "some" + n,
  name: "Some Hit " + n,
  school: "amplification",
  color: "grey",
}));
const newSpells = mayaSpells.concat(taraSpells);
const playerResources = gameState.resources.map((r: IResource, i: number) => {
  return { ...r, quantity: 1, school: i < 3 ? "restoration" : "oblation" };
});
const playerUpdates = gameState.spellUpdates.map(
  (s: ISpellUpdate, i: number) => {
    return { ...s, school: i < 2 ? "restoration" : "oblation" };
  }
);
const newGameState: GameState = {
  ...JSON.parse(JSON.stringify(gameState)),
  player: {
    ...gameState.player,
    spells: newSpells,
    resources: playerResources,
    spellUpdates: playerUpdates,
    heroes: [
      { ...gameState.player.heroes[0], school: "restoration" },
      { ...gameState.player.heroes[1], school: "amplification" },
    ],
  },
};

const context: GameContextType = {
  adventure: null,
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: newGameState,
  setGameState: jest.fn(),
  addition: null,
  setAdditionScreen: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders Library with Hero data", () => {
  render(
    <GameContext.Provider value={context}>
      <Library />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Maya/)).toBeInTheDocument();
  expect(screen.getByText(/Hero/)).toBeInTheDocument();
  expect(screen.getByText(/Spells/)).toBeInTheDocument();
  expect(screen.getByText(/Updates/)).toBeInTheDocument();
  expect(screen.getByText(/Resources/)).toBeInTheDocument();
  expect(screen.getByText(/Hero/).getAttribute("class")).toMatch(/active/);
  expect(screen.getByText(/Spells/).getAttribute("class")).toMatch(/inactive/);
  userEvent.click(screen.getByText(/Spells/));
  expect(screen.getByText(/Spells/).getAttribute("class")).toMatch(/active/);
  expect(screen.getByText(/Hero/).getAttribute("class")).toMatch(/inactive/);
});

test("Renders Library with Resources data", () => {
  render(
    <GameContext.Provider value={context}>
      <Library />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Resources/)).toBeInTheDocument();
  userEvent.click(screen.getByText(/Resources/));
  expect(screen.getByText(/Resources/).getAttribute("class")).toMatch(/active/);
  expect(screen.getByText(/Hero/).getAttribute("class")).toMatch(/inactive/);
  expect(screen.getByLabelText("resources-images").children.length).toEqual(3);
  expect(screen.getByLabelText("resource-image-sparks")).toBeInTheDocument();
  expect(screen.getByLabelText("resource-image-sparks").innerHTML).toMatch(/1/);
  expect(screen.getByLabelText("resource-image-ash")).toBeInTheDocument();
  expect(screen.getByLabelText("resource-image-ash").innerHTML).toMatch(/1/);
});

test("Renders Library with Updates data", () => {
  render(
    <GameContext.Provider value={context}>
      <Library />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Updates/)).toBeInTheDocument();
  userEvent.click(screen.getByText(/Updates/));
  expect(screen.getByText(/Updates/).getAttribute("class")).toMatch(/active/);
  expect(screen.getByText(/Hero/).getAttribute("class")).toMatch(/inactive/);

  expect(screen.getByLabelText("spell-updates").children.length).toEqual(2);
  expect(screen.getByAltText("update-fire_0")).toHaveAttribute(
    "src",
    expect.stringContaining("fire_0")
  );
  expect(screen.getByText(/SomeName0/)).toBeInTheDocument();
});

test("Library throws correct error when gameState is missing in context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  expect(() =>
    render(
      <GameContext.Provider value={{ ...context, gameState: null }}>
        <Library />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  jest.restoreAllMocks();
});
