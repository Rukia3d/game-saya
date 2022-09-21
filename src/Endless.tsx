import { useContext } from "react";
import { IEvent, IStory } from "../api/engine/types";
import { GameContext } from "./App";
import { PopUp, TopMenu } from "./Arcana";
import { mainScreenState } from "./Main";

export const Endless = ({
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
  const events = context.player.arcanas[arcana].currentEvents;
  return (
    <div className="Endless">
      <TopMenu />
      <PopUp close={() => setScreen("arcana")}>
        <div className="EndlessEvents">
          {events.map((e: IEvent, n: number) => (
            <div className="EndlessType" key={n}>
              <button>{e.mode}</button>
            </div>
          ))}
        </div>
      </PopUp>
    </div>
  );
};
