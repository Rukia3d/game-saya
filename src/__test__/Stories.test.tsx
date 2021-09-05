import React from "react";
import { render, screen } from "@testing-library/react";
import { Stories } from "../Main/Stories";
import { GameContext } from "../App";
import userEvent from "@testing-library/user-event";
import { gameState } from "../utils/testobjects";

const setDialogue = jest.fn();
const context = {
  adventure: gameState.adventures[1],
  setAdventure: jest.fn(),
  story: null,
  setStory: jest.fn(),
  gameState: gameState,
  dialogue: null,
  setDialogue: setDialogue,
  setGameState: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("Stories renders StoryPanels for adventure", async () => {
  gameState.dialogues[0].id = "dialogue1";
  render(
    <GameContext.Provider value={context}>
      <Stories />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("story_background")).toBeInTheDocument();
  expect(screen.getByTestId("scroll_button")).toBeInTheDocument();
  expect(screen.getByLabelText("stories_list")).toBeInTheDocument();
  expect(screen.getByLabelText("stories_list").children.length).toEqual(4);
  userEvent.click(screen.getByTestId("scroll_button"));
  expect(screen.getByLabelText("stories_list").children.length).toEqual(2);
  expect(screen.getAllByTestId("scroll_button").length).toEqual(1);
  userEvent.click(screen.getByTestId("scroll_button"));
  expect(screen.getByLabelText("stories_list").children.length).toEqual(4);
  userEvent.click(screen.getByAltText("story_dialogue1"));
  expect(setDialogue.mock.calls.length).toBe(1);
});

test("Throws error if no data provided in context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const context1 = { ...context, gameState: null };
  const context2 = {
    ...context,
    adventure: null,
  };
  expect(() =>
    render(
      <GameContext.Provider value={context1}>
        <Stories />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  expect(() =>
    render(
      <GameContext.Provider value={context2}>
        <Stories />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");

  jest.restoreAllMocks();
});
