import React, { useContext, useState } from "react";
import useSWR from "swr";
import { fetcher } from "./utils/helpers";
import "./Main.scss";
import { GameContextType, GameContext } from "./App";
import { Arcana } from "./Arcana";
import { Story } from "./Story";

export type mainScreenState =
  | "menus"
  | "arcana"
  | "story"
  | "endless"
  | "quest"
  | "spells"
  | "legend"
  | "creation"
  | "arena"
  | "inventory"
  | "messages"
  | "missions"
  | "agora"
  | "aliance"
  | "additional";

type MainScreensType = {
  [key in mainScreenState]: React.FC<{
    arcana: number | null;
    setArcana: (n: number | null) => void;
    setScreen: (n: mainScreenState) => void;
  }>;
};

export const Menus = ({
  arcana,
  setArcana,
  setScreen,
}: {
  arcana: number | null;
  setArcana: (n: number | null) => void;
  setScreen: (n: mainScreenState) => void;
}) => {
  return (
    <div className="Main">
      <LeftMenu arcana={arcana} setScreen={setScreen} />
      <CenterMenu arcana={arcana} setArcana={setArcana} />
      <RightMenu setScreen={setScreen} />
    </div>
  );
};

const mainScreens: MainScreensType = {
  menus: Menus,
  arcana: Arcana,
  story: Story,
  endless: Arcana,
  quest: Arcana,
  spells: Arcana,
  legend: Arcana,
  creation: Arcana,
  arena: Arcana,
  inventory: Arcana,
  messages: Arcana,
  missions: Arcana,
  agora: Arcana,
  aliance: Arcana,
  additional: Arcana,
};

export const Main = ({ playerId }: { playerId: string }) => {
  const { data, error, mutate } = useSWR(`/api/players/${playerId}`, fetcher);
  const [screen, setScreen] = useState<mainScreenState>("menus");
  const [arcana, setArcana] = useState<number | null>(null);

  const CurrentScreen = mainScreens[screen];

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
  };
  console.log("screen", screen);
  console.log("arcana", arcana);
  return (
    <GameContext.Provider value={context}>
      <CurrentScreen
        arcana={arcana}
        setArcana={setArcana}
        setScreen={setScreen}
      />
    </GameContext.Provider>
  );
};

export const LeftMenu = ({
  arcana,
  setScreen,
}: {
  arcana: number | null;
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  console.log("left menu arcana", arcana);
  return (
    <div className="Inventory">
      <div className="IconMessage">
        <button>Show messages</button>
      </div>
      <div className="IconCoins">
        <button>Show inventory</button>
      </div>
      <div className="AdventureSelected">
        {arcana !== null ? (
          <button onClick={() => setScreen("arcana")}>
            Current Arcana : {context.player.arcanas[arcana].arcanaName}
          </button>
        ) : (
          <div>Not Selected</div>
        )}
      </div>
      <div className="IconGoals">
        <button>Show goals</button>
      </div>
      <div className="IconAbout">
        <button>Show about</button>
      </div>
    </div>
  );
};

export const CenterMenu = ({
  arcana,
  setArcana,
}: {
  arcana: number | null;
  setArcana: (n: number | null) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  return (
    <div className="Adventures">
      {[0, 1, 2, 3].map((n: number) => (
        <div className="Adventure" key={n}>
          {n < context.player.arcanas.length && n !== arcana ? (
            <button onClick={() => setArcana(n)}>Adventure</button>
          ) : null}
          {n === arcana ? <div>This selected</div> : null}
          {n >= context.player.arcanas.length ? <div>This empty</div> : null}
        </div>
      ))}
    </div>
  );
};

export const RightMenu = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const screens: mainScreenState[] = [
    "arena",
    "aliance",
    "agora",
    "additional",
  ];
  return (
    <div className="Menu">
      {screens.map((s: mainScreenState, n: number) => (
        <div className="MenuCard" key={n}>
          <button onClick={() => setScreen(s)}>{s}</button>
        </div>
      ))}
    </div>
  );
};
