import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import "./Stories.css";
// Types
import { herosSelectionError, IStoryGroup } from "../utils/types";
// Utils
import { findLastOpenStory } from "../utils/helpers";
// Components
import { CloseButton } from "../UI/CloseButton";
import { ScrollButton } from "../UI/ScrollButton";
import { StoryPanel } from "./StoryPanel";
import { StoryHeroes } from "./StoryHeroes";

export const STORIES_PER_PANEL = 3;
const STORIESPERPAGE = 3;

const StoriesContent = ({ startingPage }: { startingPage: number }) => {
  const context = useContext(GameContext);
  const [page, setPage] = useState(startingPage);
  const [selectionError, setSelectionError] =
    useState<herosSelectionError>(null);
  if (!context || !context.gameState || !context.adventure) {
    throw new Error("No data in context");
  }
  if (!context.adventure.storyGroups) {
    return <div>No stories</div>;
  }
  const groups = context.adventure.storyGroups.slice(
    page * STORIESPERPAGE,
    page * STORIESPERPAGE + STORIESPERPAGE
  );
  const numberOfPages = Math.ceil(
    context.adventure.storyGroups.length / STORIESPERPAGE
  );
  if (selectionError) {
    return (
      <StoryHeroes
        error={selectionError}
        setSelectionError={setSelectionError}
      />
    );
  } else {
    return (
      <div className="StoriesList" aria-label="stories_list">
        {page !== 0 ? (
          <ScrollButton onClick={() => setPage(page - 1)} direction="l" />
        ) : null}
        {groups.map((s: IStoryGroup, i: number) => (
          <StoryPanel group={s} key={i} setSelectionError={setSelectionError} />
        ))}
        {page < numberOfPages - 1 ? (
          <ScrollButton onClick={() => setPage(page + 1)} direction="r" />
        ) : null}
      </div>
    );
  }
};

export const Stories = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.adventure) {
    throw new Error("No data in context");
  }
  const startingPage = context.adventure.storyGroups
    ? Math.floor(
        findLastOpenStory(context.adventure.storyGroups) / STORIESPERPAGE
      )
    : 0;
  // console.log(
  //   "game state STORIES",
  //   //@ts-ignore
  //   JSON.parse(JSON.stringify(context.gameState?.adventures[0].stories[0]))
  // );

  return (
    <div className="Stories" aria-label="story_background">
      <CloseButton onClick={context.backToMain} />
      <h2>{context.adventure.name}</h2>
      <StoriesContent startingPage={startingPage} />
    </div>
  );
};
