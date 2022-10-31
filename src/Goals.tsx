import { useContext } from "react";
import { IGoal } from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { CloseButton } from "./PopUp";

export const Goals = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const goals = context.player.goals;
  return (
    <div className="GoalsContainer" data-testid="goals-screen">
      <h3>Goals</h3>
      <CloseButton close={() => setScreen("main")} />
      <div className="Goals" data-testid="goals-list">
        {goals.map((i: IGoal, n: number) => (
          <button key={n}>{i.title}</button>
        ))}
      </div>
    </div>
  );
};
