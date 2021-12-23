import React, { useContext, useState } from "react";
import { GameContext } from "../App";
// Types
// Utils
// Components
import { Dialogue } from "../Dialogues/Dialogue";
import { Fight } from "../Fight/Fight";
import { findDialogue } from "../utils/helpers";
import { IDialogue } from "../utils/types";
import { Reel } from "./Reel";

export const GenericStory = () => {
  const context = useContext(GameContext);

  if (!context || !context.story || !context.gameState) {
    throw new Error("No data in context");
  }
  const [dialogue, setDialogue] = useState<IDialogue | null>(
    findDialogue(context.gameState.dialogues, context.story.id)
  );

  const story = context.story;

  if (story.type === "fight") {
    return <Fight />;
  }
  if (story.type === "dialogue" && dialogue) {
    return <Dialogue dialogue={dialogue} setDialogue={setDialogue} />;
  }
  return <Reel />;
};
