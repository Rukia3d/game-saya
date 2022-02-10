import React, { useContext } from "react";
import "./Fight.scss";
// Types
import { IEnemy, IResource } from "../utils/types";
import { GameContext } from "../App";
import { displayAddedHero, displayAddedUpdate } from "../utils/screenLogic";
import { isValidAction } from "../utils/helpers";
import { finishFight } from "../utils/gamelogic";
// Utils
// Components

const Rewards = ({ rewards }: { rewards: IResource[] }) => {
  return (
    <div aria-label="rewards_list">
      <h2>Your prize</h2>
      <div>{rewards.map((r: IResource) => r.name + " ")}</div>
    </div>
  );
};

export const FightWon = ({
  rewards,
  enemy,
}: {
  rewards: IResource[];
  enemy: IEnemy;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.story || !context.gameState?.player) {
    throw new Error("No data in context");
  }
  const gameState = context.gameState;
  const story = context.story;
  if (!gameState || !story) throw new Error("Can't update the fight results");
  isValidAction(story.actions);

  const backToStories = () => {
    displayAddedHero(
      gameState.player.heroes,
      gameState.game.heroes,
      story.actions,
      context.setAdditionScreen
    );
    displayAddedUpdate(
      gameState.player.updates,
      gameState.game.updates,
      story.actions,
      context.setAdditionScreen
    );

    context.setGameState({
      ...gameState,
      player: finishFight(gameState, story, "Won", enemy, rewards),
    });
    context.setStory(null);
  };
  return (
    <div className="FightWon">
      <Rewards rewards={rewards} />
      <button data-testid="exit_fight" onClick={backToStories}>
        exit
      </button>
    </div>
  );
};
