import axios from "axios";
import { useContext, useState } from "react";
import { IEvent } from "../api/engine/types";
import { GameContext } from "./App";
import { ConfirmationPopup } from "./ConfirmationPopup";
import { mainScreenState } from "./Main";
import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";

const EndlessStartConfirmation = ({
  sucess,
  startEndless,
  cancelEndless,
}: {
  sucess: boolean;
  startEndless: () => void;
  cancelEndless: () => void;
}) => {
  if (sucess) {
    return (
      <div className="GameStartPopup">
        You are playing endless mode
        <br />
        <button onClick={startEndless}>Yes play</button>
        <button onClick={cancelEndless}>No, dont</button>
      </div>
    );
  } else {
    return (
      <div className="GameStartPopup">
        NOT ENOUGH ENERGY
        <br />
        <button onClick={cancelEndless}>Got it</button>
      </div>
    );
  }
};

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

  const [event, setEvent] = useState<IEvent | null>(null);
  const events = context.player.arcanas[arcana].currentEvents;

  const startEndless = async () => {
    if (!event) {
      throw new Error("No event in context");
    }
    await axios.post(`/api/players/${context.player.id}/startEndless`, {
      arcana: arcana,
      mode: event.mode,
    });

    context.setGame(event);
    setScreen("game");

    await context.mutate();
  };

  const cancelEndless = () => {
    setEvent(null);
    setScreen("arcana");
  };

  return (
    <div className="Endless">
      {event ? (
        <ConfirmationPopup close={cancelEndless}>
          <EndlessStartConfirmation
            sucess={context.player.energy - event.energy > 0}
            startEndless={startEndless}
            cancelEndless={cancelEndless}
          />
        </ConfirmationPopup>
      ) : null}
      <TopMenu />
      <PopUp close={() => setScreen("arcana")}>
        <div className="EndlessEvents">
          {events.map((e: IEvent, n: number) => (
            <div className="EndlessType" key={n}>
              <button onClick={() => setEvent(e)}>{e.mode}</button>
            </div>
          ))}
        </div>
      </PopUp>
    </div>
  );
};
