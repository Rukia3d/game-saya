import React, { useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import { IPlayer } from "../api/engine/types";
import { fetcher } from "./utils/helpers";
import "./Main.scss";
import { TopMenu } from "./UIElements/TopMenu";
import { ElementScreen } from "./Element";
import { Menu } from "./Menu";

export interface GameContextType {
  player: IPlayer;
  mutate: KeyedMutator<any>;
  changeScreen: (s: mainScreenState) => void;
  setElement: (e: number | null) => void;
  element: number | null;
}

export const GameContext = React.createContext<undefined | GameContextType>(
  undefined
);

type mainScreenState = "main" | "element"; //| "arena" | "lounge" | "shop";

type MainScreensType = {
  [key in mainScreenState]: React.FC;
};
const mainScreens: MainScreensType = {
  main: Menu,
  element: ElementScreen,
  // arena: ArenaScreen,
  // lounge: LoungeScreen,
  // shop: ShopScreen,
};

export const Main = ({ playerId }: { playerId: string }) => {
  const { data, error, mutate } = useSWR(`/api/players/${playerId}`, fetcher);
  const [element, setElement] = useState<number | null>(null);
  const [selected, setSelected] = useState<mainScreenState>("main");

  const changeScreen = (screen: mainScreenState) => {
    console.log("change to", screen);
    setSelected(screen);
  };

  const CurrentScreen = mainScreens[selected];

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
    changeScreen: changeScreen,
    setElement: setElement,
    element: element,
  };

  return (
    <GameContext.Provider value={context}>
      <div className="Main">
        <TopMenu />
        <CurrentScreen />
      </div>
    </GameContext.Provider>
  );
};
