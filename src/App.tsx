import React, { useState } from "react";
import { KeyedMutator } from "swr";
// Types
import { IPlayer, IServer } from "../api/engine/types";
// Utils
import "./App.scss";
// Components
import { Main } from "./Main";

export interface GameContextType {
  player: IPlayer;
  server: IServer;
  mutate: KeyedMutator<any>;
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
      <Main playerId={playerId} />
    </div>
  );
}

export default App;
