import { useState } from "react";
import useSWR from "swr";
import { ICharacter, IPlayer } from "../api/engine/types";
import { fetcher } from "./utils/helpers";
import "./Main.scss";
import { TopMenu } from "./UIElements/TopMenu";
import { CharacterScreen } from "./Character";
import { BigPopup } from "./UIElements/UIButtons";

export const Game = ({
  player,
  setCharacter,
}: {
  player: IPlayer;
  setCharacter: (s: number | null) => void;
}) => {
  return (
    <div className="Game">
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

export const Main = ({ playerId }: { playerId: string }) => {
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
      <TopMenu materials={player.materials} energy={player.energy} />
      {charIndex == null ? (
        <Game player={player} setCharacter={setCharIndex} />
      ) : (
        <CharacterScreen
          character={player.characters[charIndex]}
          setCharacter={setCharIndex}
        />
      )}
    </div>
  );
};
