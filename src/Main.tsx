import React, { useContext, useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import { IElement, IPlayer } from "../api/engine/types";
import { fetcher } from "./utils/helpers";
import "./Main.scss";
import { TopMenu } from "./UIElements/TopMenu";
import { ElementScreen } from "./Element";

export interface GameContextType {
  player: IPlayer;
  mutate: KeyedMutator<any>;
}

export const GameContext = React.createContext<undefined | GameContextType>(
  undefined
);

export const Menu = ({
  setElement,
}: {
  setElement: (s: number | null) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  return (
    <div className="Menu">
      <div className="Chars">
        {context.player.elements.map((c: IElement, i: number) => (
          <div className="Character" key={i} onClick={() => setElement(i)}>
            {c.characterName}
          </div>
        ))}
      </div>
      <div className="Sections">
        <div className="Section">Arena</div>
        <div className="Section">Longe</div>
        <div className="Section">Shop</div>
      </div>
      <div className="Additional">
        <div className="Button">INV</div>
        <div className="Button">MIS</div>
        <div className="Button">MES</div>
      </div>
    </div>
  );
};

export const Main = ({ playerId }: { playerId: string }) => {
  const { data, error, mutate } = useSWR(`/api/players/${playerId}`, fetcher);
  const [element, setElement] = useState<number | null>(null);

  if (error || !data) {
    console.log(data);
    return (
      <div className="Main">
        <h1>ERROR</h1>
      </div>
    );
  }
  const context: GameContextType = {
    player: data,
    mutate: mutate,
  };

  return (
    <GameContext.Provider value={context}>
      <div className="Main">
        <TopMenu />
        <Menu setElement={setElement} />
        {element !== null ? (
          <ElementScreen element={element} setElement={setElement} />
        ) : null}
      </div>
    </GameContext.Provider>
  );
};
