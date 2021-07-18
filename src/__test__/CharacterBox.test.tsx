import React from "react";
import { render, screen } from "@testing-library/react";
import { CharacterBox } from "../Fight/CharacterBox";
import userEvent from "@testing-library/user-event";
import { FightState, Spell } from "../utils/types";

const enemy = {
  id: "dude",
  name: "Dude",
  element: "Earth",
  experience: "novice" as "novice",
  life: 2,
  cards: [],
  owner: "enemy" as "enemy",
};

const heroCard: Spell = {
  id: "base_hit1",
  name: "Base Hit 1",
  strength: 0,
  character: null,
  element: null,
  image: "",
  selected: false,
  owner: "hero" as "hero",
  mana: 0,
};
const enemyCard: Spell = {
  id: "base_hit1",
  name: "Base Hit 1",
  strength: 0,
  character: null,
  element: null,
  image: "",
  selected: false,
  owner: "enemy" as "enemy",
  mana: 0,
};

const fightState: FightState = {
  hero: {
    health: 15,
    currentHealth: 15,
    mana: 15,
    currentMana: 10,
  },
  enemy: enemy,
  heroDeck: [heroCard, heroCard],
  heroHand: [heroCard, heroCard],
  heroDrop: [heroCard],
  enemyDeck: [enemyCard, enemyCard],
  enemyDrop: [enemyCard],
  elements: ["fire" as "fire", "earth" as "earth"],
  element: "fire" as "fire",
};

test("Renders Character Box", async () => {
  const setInfo = jest.fn();
  const enemyAct = jest.fn();
  render(
    <CharacterBox
      fightState={fightState}
      enemyAct={enemyAct}
      setInfo={setInfo}
    />
  );
  expect(screen.getByTestId("enemy_life").innerHTML).toEqual("2");
  expect(screen.getByTestId("hero_life").innerHTML).toEqual("15");
  userEvent.click(screen.getByLabelText("opponent_info"));
  expect(setInfo.mock.calls.length).toBe(1);
  userEvent.click(screen.getByLabelText("opponent"));
  expect(enemyAct.mock.calls.length).toBe(1);
});
