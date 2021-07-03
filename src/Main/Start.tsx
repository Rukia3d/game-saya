import React from "react";
import "./Start.css";

import { GameState } from "../utils/types";

export const Start = ({
  gameState,
  setShowStart,
  inactive = false,
}: {
  gameState: GameState;
  setShowStart: (b: boolean) => void;
  inactive?: boolean;
}) => {
  const startGame = () => {
    if (gameState && gameState.player) {
      setShowStart(false);
    }
    // if no progres exisits show opening
  };
  return (
    <div className="Start">
      <h1>Start</h1>
      {!inactive ? (
        <button className="PlayButton" onClick={startGame}>
          PLAY
        </button>
      ) : null}
    </div>
  );
};
