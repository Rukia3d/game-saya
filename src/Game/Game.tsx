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

export const GameEndful = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    context.arcana === null ||
    context.game === null
  ) {
    throw new Error("No data in context");
  }
  const winStory = async () => {
    if (context.game) {
      console.log("winStory", context.player.id, context.game.id);
      await axios.post(`/api/players/${context.player.id}/winLevel`, {
        arcana: context.arcana,
        mode: context.game.mode,
        level: context.game.id,
      });
      context.setGame(null);
      context.changeArcanaScreen("gameLevels");
      context.mutate();
    } else throw new Error("Trying to win a story with no game in context");
  };

  return (
    <div>
      <button onClick={winStory}>Win me</button>
      <button onClick={() => context.setGame(null)}>Lose me</button>
    </div>
  );
};

export const GameEndless = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    context.arcana === null ||
    context.game === null
  ) {
    throw new Error("No data in context");
  }
  const passCheckpoint = async (n: number) => {
    console.log("passCheckpoint");
  };

  const looseCheckpoint = async (n: number) => {
    console.log("looseCheckpoint");
    context.changeArcanaScreen("endlessLevels");
    context.setGame(null);
  };
  return (
    <div>
      <br />
      <button onClick={() => passCheckpoint(0)}>Pass checkpoint 0</button>
      <button onClick={() => looseCheckpoint(0)}>Fail after 0</button>
      <button onClick={() => passCheckpoint(1)}>Pass checkpoint 1</button>
      <button onClick={() => looseCheckpoint(1)}>Fail after 1</button>
      <button onClick={() => passCheckpoint(2)}>Pass checkpoint 2</button>
      <button onClick={() => looseCheckpoint(3)}>Fail after 2</button>
    </div>
  );
};

export const Game = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    context.arcana === null ||
    context.game === null
  ) {
    throw new Error("No data in context");
  }

  return (
    <div className="Game">
      <CloseButton onClick={() => context.setGame(null)} />
      {context.game.mode === "story" ? <GameEndful /> : <GameEndless />}
    </div>
  );
};
