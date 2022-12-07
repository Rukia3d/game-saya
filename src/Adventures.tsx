import axios from "axios";
import { useContext, useState } from "react";
import { INDEXOFENERGY } from "../api/config";
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

const Chapter = ({ chapter }: { chapter: IChapter }) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const canPlay =
    context.player.materials[INDEXOFENERGY].quantity >= chapter.energy;

  const startLevel = async () => {
    console.log("StartLevel");
    await axios.post(`/api/players/${context.player.id}/startLevel`, {
      // element: adventure.element.id,
      // adventure: adventure.id,
      // mode: story.mode,
      // story: story.id,
    });

    // context.setGame(chapter);
    // setScreen("game");

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

const Story = ({
  story,
  setStory,
}: {
  story: IStory;
  setStory: (a: IStory | null) => void;
}) => {
  return (
    <div className="Story" onClick={() => {}}>
      {story.name}
      <div className="Chapters">
        {story.chapters.map((c: IChapter) => (
          <Chapter chapter={c} />
        ))}
      </div>
    </div>
  );
};

export const Adventures = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const adventures = context.player.adventures;
  const [adventure, setAdventure] = useState<null | IAdventure>(adventures[0]);
  const [story, setStory] = useState<null | IStory>(null);

  if (adventure == null) throw new Error("No adventure");
  return (
    <div className="AdventuresContainer" data-testid="adventures-screen">
      <TopMenu />
      {story ? (
        <PopUp close={() => setStory(null)}>
          <Story story={story} setStory={setStory} />
        </PopUp>
      ) : (
        <>
          <h3>Adventure - {adventure.character.name}</h3>
          <CloseButton close={() => setScreen("main")} />
          <div className="Adventures" data-testid="adventures-list">
            <div className="AdventuresStories">
              <h4>Stories</h4>
              <div className="AdventuresStoriesList">
                {adventure.stories.map((s: IStory, n: number) => (
                  <div
                    className="AdventuresStory"
                    onClick={() => setStory(s)}
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
