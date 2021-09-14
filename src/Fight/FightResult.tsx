import React from "react";
import { Resource } from "../utils/types";
import "./FightResult.css";

const Rewards = ({ resource }: { resource: Resource[] }) => {
  return (
    <div aria-label="rewards_list">
      <h2>Your prize</h2>
      <div>{resource.map((r: Resource) => r.name + " ")}</div>
    </div>
  );
};

const ResourceChest = ({
  resource,
  finishFight,
}: {
  resource: Resource[];
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
  rewards: Resource[] | null;
  result: String;
  finishFight: () => void;
}) => {
  return (
    <div className="FightResult">
      <p>You {result}</p>
      {result === "Won" && rewards ? (
        <ResourceChest resource={rewards} finishFight={finishFight} />
      ) : (
        <LifeLost finishFight={finishFight} />
      )}
    </div>
  );
};
