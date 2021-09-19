import React, { useContext } from "react";
import "./ElementSpells.css";
import { GameContext } from "../App";
import { SpellUpdate } from "../utils/types";

export const ElementSpellUpdated = ({ updateId }: { updateId: string }) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.gameState.player ||
    !context.gameState.player.spellUpdates
  ) {
    throw new Error("No data in context");
  }
  const update = context.gameState.player.spellUpdates.find(
    (s: SpellUpdate) => s.id === updateId
  );
  if (!update) throw new Error("Can't find an update to display");
  return <div>Update: {update.name}</div>;
};
