import React, { useContext } from "react";
import "./Heroes.css";
import { Character, Dialogue } from "../utils/types";
import { GameContext } from "../App";
import { findDialogue } from "../utils/helpers";

const HeroIcon = ({ hero }: { hero: Character }) => {
  const context = useContext(GameContext);
  if (!context || !context.setDialogue || !context.gameState) {
    throw new Error("No data");
  }

  if (!hero.dial)
    throw new Error("Loading diaglogue for hero with no dialogue id");
  const dialogue = findDialogue(context.gameState.dialogues, hero.dial);

  const stateToImage = `../img/${hero.id}_${hero.state}.jpg`;
  return (
    <div
      className="HeroIconBorder"
      onClick={() => (hero.dial ? context.setDialogue(dialogue) : null)}
    >
      <div className="HeroIcon">
        <img src={stateToImage} alt={`${hero.id}_${hero.state}`} />
      </div>
    </div>
  );
};

export const Heroes = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data");
  }
  const characters = context.gameState.sceneCharacters;
  const activeHeroes = characters.filter((c: Character) => c.dial);
  return (
    <div className="Heroes">
      <div className="HeroesBackgroundBorder">
        <img
          className="HeroesBackground"
          src="../img/main_hall_background.png"
          alt="heroes_background"
        />
      </div>
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
