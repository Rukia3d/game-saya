import axios from "axios";
import React, { useState } from "react";
import { KeyedMutator } from "swr";
// Types
import { IPlayer, IServer } from "../api/engine/types";
// Utils
import "./App.scss";
// Components
import { Main, mainScreenState } from "./Main";

export interface GameContextType {
  player: IPlayer;
  server: IServer;
  mutate: KeyedMutator<any>;
  screen: mainScreenState;
  setScreen: (m: mainScreenState) => void;
}

export const GameContext = React.createContext<undefined | GameContextType>(
  undefined
);

function App() {
  //window.localStorage.getItem("playerId") || short.generate();
  const [playerId, setPlayerId] = useState<string | null>("1");

  const createplayer = async () => {
    const res = await axios.post(`api/players/new?name=PlayerNew`);
    setPlayerId(res.data.player.id);
  };

  return (
    <div className="App">
      {playerId == null ? (
        <button onClick={createplayer}>create player</button>
      ) : (
        <Main playerId={playerId} />
      )}
    </div>
  );
}

export default App;
