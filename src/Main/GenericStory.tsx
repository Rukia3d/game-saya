import React, { useContext } from "react";
import { GameContext } from "../App";
// Types
// Utils
// Components
import { Dialogue } from "../Dialogues/Dialogue";
import { Fight } from "../Fight/Fight";
import { Reel } from "./Reel";

export const GenericStory = () => {
  const context = useContext(GameContext);
  if (!context || !context.story) {
    throw new Error("No data in context");
  }
  const story = context.story;
  switch (story.type) {
    case "fight":
      return <Fight />;
    case "dialogue":
      return <Dialogue />;
    default:
      return <Reel />;
  }
};
