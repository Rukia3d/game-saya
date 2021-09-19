import React, { useContext } from "react";
import "./ElementSpells.css";

import { GameContext } from "../App";

import { Spell, SpellUpdate } from "../utils/types";
import { CloseButton } from "../UI/CloseButton";
import { removeResources } from "../utils/resourceLogic";
import { updatePlayerSpell } from "../utils/gamelogic";
import { ElementSpellUpdates } from "./ElementSpellUpdates";
import { ElementSpellDescription } from "./ElementSpellDescription";

export const ElementSpellLibrary = ({
  item,
  setForge,
}: {
  item: Spell;
  setForge: (s: null | Spell) => void;
}) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.gameState.player ||
    !context.gameState.player.spellUpdates ||
    !context.gameState.player.resources ||
    !context.gameState.spellUpdates ||
    !context.gameState.resources
  ) {
    throw new Error("No data in context");
  }
  const updates = context.gameState.player.spellUpdates;
  const resources = context.gameState.player.resources;
  const applicableUpdates = updates.filter(
    (s: SpellUpdate) =>
      s.element === item.element && item.updates.indexOf(s.id) === -1
  );

  const updateSpell = (update: SpellUpdate) => {
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
      <ElementSpellDescription card={item} />
      <ElementSpellUpdates
        spellUpgrades={applicableUpdates}
        updateSpell={updateSpell}
      />
    </div>
  );
};
