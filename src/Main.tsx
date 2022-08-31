import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "./utils/helpers";
import "./Main.scss";
import { TopMenu } from "./UIElements/TopMenu";
import { Menu } from "./Menu";
import { GameContextType, GameContext } from "./App";
import { Arcanas } from "./Arcanas/Arcanas";
import { Arena } from "./Arena/Arena";

export type mainScreenState = "main" | "arcana" | "arena"; // | "lounge" | "shop";

type MainScreensType = {
  [key in mainScreenState]: React.FC;
};
const mainScreens: MainScreensType = {
  main: Menu,
  arcana: Arcanas,
  arena: Arena,
  // lounge: LoungeScreen,
  // shop: ShopScreen,
};

export const Main = ({ playerId }: { playerId: string }) => {
  const { data, error, mutate } = useSWR(`/api/players/${playerId}`, fetcher);
  const [arcana, setArcana] = useState<number | null>(null);
  const [selected, setSelected] = useState<mainScreenState>("main");

  const changeScreen = (screen: mainScreenState) => {
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
    player: data.player,
    server: data.server,
    mutate: mutate,
    changeMainScreen: changeScreen,
    setArcana: setArcana,
    arcana: arcana,
    game: null,
    changeArcanaScreen: () => {},
    setGame: () => {},
    setWin: () => {},
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
