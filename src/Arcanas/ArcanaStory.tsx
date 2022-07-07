import { useContext } from "react";
import { GameContext } from "../App";
import "./Arcanas.scss";

export const ArcanaStory = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.arcana === null) {
    throw new Error("No data in context");
  }

  return (
    <div className="Static">
      <div
        className="Info"
        onClick={() => context.changeArcanaScreen("legend")}
      >{`${context.player.arcanas[context.arcana].characterName} story`}</div>
      <div
        className="Info"
        onClick={() => context.changeArcanaScreen("spells")}
      >{`${context.player.arcanas[context.arcana].characterName} spells`}</div>
    </div>
  );
};
