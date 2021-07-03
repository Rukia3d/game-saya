import React, { useEffect, useState } from "react";
import useSWR from "swr";
import "./App.css";

import { Fight } from "./Fight/Fight";
import { Main } from "./Main/Main";
import { Start } from "./Main/Start";
import { AdventureScreen } from "./Main/AdventureScreen";

import { fetcher } from "./utils/helpers";
import { Adventure, GameState, Story } from "./utils/types";

function App() {
  const { data, error } = useSWR("/api/player/", fetcher);

  const [showStart, setShowStart] = useState(true);
  const [adventure, setAdventure] = useState<null | Adventure>(null);
  const [story, setStory] = useState<null | Story>(null);
  const [gameState, setGameState] = useState<GameState>(data);

  useEffect(() => {
    setGameState(data);
  }, [data]);

  const backToAdventure = () => {
    setAdventure(null);
    setStory(null);
  };

  const backToStory = () => {
    setStory(null);
  };

  if (error || !data) {
    return (
      <div className="App">
        <Start
          gameState={gameState}
          setShowStart={() => setShowStart(false)}
          inactive
        />
      </div>
    );
  }

  return (
    <div className="App">
      {showStart ? (
        <Start gameState={gameState} setShowStart={() => setShowStart(false)} />
      ) : (
        <Main gameState={gameState} setAdventure={setAdventure} />
      )}
      {adventure ? (
        <AdventureScreen
          adventure={adventure}
          clearScreen={backToAdventure}
          setStory={setStory}
        />
      ) : null}
      {story ? (
        <Fight
          clearScreen={backToStory}
          story={story}
          gameState={gameState}
          setGameState={setGameState}
        />
      ) : null}
    </div>
  );
}

export default App;
