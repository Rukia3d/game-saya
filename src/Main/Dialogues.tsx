import React, { useContext } from "react";
import { GameContext } from "../App";
import { CloseButton } from "../UI/CloseButton";
import "./Dialogues.css";

export const Dialogues = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.gameState.dialogues ||
    !context.setDialogue
  ) {
    throw new Error("No data");
  }
  return (
    <div className="Dialogues" aria-label="dialogue_background">
      <CloseButton onClick={context.backToStory} />
      <h2>Dialogues</h2>
    </div>
  );
};
