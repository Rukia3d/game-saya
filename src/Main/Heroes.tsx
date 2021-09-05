import React, { useContext } from "react";
import "./Heroes.css";
import { Character } from "../utils/types";
import { GameContext } from "../App";
import { TopMenu } from "../UI/TopMenu";

export const Heroes = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.player.heroes) {
    throw new Error("No data");
  }
  const heroes = context.gameState.player.heroes;

  const characterSelection = (c: Character) => {
    const i = heroes.indexOf(c);
    const currentlySelected = heroes.filter((c: Character) => c.selected);
    if (currentlySelected.length > 2) {
      const firstSelected = heroes.find((c: Character) => c.selected);
      if (!firstSelected)
        throw new Error("Can't find another selected character");
      const j = heroes.indexOf(firstSelected);
      heroes[j].selected = false;
    }
    heroes[i].selected = !heroes[i].selected;
    saveCharacterChanges(heroes);
  };

  const saveCharacterChanges = (heroes: Character[]) => {
    const newPlayer = context.gameState && {
      ...context.gameState.player,
      heroes: heroes,
    };
    if (!newPlayer || !context.gameState)
      throw new Error("Can't find the player to update");
    context.setGameState({ ...context.gameState, player: newPlayer });
  };

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
      <div className="HeroesPresent">
        {heroes.map((c: Character, i: number) => (
          <img
            className={`HeroImage ${c.selected ? "active" : "inactive"}`}
            src={`../img/Heroes/${c.image}.png`}
            alt={`hero_${c.id}`}
            key={i}
            onClick={() => characterSelection(c)}
          />
        ))}
      </div>
    </div>
  );
};
