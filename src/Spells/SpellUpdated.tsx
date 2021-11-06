import React, { useContext } from "react";
import { GameContext } from "../App";
import "./Spells.css";
// Types
import { ISpellUpdate } from "../utils/types";
// Utils
// Components

export const SpellUpdated = ({ update }: { update: ISpellUpdate }) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.gameState.player ||
    !context.gameState.player.spellUpdates
  ) {
    throw new Error("No data in context");
  }
  return <div>Update: {update.name}</div>;
};
