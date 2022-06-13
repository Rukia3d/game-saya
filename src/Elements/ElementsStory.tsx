import { useContext } from "react";
import "./Elements.scss";

import { GameContext } from "../Main";

export const ElementStory = ({
  setPopup,
  setSpells,
  setGameSelect,
}: {
  setPopup: (s: boolean) => void;
  setSpells: (s: boolean) => void;
  setGameSelect: (s: boolean) => void;
}) => {
  const context = useContext(GameContext);
  console.log("context.element", context?.element);
  if (
    !context ||
    !context.player ||
    !context.changeScreen ||
    context.element === null
  ) {
    throw new Error("No data in context");
  }

  return (
    <div className="Static">
      <div className="Info" onClick={() => setGameSelect(true)}>
        {context.player.elements[context.element].characterName} Main Quest
      </div>
      <div className="Info" onClick={() => setPopup(true)}>{`${
        context.player.elements[context.element].characterName
      } story`}</div>
      <div className="Info" onClick={() => setSpells(true)}>{`${
        context.player.elements[context.element].characterName
      } spells`}</div>
    </div>
  );
};
