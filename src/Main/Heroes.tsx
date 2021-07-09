import React from "react";
import "./Heroes.css";
import { Character } from "../utils/types";

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

export const Heroes = ({ characters }: { characters: Character[] }) => {
  const activeHeroes = characters.filter((c: Character) => c.state);
  return (
    <div className="Heroes">
      <h2>Your Heroes</h2>
      <div className="HeroesPresent">
        {characters.map((c: Character, i: number) => (
          <div key={i}>
            <img className="HeroImage" src={c.image} alt={`hero_${c.id}`} />
          </div>
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
