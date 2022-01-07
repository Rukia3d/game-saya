import React, { useContext } from "react";
import "./Fight.scss";
import { GameContext } from "../App";
// Types
import { IEnemy, IResource } from "../utils/types";
// Utils
import { finishFight } from "../utils/gamelogic";
// Components
import { ResourceChest } from "./ResourceChest";

const LifeLost = () => {
  const context = useContext(GameContext);
  if (!context || !context.story || !context.gameState?.player) {
    throw new Error("No data in context");
  }
  const gameState = context.gameState;
  const story = context.story;
  if (!gameState || !story) throw new Error("Can't update the fight results");
  const backToStories = () => {
    context.setGameState({
      ...gameState,
      player: finishFight(gameState, story, "Lost"),
    });
    context.setStory(null);
  };
  return (
    <div className="LifeLost">
      <h1>I am Life lost animation</h1>
      <button data-testid="exit_fight" onClick={backToStories}>
        exit
      </button>
    </div>
  );
};

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
        <ResourceChest rewards={rewards} enemy={enemy} />
      ) : (
        <LifeLost />
      )}
    </div>
  );
};
