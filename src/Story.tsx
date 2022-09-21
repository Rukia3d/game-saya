import { useContext } from "react";
import { IStory } from "../api/engine/types";
import { GameContext } from "./App";
import { PopUp, TopMenu } from "./Arcana";
import { mainScreenState } from "./Main";

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
  const stories = context.player.arcanas[arcana].stories;
  return (
    <div className="Story">
      <TopMenu />
      <PopUp close={() => setScreen("arcana")}>
        <div className="Stories">
          {stories.map((s: IStory, n: number) => (
            <div className="StoryType" key={n}>
              <button>{s.name}</button>
            </div>
          ))}
        </div>
      </PopUp>
    </div>
  );
};
