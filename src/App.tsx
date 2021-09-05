import React, { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import "./App.css";

import { Fight } from "./Fight/Fight";
import { Dialogues } from "./Main/Dialogues";
import { Main } from "./Main/Main";
import { Start } from "./Main/Start";
import { Stories } from "./Main/Stories";

import { fetcher } from "./utils/helpers";
import { Adventure, Dialogue, GameState, Story } from "./utils/types";

export interface GameContextType {
  adventure: Adventure | null;
  setAdventure: (a: Adventure) => void;
  story: Story | null;
  setStory: (s: Story) => void;
  gameState: GameState | null;
  setGameState: (g: GameState) => void;
  dialogue: Dialogue | null;
  setDialogue: (d: Dialogue | null) => void;
  backToMain: () => void;
  backToStory: () => void;
}
export const GameContext = React.createContext<undefined | GameContextType>(
  undefined
);

function App() {
  const { data, error } = useSWRImmutable("/api/player/", fetcher);

  const [showStart, setShowStart] = useState(true);
  const [adventure, setAdventure] = useState<null | Adventure>(null);
  const [story, setStory] = useState<null | Story>(null);
  const [gameState, setGameStateOrigin] = useState<GameState>(data);
  const [dialogue, setDialogue] = useState<null | Dialogue>(null);

  const setGameState = (state: GameState) => {
    console.log("DEBUG", state);
    if (state) {
      // console.log(
      //   //@ts-ignore
      //   JSON.parse(JSON.stringify(state.player.adventures[0].stories[0]))
      // );
      setGameStateOrigin(state);
    }
  };

  useEffect(() => {
    setGameState(data);
  }, [data]);

  const backToMain = () => {
    setAdventure(null);
    setStory(null);
  };

  const backToStory = () => {
    setStory(null);
    setDialogue(null);
  };

  const context = {
    adventure: adventure,
    setAdventure: setAdventure,
    story: story,
    setStory: setStory,
    gameState: gameState,
    setGameState: setGameState,
    dialogue: dialogue,
    setDialogue: setDialogue,
    backToMain: backToMain,
    backToStory: backToStory,
  };

  if (error || !data) {
    return (
      <GameContext.Provider value={context}>
        <div className="App">
          <Start setShowStart={setShowStart} />
        </div>
      </GameContext.Provider>
    );
  }
  return (
    <GameContext.Provider value={context}>
      <div className="App">
        {showStart ? <Start setShowStart={setShowStart} /> : <Main />}
        {adventure ? <Stories /> : null}
        {story ? <Fight /> : null}
        {dialogue ? <Dialogues /> : null}
      </div>
    </GameContext.Provider>
  );
}

export default App;
