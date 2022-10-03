import { useContext } from "react";
import { IMessage } from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";

export const Message = ({ message }: { message: IMessage }) => {
  return (
    <div className="Message">
      <button>{message.header}</button>
    </div>
  );
};

export const Messages = ({
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

  const messages = context.player.messages;
  return (
    <div className="Messages">
      <TopMenu />
      <PopUp close={() => setScreen("menus")}>
        <div className="MessageItems">
          {messages.length > 0 ? (
            messages.map((m: IMessage, i: number) => (
              <Message message={m} key={i} />
            ))
          ) : (
            <p>No incoming messages</p>
          )}
        </div>
      </PopUp>
    </div>
  );
};
