import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "./utils/helpers";
import "./Main.scss";
import { GameContextType, GameContext } from "./App";

import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";
import { IArenaEventWithTime, IEndless, IStory } from "../api/engine/types";
import { Home } from "./Home";

export type mainScreenState =
  | "main"
  | "game"
  | "weapons"
  | "inventory"
  | "goals"
  | "collections"
  | "messages"
  | "element"
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
  game: ComingSoon,
  weapons: ComingSoon,
  inventory: ComingSoon,
  goals: ComingSoon,
  collections: ComingSoon,
  messages: ComingSoon,
  element: ComingSoon,
  arena: ComingSoon,
  market: ComingSoon,
  aliance: ComingSoon,
  studio: ComingSoon,
};

export const Main = ({ playerId }: { playerId: string }) => {
  const { data, error, mutate } = useSWR(`/api/players/${playerId}`, fetcher);
  const [screen, setScreen] = useState<mainScreenState>("main");
  const [game, setGame] = useState<
    IStory | IEndless | IArenaEventWithTime | null
  >(null);

  const CurrentScreen = mainScreens[screen];

  if (error || !data) {
    return (
      <div className="Main" data-testid="main-screen-error">
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
