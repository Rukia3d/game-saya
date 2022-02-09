import React, { useContext } from "react";
import "./Resources.scss";
// Types
import {
  IResource,
  IPlayerResource,
  ISpellUpdateResource,
} from "../utils/types";
import { findResource } from "../utils/helpers";
import { GameContext } from "../App";
// Utils
// Components

export const ResourceImage = ({ resource }: { resource: IResource }) => {
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
  const imgUrl = `../img/Resources/${resource.id}.jpg`;
  const playerResources = context.gameState.player.resources;
  const owned = playerResources.find(
    (r: IPlayerResource) => r.id === resource.id
  );
  return (
    <div
      className="ResourceImage"
      aria-label={`resource-image-${resource.id}`}
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="ResourceBadge">{owned ? owned.quantity : 0}</div>
    </div>
  );
};

export const ResourcesImages = ({ resources }: { resources: IResource[] }) => {
  return (
    <div className="ResourcesImages" aria-label="resources-images">
      {resources.map((s: IResource, i: number) => (
        <ResourceImage resource={s} key={i} />
      ))}
    </div>
  );
};

export const Resource = ({
  resource,
}: {
  resource: IPlayerResource | IResource;
}) => {
  return (
    <div className="Resource" aria-label="top_resource">
      {resource.name}: {"quantity" in resource ? resource.quantity : 0}
    </div>
  );
};

export const ResourceData = ({
  resource,
}: {
  resource: ISpellUpdateResource;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.resources) {
    throw new Error("No data in context");
  }
  const resources = context.gameState.resources;
  const playerResources = context.gameState.player.resources;
  // const owned = findOwnedResource(playerResources, resource);
  const notOwned = findResource(resources, resource);
  const commonality = () => {
    switch (notOwned.commonality) {
      case 2:
        return "Limited";
      case 3:
        return "Rare";
      case 5:
        return "Uncommon";
      case 7:
        return "Common";
      default:
        return "Very Common";
    }
  };

  const currentAmount = (s: ISpellUpdateResource) => {
    const resource = playerResources.find(
      (r: IPlayerResource) => r.id === s[0]
    );
    return resource ? resource.quantity : 0;
  };

  return (
    <div className="ResourceData" aria-label="resource_data">
      <img src={`../img/Resources/${notOwned.id}.jpg`} alt="resource_image" />
      <div>
        <div>
          {notOwned.name}: {commonality()}
        </div>
        <div aria-label="resource_requirements">
          You have {currentAmount(resource)} of {resource[1]} needed
        </div>
      </div>
    </div>
  );
};
export const ResourceDatalist = ({
  spellResources,
}: {
  spellResources: ISpellUpdateResource[];
}) => {
  return (
    <div className="ResourcesDataList">
      {spellResources.map((r: ISpellUpdateResource, i: number) => (
        <ResourceData resource={r} key={i} />
      ))}
    </div>
  );
};
export const Resources = ({
  resources,
  filter,
}: {
  resources: IPlayerResource[] | IResource[];
  filter?: "all" | "added" | "owned";
}) => {
  // all - no filtering
  // added - including quantity 0
  // owned - only non 0
  let res: IPlayerResource[] | IResource[] = [];

  switch (filter) {
    case "added":
      res = resources.filter(
        (r: IPlayerResource | IResource) => "quantity" in r
      );
      return;
    case "owned":
      res = resources.filter(
        (r: IPlayerResource | IResource) => "quantity" in r && r.quantity > 0
      );
      return;
    default:
      res = resources;
  }
  return (
    <div className="Resources">
      {res.map((r: IPlayerResource | IResource, i: number) => (
        <Resource resource={r} key={i} />
      ))}
    </div>
  );
};
