import { useContext } from "react";
import { IGoal, IInventoryQuant } from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { CloseButton } from "./PopUp";
import { TopMenu } from "./TopMenu";

const Goal = ({ goal }: { goal: IGoal }) => {
  return (
    <div className="Goal">
      <h4>{goal.title}</h4>
      <div className="GoalItem">
        <div className="GoalDescription">
          <div>{goal.description}</div>
          <div className="GoalRewards">
            {goal.reward.map((m: IInventoryQuant, n: number) => (
              <span key={n}>
                {m.name}: {m.quantity}
              </span>
            ))}
          </div>
        </div>
        <div className="GoalActions">
          <div>
            {goal.condition.current} out of {goal.condition.goal}
          </div>
          <div>
            {goal.state === "claimable" && goal.claimId ? (
              <button>Claim</button>
            ) : (
              <button>Skip</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Goals = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const goals = context.player.goals;
  return (
    <div className="GoalsContainer" data-testid="goals-screen">
      <TopMenu />
      <h3>Goals</h3>
      <CloseButton close={() => context.setScreen({ screen: "main" })} />
      <div className="Goals" data-testid="goals-list">
        {goals.map((i: IGoal, n: number) => (
          <Goal goal={i} key={n} />
        ))}
      </div>
    </div>
  );
};
