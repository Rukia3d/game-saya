import React, { useContext } from "react";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";

export const Arcana = ({
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

  const labels: mainScreenState[] = ["story", "endless", "quest", "legend"];

  return (
    <div className="Arcana">
      <TopMenu />
      <PopUp close={() => setScreen("menus")}>
        <div className="Adventures">
          {labels.map((l: mainScreenState, n: number) => (
            <div className="AdventureType" key={n}>
              <button onClick={() => setScreen(l)}>{l}</button>
            </div>
          ))}
        </div>
      </PopUp>
    </div>
  );
};
