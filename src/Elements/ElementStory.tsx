import { useContext } from "react";
import { GameContext } from "../App";
import "./Elements.scss";

export const ElementStory = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.element === null) {
    throw new Error("No data in context");
  }

  return (
    <div className="Static">
      <div
        className="Info"
        onClick={() => context.changeElementScreen("legend")}
      >{`${context.player.elements[context.element].characterName} story`}</div>
      <div
        className="Info"
        onClick={() => context.changeElementScreen("spells")}
      >{`${
        context.player.elements[context.element].characterName
      } spells`}</div>
    </div>
  );
};
