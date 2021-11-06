import React, { useContext } from "react";
import { GameContext } from "../App";
import "./Start.css";
// Types
// Utils
// Components
export const Start = ({
  setShowStart,
}: {
  setShowStart: (b: boolean) => void;
}) => {
  const context = useContext(GameContext);
  return (
    <div className="Start">
      <h1>Start</h1>
      {context?.gameState?.player ? (
        <button className="PlayButton" onClick={() => setShowStart(false)}>
          PLAY
        </button>
      ) : null}
    </div>
  );
};
