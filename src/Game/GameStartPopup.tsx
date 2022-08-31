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
  if (!context || !context.player || context.arcana == null) {
    throw new Error("No data in context");
  }
  const arcana = context.arcana;
  const energyPrice = context.player.arcanas[arcana].stories[story].energy;

  const startStory = async (i: number) => {
    context.changeArcanaScreen("game");
    setStory(null);
    context.setGame(context.player.arcanas[arcana].stories[i]);
    await axios.post(`/api/players/${context.player.id}/startLevel`, {
      arcana: arcana,
      mode: context.player.arcanas[arcana].stories[i].mode,
      level: story,
    });
    await context.mutate();
  };

  const cancelStory = () => {
    setStory(null);
    context.changeArcanaScreen("gameLevels");
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
