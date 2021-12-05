import React, { useContext } from "react";
import { GameContext } from "../App";
import "./Start.scss";
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
      <img
        className="StartBackground"
        src="../img/start_background.png"
        alt="intro_background"
      />
      {context?.gameState?.player ? (
        <button className="PlayButton" onClick={() => setShowStart(false)}>
          PLAY
        </button>
      ) : null}
    </div>
  );
};
