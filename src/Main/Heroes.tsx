import React from "react";
import "./Heroes.css";
// Types
// Utils
// Components
import { TopMenu } from "../UI/TopMenu";
import { HeroesSelection } from "../Heroes/HeroesSelection";

export const Heroes = () => {
  return (
    <div className="Heroes">
      <div className="HeroesBackgroundBorder">
        <img
          className="HeroesBackground"
          src="../img/garden_background.png"
          alt="heroes_background"
        />
      </div>
      <TopMenu />
      <HeroesSelection />
    </div>
  );
};
