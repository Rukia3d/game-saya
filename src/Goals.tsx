import { useContext } from "react";
import { IGoal } from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";

const Goal = ({ goal }: { goal: IGoal }) => {
  const classStyle = () => {
    let newStyle = "";
    if (goal.state === "new") newStyle = "NewGoal";
    if (goal.state === "started") newStyle = "StartedGoal";
    if (goal.state === "claimable") newStyle = "ClimableGoal";
    return `Goal ${newStyle}`;
  };

  return (
    <div className={classStyle()}>
      <h3>{goal.title}</h3>
    </div>
  );
};

export const Goals = ({
  arcana,
  setArcana,
  setScreen,
}: {
  arcana: number | null;
  setArcana: (n: number | null) => void;
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const goals = context.player.goals;

  const moveToGoal = () => {};

  return (
    <div className="Goals">
      <TopMenu />
      <PopUp close={() => setScreen("menus")}>
        <div className="GoalsList">
          {goals.map((g: IGoal, n: number) => (
            <Goal goal={g} key={n} />
          ))}
        </div>
      </PopUp>
    </div>
  );
};
