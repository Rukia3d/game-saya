import React, { useContext } from "react";
import { GameContext } from "../App";
import "../Main/Library.scss";
// Types
import { IHero, IOwnedResource } from "../utils/types";
// Utils
// Components
import { ResourcesImages } from "../Spells/Resources";

export const LibraryResources = ({ hero }: { hero: IHero }) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }
  const ownedResources = context.gameState.player.resources;
  const heroResources = ownedResources.filter(
    (r: IOwnedResource) => r.element === hero.element
  );
  return (
    <div className="LibraryResources">
      {<ResourcesImages resources={heroResources} />}
    </div>
  );
};
