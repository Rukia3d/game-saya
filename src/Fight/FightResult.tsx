import React, { useContext } from "react";
import "./Fight.scss";
// Types
import { IEnemy, IResource } from "../utils/types";
import { GameContext } from "../App";
import { displayAddedHero, displayAddedUpdate } from "../utils/screenLogic";
import { isValidAction } from "../utils/helpers";
import { finishFight, finishStory } from "../utils/gamelogic";
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

const ResourceChest = ({
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
  isValidAction(story.action);

  const backToStories = () => {
    displayAddedHero(
      gameState.player.heroes,
      gameState.heroes,
      story.action,
      context.setAdditionScreen
    );
    displayAddedUpdate(
      gameState.player.spellUpdates,
      gameState.spellUpdates,
      story.action,
      context.setAdditionScreen
    );

    context.setGameState({
      ...gameState,
      player: finishFight(gameState, story, "Won", enemy, rewards),
    });
    context.setStory(null);
  };
  return (
    <div className="ResourceChest">
      <Rewards rewards={rewards} />
      <button data-testid="exit_fight" onClick={backToStories}>
        exit
      </button>
    </div>
  );
};

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
