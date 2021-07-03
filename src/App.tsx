import React, { useState } from "react";
import { AdventureScreen } from "./AdventureScreen";
import "./App.css";
import { Fight } from "./Fight";
import { Main } from "./Main";
import { Start } from "./Start";
const playerCards = require("./data/heroCards.json");

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
  player: { id: number; cards: Card[] };
  adventures: Adventure[];
  heroes: string[];
}

export type screenState = "start" | "opening" | "main" | "dialogue";

export const SettingsButton = ({ onClick }: { onClick: (a: any) => void }) => {
  return (
    <div className="CloseButton" onClick={onClick}>
      G
    </div>
  );
};

export const CloseButton = ({ onClick }: { onClick: (a: any) => void }) => {
  return (
    <div className="CloseButton" onClick={onClick}>
      X
    </div>
  );
};

function App() {
  const [showStart, setShowStart] = useState(true);
  const [adventure, setAdventure] = useState<null | Adventure>(null);
  const [story, setStory] = useState<null | Story>(null);
  const [gameState, setGameState] = useState<GameState>({
    sceneCharacters: [{ id: "maya", image: "../img/maya.png", state: "dial1" }],
    player: { id: 1, cards: playerCards },
    adventures: [
      {
        id: "story",
        image: "../img/storyline.png",
        state: "open",
        stories: [
          {
            id: "fight1",
            type: "fight",
            image: "../img/arena_1.png",
            enemy: "dude",
            state: "open",
            characters: ["maya", "tara"],
          },
          {
            id: "dial1",
            type: "dialogue",
            image: "../img/dialogue_1.png",
            state: "open",
            characters: ["maya"],
          },
          {
            id: "fight2",
            type: "fight",
            image: "../img/arena_1.png",
            enemy: "dude",
            state: "closed",
            characters: ["maya", "tara"],
          },
          {
            id: "dial2",
            type: "dialogue",
            image: "../img/dialogue_1.png",
            state: "closed",
            characters: ["maya"],
          },
        ],
      },
      {
        id: "arena",
        image: "../img/devastation.png",
        state: "closed",
        stories: [],
      },
    ],
    heroes: ["maya"],
  });

  const backToAdventure = () => {
    setAdventure(null);
    setStory(null);
  };

  const backToStory = () => {
    setStory(null);
  };

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
