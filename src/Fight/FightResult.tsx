import React, { useContext } from "react";
import "./Fight.scss";
import { GameContext } from "../App";
// Types
import { IEnemy, IResource } from "../utils/types";
// Utils
import { finishFight } from "../utils/gamelogic";
// Components
import { FightWon } from "./FightWon";
import { FightLost } from "./FightLost";

export const FightResult = ({
  rewards,
  result,
  enemy,
}: {
  rewards: IResource[] | null;
  result: string;
  enemy: IEnemy;
}) => {
  return (
    <div className={`FightResult ${result === "Won" ? `gold` : `silver`}`}>
      <p>You {result}</p>
      {result === "Won" && rewards ? (
        <FightWon rewards={rewards} enemy={enemy} />
      ) : (
        <FightLost />
      )}
    </div>
  );
};
