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
  if (!context || !context.player || context.element == null) {
    throw new Error("No data in context");
  }
  const element = context.element;
  const currentMode = context.player.elements[element].currentEvents[mode];

  const startStory = async (i: number | null) => {
    console.log("startStory");
    context.changeElementScreen("game");
    setMode(null);
    if (i !== null) {
      context.setGame(context.player.elements[element].currentEvents[i]);
      await axios.post(`/api/players/${context.player.id}/startLevel`, {
        element: element,
        mode: currentMode.type,
        level: i,
      });
      context.mutate();
    }
  };

  const cancelStory = () => {
    setMode(null);
    context.changeElementScreen("endlessLevels");
  };

  if (context.player.energy - currentMode.energy < 0) {
    return (
      <div className="GameStartPopup">
        NOT ENOUGH ENERGY
        <br />
        <button onClick={cancelStory}>Got it</button>
      </div>
    );
  }

  return (
    <div className="GameStartPopup">
      You are playing a mode {currentMode.type}
      <br />
      <button onClick={() => startStory(mode)}>Yes play</button>
      <button onClick={cancelStory}>No, dont</button>
    </div>
  );
};
