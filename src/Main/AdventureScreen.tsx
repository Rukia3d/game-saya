import React from "react";
import "./AdventureScreen.css";

import { CloseButton } from "../UI/CloseButton";

import { Adventure, Story } from "../utils/types";

export const AdventureScreen = ({
  adventure,
  clearScreen,
  setStory,
}: {
  adventure: Adventure;
  clearScreen: () => void;
  setStory: (s: Story) => void;
}) => {
  const loadStory = (s: Story) => {
    if (s.state === "closed") return;
    if (s.type === "dialogue") {
      console.log("Loading dialogue");
    } else {
      console.log("Loading fight");
      setStory(s);
    }
  };
  if (!adventure.stories) {
    return <div>No stories</div>;
  }
  return (
    <div className="Stories">
      <CloseButton onClick={clearScreen} />
      <h2>{adventure.name}</h2>
      <div className="StoriesList">
        {adventure.stories.map((s: Story, i: number) => (
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
