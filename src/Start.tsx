import React from "react";
import { GameState } from "./App";
import "./Start.css";

export const Start = ({
  gameState,
  setShowStart,
}: {
  gameState: GameState;
  setShowStart: (b: boolean) => void;
}) => {
  const startGame = () => {
    if (gameState.player) {
      setShowStart(false);
    }
    // if no progres exisits show opening
  };
  return (
    <div className="Start">
      <h1>Start</h1>
      <button className="PlayButton" onClick={startGame}>
        PLAY
      </button>
    </div>
  );
};
