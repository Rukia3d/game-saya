import React, { useContext } from "react";
import "./Fight.scss";
import { GameContext, GameContextType } from "../App";
// Types
// Utils
import { finishFight } from "../utils/gamelogic";
import { GameState, IStory, Player } from "../utils/types";
// Components

export const FightLost = () => {
  const context: GameContextType | undefined = useContext(GameContext);
  if (
    !context ||
    !context.story ||
    !context.gameState?.player ||
    context.setGameState
  ) {
    throw new Error("No data in context");
  }
  const gameState: GameState = context.gameState;
  const story: IStory = context.story;
  if (!gameState || !story) throw new Error("Can't update the fight results");

  const backToStories = async () => {
    const res: Player = await finishFight(gameState, story, "Lost");
    context.setGameState({
      ...gameState,
      player: res,
    });
  };
  context.setStory(null);
  return (
    <div className="FightLost">
      <h1>I am Life lost animation</h1>
      <button data-testid="exit_fight" onClick={backToStories}>
        exit
      </button>
    </div>
  );
};
