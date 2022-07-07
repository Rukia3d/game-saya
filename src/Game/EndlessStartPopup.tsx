import axios from "axios";
import { useContext } from "react";
import { GameContext } from "../App";
import "./Game.scss";

export const EndlessStartPopup = ({
  mode,
  setMode,
}: {
  mode: number;
  setMode: (n: number | null) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.arcana == null) {
    throw new Error("No data in context");
  }
  const arcana = context.arcana;
  const currentMode = context.player.arcanas[arcana].currentEvents[mode];

  const startEndless = async (i: number | null) => {
    console.log("startEndless");
    context.changeArcanaScreen("game");
    setMode(null);
    if (i !== null) {
      context.setGame(context.player.arcanas[arcana].currentEvents[i]);
      await axios.post(`/api/players/${context.player.id}/startEndless`, {
        arcana: arcana,
        mode: context.player.arcanas[arcana].currentEvents[i].mode,
      });
      context.mutate();
    }
  };

  const cancelEndless = () => {
    setMode(null);
    context.changeArcanaScreen("endlessLevels");
  };

  if (context.player.energy - currentMode.energy < 0) {
    return (
      <div className="GameStartPopup">
        NOT ENOUGH ENERGY
        <br />
        <button onClick={cancelEndless}>Got it</button>
      </div>
    );
  }

  return (
    <div className="GameStartPopup">
      You are playing a mode {currentMode.mode}
      <br />
      <button onClick={() => startEndless(mode)}>Yes play</button>
      <button onClick={cancelEndless}>No, dont</button>
    </div>
  );
};
