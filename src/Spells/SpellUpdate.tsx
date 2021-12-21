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
import { findResource } from "../utils/helpers";
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
    throw new Error(
      "No data in context"
      // context
      // context.gameState.player,
      // context.gameState.resources
    );
  }
  const playerResources = context.gameState.player.resources;
  const resources = context.gameState.resources;

  const isEnough = (s: ISpellUpdateResource) => {
    const resource = playerResources.find((r: IOwnedResource) => r.id === s[0]);
    const needed = s[1];
    if (resource && resource.quantity >= needed) {
      return true;
    }
    return false;
  };

  const currentAmount = (s: ISpellUpdateResource) => {
    const resource = playerResources.find((r: IOwnedResource) => r.id === s[0]);
    return resource ? resource.quantity : 0;
  };

  const readyToUpdate = (u: ISpellUpdate) => {
    const res: boolean[] = u.resource_base.map((r: ISpellUpdateResource) =>
      isEnough(r)
    );
    return res.every((r: boolean) => r === true);
  };
  return (
    <div className="HeroSpellUpdateBorder">
      <div className="HeroSpellUpdate">
        <div className="UpdateImage">
          <img
            src={`../img/Spells/${update.element}/${update.id}.png`}
            alt="update_image"
          />
          {readyToUpdate(update) && canUpdate ? (
            <button
              data-testid="update_button"
              onClick={() => updateSpell(update)}
            >
              Update
            </button>
          ) : (
            <div></div>
          )}
        </div>
        <div className="UpdateData">
          <div>{update.name}</div>
          <div>Mana: {update.mana}</div>
          <div>{update.description}</div>
          <div>
            {update.resource_base.map((s: ISpellUpdateResource, i: number) => (
              <div key={i}>
                <div style={{ color: isEnough(s) ? "green" : "red" }}>{`${
                  findResource(resources, s).name
                }: ${currentAmount(s)} of ${s[1]}`}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
