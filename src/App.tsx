import axios from "axios";
import React, { useState } from "react";
import { KeyedMutator } from "swr";
// Types
import {
  IArenaEventWithTime,
  IEvent,
  IPlayer,
  IServer,
  IStory,
} from "../api/engine/types";
// Utils
import "./App.scss";
// Components
import { Main } from "./Main";

export interface GameContextType {
  player: IPlayer;
  server: IServer;
  mutate: KeyedMutator<any>;
  game: IStory | IEvent | IArenaEventWithTime | null;
  setGame: (g: IStory | IEvent | IArenaEventWithTime | null) => void;
}

export const GameContext = React.createContext<undefined | GameContextType>(
  undefined
);

function App() {
  //window.localStorage.getItem("playerId") || short.generate();
  const [playerId, setPlayerId] = useState<string | null>(null);

  const createplayer = async () => {
    const res = await axios.post(`api/players/new?name=PlayerNew`);
    console.log("createplayer", res.data);
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
