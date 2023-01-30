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
  let savedId: string | null = window.localStorage.getItem("playerId") || null;
  const [playerId, setPlayerId] = useState<string | null>(savedId);
  const [name, setName] = useState("");

  const createplayer = async (event: any) => {
    event.preventDefault();
    const res = await axios.post(`api/players/new?name=${name}`);
    setPlayerId(res.data.player.id);
    window.localStorage.setItem("playerId", res.data.player.id);
  };

  return (
    <div className="App">
      {playerId == null ? (
        <div className="NewPlayerContainer">
          <form onSubmit={createplayer}>
            <label>
              Enter your name: <br />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <input type="submit" />
          </form>
        </div>
      ) : (
        <Main playerId={playerId} />
      )}
    </div>
  );
}

export default App;
