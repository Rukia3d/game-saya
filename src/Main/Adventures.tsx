import React, { useContext } from "react";
import { GameContext } from "../App";
import { Adventure } from "../utils/types";
import "./Adventures.css";

const AdventureImage = ({ adventure }: { adventure: Adventure }) => {
  return (
    <img
      className={`Adventure_${adventure.form}`}
      style={{ opacity: adventure.state === "closed" ? 0.5 : 1 }}
      src={`../img/Adventures/${adventure.image}`}
      alt={`adventure_${adventure.id}`}
    />
  );
};
export const Adventures = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.adventures) {
    throw new Error("No data");
  }
  const adventures = context.gameState.adventures;
  const selectAdventure = (a: Adventure) => {
    if (a.state === "open") {
      context.setAdventure(a);
    }
  };
  return (
    <div className="Adventures">
      <h2>Your Adventures</h2>
      <div className="AdventuresList">
        {adventures.map((a: Adventure, i: number) => (
          <div key={i} onClick={() => (a.stories ? selectAdventure(a) : null)}>
            <AdventureImage adventure={a} />
          </div>
        ))}
      </div>
    </div>
  );
};
