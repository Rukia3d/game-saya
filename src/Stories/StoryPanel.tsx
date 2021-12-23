import React, { useContext } from "react";
import { GameContext } from "../App";
import { STORIES_PER_PANEL } from "./Stories";
import "./Stories.scss";
// Types
import { herosSelectionError, IStory, IStoryGroup } from "../utils/types";
// Utils
import { findFight } from "../utils/helpers";
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
  selectStory,
}: {
  index: number;
  story: IStory;
  setSelectionError: (s: herosSelectionError) => void;
  selectStory: (s: IStory) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }
  const fight =
    story.type === "fight"
      ? findFight(context.gameState.fights, story.id)
      : null;

  return (
    <div className={`Story${index + 1}`} onClick={() => selectStory(story)}>
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
  selectStory,
}: {
  group: IStoryGroup;
  setSelectionError: (s: herosSelectionError) => void;
  selectStory: (s: IStory) => void;
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
          selectStory={selectStory}
        />
      ))}
    </div>
  );
};
