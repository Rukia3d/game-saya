import { useContext } from "react";
import { GameContext } from "../App";

import "./Elements.scss";

export const ElementEvent = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.element === null) {
    throw new Error("No data in context");
  }
  const tournament = context.player.elements[context.element].currentTournament;
  const tower = context.player.elements[context.element].currentTower;
  return (
    <div className="Event">
      <div className="EventType" onClick={() => context.setGame(tournament)}>
        Tournament Lv{tournament.id}
      </div>
      <div className="EventType" onClick={() => context.setGame(tower)}>
        Tower Lv{tower.id}
      </div>
    </div>
  );
};
