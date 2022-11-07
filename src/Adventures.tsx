import { useContext, useState } from "react";
import { IAdventure, IEndless, IQuest } from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { CloseButton } from "./PopUp";
import { TopMenu } from "./TopMenu";

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
              <div className="AdventuresStory" key={n}>
                {a.element.name}
              </div>
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
