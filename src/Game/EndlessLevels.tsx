import { useContext, useState } from "react";
import { IEvent } from "../../api/engine/types";
import { GameContext } from "../App";
import { CloseButton, SmallPopup } from "../UIElements/UIButtons";
import { EndlessStartPopup } from "./EndlessStartPopup";

import "./Game.scss";

export const EndlessLevels = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.element == null) {
    throw new Error("No data in context");
  }
  // Mode is an index of the event
  const [mode, setMode] = useState<number | null>(null);
  const element = context.element;
  console.log(
    "context.player.elements[element]",
    context.player.elements[element]
  );
  return (
    <div className="GameSelect">
      <CloseButton
        onClick={() => {
          context.setGame(null);
          context.changeElementScreen("element");
        }}
      />
      {mode !== null ? (
        <SmallPopup
          onClick={() => {
            context.setGame(null);
            context.changeElementScreen("element");
          }}
          content={<EndlessStartPopup mode={mode} setMode={setMode} />}
        />
      ) : (
        <>
          <div className="GameLevels">Endless levels</div>
          <div className="EndlessSelection">
            {context.player.elements[element].currentEvents.map(
              (s: IEvent, i: number) => (
                <div className="EndlessMode" key={i}>
                  {s.mode}, price: {s.energy} <br />
                  <button onClick={() => setMode(i)}>Play</button>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};
