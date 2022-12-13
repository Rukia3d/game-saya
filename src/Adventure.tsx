import axios from "axios";
import { useContext, useState } from "react";
import {
  IAdventure,
  IInventoryQuant,
  IEndless,
  IQuest,
  IStory,
  IChapter,
} from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { CloseButton, PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";

const INDEXOFGOLD = 1;
const INDEXOFEXPERIENCE = 2;
const INDEXOFENERGY = 0;
const INDEXOFJADE = 5;

const Chapter = ({ chapter }: { chapter: IChapter }) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    context.screen.screen !== "adventure" ||
    !context.screen.adventure
  ) {
    throw new Error("No data in context");
  }
  const adventure = context.screen.adventure;
  const canPlay =
    context.player.materials[INDEXOFENERGY].quantity >= chapter.energy;

  const startLevel = async () => {
    console.log("StartLevel");
    await axios.post(`/api/players/${context.player.id}/startLevel`, {
      adventureId: adventure.id,
      storyId: chapter.storyId,
      chapterId: chapter.id,
    });

    context.setScreen({ screen: "game", game: chapter });
    await context.mutate();
  };

  const rewards =
    chapter.state === "open" ? chapter.staticRewards : chapter.firstTimeRewards;
  return (
    <div className="Chapter">
      <div>{chapter.name}</div>
      {chapter.state === "open" && canPlay ? (
        <button onClick={startLevel}>Play</button>
      ) : null}
      {chapter.state === "complete" && canPlay ? (
        <button onClick={startLevel}>Replay</button>
      ) : null}
      <div>Energy: {chapter.energy}</div>
      <div>
        <br />
        Reward:
        {rewards.map((r: IInventoryQuant, n: number) => (
          <span key={n}>
            {r.name} up to {r.quantity},
          </span>
        ))}
      </div>
    </div>
  );
};

const Story = ({ story }: { story: IStory }) => {
  return (
    <div className="Story">
      {story.name}
      <div className="Chapters">
        {story.chapters.map((c: IChapter, n: number) => (
          <Chapter chapter={c} key={n} />
        ))}
      </div>
    </div>
  );
};

export const Adventure = () => {
  const context = useContext(GameContext);
  console.log("context.screen", context?.screen);
  if (
    !context ||
    !context.player ||
    context.screen.screen !== "adventure" ||
    !context.screen.adventure
  ) {
    throw new Error("No data in context");
  }
  const adventure = context.screen.adventure;

  const selectStory = (s: IStory | null) => {
    console.log("selectStory", s);
    context.setScreen({
      screen: "adventure",
      adventure: adventure,
      story: s,
    });
  };

  const closeStory = () => {
    console.log("closeStory");
    context.setScreen({
      screen: "adventure",
      adventure: adventure,
      story: null,
    });
  };

  return (
    <div className="AdventuresContainer" data-testid="adventures-screen">
      <TopMenu />
      {context.screen.story ? (
        <PopUp close={closeStory}>
          <Story story={context.screen.story} />
        </PopUp>
      ) : (
        <>
          <h3>Adventure - {adventure.character.name}</h3>
          <CloseButton close={() => context.setScreen({ screen: "main" })} />
          <div className="Adventures" data-testid="adventures-list">
            <div className="AdventuresStories">
              <h4>Stories</h4>
              <div className="AdventuresStoriesList">
                {adventure.stories.map((s: IStory, n: number) => (
                  <div
                    className="AdventuresStory"
                    onClick={() => selectStory(s)}
                    key={n}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="AdventuresEndless">
              <h4>Endless</h4>
              <div className="AdventuresEndlessList">
                {adventure.endless.map((e: IEndless, n: number) => (
                  <div className="AdventureEndless" key={n}>
                    {e.mode}
                  </div>
                ))}
              </div>
            </div>
            <div className="AdventuresQuests">
              <h4>Quests</h4>
              <div className="AdventuresQuestList">
                {adventure.quests.map((e: IQuest, n: number) => (
                  <div className="AdventureQuest" key={n}>
                    {e.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
