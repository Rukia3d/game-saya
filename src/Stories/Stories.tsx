import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../App";
import "./Stories.scss";
// Types
import {
  herosSelectionError,
  IFight,
  IHero,
  IStory,
  IStoryGroup,
} from "../utils/types";
// Utils
import {
  checkFightCharactersIds,
  filterActiveCharacters,
  findFight,
  findLastOpenStory,
} from "../utils/helpers";
// Components
import { CloseButton } from "../UI/CloseButton";
import { ScrollButton } from "../UI/ScrollButton";
import { StoryPanel } from "./StoryPanel";
import { FightSelection } from "../Fight/FightSelection";
import { SpellsSelection } from "../Spells/Spells";

export const STORIES_PER_PANEL = 3;
const STORIESPERPAGE = 3;
export const Stories = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.adventure ||
    !context.gameState.game.fights
  ) {
    throw new Error("No data in context");
  }
  const gameState = context.gameState;
  const startingPage = context.adventure.storyGroups
    ? Math.floor(
        findLastOpenStory(context.adventure.storyGroups) / STORIESPERPAGE
      )
    : 0;
  const [page, setPage] = useState(startingPage);
  const [story, setStory] = useState<IStory | null>(null);
  const [fight, setFight] = useState<IFight | null>(
    story && story.type === "fight"
      ? findFight(gameState.game.fights, story.id)
      : null
  );
  const [selectionError, setSelectionError] =
    useState<herosSelectionError>(null);
  const [spellSelect, setSpellSelect] = useState(false);

  const activeCharactersNames: string[] = filterActiveCharacters(
    gameState.player.heroes
  ).map((c: IHero) => {
    return c.id;
  });

  const setStoryWithType = (story: IStory) => {
    setStory(story);
    if (story.type !== "fight") {
      context.setStory(story);
    } else {
      const fight = findFight(gameState.game.fights, story.id);
      setFight(fight);
      const error = checkFightCharactersIds(
        fight.hero_elements,
        activeCharactersNames
      );
      setSelectionError(error);
      if (error == null) {
        context.setStory(story);
      }
    }
  };

  if (!context.adventure.storyGroups) {
    return <div>No stories</div>;
  }

  const pageLength = context.adventure.storyGroups.length * 30;

  if (spellSelect) {
    return (
      <div className="Stories" aria-label="story_background">
        <CloseButton onClick={() => setSpellSelect(false)} />
        <SpellsSelection spells={gameState.player.spells} />
      </div>
    );
  }
  const res = selectionError !== null && fight && story;
  if (res) {
    return (
      <div className="Stories" aria-label="story_background">
        <CloseButton onClick={context.backToMain} />
        <FightSelection
          story={story}
          fight={fight}
          setSelectionError={setSelectionError}
          setSpellSelect={setSpellSelect}
        />
      </div>
    );
  }

  return (
    <div className="Stories" aria-label="story_background">
      <CloseButton onClick={context.backToMain} />
      <h2>{context.adventure.name}</h2>
      <div
        className="StoriesList"
        aria-label="stories_list"
        style={{ height: `${pageLength}%` }}
      >
        {context.adventure.storyGroups.map((s: IStoryGroup, i: number) => (
          <StoryPanel
            group={s}
            key={i}
            setSelectionError={setSelectionError}
            selectStory={setStoryWithType}
          />
        ))}
      </div>
    </div>
  );
};
