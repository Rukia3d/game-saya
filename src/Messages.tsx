import { useContext } from "react";
import { IMessage } from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { CloseButton } from "./PopUp";
import { TopMenu } from "./TopMenu";

export const Message = ({ message }: { message: IMessage }) => {
  return (
    <div className="Message">
      <div className="MessageText">{message.text}</div>
      <div className="MessageActions">
        {message.claimId !== undefined && message.read === false ? (
          <button>Claim</button>
        ) : null}
        {message.read === false ? (
          <button>Read</button>
        ) : (
          <button>Delete</button>
        )}
      </div>
    </div>
  );
};

export const Messages = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const messages = context.player.messages;
  return (
    <div className="MessagesContainer" data-testid="messages-screen">
      <TopMenu />
      <h3>Messages</h3>
      <CloseButton close={() => setScreen("main")} />
      <div className="Messages" data-testid="messages-list">
        {messages.map((i: IMessage, n: number) => (
          <Message key={n} message={i} />
        ))}
      </div>
    </div>
  );
};
