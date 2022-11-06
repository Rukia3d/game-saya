import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "./utils/helpers";
import "./Main.scss";
import { GameContextType, GameContext } from "./App";

import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";
import { IArenaEventWithTime, IEndless, IStory } from "../api/engine/types";
import { Home } from "./Home";
import { Weapons } from "./Weapons";
import { Inventory } from "./Inventory";
import { Goals } from "./Goals";
import { Arena } from "./Arena";
import { testPlayer, testServer } from "./utils/testDBPlayer";
import { Collections } from "./Collections";
import { Messages } from "./Messages";
import { Adventures } from "./Adventures";

export type mainScreenState =
  | "main"
  | "game"
  | "weapons"
  | "inventory"
  | "goals"
  | "collections"
  | "messages"
  | "adventure"
  | "arena"
  | "market"
  | "aliance"
  | "studio";

type MainScreensType = {
  [key in mainScreenState]: React.FC<{
    setScreen: (n: mainScreenState) => void;
  }>;
};

export const ComingSoon = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  return (
    <div className="ComingSoon">
      <TopMenu />
      <PopUp close={() => setScreen("main")}>
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
  adventure: Adventures,
  arena: Arena,
  market: ComingSoon,
  aliance: ComingSoon,
  studio: ComingSoon,
  game: ComingSoon,
};

export const Main = ({ playerId }: { playerId: string }) => {
  const { data, error, mutate } = useSWR(`/api/players/${playerId}`, fetcher);
  // const error = null;
  // const data = { server: testServer, player: testPlayer };
  // const mutate = async () => {};
  const [screen, setScreen] = useState<mainScreenState>("main");
  const [game, setGame] = useState<
    IStory | IEndless | IArenaEventWithTime | null
  >(null);

  const CurrentScreen = mainScreens[screen];

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
    game: game,
    mutate: mutate,
    setGame: setGame,
  };

  return (
    <GameContext.Provider value={context}>
      <CurrentScreen setScreen={setScreen} />
    </GameContext.Provider>
  );
};
