import React, { useContext } from "react";
import { GameContext } from "../App";
import "./Adventures.css";
// Types
import { IAdventure } from "../utils/types";
// Utils
// Components
import { Lock } from "../UI/Lock";
import { TopMenu } from "../UI/TopMenu";

const AdventureImage = ({ adventure }: { adventure: IAdventure }) => {
  return (
    <div className={`Adventure_${adventure.form}_border`}>
      <div className={`Adventure_${adventure.form}`}>
        <div className="AdventureName">{adventure.name}</div>
        {!adventure.open ? <Lock /> : null}
        <img
          src={`../img/Adventures/${adventure.image}`}
          alt={`adventure_${adventure.id}`}
        />
      </div>
    </div>
  );
};

const Adventure = ({
  adventure,
  selectAdventure,
}: {
  adventure: IAdventure;
  selectAdventure: (a: IAdventure) => void;
}) => {
  return (
    <div
      aria-label={`adventure_border_${adventure.id}`}
      onClick={() =>
        adventure.storyGroups ? selectAdventure(adventure) : null
      }
    >
      <AdventureImage adventure={adventure} />
    </div>
  );
};

export const Adventures = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.player.adventures) {
    throw new Error("No data");
  }

  const selectAdventure = (a: IAdventure) => {
    if (a.open) {
      context.setAdventure(a);
    }
  };
  return (
    <div className="Adventures" aria-label="adventures_background">
      <TopMenu />
      <div className="AdventuresList">
        {context.gameState.player.adventures.map((a: IAdventure, i: number) => (
          <Adventure selectAdventure={selectAdventure} adventure={a} key={i} />
        ))}
      </div>
    </div>
  );
};
