import axios from "axios";
import { useContext } from "react";
import { IArenaEvent } from "../../api/engine/types";
import { GameContext } from "../App";

export const ArenaStartPopup = ({
  setArenaEvent,
  arenaEvent,
}: {
  setArenaEvent: (a: IArenaEvent | null) => void;
  arenaEvent: IArenaEvent;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const startEvent = async () => {
    console.log("Start Event");
    setArenaEvent(null);
    await axios.post(`/api/players/${context.player.id}/arena`, {
      eventMode: arenaEvent.mode,
      eventIndx: arenaEvent.index,
    });
    await context.mutate();
    context.setGame(arenaEvent);
    console.log("context game", context.game);
  };

  return (
    <div className="ArenaStartPopup">
      <h4>Confirm your stake</h4>
      <button onClick={startEvent}>Yes, start</button>
      <button onClick={() => setArenaEvent(null)}>No, cancel</button>
    </div>
  );
};
