import React, { useState } from "react";
import { ICharacter, IMaterialOwned, IPlayer } from "../api/engine/types";
import axios from "axios";
import useSWR from "swr";
import "./App.scss";
// Types
// Utils
import { fetcher } from "./utils/helpers";
import { Main } from "./Main";
// Components

function App() {
  //window.localStorage.getItem("playerId") || short.generate();
  const [playerId, setPlayerId] = useState("1");

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
