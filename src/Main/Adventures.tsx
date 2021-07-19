import React, { useContext } from "react";
import { GameContext } from "../App";
import { TopMenu } from "../UI/TopMenu";
import { Adventure } from "../utils/types";
import "./Adventures.css";

const AdventureImage = ({ adventure }: { adventure: Adventure }) => {
  return (
    <div className={`Adventure_${adventure.form}_border`}>
      <div className={`Adventure_${adventure.form}`}>
        <div className="AdventureName">{adventure.name}</div>
        <img
          style={{ opacity: adventure.open ? 1 : 0.3 }}
          src={`../img/Adventures/${adventure.image}`}
          alt={`adventure_${adventure.id}`}
        ></img>
      </div>
    </div>
  );
};
export const Adventures = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.adventures) {
    throw new Error("No data");
  }
  const adventures = context.gameState.adventures;
  const selectAdventure = (a: Adventure) => {
    if (a.open) {
      context.setAdventure(a);
    }
  };
  return (
    <div className="Adventures" aria-label="adventures_background">
      <TopMenu />
      <div className="AdventuresList">
        {adventures.map((a: Adventure, i: number) => (
          <div
            aria-label={`adventure_border_${a.id}`}
            key={i}
            onClick={() => (a.stories ? selectAdventure(a) : null)}
          >
            <AdventureImage adventure={a} />
          </div>
        ))}
      </div>
    </div>
  );
};
