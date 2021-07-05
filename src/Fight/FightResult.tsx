import React, { useState } from "react";
import { generateReward } from "../utils/gamelogic";
import { Enemy, Resource } from "../utils/types";
import { Chest } from "./Chest";
import "./FightResult.css";

const Rewards = ({ resource }: { resource: Resource[] }) => {
  return (
    <div aria-label="rewards_list">
      <h2>Your prize</h2>
    </div>
  );
};

const ResourceChest = ({ resource }: { resource: Resource[] }) => {
  const [open, setOpen] = useState(false);
  const delayOpening = () => {
    console.log("opening");
    setTimeout(() => setOpen(true), 1000);
  };
  return (
    <div className="ResourceChest">
      <div onClick={delayOpening}>
        {!open ? <Chest /> : <Rewards resource={resource} />}
      </div>
    </div>
  );
};

const LifeLost = () => {
  return (
    <div className="LifeLost">
      <h1>I am Life lost animation</h1>
    </div>
  );
};
export const FightResult = ({
  enemy,
  result,
  finishFight,
}: {
  enemy: Enemy;
  result: String;
  finishFight: (r: Resource[]) => void;
}) => {
  const rewards = generateReward(enemy);
  return (
    <div className="FightResult">
      <p>You {result}</p>
      {result === "Won" ? <ResourceChest resource={rewards} /> : <LifeLost />}
      <button onClick={() => finishFight(rewards)}>exit</button>
    </div>
  );
};
