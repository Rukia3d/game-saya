import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../App";
import { STORIES_PER_PANEL } from "./Stories";
import "./Stories.css";
// Types
import {
  herosSelectionError,
  IHero,
  IStory,
  IStoryGroup,
} from "../utils/types";
// Utils
import {
  checkFightCharactersIds,
  filterActiveCharacrers,
  findFight,
} from "../utils/helpers";
import { InfoCard } from "../UI/InfoCard";
// Components

const FightIcons = ({ characters }: { characters: string[] }) => {
  return (
    <div className="FightIcons" aria-label="fight-icons">
      {characters.map((c: string, i: number) => (
        <div key={i}>
          <img
            src={`../img/Heroes/${c.replace(/\s/g, "")}_icon.png`}
            alt={`fight-icon-${c.replace(/\s/g, "")}`}
          />
        </div>
      ))}
    </div>
  );
};

const Story = ({
  index,
  story,
  setSelectionError,
}: {
  index: number;
  story: IStory;
  setSelectionError: (s: herosSelectionError) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.setStory) {
    throw new Error("No data in context");
  }
  const fight =
    story.type === "fight"
      ? findFight(context.gameState.fights, story.id)
      : null;

  const setStory = (story: IStory) => {
    let error;
    if (!story.open) {
      console.warn(`The story ${story.id} is not open yet`);
      return;
    }
    if (fight && context.gameState) {
      const activeCharactersNames: string[] = filterActiveCharacrers(
        context.gameState.player.heroes
      ).map((c: IHero) => {
        return c.id;
      });
      error = checkFightCharactersIds(fight.characters, activeCharactersNames);
      setSelectionError(error);
      return;
    }
    context.setStory(story);
  };

  return (
    <div className={`Story${index + 1}`} onClick={() => setStory(story)}>
      <img
        src={`../img/Stories/${story.image}.jpg`}
        alt={`story_${story.id}`}
        className="Story"
        style={{ opacity: story.open ? 1 : 0.3 }}
      />
      {fight ? <FightIcons characters={fight.characters} /> : null}
    </div>
  );
};

export const StoryPanel = ({
  group,
  setSelectionError,
}: {
  group: IStoryGroup;
  setSelectionError: (s: herosSelectionError) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.setStory) {
    throw new Error("No data in context");
  }

  if (group.stories.length !== STORIES_PER_PANEL)
    throw new Error(`Number of stories in panel ${group.id} is incorrect`);
  return (
    <div className={`StoryGroup_${group.group}`}>
      {group.stories.map((s: IStory, i: number) => (
        <Story
          story={s}
          index={i}
          key={i}
          setSelectionError={setSelectionError}
        />
      ))}
    </div>
  );
};
