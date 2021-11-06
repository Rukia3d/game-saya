import React, { useContext } from "react";
import { GameContext } from "../App";
import "./AdditionScreen.css";
// Types
import { IHero, ISpell, ISpellUpdate } from "../utils/types";
// Utils
// Components
import { AdditionHero } from "./AdditionHero";
import { AdditionUpdate } from "./AdditionUpdate";

type additionScreenState = "character" | "update";

export interface CurrentScreenProps {
  item: IHero | ISpellUpdate;
  playerSpells: ISpell[];
  setAdditionScreen: (s: null | IHero | ISpellUpdate) => void;
}

type AdditionScreensType = {
  [key in additionScreenState]: ({
    props,
  }: {
    props: CurrentScreenProps;
  }) => JSX.Element;
};

export const AdditionScreen = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.addition ||
    !context.setAdditionScreen ||
    !context.gameState
  ) {
    throw new Error("No data");
  }
  const item = context.addition;
  const screen = "resource_base" in context.addition ? "update" : "character";

  const additionScreens: AdditionScreensType = {
    character: AdditionHero,
    update: AdditionUpdate,
  };
  const CurrentScreen = additionScreens[screen];

  const items: CurrentScreenProps = {
    item: item,
    playerSpells: context.gameState?.player.spells,
    setAdditionScreen: context.setAdditionScreen,
  };
  return <CurrentScreen props={items} />;
};
