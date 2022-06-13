import { useContext } from "react";
import { IStory, IEvent } from "../../api/engine/types";
import { GameContext } from "../Main";
import "./Elements.scss";

export const ElementEvent = ({
  setGame,
}: {
  setGame: (s: IStory | IEvent | null) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.element === null) {
    throw new Error("No data in context");
  }
  const tournament = context.player.elements[context.element].currentTournament;
  const tower = context.player.elements[context.element].currentTower;
  return (
    <div className="Event">
      <div className="EventType" onClick={() => setGame(tournament)}>
        Tournament Lv{tournament.id}
      </div>
      <div className="EventType" onClick={() => setGame(tower)}>
        Tower Lv{tower.id}
      </div>
    </div>
  );
};
