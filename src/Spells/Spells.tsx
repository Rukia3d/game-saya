import React, { useContext } from "react";
import "./Spells.css";

import { GameContext } from "../App";

import {
  OwnedResource,
  Resource,
  Spell,
  SpellUpdate,
  SpellUpdateResource,
} from "../utils/types";
import { CloseButton } from "../UI/CloseButton";
import { removeResources } from "../utils/resourceLogic";
import { updatePlayerSpell } from "../utils/gamelogic";
const MAXUPGRADES = 5;

const HeroSpellDescription = ({ card }: { card: Spell }) => {
  return (
    <div>
      <h3 aria-label="card_name_header">{card.name}</h3>
      Strength: {card.strength}
      {card.element ? "Element " + card.element : null}
      {card.selected ? "Equiped" : null}
      {card.mana ? "Special" : null}
    </div>
  );
};

const HeroSpellUpdates = ({
  spellUpgrades,
  updateSpell,
}: {
  spellUpgrades: SpellUpdate[];
  updateSpell: (s: SpellUpdate) => void;
}) => {
  return (
    <div>
      {spellUpgrades.map((s: SpellUpdate, i: number) => (
        <HeroSpellUpdate update={s} key={i} updateSpell={updateSpell} />
      ))}
    </div>
  );
};

export const HeroSpellUpdate = ({
  update,
  updateSpell = () => {},
}: {
  update: SpellUpdate;
  updateSpell?: (s: SpellUpdate) => void;
}) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.gameState.player ||
    !context.gameState.player.resources ||
    !context.gameState.resources
  ) {
    throw new Error("No data");
  }
  const playerResources = context.gameState.player.resources;
  const resources = context.gameState.resources;
  const getResource = (s: SpellUpdateResource) => {
    const resource = resources.find((r: Resource) => r.id === s[0]);
    if (!resource) throw new Error("Can't find a resource to display");
    return resource;
  };

  const isEnough = (s: SpellUpdateResource) => {
    const resource = playerResources.find((r: OwnedResource) => r.id === s[0]);
    const needed = s[1];
    if (resource && resource.quantity >= needed) {
      return true;
    }
    return false;
  };

  const readyToUpdate = (u: SpellUpdate) => {
    const res: boolean[] = u.resource_base.map((r: SpellUpdateResource) =>
      isEnough(r)
    );
    return res.every((r: boolean) => r === true);
  };

  return (
    <div className="HeroSpellUpdate">
      <h3>{update.name}</h3>
      <div>{update.description}</div>
      <div>
        {update.resource_base.map((s: SpellUpdateResource) => (
          <div>
            <div style={{ color: isEnough(s) ? "green" : "red" }}>{`${
              getResource(s).name
            }: ${s[1]}`}</div>
          </div>
        ))}
      </div>
      {readyToUpdate(update) ? (
        <button onClick={() => updateSpell(update)}>Update</button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export const Spells = ({
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
    throw new Error("No data");
  }
  const updates = context.gameState.player.spellUpdates;
  const resources = context.gameState.player.resources;
  const applicableUpdates = updates.filter(
    (s: SpellUpdate) => s.element === item.element
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
    <div className="ForgeCard">
      <CloseButton onClick={() => setForge(null)} />
      <HeroSpellDescription card={item} />
      <HeroSpellUpdates
        spellUpgrades={applicableUpdates}
        updateSpell={updateSpell}
      />
    </div>
  );
};
