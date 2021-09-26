import React, { useContext } from "react";
import "./ElementSpells.css";
import { GameContext } from "../App";
import { SpellUpdate } from "../utils/types";

export const ElementSpellUpdated = ({ update }: { update: SpellUpdate }) => {
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
