import React, { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import short from "short-uuid";
import "./App.css";
// Types
import {
  IHero,
  GameState,
  IStory,
  ISpellUpdate,
  IEnemy,
  ISpell,
  IPlayerAdventure,
  IPlayerHero,
  IEnemyFight,
  IPlayerSpell,
  IPlayerSpellUpdate,
} from "./utils/types";
// Utils
import { fetcher } from "./utils/helpers";
// Components
import { AdditionScreen } from "./UI/AdditionScreen";
import { Main } from "./Main/Main";
import { Start } from "./Main/Start";
import { Stories } from "./Stories/Stories";
import { GenericStory } from "./Main/GenericStory";
import { useSWRConfig } from "swr";

// Quick start with flickrBase58 format
short.generate(); // 73WakrfVbNJBaAmhQtEeDv

export interface GameContextType {
  adventure: IPlayerAdventure | null;
  setAdventure: (a: IPlayerAdventure) => void;
  story: IStory | null;
  setStory: (s: IStory | null) => void;
  gameState: GameState | null;
  setGameState: (g: GameState) => void;
  addition: IHero | IPlayerHero | ISpellUpdate | ISpell | IEnemy | null;
  setAdditionScreen: (
    c:
      | IPlayerHero
      | IPlayerSpellUpdate
      | IPlayerSpell
      | IEnemyFight
      | IHero
      | null
  ) => void;
  backToMain: () => void;
}

export const GameContext = React.createContext<undefined | GameContextType>(
  undefined
);

function App() {
  let playerId: string =
    window.localStorage.getItem("playerId") || short.generate();
  const { mutate } = useSWRConfig();
  mutate("/api/users", { id: playerId }, false);
  const { data, error } = useSWRImmutable(
    `/api/users/?userId=${playerId}`,
    fetcher
  );
  window.localStorage.setItem("playerId", playerId);

  const [showStart, setShowStart] = useState(true);
  const [adventure, setAdventure] = useState<null | IPlayerAdventure>(null);
  const [story, setStory] = useState<null | IStory>(null);
  const [gameState, setGameStateOrigin] = useState<GameState>(data);
  const [addition, setAdditionScreen] = useState<
    IHero | ISpellUpdate | ISpell | IEnemy | null
  >(null);

  const setGameState = (state: GameState) => {
    if (state) {
      // console.log(
      //   //@ts-ignore
      //   "LOG",
      //   JSON.parse(JSON.stringify(state.player))
      // );
      setGameStateOrigin(state);
    }
  };

  useEffect(() => {
    setGameState(data);
  }, [data]);

  const backToMain = () => {
    setAdventure(null);
    setStory(null);
  };

  const context: GameContextType = {
    adventure: adventure,
    setAdventure: setAdventure,
    story: story,
    setStory: setStory,
    gameState: gameState,
    setGameState: setGameState,
    addition: addition,
    setAdditionScreen: setAdditionScreen,
    backToMain: backToMain,
  };

  if (error || !data) {
    return (
      <GameContext.Provider value={context}>
        <div className="App">
          <Start setShowStart={setShowStart} />
        </div>
      </GameContext.Provider>
    );
  }

  return (
    <GameContext.Provider value={context}>
      <div className="App">
        {showStart ? <Start setShowStart={setShowStart} /> : <Main />}
        {story ? <GenericStory /> : null}
        {adventure ? <Stories /> : null}
        {addition ? <AdditionScreen /> : null}
      </div>
    </GameContext.Provider>
  );
}

export default App;
