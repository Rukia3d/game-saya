import { useContext } from "react";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";

export const Legend = ({
  arcana,
  setArcana,
  setScreen,
}: {
  arcana: number | null;
  setArcana: (n: number | null) => void;
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player || arcana == null) {
    throw new Error("No data in context");
  }

  const arcanas = context.player.arcanas;
  return (
    <div className="ComingSoon">
      <TopMenu />
      <PopUp close={() => setScreen("arcana")}>
        <div className="Legend">
          <h1>Legend</h1>
          {arcanas[arcana].legend.map((s: string, n: number) => (
            <p key={n}>{s}</p>
          ))}
        </div>
      </PopUp>
    </div>
  );
};
