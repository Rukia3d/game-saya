import React, { useState } from "react";
import { ICharacter, IMaterialOwned, IPlayer } from "../api/engine/types";
import axios from "axios";
import useSWR from "swr";
import "./App.css";
// Types
// Utils
import { fetcher } from "./utils/helpers";
// Components

const CloseButton = ({ onClick }: { onClick: any }) => {
  return <div className="CloseButton" onClick={onClick}></div>;
};

const CharacterScreen = ({
  character,
  setCharacter,
}: {
  character: ICharacter;
  setCharacter: (s: number | null) => void;
}) => {
  console.log("Character", character);
  return (
    <div className="Element">
      <CloseButton onClick={() => setCharacter(null)} />
      <div className="Content">
        <div className="Static"></div>
        <div className="Event"></div>
        <div className="Quest"></div>
      </div>
    </div>
  );
};

const MainScreen = ({
  player,
  setCharacter,
}: {
  player: IPlayer;
  setCharacter: (s: number | null) => void;
}) => {
  return (
    <div className="Bottom">
      <div className="Chars">
        {player.characters.map((c: ICharacter, i: number) => (
          <div className="Character" key={i} onClick={() => setCharacter(i)}>
            {c.name}
          </div>
        ))}
      </div>
      <div className="Sections">
        <div className="Section">Arena</div>
        <div className="Section">Longe</div>
        <div className="Section">Shop</div>
      </div>
      <div className="Menu">
        <div className="Button">INV</div>
        <div className="Button">MIS</div>
        <div className="Button">MES</div>
      </div>
    </div>
  );
};

const Main = ({ playerId }: { playerId: string }) => {
  const { data, error, mutate } = useSWR(`/api/players/${playerId}`, fetcher);
  const [charIndex, setCharIndex] = useState<number | null>(null);

  if (error || !data) {
    return (
      <div className="Main">
        <h1>ERROR</h1>
      </div>
    );
  }
  console.log("characterIndex", charIndex);
  const player: IPlayer = data;
  return (
    <div className="Main">
      <div className="Top">
        <div>Energy: {player.energy}</div>
        {player.materials.map((m: IMaterialOwned, i: number) => (
          <div key={i}>
            {m.name}: {m.quantity}
          </div>
        ))}
      </div>
      {charIndex == null ? (
        <MainScreen player={player} setCharacter={setCharIndex} />
      ) : (
        <CharacterScreen
          character={player.characters[charIndex]}
          setCharacter={setCharIndex}
        />
      )}
    </div>
  );
};

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
