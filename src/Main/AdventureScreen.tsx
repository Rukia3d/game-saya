import React, { useContext } from "react";
import "./AdventureScreen.css";

import { CloseButton } from "../UI/CloseButton";

import { GameContext } from "../App";
import { Story } from "../utils/types";

export const AdventureScreen = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.setStory ||
    !context.adventure
  ) {
    throw new Error("No data");
  }

  const loadStory = (s: Story) => {
    if (s.state === "closed") return;
    if (s.type === "dialogue") {
      console.log("Loading dialogue");
    } else {
      console.log("Loading fight");
      context.setStory(s);
    }
  };
  if (!context.adventure.stories) {
    return <div>No stories</div>;
  }
  return (
    <div className="Stories" aria-label="story_background">
      <CloseButton onClick={context.backToMain} />
      <h2>{context.adventure.name}</h2>
      <div className="StoriesList">
        {context.adventure.stories.map((s: Story, i: number) => (
          <div key={i} onClick={() => loadStory(s)}>
            <img
              src={s.image}
              alt={`story_${s.id}`}
              className="Story"
              style={{ opacity: s.state === "closed" ? 0.5 : 1 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
