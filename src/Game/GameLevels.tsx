import { useContext, useState } from "react";
import { IStory } from "../../api/engine/types";
import { GameContext } from "../App";
import { CloseButton, SmallPopup } from "../UIElements/UIButtons";

import "./Game.scss";
import { GameStartPopup } from "./GameStartPopup";

export const GameLevels = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.arcana == null) {
    throw new Error("No data in context");
  }
  const [story, setStory] = useState<null | number>(null);
  const arcana = context.arcana;
  return (
    <div className="GameSelect">
      <CloseButton
        onClick={() => {
          setStory(null);
          context.changeArcanaScreen("arcana");
        }}
      />
      {story !== null ? (
        <SmallPopup
          onClick={() => {
            setStory(null);
            context.changeArcanaScreen("arcana");
          }}
          content={<GameStartPopup story={story} setStory={setStory} />}
        />
      ) : (
        <>
          <div className="GameLevels">
            Game Levels {context.player.arcanas[arcana].stories.length}
          </div>
          {context.player.arcanas[arcana].stories.map(
            (s: IStory, i: number) => (
              <div className="StoryPoint" key={i}>
                {s.name}: {s.state} <br />
                {s.state !== "closed" ? (
                  <button onClick={() => setStory(i)}>Play</button>
                ) : null}
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};
