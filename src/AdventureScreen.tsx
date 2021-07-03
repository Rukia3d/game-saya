import React from "react";
import { Adventure, CloseButton, Story } from "./App";
import "./AdventureScreen.css";
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
    if (s.type === "dialogue") {
      console.log("Loading dialogue");
    } else {
      console.log("Loading fight");
      setStory(s);
    }
  };
  return (
    <div className="Stories">
      <CloseButton onClick={clearScreen} />
      <h2>{adventure.name}</h2>
      <div className="StoriesList">
        {adventure.stories.map((s: Story, i: number) => (
          <div key={i} onClick={() => loadStory(s)}>
            <img
              src={s.image}
              alt="story"
              className="Story"
              style={{ opacity: s.state === "closed" ? 0.5 : 1 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
