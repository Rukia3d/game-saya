import React, { useEffect, useState } from "react";
import useSWR from "swr";
import "./App.css";

import { AdventureScreen } from "./AdventureScreen";
import { Fight } from "./Fight";
import { Main } from "./Main";
import { Start } from "./Start";
import { fetcher } from "./utils/helpers";

export interface Card {
  id: string;
  name: string;
  quantity: number;
  strength: number;
  character: null | string;
  element: null | string;
}

export interface Player {
  id: number;
  cards: Card[];
}

export interface Character {
  id: string;
  image: string;
  state: string;
}

export interface Adventure {
  id: string;
  name: string;
  image: string;
  state: "open" | "closed";
  stories: Story[];
}

export interface Story {
  type: "dialogue" | "fight";
  id: string;
  image: string;
  state: "open" | "closed";
  enemy?: string;
  characters: string[];
}

export interface GameState {
  sceneCharacters: Character[];
  player: { id: number; cards: Card[]; experience: number };
  adventures: Adventure[];
  heroes: string[];
}

export type screenState = "start" | "opening" | "main" | "dialogue";

export const SettingsButton = ({ onClick }: { onClick: (a: any) => void }) => {
  return (
    <div
      className="CloseButton"
      onClick={onClick}
      data-testid="settings_button"
    >
      G
    </div>
  );
};

export const CloseButton = ({ onClick }: { onClick: (a: any) => void }) => {
  return (
    <div className="CloseButton" onClick={onClick} data-testid="close_button">
      X
    </div>
  );
};
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
          gameState={null}
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
          player={gameState.player}
        />
      ) : null}
    </div>
  );
}

export default App;
