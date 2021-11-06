import React, { useContext } from "react";
import { GameContext } from "../App";
import "./Spells.css";
// Types
import {
  IOwnedResource,
  IResource,
  ISpellUpdate,
  ISpellUpdateResource,
} from "../utils/types";
// Utils
// Components

export const SpellUpdate = ({
  update,
  updateSpell = () => {},
  canUpdate = false,
}: {
  update: ISpellUpdate;
  updateSpell?: (s: ISpellUpdate) => void;
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

  const getResource = (s: ISpellUpdateResource) => {
    const resource = resources.find((r: IResource) => r.id === s[0]);
    if (!resource) throw new Error("Can't find a resource to display");
    return resource;
  };

  const isEnough = (s: ISpellUpdateResource) => {
    const resource = playerResources.find((r: IOwnedResource) => r.id === s[0]);
    const needed = s[1];
    if (resource && resource.quantity >= needed) {
      return true;
    }
    return false;
  };

  const readyToUpdate = (u: ISpellUpdate) => {
    const res: boolean[] = u.resource_base.map((r: ISpellUpdateResource) =>
      isEnough(r)
    );
    return res.every((r: boolean) => r === true);
  };

  return (
    <div className="HeroSpellUpdate">
      <h3>{update.name}</h3>
      <div>{update.description}</div>
      <div>
        {update.resource_base.map((s: ISpellUpdateResource, i: number) => (
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
