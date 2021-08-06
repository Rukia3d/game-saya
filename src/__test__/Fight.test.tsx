import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fight } from "../Fight/Fight";
import { GameContext } from "../App";
import { story, gameState, enemy } from "../utils/testobjects";

const context = {
  adventure: null,
  setAdventure: jest.fn(),
  story: story,
  setStory: jest.fn(),
  gameState: gameState,
  setGameState: jest.fn(),
  dialogue: null,
  setDialogue: jest.fn(),
  backToMain: jest.fn(),
  backToStory: jest.fn(),
};

test("Renders Fight screen", () => {
  render(
    <GameContext.Provider value={context}>
      <Fight />
    </GameContext.Provider>
  );
  expect(screen.getByText(/Your opponent/)).toBeInTheDocument();
  // TODO check the correct element was assigned
  expect(screen.getByText(/Elements:/)).toBeInTheDocument();
  // correct number of enemy life
  expect(screen.getByTestId("enemy_life").innerHTML).toMatch(
    enemy.life.toString()
  );
  // Correct hero and enemy data
  expect(screen.getByTestId("hero_life").innerHTML).toMatch(
    gameState.player.data.life.toString()
  );
  expect(screen.getByTestId("hero_mana").innerHTML).toMatch(
    gameState.player.data.mana.toString()
  );
  expect(screen.getByLabelText("Deck").childElementCount).toEqual(5);

  // Info popup shows correct informatioj
  const firstCardName = screen.getAllByLabelText("spell_card")[0].innerHTML;

  userEvent.click(screen.getAllByTestId("hero_card_info")[0]);
  expect(screen.getByLabelText("item_name").innerHTML).toEqual(firstCardName);
  userEvent.click(screen.getByLabelText("info_card"));
  // TODO info on opponent is correct
  // TODO info on attacking card is correct
  // TODO info on defending card is correct
});

test("Fight works enemy attacks and hero defends", () => {
  render(
    <GameContext.Provider value={context}>
      <Fight />
    </GameContext.Provider>
  );
  userEvent.click(screen.getByLabelText("opponent"));
  expect(screen.getAllByLabelText("display_card").length).toEqual(1);
  userEvent.click(screen.getAllByLabelText("spell_card")[0]);
  expect(screen.getAllByLabelText("display_card").length).toEqual(2);
});

test("Settings screen switches on and off", async () => {
  render(
    <GameContext.Provider value={context}>
      <Fight />
    </GameContext.Provider>
  );
  expect(screen.queryByLabelText("settings_screen")).not.toBeInTheDocument();
  expect(screen.getByTestId("settings_button")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("settings_button"));
  expect(screen.getByLabelText("settings_screen")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("settings_button"));
  expect(screen.queryByLabelText("settings_screen")).not.toBeInTheDocument();
});

test("Fight finish shows the end screen for win", async () => {
  render(
    <GameContext.Provider value={context}>
      <Fight />
    </GameContext.Provider>
  );
  userEvent.click(screen.getByLabelText("opponent"));
  expect(screen.getByLabelText("display_card")).toBeInTheDocument();
  userEvent.click(screen.getAllByLabelText("spell_card")[0]);
  userEvent.click(screen.getByLabelText("opponent"));
  userEvent.click(screen.getAllByLabelText("spell_card")[0]);
  expect(screen.getAllByLabelText("display_card").length).toEqual(2);
  expect(await screen.findByText("You Won")).toBeInTheDocument();
  expect(screen.getByLabelText("chest_animation")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("chest_animation"));
  expect(await screen.findByText("Your prize")).toBeInTheDocument();
  userEvent.click(screen.getByTestId("exit_fight"));
  expect(context.backToStory.mock.calls.length).toEqual(1);
});

test("Throws error if no data provided in context", () => {
  jest.spyOn(console, "error").mockImplementation(() => jest.fn());
  const context1 = { ...context, story: null };
  const context2 = { ...context, gameState: null };
  const context3 = {
    ...context,
    story: { ...context.story, enemy: undefined },
  };
  const context4 = {
    ...context,
    story: { ...context.story, enemy: "some" },
  };
  expect(() =>
    render(
      <GameContext.Provider value={context1}>
        <Fight />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  expect(() =>
    render(
      <GameContext.Provider value={context2}>
        <Fight />
      </GameContext.Provider>
    )
  ).toThrow("No data in context");
  expect(() =>
    render(
      <GameContext.Provider value={context3}>
        <Fight />
      </GameContext.Provider>
    )
  ).toThrow("No enemy for this fight, something went very wrong");
  expect(() =>
    render(
      <GameContext.Provider value={context4}>
        <Fight />
      </GameContext.Provider>
    )
  ).toThrow("Can't find the enemy some");

  jest.restoreAllMocks();
});
