import axios from "axios";
import { useContext, useState } from "react";
import { IStory } from "../api/engine/types";
import { GameContext } from "./App";
import { ConfirmationPopup } from "./ConfirmationPopup";
import { mainScreenState } from "./Main";
import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";

const StoryStartConfirmation = ({
  sucess,
  startStory,
  cancelStory,
}: {
  sucess: boolean;
  startStory: () => void;
  cancelStory: () => void;
}) => {
  if (sucess) {
    return (
      <div>
        Confirm level start
        <br />
        <button onClick={startStory}>Yes play</button>
        <button onClick={cancelStory}>No, dont</button>
      </div>
    );
  } else {
    return (
      <div className="GameStartPopup">
        NOT ENOUGH ENERGY
        <br />
        <button onClick={cancelStory}>Got it</button>
      </div>
    );
  }
};

export const Story = ({
  arcana,
  setArcana,
  setScreen,
}: {
  arcana: number | null;
  setArcana: (n: number | null) => void;
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  if (arcana == null) {
    throw new Error("Trying to render Stories with no Arcana selected");
  }
  const [story, setStory] = useState<IStory | null>(null);
  const startStory = async () => {
    if (!story) {
      throw new Error("No story in context");
    }
    await axios.post(`/api/players/${context.player.id}/startLevel`, {
      arcana: arcana,
      mode: story.mode,
      level: story.id,
    });

    context.setGame(story);
    setScreen("game");

    await context.mutate();
  };

  const cancelStory = () => {
    setStory(null);
    setScreen("arcana");
  };

  const stories = context.player.arcanas[arcana].stories;
  return (
    <div className="Story">
      {story ? (
        <ConfirmationPopup close={cancelStory}>
          <StoryStartConfirmation
            sucess={context.player.energy - story.energy > 0}
            startStory={startStory}
            cancelStory={cancelStory}
          />
        </ConfirmationPopup>
      ) : null}
      <TopMenu />
      <PopUp close={() => setScreen("arcana")}>
        <div className="Stories">
          {stories.map((s: IStory, n: number) => (
            <div className="StoryType" key={n}>
              {s.name}: {s.state} <br />
              {s.state === "closed" ? <p>Closed</p> : null}
              {s.state === "open" ? (
                <button onClick={() => setStory(s)}>Play</button>
              ) : null}
              {s.state === "complete" ? (
                <button onClick={() => setStory(s)}>RePlay</button>
              ) : null}
            </div>
          ))}
        </div>
      </PopUp>
    </div>
  );
};
