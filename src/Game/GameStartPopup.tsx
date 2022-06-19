import axios from "axios";
import { useContext } from "react";
import { GameContext } from "../App";
import "./Game.scss";

export const GameStartPopup = ({
  story,
  setStory,
}: {
  story: number;
  setStory: (a: number | null) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.element == null) {
    throw new Error("No data in context");
  }
  const element = context.element;
  const energyPrice = context.player.elements[element].stories[story].energy;

  const startStory = async (i: number) => {
    console.log("startStory");
    context.changeElementScreen("game");
    setStory(null);
    context.setGame(context.player.elements[element].stories[story]);
    await axios.post(`/api/players/${context.player.id}/startLevel`, {
      element: element,
      mode: "story",
      level: story,
    });
    context.mutate();
  };

  const cancelStory = () => {
    setStory(null);
    context.changeElementScreen("gameLevels");
  };

  if (context.player.energy - energyPrice < 0) {
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
      Confirm level start
      <br />
      <button onClick={() => startStory(story)}>Yes play</button>
      <button onClick={cancelStory}>No, dont</button>
    </div>
  );
};
