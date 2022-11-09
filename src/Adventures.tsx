import axios from "axios";
import { useContext, useState } from "react";
import {
  IAdventure,
  IAllowedRewards,
  IEndless,
  IQuest,
  IStory,
} from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { CloseButton, PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";

const Story = ({
  story,
  adventure,
  setScreen,
}: {
  story: IStory;
  adventure: IAdventure;
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const canPlay = context.player.energy >= story.energy;

  const startLevel = async () => {
    console.log("StartLevel");
    await axios.post(`/api/players/${context.player.id}/startLevel`, {
      element: adventure.element.id,
      adventure: adventure.id,
      mode: story.mode,
      story: story.id,
    });

    context.setGame(story);
    setScreen("game");

    await context.mutate();
  };

  return (
    <div className="Story">
      <div>{story.name}</div>
      {story.state === "open" && canPlay ? (
        <button onClick={startLevel}>Play</button>
      ) : null}
      {story.state === "complete" && canPlay ? (
        <button onClick={startLevel}>Replay</button>
      ) : null}
      <div>Energy: {story.energy}</div>
      <div>
        <br />
        Reward:
        {story.allowedRewards.map((r: IAllowedRewards, n: number) => (
          <span key={n}>
            {r.material.name} up to {r.upTo},
          </span>
        ))}
      </div>
    </div>
  );
};

const Adventure = ({
  adventure,
  setAdventure,
  setScreen,
}: {
  adventure: IAdventure;
  setAdventure: (a: IAdventure | null) => void;
  setScreen: (n: mainScreenState) => void;
}) => {
  return (
    <div className="Adventure" data-testid="adventure-popup">
      <h2>{adventure.name}</h2>
      <div className="AdventureList">
        {adventure.stories.map((s: IStory, n: number) => (
          <Story
            story={s}
            key={n}
            adventure={adventure}
            setScreen={setScreen}
          />
        ))}
      </div>
    </div>
  );
};

const AdventureStory = ({
  adventure,
  setAdventure,
}: {
  adventure: IAdventure;
  setAdventure: (a: IAdventure | null) => void;
}) => {
  return (
    <div className="AdventuresStory" onClick={() => setAdventure(adventure)}>
      {adventure.name}
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
  const [element, setElement] = useState(context.player.elements[0]);
  const [adventure, setAdventure] = useState<null | IAdventure>(null);

  if (adventure) {
    return (
      <div className="AdventuresContainer" data-testid="adventures-screen">
        <TopMenu />
        <PopUp close={() => setAdventure(null)}>
          <Adventure
            adventure={adventure}
            setAdventure={setAdventure}
            setScreen={setScreen}
          />
        </PopUp>
      </div>
    );
  }

  return (
    <div className="AdventuresContainer" data-testid="adventures-screen">
      <TopMenu />
      <h3>Adventure - {element.character.element.name}</h3>
      <CloseButton close={() => setScreen("main")} />
      <div className="Adventures" data-testid="adventures-list">
        <div className="AdventuresStories">
          <h4>Stories</h4>
          <div className="AdventuresStoriesList">
            {element.adventures.map((a: IAdventure, n: number) => (
              <AdventureStory
                adventure={a}
                setAdventure={setAdventure}
                key={n}
              />
            ))}
          </div>
        </div>
        <div className="AdventuresEndless">
          <h4>Endless</h4>
          <div className="AdventuresEndlessList">
            {element.endless.map((e: IEndless, n: number) => (
              <div className="AdventureEndless" key={n}>
                {e.mode}
              </div>
            ))}
          </div>
        </div>
        <div className="AdventuresQuests">
          <h4>Quests</h4>
          <div className="AdventuresQuestList">
            {element.quests.map((e: IQuest, n: number) => (
              <div className="AdventureQuest" key={n}>
                {e.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
