import React, { useState } from "react";
import { generateReward } from "../utils/gamelogic";
import { Enemy, Resource } from "../utils/types";
import "./FightResult.css";

const ResourceChest = ({ resource }: { resource: Resource[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="ResourceChest">
      <div onClick={() => setOpen(true)}>
        {open ? <h1>I am open chest</h1> : <h1>I am chest</h1>}
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
  console.log("You get rewards:");
  rewards.map((r: Resource) => console.log(r.name));
  return (
    <div className="FightResult">
      <p>You {result}</p>
      {result === "Won" ? <ResourceChest resource={rewards} /> : <LifeLost />}
      <button onClick={() => finishFight(rewards)}>exit</button>
    </div>
  );
};
