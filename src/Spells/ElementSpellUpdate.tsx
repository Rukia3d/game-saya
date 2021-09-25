import React, { useContext } from "react";
import "./ElementSpells.css";
import { GameContext } from "../App";
import {
  OwnedResource,
  Resource,
  SpellUpdate,
  SpellUpdateResource,
} from "../utils/types";
export const ElementSpellUpdate = ({
  update,
  updateSpell = () => {},
  canUpdate = false,
}: {
  update: SpellUpdate;
  updateSpell?: (s: SpellUpdate) => void;
  canUpdate?: boolean;
}) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.gameState.player ||
    !context.gameState.player.resources ||
    !context.gameState.resources
  ) {
    throw new Error("No data in context");
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
        {update.resource_base.map((s: SpellUpdateResource, i: number) => (
          <div key={i}>
            <div style={{ color: isEnough(s) ? "green" : "red" }}>{`${
              getResource(s).name
            }: ${s[1]}`}</div>
          </div>
        ))}
      </div>
      {readyToUpdate(update) && canUpdate ? (
        <button data-testid="update_button" onClick={() => updateSpell(update)}>
          Update
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};
