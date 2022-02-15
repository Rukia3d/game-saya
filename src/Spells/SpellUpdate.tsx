import React, { useContext } from "react";
import { GameContext } from "../App";
import "./Spells.scss";
// Types
import {
  IPlayerResource,
  IPlayerSpellUpdate,
  IResource,
  ISpellUpdate,
} from "../utils/types";
import { findResource } from "../utils/helpers";
import { ResourcesImages } from "./Resources";
// Utils
import useLongPress from "../hooks/useLongPress";
// Components

export const SpellUpdate = ({
  update,
  updateSpell,
  distructSpell,
  withUpdate,
  updateInfo,
}: {
  update: IPlayerSpellUpdate;
  updateSpell?: (s: IPlayerSpellUpdate) => void;
  distructSpell?: (s: IPlayerSpellUpdate) => void;
  withUpdate?: boolean;
  updateInfo?: (s: IPlayerSpellUpdate) => void;
}) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.gameState.player ||
    !context.gameState.player.resources ||
    !context.gameState.game.resources
  ) {
    throw new Error("No data in context");
  }
  const playerResources = context.gameState.player.resources;
  const resources = context.gameState.game.resources;

  const isEnough = (s: IPlayerResource) => {
    const resource = playerResources.find(
      (r: IPlayerResource) => r.id === s.id
    );
    const needed = s.quantity;
    if (resource && resource.quantity >= needed) {
      return true;
    }
    return false;
  };

  const currentAmount = (s: IPlayerResource) => {
    const resource = playerResources.find(
      (r: IPlayerResource) => r.id === s.id
    );
    return resource ? resource.quantity : 0;
  };

  const readyToDistruct = (u: ISpellUpdate) => {
    //TODO:
    return withUpdate && distructSpell && true;
  };

  const readyToUpdate = (u: IPlayerSpellUpdate) => {
    //   const res: boolean[] = u.resource_base.map((r: IResource) => isEnough(r));
    //   const allResources = res.every((r: boolean) => r === true);
    //   return allResources && withUpdate && updateSpell;
    return true;
  };
  const updateResource = update.resource_base;
  // const updateResource = update.resource_base.map((s: IResource) =>
  //   findResource(resources, s)
  // );

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
              src={`../img/Updates/${update.school}/update_${update.id}.png`}
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
