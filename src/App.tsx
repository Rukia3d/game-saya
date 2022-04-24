import React, { useEffect, useState } from "react";
import short from "short-uuid";
import useSWR from "swr";
import "./App.css";
// Types
import {
  IPlayer,
  IPlayerAdventure,
  IPlayerHero,
  IPlayerResource,
  IPlayerSpell,
} from "../api/engine/types";
// Utils
import { fetcher } from "./utils/helpers";
import { IStory } from "../api/storage/types";
import axios from "axios";
// Components

const Player = ({ playerId }: { playerId: string }) => {
  const { data, error, mutate } = useSWR(`/api/users/${playerId}`, fetcher);
  const [nextStory, setNextStory] = useState<null | IStory>(null);
  useEffect(() => {
    if (data) {
      setNextStory(
        data.adventures[0].stories.find((s: IStory) => s.open === false)
      );
    }
  }, [data]);

  const finishStory = async () => {
    console.log(
      "finishStory",
      data.player.id,
      nextStory?.adventure_id,
      nextStory?.id
    );
    if (nextStory) {
      await axios.post(
        `/api/users/${data.player.id}/adventure/${
          nextStory.adventure_id
        }/story/${nextStory.id - 1}`
      );
      mutate();
    }
  };
  if (error || !data) {
    return (
      <div className="App">
        <h1>ERROR</h1>
      </div>
    );
  }
  const player: IPlayer = data.player;
  return (
    <div>
      <h2>Actions</h2>
      <button onClick={finishStory}>Finish story</button>
      <h2>Player: {player.id}</h2>
      <div>{JSON.stringify(player).split(",").join(" | ")}</div>
      <hr />
      <div>
        Current adventure:{" "}
        {data.adventures.map((a: IPlayerAdventure) => (
          <span>
            {a.name} (id: {a.id}), story:{nextStory ? nextStory.id - 1 : "null"}
          </span>
        ))}
      </div>
      <hr />
      <div>
        Current heroes:{" "}
        {data.heroes.map((a: IPlayerHero) => (
          <div>
            {a.name} (id: {a.id}), active: {a.selected ? "true" : "false"}
          </div>
        ))}
      </div>
      <hr />
      <div>
        Current spells:{" "}
        {data.spells.map((a: IPlayerSpell) => (
          <div>
            {a.name} (id: {a.id}), active: {a.selected ? "true" : "false"}
          </div>
        ))}
      </div>
      <hr />
      <div>
        Current resources:{" "}
        {data.resources.map((a: IPlayerResource) => (
          <div>
            {a.name} (id: {a.id}), rarity:{a.commonality}, quantity:{a.quantity}
          </div>
        ))}
      </div>
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
      <h1>Game</h1>
      <button onClick={() => changePlayer("1")}>Player 1</button>
      <button onClick={() => changePlayer("2")}>Player 2</button>
      <Player playerId={playerId} />
    </div>
  );
}

export default App;
