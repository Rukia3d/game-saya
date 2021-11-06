import React from "react";
import { render, screen } from "@testing-library/react";
import { GameContext, GameContextType } from "../App";
import { baseCards15, dialstory } from "../utils/testobjects";
import userEvent from "@testing-library/user-event";
import { Dialogue } from "../Dialogues/Dialogue";
import { elementType, ISpell, storyChangeType } from "../utils/types";
import { gameState } from "../utils/teststates";

const context: GameContextType = {
  adventure: gameState.adventures[0],
  setAdventure: jest.fn(),
  story: dialstory,
  setStory: jest.fn(),
  gameState: gameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
};

test("Renders dialogue page", async () => {
  render(
    <GameContext.Provider value={context}>
      <Dialogue />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("dialogue_background")).toBeInTheDocument();
  expect(screen.getByAltText("character_image_maya")).toBeInTheDocument();
  expect(screen.getByLabelText("dialogue_line_0")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("dialogue_line_0"));
  expect(
    screen.queryByAltText("character_image_olija")
  ).not.toBeInTheDocument();
  expect(screen.getByAltText("character_image_maya")).toBeInTheDocument();
  expect(screen.getByLabelText("dialogue_line_0")).toBeInTheDocument();
});

test("Renders dialogue page and triggers Character screen", async () => {
  const setAdditionScreen = jest.fn();
  const nellSpells: ISpell[] = new Array(6).fill(0).map((x, n) => ({
    ...baseCards15[0],
    id: "some" + n,
    name: "Some Hit " + n,
    element: "fire",
  }));
  const newGameState = {
    ...gameState,
    player: {
      ...gameState.player,
      heroes: [
        {
          element: "earth" as elementType,
          id: "maya",
          image: "maya",
          name: "Maya",
          selected: true,
        },
      ],
    },
    spells: gameState.spells.concat(nellSpells),
  };
  const newContext = {
    ...context,
    gameState: newGameState,
    story: {
      ...dialstory,
      action: [
        { type: "addHero" as storyChangeType, id: "nell", data: "fire" },
      ],
    },
    setAdditionScreen: setAdditionScreen,
  };
  render(
    <GameContext.Provider value={newContext}>
      <Dialogue />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("dialogue_background")).toBeInTheDocument();
  expect(screen.getByAltText("character_image_maya")).toBeInTheDocument();
  expect(screen.getByLabelText("dialogue_line_0")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("lines_next"));
  expect(setAdditionScreen.mock.calls.length).toBe(1);
});
