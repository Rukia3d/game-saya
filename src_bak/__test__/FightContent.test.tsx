import React from "react";
import { act, render, screen } from "@testing-library/react";
import { FightContent } from "../Fight/FightContent";
import { fightState, gameState, testAdventure } from "../utils/test_states";
import userEvent from "@testing-library/user-event";
import { GameContext, GameContextType } from "../App";
import { fightstory } from "../utils/test_gameobjects";

const SHORTANIMATION = 500;
const LONGANIMATION = 1500;
const EXTRALONGANIMATION = 3000;

const context: GameContextType = {
  adventure: testAdventure,
  setAdventure: jest.fn(),
  story: fightstory,
  setStory: jest.fn(),
  gameState: gameState,
  addition: null,
  setAdditionScreen: jest.fn(),
  setGameState: jest.fn(),
  backToMain: jest.fn(),
};

afterEach(() => {
  jest.useRealTimers();
});

test("Renders FightContent screen and follows though the flow", async () => {
  const setResult = jest.fn();
  const prefightState = { ...fightState };
  jest.useFakeTimers();

  render(
    <GameContext.Provider value={context}>
      <FightContent prefightState={prefightState} setResult={setResult} />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("animation-GIVECARDS")).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(EXTRALONGANIMATION);
  });
  expect(screen.getByLabelText("animation-ELEMENT")).toBeInTheDocument();
  act(() => {
    jest.advanceTimersByTime(SHORTANIMATION);
  });
  expect(screen.getByLabelText("animation-ENEMYACT")).toBeInTheDocument();
  // userEvent.click(screen.getAllByLabelText("spell_card_border")[0]);
  // expect(screen.getByLabelText("animation-HEROACT")).toBeInTheDocument();
  // act(() => {
  //   jest.advanceTimersByTime(SHORTANIMATION);
  // });
  // expect(screen.getByLabelText("animation-FIGHT")).toBeInTheDocument();
  // act(() => {
  //   jest.advanceTimersByTime(SHORTANIMATION);
  // });
  // expect(screen.getByLabelText("animation-ACTIONEND")).toBeInTheDocument();
  // act(() => {
  //   jest.advanceTimersByTime(SHORTANIMATION);
  // });
  // expect(screen.getByLabelText("animation-GIVECARD")).toBeInTheDocument();
  jest.clearAllTimers();
  jest.useRealTimers();
});

test("Renders FightContent screen and wins", async () => {
  const setResult = jest.fn();
  const prefightState = { ...JSON.parse(JSON.stringify(fightState)) };
  prefightState.enemyDeck.shift();
  jest.useFakeTimers();

  render(
    <GameContext.Provider value={context}>
      <FightContent prefightState={prefightState} setResult={setResult} />
    </GameContext.Provider>
  );
  expect(screen.getByLabelText("animation-GIVECARDS")).toBeInTheDocument();
  act(() => {
    jest.advanceTimersByTime(EXTRALONGANIMATION);
  });
  act(() => {
    jest.advanceTimersByTime(SHORTANIMATION);
  });
  expect(screen.getByLabelText("animation-ENEMYACT")).toBeInTheDocument();
  userEvent.click(screen.getAllByLabelText("spell_card_border")[1]);
  // expect(screen.getByLabelText("animation-HEROACT")).toBeInTheDocument();
  // act(() => {
  //   jest.advanceTimersByTime(SHORTANIMATION);
  // });
  // act(() => {
  //   jest.advanceTimersByTime(SHORTANIMATION);
  // });
  // expect(screen.getByLabelText("animation-FIGHT")).toBeInTheDocument();
  // act(() => {
  //   jest.advanceTimersByTime(SHORTANIMATION);
  // });
  // expect(screen.getByLabelText("animation-ACTIONEND")).toBeInTheDocument();
  // act(() => {
  //   jest.advanceTimersByTime(SHORTANIMATION);
  // });
  // expect(screen.getByLabelText("animation-WON")).toBeInTheDocument();
  jest.clearAllTimers();
  jest.useRealTimers();
});
