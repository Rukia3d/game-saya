import { useContext } from "react";
import { GameContext } from "../App";
import { BigPopup } from "../UIElements/UIButtons";
import "./Elements";

export const ElementLegend = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.element === null) {
    throw new Error("No data in context");
  }
  return (
    <div className="Content">
      <BigPopup onClick={() => context.changeElementScreen("element")}>
        <div>
          <div>{context.player.elements[context.element].characterName}</div>
          {context.player.elements[context.element].legend.map(
            (s: string, i: number) => (
              <div key={i}>{s}</div>
            )
          )}
        </div>
      </BigPopup>
    </div>
  );
};
