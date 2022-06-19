import { useContext, useState } from "react";
import { IEvent, IStory } from "../../api/engine/types";
import { GameContext } from "../App";
import { Game } from "../Game/Game";
import { GameLevels } from "../Game/GameLevels";
import { EndlessLevels } from "../Game/EndlessLevels";
import { CloseButton } from "../UIElements/UIButtons";

import { ElementEvent } from "./ElementEvent";
import { ElementLegend } from "./ElementLegend";
import { ElementQuest } from "./ElementQuests";
import { ElementSpells } from "./ElementSpells";
import { ElementStory } from "./ElementStory";

export const Element = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.player ||
    !context.setElement ||
    context.element === null
  ) {
    throw new Error("No data in context");
  }

  const close = () => {
    context.setElement(null);
    context.changeMainScreen("main");
  };
  return (
    <>
      <CloseButton onClick={close} />
      <div className="Content">
        <ElementStory />
        <ElementEvent />
        <ElementQuest />
      </div>
    </>
  );
};

export type elementScreenState =
  | "game"
  | "gameLevels"
  | "endlessLevels"
  | "spells"
  | "legend"
  | "element";

type ElementScreensType = {
  [key in elementScreenState]: React.FC;
};
const elementScreens: ElementScreensType = {
  element: Element,
  game: Game,
  gameLevels: GameLevels,
  endlessLevels: EndlessLevels,
  spells: ElementSpells,
  legend: ElementLegend,
};

export const Elements = () => {
  const [selected, setSelected] = useState<elementScreenState>("element");
  const [game, setGame] = useState<IStory | IEvent | null>(null);
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  context.changeElementScreen = setSelected;
  context.game = game;
  context.setGame = setGame;

  const CurrentScreen = elementScreens[selected];
  return (
    <div className="Element" data-testid="element-screen">
      <CurrentScreen />
    </div>
  );
};
