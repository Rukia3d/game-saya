import { useContext } from "react";
import { GameContext } from "../App";
import { BigPopup } from "../UIElements/UIButtons";
import "./Arcanas.scss";

export const ArcanaLegend = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.arcana === null) {
    throw new Error("No data in context");
  }
  return (
    <div className="Content">
      <BigPopup onClick={() => context.changeArcanaScreen("arcana")}>
        <div>
          <div>{context.player.arcanas[context.arcana].characterName}</div>
          {context.player.arcanas[context.arcana].legend.map(
            (s: string, i: number) => (
              <div key={i}>{s}</div>
            )
          )}
        </div>
      </BigPopup>
    </div>
  );
};
