import React from "react";
import { render, screen } from "@testing-library/react";
import { FightResult } from "../Fight/FightResult";
import { gameState } from "../utils/testobjects";
import { IResource } from "../utils/types";
import userEvent from "@testing-library/user-event";

test("Renders FightResult screen for Win", async () => {
  const finishFight = jest.fn();
  const playerResources = gameState.resources.map((r: IResource) => {
    return { ...r, quantity: 1 };
  });
  render(
    <FightResult
      finishFight={finishFight}
      result={"Won"}
      rewards={playerResources}
    />
  );
  expect(screen.getByText(/You Won/)).toBeInTheDocument();
  expect(screen.getByText(/Your prize/)).toBeInTheDocument();
  expect(screen.getByText(/Sparks/)).toBeInTheDocument();
  expect(screen.getByText(/Lava Rock/)).toBeInTheDocument();
  userEvent.click(screen.getByText("exit"));
  expect(finishFight.mock.calls.length).toBe(1);
});

test("Renders FightResult screen for Lost", async () => {
  const finishFight = jest.fn();
  const playerResources = gameState.resources.map((r: IResource) => {
    return { ...r, quantity: 1 };
  });
  render(
    <FightResult
      finishFight={finishFight}
      result={"Lost"}
      rewards={playerResources}
    />
  );
  expect(screen.getByText(/You Lost/)).toBeInTheDocument();
  expect(screen.getByText(/Life lost/)).toBeInTheDocument();
  expect(screen.queryByText(/Your prize/)).not.toBeInTheDocument();
  userEvent.click(screen.getByText("exit"));
  expect(finishFight.mock.calls.length).toBe(1);
});
