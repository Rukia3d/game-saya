import axios from "axios";
import { IEvent, IStory } from "../api/engine/types";
import { CloseButton, SmallPopup } from "./UIElements/UIButtons";
import "./Game.scss";
import { useContext, useState } from "react";
import { GameContext } from "./Main";

export const GameRun = () => {
  return <div className="Run"></div>;
};

export const GameFight = () => {
  return <div className="Fight"></div>;
};

export const GameStartPopup = ({
  element,
  story,
  setStory,
  setGame,
  setGameSelect,
}: {
  element: number;
  story: number;
  setStory: (b: number | null) => void;
  setGame: (s: IStory | null) => void;
  setGameSelect: (b: boolean) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const energyPrice = context.player.elements[element].stories[story].energy;
  const startStory = async (i: number | null) => {
    console.log("startStory");
    setGameSelect(false);
    setStory(null);
    if (i !== null) {
      setGame(context.player.elements[element].stories[story]);
      await axios.post(`/api/players/${context.player.id}/startLevel`, {
        element: element,
        mode: "story",
        level: story,
      });
      context.mutate();
    }
  };

  if (context.player.energy - energyPrice < 0) {
    return (
      <div className="GameStartPopup">
        NOT ENOUGH ENERGY
        <br />
        <button onClick={() => startStory(null)}>Got it</button>
      </div>
    );
  }

  return (
    <div className="GameStartPopup">
      Confirm level start
      <br />
      <button onClick={() => startStory(story)}>Yes play</button>
      <button onClick={() => startStory(null)}>No, dont</button>
    </div>
  );
};

export const GameLevels = ({
  element,
  setGame,
  setGameSelect,
}: {
  element: number;
  setGame: (s: IStory | null) => void;
  setGameSelect: (s: boolean) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const [story, setStory] = useState<null | number>(null);

  return (
    <div className="GameSelect">
      <CloseButton onClick={() => setStory(null)} />
      {story !== null ? (
        <SmallPopup
          onClick={() => {
            setStory(null);
            setGameSelect(false);
          }}
          content={
            <GameStartPopup
              element={element}
              story={story}
              setStory={setStory}
              setGame={setGame}
              setGameSelect={setGameSelect}
            />
          }
        />
      ) : (
        <>
          <div className="GameLevels">
            Game Levels {context.player.elements[element].stories.length}
          </div>
          {context.player.elements[element].stories.map(
            (s: IStory, i: number) => (
              <div className="StoryPoint" key={i}>
                {s.name}: {s.state} <br />
                {s.state !== "closed" ? (
                  <button onClick={() => setStory(i)}>Play</button>
                ) : null}
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export const Game = ({
  element,
  game,
  setGame,
  setGameSelect,
}: {
  element: number;
  game: IStory | IEvent;
  setGame: (s: IStory | null) => void;
  setGameSelect: (s: boolean) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const winStory = async () => {
    console.log("winStory");
    await axios.post(`/api/players/${context.player.id}/winLevel`, {
      element: element,
      mode: "story",
      level: game.id,
    });
    setGame(null);
    setGameSelect(true);
    context.mutate();
  };

  const loseStory = () => {
    console.log("loseStory");
    setGame(null);
    setGameSelect(true);
  };
  return (
    <div className="Game">
      <CloseButton onClick={() => setGame(null)} />
      <br />
      <button onClick={winStory}>Win me</button>
      <button onClick={loseStory}>Lose me</button>
    </div>
  );
};
