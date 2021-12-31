import React from "react";
import "./Fight.scss";
// Types
import { IResource } from "../utils/types";
// Utils
// Components

const Rewards = ({ resource }: { resource: IResource[] }) => {
  return (
    <div aria-label="rewards_list">
      <h2>Your prize</h2>
      <div>{resource.map((r: IResource) => r.name + " ")}</div>
    </div>
  );
};

const ResourceChest = ({
  resource,
  finishFight,
}: {
  resource: IResource[];
  finishFight: () => void;
}) => {
  return (
    <div className="ResourceChest">
      <Rewards resource={resource} />
      <button data-testid="exit_fight" onClick={finishFight}>
        exit
      </button>
    </div>
  );
};

const LifeLost = ({ finishFight }: { finishFight: () => void }) => {
  return (
    <div className="LifeLost">
      <h1>I am Life lost animation</h1>
      <button data-testid="exit_fight" onClick={finishFight}>
        exit
      </button>
    </div>
  );
};
export const FightResult = ({
  rewards,
  result,
  finishFight,
}: {
  rewards: IResource[] | null;
  result: string;
  finishFight: () => void;
}) => {
  return (
    <div className={`FightResult ${result === "Won" ? `gold` : `silver`}`}>
      <p>You {result}</p>
      {result === "Won" && rewards ? (
        <ResourceChest resource={rewards} finishFight={finishFight} />
      ) : (
        <LifeLost finishFight={finishFight} />
      )}
    </div>
  );
};
