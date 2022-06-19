import { useContext } from "react";
import { GameContext } from "../App";

import "./Elements.scss";

export const ElementEvent = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.element === null) {
    throw new Error("No data in context");
  }

  return (
    <div className="Event">
      <div
        className="EventType"
        onClick={() => context.changeElementScreen("gameLevels")}
      >
        {context.player.elements[context.element].characterName} Main Quest
      </div>
      <div
        className="EventType"
        onClick={() => context.changeElementScreen("endlessLevels")}
      >
        Endless Events
      </div>
    </div>
  );
};
