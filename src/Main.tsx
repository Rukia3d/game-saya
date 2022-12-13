import React, { useContext, useState } from "react";
import useSWR from "swr";
import { fetcher } from "./utils/helpers";
import "./Main.scss";
import { GameContextType, GameContext } from "./App";

import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";
import {
  IAdventure,
  IChapter,
  IGame,
  IStory,
  IWeapon,
  IWeaponMaterial,
} from "../api/engine/types";
import { Home } from "./Home";
import { Weapons } from "./Weapons";
import { Inventory } from "./Inventory";
import { Goals } from "./Goals";
import { Arena } from "./Arena";
import { Collections } from "./Collections";
import { Messages } from "./Messages";
import { Adventure } from "./Adventure";
import { Game } from "./Game";

export type mainScreenState =
  | { screen: "main" }
  | { screen: "game"; game: IChapter | null }
  | {
      screen: "weapons";
      weapon: IWeapon | null;
      material: IWeaponMaterial | null;
    }
  | { screen: "inventory" }
  | { screen: "goals" }
  | { screen: "collections" }
  | { screen: "messages" }
  | { screen: "adventure"; adventure: IAdventure | null; story: IStory | null }
  | { screen: "arena" }
  | { screen: "market" }
  | { screen: "aliance" }
  | { screen: "studio" };

type screens = mainScreenState["screen"];
type MainScreensType = {
  [K in screens]: React.FC;
};

export const ComingSoon = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  return (
    <div className="ComingSoon">
      <TopMenu />
      <PopUp close={() => context.setScreen({ screen: "main" })}>
        <div>
          <h1>Coming Soon</h1>
        </div>
      </PopUp>
    </div>
  );
};

const mainScreens: MainScreensType = {
  main: Home,
  weapons: Weapons,
  inventory: Inventory,
  goals: Goals,
  collections: Collections,
  messages: Messages,
  adventure: Adventure,
  arena: Arena,
  market: ComingSoon,
  aliance: ComingSoon,
  studio: ComingSoon,
  game: Game,
};

export const Main = ({ playerId }: { playerId: string }) => {
  const { data, error, mutate } = useSWR(`/api/players/${playerId}`, fetcher);
  // const error = null;
  // const data = { server: testServer, player: testPlayer };
  // const mutate = async () => {};
  const [screen, setScreen] = useState<mainScreenState>({ screen: "main" });

  const CurrentScreen = mainScreens[screen.screen];

  if (error || !data) {
    return (
      <div className="MainContainer" data-testid="main-screen-error">
        <h1>ERROR</h1>
      </div>
    );
  }
  const context: GameContextType = {
    player: data.player,
    server: data.server,
    mutate: mutate,
    screen: screen,
    setScreen: setScreen,
  };

  return (
    <GameContext.Provider value={context}>
      <CurrentScreen />
    </GameContext.Provider>
  );
};
