import React, { useContext } from "react";
import { GameContext } from "../App";
import "./Spells.scss";
// Types
import { ISpell, ISpellUpdate } from "../utils/types";
// Utils
import { removeResources } from "../utils/resourceLogic";
import { updatePlayerSpell } from "../utils/spellslogic";
// Components
import { SpellUpdates } from "./SpellUpdates";
import { SpellDescription } from "./SpellDescription";
import { CloseButton } from "../UI/CloseButton";

export const SpellLibrary = ({
  item,
  setForge,
}: {
  item: ISpell;
  setForge: (s: null | ISpell) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState?.player) {
    throw new Error("No data in context");
  }
  const updates = context.gameState.player.spellUpdates;
  const resources = context.gameState.player.resources;
  const applicableUpdates = updates.filter(
    (s: ISpellUpdate) =>
      s.element === item.element && item.updates.indexOf(s) === -1
  );

  const updateSpell = (update: ISpellUpdate) => {
    if (context.gameState && context.gameState.player) {
      const newPlayyerWithSpell = updatePlayerSpell(
        context.gameState.player,
        item,
        update
      );
      const newPlayerRemovedResources = {
        ...newPlayyerWithSpell,
        resources: removeResources(update.resource_base, resources),
      };

      context.setGameState({
        ...context.gameState,
        player: newPlayerRemovedResources,
      });
    }
  };
  return (
    <div className="ElementSpellUpdates">
      <CloseButton onClick={() => setForge(null)} />
      <SpellDescription spell={item} />
      <SpellUpdates
        spellUpgrades={applicableUpdates}
        updateSpell={updateSpell}
      />
    </div>
  );
};
