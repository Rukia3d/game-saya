import React, { useState } from "react";
import { KeyedMutator } from "swr";
// Types
import { IEvent, IPlayer, IStory } from "../api/engine/types";
import { arcanaScreenState } from "./Arcanas/Arcanas";
// Utils
import "./App.scss";
// Components
import { Main, mainScreenState } from "./Main";

export interface GameContextType {
  player: IPlayer;
  mutate: KeyedMutator<any>;
  changeMainScreen: (s: mainScreenState) => void;
  changeArcanaScreen: (s: arcanaScreenState) => void;
  arcana: number | null;
  setArcana: (e: number | null) => void;
  game: IEvent | IStory | null;
  setGame: (e: IEvent | IStory | null) => void;
}

export const GameContext = React.createContext<undefined | GameContextType>(
  undefined
);

function App() {
  //window.localStorage.getItem("playerId") || short.generate();
  const [playerId, setPlayerId] = useState("2");

  const changePlayer = (id: string) => {
    setPlayerId(id);
  };
  return (
    <div className="App">
      {/* <h1>Game</h1>
      <button onClick={() => changePlayer("1")}>Player 1</button>
      <button onClick={() => changePlayer("2")}>Player 2</button> */}
      <Main playerId={playerId} />
    </div>
  );
}

export default App;
