import React, { useContext, useEffect, useState } from "react";
import "./Stories.css";

import { CloseButton } from "../UI/CloseButton";

import { GameContext } from "../App";
import { Story, StoryGroup } from "../utils/types";
import { ScrollButton } from "../UI/ScrollButton";
import { findDialogue, findLastOpenStory } from "../utils/helpers";
export const STORIES_PER_PANEL = 3;

export const StoryPanel = ({
  group,
  loadStory,
}: {
  group: StoryGroup;
  loadStory: (s: Story) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }

  const activateStory = (s: Story) => {
    loadStory(s);
  };

  if (group.stories.length !== STORIES_PER_PANEL)
    throw new Error("Number of stories in this panel is incorrect");
  return (
    <div className={`StoryGroup_${group.group}`}>
      {group.stories.map((s: Story, i: number) => (
        <div
          className={`Story${i + 1}`}
          onClick={() => activateStory(s)}
          key={i}
        >
          <img
            src={`../img/Stories/${s.image}.jpg`}
            alt={`story_${s.id}`}
            className="Story"
            style={{ opacity: s.open ? 1 : 0.3 }}
          />
        </div>
      ))}
    </div>
  );
};

export const Stories = () => {
  const context = useContext(GameContext);
  const STORIESPERPAGE = 3;

  if (!context || !context.gameState || !context.adventure) {
    throw new Error("No data in context");
  }

  const startingPage = context.adventure.stories
    ? Math.floor(findLastOpenStory(context.adventure.stories) / STORIESPERPAGE)
    : 0;
  const [page, setPage] = useState(startingPage);
  if (!context.adventure.stories) {
    return <div>No stories</div>;
  }

  const loadStory = (s: Story) => {
    if (!s.open) return;
    if (s.type === "dialogue" && context.gameState?.dialogues) {
      context.setDialogue({
        ...findDialogue(context.gameState?.dialogues, s.id),
        action: s.action,
      });
    } else {
      context.setStory(s);
    }
  };

  const groups = context.adventure.stories.slice(
    page * STORIESPERPAGE,
    page * STORIESPERPAGE + STORIESPERPAGE
  );
  const numberOfPages = Math.ceil(
    context.adventure.stories.length / STORIESPERPAGE
  );
  console.log(
    "game state STORIES",
    //@ts-ignore
    JSON.parse(JSON.stringify(context.gameState?.adventures[0].stories[0]))
  );
  return (
    <div className="Stories" aria-label="story_background">
      <CloseButton onClick={context.backToMain} />
      <h2>{context.adventure.name}</h2>
      <div className="StoriesList" aria-label="stories_list">
        {page !== 0 ? (
          <ScrollButton onClick={() => setPage(page - 1)} direction="l" />
        ) : null}
        {groups.map((s: StoryGroup, i: number) => (
          <StoryPanel group={s} loadStory={loadStory} key={i} />
        ))}
        {page < numberOfPages - 1 ? (
          <ScrollButton onClick={() => setPage(page + 1)} direction="r" />
        ) : null}
      </div>
    </div>
  );
};
