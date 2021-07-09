import React, { useContext } from "react";
import "./Heroes.css";
import { Character } from "../utils/types";
import { GameContext } from "../App";

const HeroIcon = ({ hero }: { hero: Character }) => {
  const stateToImage = `../img/${hero.id}_${hero.state}.jpg`;
  return (
    <div
      className="HeroIcon"
      onClick={() => console.log("clicked a character")}
    >
      <img src={stateToImage} alt={`${hero.id}_${hero.state}`} />
    </div>
  );
};

export const Heroes = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data");
  }
  const characters = context.gameState.sceneCharacters;
  const activeHeroes = characters.filter((c: Character) => c.state);
  return (
    <div className="Heroes">
      <h2>Your Heroes</h2>
      <div className="HeroesPresent">
        {characters.map((c: Character, i: number) => (
          <img
            className="HeroImage"
            src={c.image}
            alt={`hero_${c.id}`}
            key={i}
          />
        ))}
        <div className="HeroesActive">
          {activeHeroes.length > 0
            ? activeHeroes.map((c: Character, i: number) => (
                <HeroIcon key={i} hero={c} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
