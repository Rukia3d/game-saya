import React, { useContext } from "react";
import "./Fight.scss";
import { GameContext } from "../App";
// Types
// Utils
import { finishFight } from "../utils/gamelogic";
// Components

export const FightLost = () => {
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
    <div className="FightLost">
      <h1>I am Life lost animation</h1>
      <button data-testid="exit_fight" onClick={backToStories}>
        exit
      </button>
    </div>
  );
};
