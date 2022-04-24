import React from "react";
import "../Main/Library.scss";
import { capitalizeFirstLetter } from "../utils/helpers";
// Types
import { IHero } from "../utils/types";
// Utils
// Components

export const LibraryHero = ({ hero }: { hero: IHero }) => {
  return (
    <div className="LibraryHeroBorder">
      <div className="LibraryHero">
        <h3>{capitalizeFirstLetter(hero.name)}</h3>
        <div>{hero.description}</div>
      </div>
    </div>
  );
};
