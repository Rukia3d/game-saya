import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "./utils/helpers";
import "./Main.scss";
import { TopMenu } from "./UIElements/TopMenu";
import { Menu } from "./Menu";
import { Elements } from "./Elements/Elements";
import { GameContextType, GameContext } from "./App";

export type mainScreenState = "main" | "element"; //| "arena" | "lounge" | "shop";

type MainScreensType = {
  [key in mainScreenState]: React.FC;
};
const mainScreens: MainScreensType = {
  main: Menu,
  element: Elements,
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
    return (
      <div className="Main">
        <h1>ERROR</h1>
      </div>
    );
  }
  const context: GameContextType = {
    player: data,
    mutate: mutate,
    changeMainScreen: changeScreen,
    setElement: setElement,
    element: element,
    game: null,
    changeElementScreen: () => {},
    setGame: () => {},
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
