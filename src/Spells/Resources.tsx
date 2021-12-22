import React, { useContext } from "react";
import "./Resources.scss";
// Types
import {
  IResource,
  IOwnedResource,
  ISpellUpdateResource,
} from "../utils/types";
import { findOwnedResource, findResource } from "../utils/helpers";
import { GameContext } from "../App";
// Utils
// Components

const Resource = ({ resource }: { resource: IOwnedResource }) => {
  return (
    <div className="Resource" aria-label="top_resource">
      {resource.name}: {resource.quantity}
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
    const resource = playerResources.find((r: IOwnedResource) => r.id === s[0]);
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
export const Resources = ({ resources }: { resources: IOwnedResource[] }) => {
  const existing = resources.filter((r: IOwnedResource) => r.quantity > 0);
  return (
    <div className="Resources" aria-label="top_resources">
      {existing.map((r: IOwnedResource, i: number) => (
        <Resource resource={r} key={i} />
      ))}
    </div>
  );
};
