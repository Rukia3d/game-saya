import React, { useContext, useState } from "react";
import useSWR from "swr";
import { fetcher } from "./utils/helpers";
import "./Main.scss";
import { GameContextType, GameContext } from "./App";
import { Arcana } from "./Arcana";
import { Story } from "./Story";
import { Endless } from "./Endless";
import { Spells } from "./Spells";
import { Arena } from "./Arena";
import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";
import { IArenaEventWithTime, IEvent, IStory } from "../api/engine/types";
import { Game } from "./Game";
import { Legend } from "./Legend";
import { Inventory } from "./Inventory";
import { Messages } from "./Messages";
import { Goals } from "./Goals";
import { Agora } from "./Agora";

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
  | "goals"
  | "agora"
  | "aliance"
  | "additional"
  | "game";

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

export const ComingSoon = ({
  arcana,
  setArcana,
  setScreen,
}: {
  arcana: number | null;
  setArcana: (n: number | null) => void;
  setScreen: (n: mainScreenState) => void;
}) => {
  return (
    <div className="ComingSoon">
      <TopMenu />
      <PopUp close={() => setScreen("menus")}>
        <div>
          <h1>Coming Soon</h1>
        </div>
      </PopUp>
    </div>
  );
};

const mainScreens: MainScreensType = {
  menus: Menus,
  arcana: Arcana,
  story: Story,
  endless: Endless,
  spells: Spells,
  arena: Arena,
  game: Game,
  legend: Legend,
  inventory: Inventory,
  messages: Messages,
  goals: Goals,
  agora: Agora,
  aliance: ComingSoon,
  additional: ComingSoon,
  quest: ComingSoon,
  creation: ComingSoon,
};

export const Main = ({ playerId }: { playerId: string }) => {
  const { data, error, mutate } = useSWR(`/api/players/${playerId}`, fetcher);
  const [screen, setScreen] = useState<mainScreenState>("menus");
  const [arcana, setArcana] = useState<number | null>(null);
  const [game, setGame] = useState<
    IStory | IEvent | IArenaEventWithTime | null
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
    mutate: mutate,
    game: game,
    setGame: setGame,
  };

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

  return (
    <div className="Inventory">
      <div className="IconCoins">
        <button onClick={() => setScreen("inventory")}>Show inventory</button>
      </div>
      <div className="IconSpells">
        <button onClick={() => setScreen("spells")}>Show spells</button>
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
        <button onClick={() => setScreen("goals")}>Show goals</button>
      </div>
      <div className="IconMessage">
        <button onClick={() => setScreen("messages")}>Show messages</button>
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
            <button onClick={() => setArcana(n)}>Show adventure</button>
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
