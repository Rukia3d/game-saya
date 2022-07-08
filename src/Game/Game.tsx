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
      context.changeArcanaScreen("gameLevels");
      await context.mutate();
      context.setWin(true);
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
    if (context.game) {
      console.log("passCheckpoint", context.player.id, context.game.id);
      await axios.post(`/api/players/${context.player.id}/passCheckpoint`, {
        arcana: context.arcana,
        mode: context.game.mode,
        checkpoint: n,
      });
      context.mutate();
    } else throw new Error("Trying to pass checkpoint with no game in context");
  };

  const missCheckpoint = async () => {
    if (context.game) {
      console.log("missCheckpoint", context.player.id, context.game.id);
      await axios.post(`/api/players/${context.player.id}/missCheckpoint`, {
        arcana: context.arcana,
        mode: context.game.mode,
      });
      context.changeArcanaScreen("endlessLevels");
      await context.mutate();
      console.log("context.player.currentState", context.player.currentState);
      context.setWin(true);
    } else throw new Error("Trying to miss checkpoint with no game in context");
  };
  return (
    <div>
      <br />
      <button onClick={missCheckpoint}>Fail</button>
      <button onClick={() => passCheckpoint(0)}>Pass checkpoint 0</button>
      <button onClick={() => passCheckpoint(1)}>Pass checkpoint 1</button>
      <button onClick={() => passCheckpoint(2)}>Pass checkpoint 2</button>
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

  // const closeGame = () => {
  //   if (context.game && context.game.mode === "story") {
  //     context.changeArcanaScreen("gameLevels");
  //   }
  //   if (
  //     context.game &&
  //     (context.game.mode === "tournament" || context.game.mode === "tower")
  //   ) {
  //     context.changeArcanaScreen("endlessLevels");
  //   }
  //   context.setGame(null);
  // };

  return (
    <div className="Game">
      {context.game.mode === "story" ? <GameEndful /> : <GameEndless />}
    </div>
  );
};
