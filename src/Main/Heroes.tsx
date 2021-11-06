import React, { useContext } from "react";
import { GameContext } from "../App";
import "./Heroes.css";
// Types
import { IHero } from "../utils/types";
// Utils
// Components
import { TopMenu } from "../UI/TopMenu";

const Hero = ({
  hero,
  selectHero,
}: {
  hero: IHero;
  selectHero: (h: IHero) => void;
}) => {
  return (
    <img
      className={`HeroImage ${hero.selected ? "active" : "inactive"}`}
      src={`../img/Heroes/${hero.image}.png`}
      alt={`hero_${hero.id}`}
      onClick={() => selectHero(hero)}
    />
  );
};

export const Heroes = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.player.heroes) {
    throw new Error("No data");
  }
  const heroes = context.gameState.player.heroes;

  const selectHero = (c: IHero) => {
    const i = heroes.indexOf(c);
    const currentlySelected = heroes.filter((c: IHero) => c.selected);
    if (currentlySelected.length > 2) {
      const firstSelected = heroes.find((c: IHero) => c.selected);
      if (!firstSelected)
        throw new Error("Can't find another selected character");
      const j = heroes.indexOf(firstSelected);
      heroes[j].selected = false;
    }
    heroes[i].selected = !heroes[i].selected;
    saveSelectionChanges(heroes);
  };

  const saveSelectionChanges = (heroes: IHero[]) => {
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
        {heroes.map((c: IHero, i: number) => (
          <Hero key={i} hero={c} selectHero={selectHero} />
        ))}
      </div>
    </div>
  );
};
