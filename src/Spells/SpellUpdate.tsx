import React, { useContext } from "react";
import { GameContext } from "../App";
import "./Spells.scss";
// Types
import {
  IOwnedResource,
  IResource,
  ISpellUpdate,
  ISpellUpdateResource,
} from "../utils/types";
import { findResource } from "../utils/helpers";
import { Resource, ResourcesImages } from "./Resources";
// Utils
import useLongPress from "../hooks/useLongPress";
import { spellUpdates } from "../utils/testobjects";
// Components

export const SpellUpdate = ({
  update,
  updateSpell,
  distructSpell,
  withUpdate,
  updateInfo,
}: {
  update: ISpellUpdate;
  updateSpell?: (s: ISpellUpdate) => void;
  distructSpell?: (s: ISpellUpdate) => void;
  withUpdate?: boolean;
  updateInfo?: (s: ISpellUpdate) => void;
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

  const readyToDistruct = (u: ISpellUpdate) => {
    //TODO:
    return withUpdate && distructSpell && true;
  };

  const readyToUpdate = (u: ISpellUpdate) => {
    const res: boolean[] = u.resource_base.map((r: ISpellUpdateResource) =>
      isEnough(r)
    );
    const allResources = res.every((r: boolean) => r === true);
    return allResources && withUpdate && updateSpell;
  };
  const updateResource = update.resource_base.map((s: ISpellUpdateResource) =>
    findResource(resources, s)
  );

  const onLongPress = () => {
    if (updateInfo) {
      console.log("longpress is triggered - SetInfo");
      updateInfo(update);
    }
  };

  const onClick = () => {
    console.log("Onclick");
    if (updateSpell) {
      console.log("click is triggered");
      updateSpell(update);
    }
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const longPressEvent = useLongPress({ onLongPress, onClick }, defaultOptions);
  return (
    <div className="SpellUpdate">
      <div
        className={`HeroSpellUpdateBorder ${
          readyToUpdate(update) ? "Partial" : "Full"
        }`}
      >
        <div className="HeroSpellUpdate" {...longPressEvent}>
          <div className="UpdateImage">
            <img
              src={`../img/Spells/${update.element}/update_${update.id}.png`}
              alt={`update-${update.id}`}
            />
          </div>
          <div className="UpdateData">
            <div className="UpdateName">{update.name}</div>
            <div className="UpdateMana" aria-label="update-mana">
              Mana: {update.mana}
            </div>
            {/* <div className="UpdateDescription">{update.description}</div> */}
            <div className="UpdateResource" aria-label="update-resource">
              <ResourcesImages resources={updateResource} />
              {/* {update.resource_base.map((s: ISpellUpdateResource, i: number) => (
              <div key={i} aria-label="UpdateResource">
                <div style={{ color: isEnough(s) ? "green" : "red" }}>{`${
                  findResource(resources, s).name
                }: ${currentAmount(s)} of ${s[1]}`}</div>
              </div>
            ))} */}
            </div>
          </div>
        </div>
      </div>
      {withUpdate ? (
        <div className="UpdateActions">
          {readyToUpdate(update) ? (
            <button
              data-testid="update_button"
              onClick={() => (updateSpell ? updateSpell(update) : null)}
            >
              Update
            </button>
          ) : (
            <div></div>
          )}
        </div>
      ) : null}
    </div>
  );
};
