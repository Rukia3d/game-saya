import axios from "axios";
import { useContext, useState } from "react";
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
    context.game === null ||
    !("checkpoint" in context.game)
  ) {
    throw new Error("No data in context");
  }
  const [checkpoint, setCheckpoint] = useState(
    context.game.checkpoint !== null ? context.game.checkpoint : -1
  );
  console.log("GameEndless", context.game.checkpoint);

  const passCheckpoint = async (n: number) => {
    console.log("Sending pass checkpoint", n);
    setCheckpoint(n);
    if (context.game) {
      await axios.post(`/api/players/${context.player.id}/passCheckpoint`, {
        arcana: context.arcana,
        mode: context.game.mode,
        checkpoint: n,
      });
      await context.mutate();
    } else throw new Error("Trying to pass checkpoint with no game in context");
  };

  const missCheckpoint = async () => {
    if (context.game) {
      await axios.post(`/api/players/${context.player.id}/missCheckpoint`, {
        arcana: context.arcana,
        mode: context.game.mode,
      });
      context.changeArcanaScreen("endlessLevels");
      await context.mutate();
      if (checkpoint >= 0) {
        context.setWin(true);
      }
    } else throw new Error("Trying to miss checkpoint with no game in context");
  };

  return (
    <div>
      <br />
      Player current level: {context.game.mode}
      <br />
      <button onClick={() => passCheckpoint(checkpoint + 1)}>
        Pass next checkpoint
      </button>
      <button onClick={missCheckpoint}>Fail next checkpoint</button>
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
