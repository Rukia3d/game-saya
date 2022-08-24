import { useContext, useState } from "react";
import { IArenaEvent, IEvent, IStory } from "../../api/engine/types";
import { GameContext } from "../App";
import { Game } from "../Game/Game";
import { GameLevels } from "../Game/GameLevels";
import { EndlessLevels } from "../Game/EndlessLevels";
import { CloseButton, SmallPopup } from "../UIElements/UIButtons";

import "./Arcanas.scss";

import { ArcanaStory } from "../Arcanas/ArcanaStory";
import { ArcanaEvent } from "../Arcanas/ArcanaEvent";
import { ArcanaQuests } from "../Arcanas/ArcanaQuests";
import { ArcanaSpells } from "../Arcanas/ArcanaSpells";
import { ArcanaLegend } from "../Arcanas/ArcanaLegend";
import { WonMaterials } from "../UIElements/WonMaterials";

export const Arcana = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    !context.setArcana ||
    context.arcana === null
  ) {
    throw new Error("No data in context");
  }

  const close = () => {
    context.setArcana(null);
    context.changeMainScreen("main");
  };
  return (
    <>
      <CloseButton onClick={close} />
      <div className="Content">
        <ArcanaStory />
        <ArcanaEvent />
        <ArcanaQuests />
      </div>
    </>
  );
};

export type arcanaScreenState =
  | "game"
  | "gameLevels"
  | "endlessLevels"
  | "spells"
  | "legend"
  | "arcana";

type arcanaScreensType = {
  [key in arcanaScreenState]: React.FC;
};
const arcanaScreens: arcanaScreensType = {
  arcana: Arcana,
  game: Game,
  gameLevels: GameLevels,
  endlessLevels: EndlessLevels,
  spells: ArcanaSpells,
  legend: ArcanaLegend,
};

export const Arcanas = () => {
  const [selected, setSelected] = useState<arcanaScreenState>("arcana");
  const [game, setGame] = useState<IStory | IEvent | null>(null);
  const [win, setWin] = useState(false);
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  context.changeArcanaScreen = setSelected;
  context.game = game;
  context.setGame = setGame;
  context.setWin = setWin;

  const closeWin = () => {
    context.setWin(false);
    if (context.game?.mode === "story") {
      context.changeArcanaScreen("gameLevels");
    }
    if (context.game?.mode === "run" || context.game?.mode === "fight") {
      context.changeArcanaScreen("endlessLevels");
    }
  };
  const CurrentScreen = arcanaScreens[selected];
  return (
    <div className="arcana" data-testid="arcana-screen">
      {win ? (
        <SmallPopup onClick={closeWin} content={<WonMaterials />} />
      ) : (
        <CurrentScreen />
      )}
    </div>
  );
};
