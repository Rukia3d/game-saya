import React, { useContext } from "react";
import "./Stories.css";

import { CloseButton } from "../UI/CloseButton";

import { GameContext } from "../App";
import { Story, StoryGroup } from "../utils/types";

const StoryPanel = ({
  group,
  loadStory,
}: {
  group: StoryGroup;
  loadStory: (s: Story) => void;
}) => {
  if (group.stories.length !== 3)
    throw new Error("Number of stories in this panel is incorrect");
  const story1 = group.stories[0];
  const story2 = group.stories[1];
  const story3 = group.stories[2];
  return (
    <div className={`StoryGroup_${group.group}`}>
      <div className="Story1" onClick={() => loadStory(story1)}>
        <img
          src={story1.image}
          alt={`story_${story1.id}`}
          className="Story"
          style={{ opacity: story1.state === "closed" ? 0.5 : 1 }}
        />
      </div>
      <div className="Story2" onClick={() => loadStory(story2)}>
        <img
          src={story2.image}
          alt={`story_${story2.id}`}
          className="Story"
          style={{ opacity: story2.state === "closed" ? 0.5 : 1 }}
        />
      </div>
      <div className="Story3" onClick={() => loadStory(story3)}>
        <img
          src={story3.image}
          alt={`story_${story3.id}`}
          className="Story"
          style={{ opacity: story3.state === "closed" ? 0.5 : 1 }}
        />
      </div>
    </div>
  );
};

export const Stories = () => {
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
        {context.adventure.stories.map((s: StoryGroup, i: number) => (
          <StoryPanel group={s} loadStory={loadStory} />
        ))}
      </div>
    </div>
  );
};
