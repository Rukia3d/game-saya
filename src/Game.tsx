import axios from "axios";
import { useContext, useState } from "react";
import { GameContext } from "./App";
import { ComingSoon, mainScreenState } from "./Main";
import { CloseButton } from "./PopUp";

export const Panel = () => {
  return <h1>Panel</h1>;
};

export const Level = () => {
  return <h1>Level</h1>;
};

export const Game = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player || !context.game) {
    throw new Error("No data in context");
  }
  const [confirmation, setConfirmation] = useState(false);
  const [current, setCurrent] = useState(context.game.level.levels[0]);

  const winLevel = async () => {
    console.log("WinLevel");
    if (context.game && "id" in context.game) {
      await axios.post(`/api/players/${context.player.id}/winLevel`, {
        storyId: context.game.id,
      });

      await context.mutate();
      setScreen("adventure");
      context.setGame(null);
    }
  };

  const looseLevel = () => {
    setScreen("adventure");
    context.setGame(null);
  };

  if (context.game.mode === "story") {
    return (
      <div className="GameContainer" data-testid="game-screen">
        <CloseButton close={() => setScreen("adventure")} />
        <button onClick={winLevel}>Win</button>
        <button onClick={looseLevel}>Loose</button>
        {"map" in current ? <Level /> : <Panel />}
      </div>
    );
  }

  return <ComingSoon setScreen={setScreen} />;
};
