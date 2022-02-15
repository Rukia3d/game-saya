import React, { useContext, useState } from "react";
import { GameContext } from "../App";
// Types
// Utils
// Components
import { Dialogue } from "../Dialogues/Dialogue";
import { Fight } from "../Fight/Fight";
import { findDialogue, findReel } from "../utils/helpers";
import { IDialogue, IReel } from "../utils/types";
import { Reel } from "./Reel";

export const GenericStory = () => {
  const context = useContext(GameContext);

  if (!context || !context.story || !context.gameState) {
    throw new Error("No data in context");
  }
  const story = context.story;
  const [dialogue, setDialogue] = useState<IDialogue | null>(
    context.story.type === "dialogue"
      ? findDialogue(context.gameState.game.dialogues, context.story.id)
      : null
  );
  const [reel, setReel] = useState<IReel | null>(
    context.story.type === "reel"
      ? findReel(context.gameState?.game.reels, context.story.id)
      : null
  );

  if (story.type === "fight") {
    return <Fight />;
  }
  if (story.type === "dialogue") {
    if (dialogue) {
      return <Dialogue dialogue={dialogue} setDialogue={setDialogue} />;
    }
  }
  if (story.type === "reel") {
    if (reel) {
      return <Reel reel={reel} setReel={setReel} />;
    }
  }
  throw new Error("Unknown story type");
};
