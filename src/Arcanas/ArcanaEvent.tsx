import { useContext } from "react";
import { GameContext } from "../App";

import "./Arcanas.scss";

export const ArcanaEvent = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.arcana === null) {
    throw new Error("No data in context");
  }

  return (
    <div className="Event">
      <div
        className="EventType"
        onClick={() => context.changeArcanaScreen("gameLevels")}
      >
        {context.player.arcanas[context.arcana].characterName} Main Quest
      </div>
      <div
        className="EventType"
        onClick={() => context.changeArcanaScreen("endlessLevels")}
      >
        Endless Events
      </div>
    </div>
  );
};
