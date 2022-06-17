import axios from "axios";
import { useContext } from "react";
import { GameContext } from "../App";
import { CloseButton } from "../UIElements/UIButtons";

import "./Game.scss";

export const GameRun = () => {
  return <div className="Run"></div>;
};

export const GameFight = () => {
  return <div className="Fight"></div>;
};

export const Game = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    context.element === null ||
    context.game === null
  ) {
    throw new Error("No data in context");
  }

  const winStory = async () => {
    if (context.game) {
      console.log("winStory");
      await axios.post(`/api/players/${context.player.id}/winLevel`, {
        element: context.element,
        mode: "story",
        level: context.game.id,
      });
      context.setGame(null);
      context.changeElementScreen("gameLevels");
      context.mutate();
    } else throw new Error("Trying to win a story with no game in context");
  };

  const loseStory = () => {
    console.log("loseStory");
    context.setGame(null);
    context.changeElementScreen("gameLevels");
  };
  return (
    <div className="Game">
      <CloseButton onClick={loseStory} />
      <br />
      <button onClick={winStory}>Win me</button>
      <button onClick={loseStory}>Lose me</button>
    </div>
  );
};