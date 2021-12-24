import React, { useContext, useState } from "react";
import "./Heroes.scss";
import { GameContext } from "../App";
// Types
import { IHero } from "../utils/types";
import { ScrollButton } from "../UI/ScrollButton";
import { Hero } from "./Hero";
// Utils
// Components

const HEROESPERPAGE = 3;

export const Heroes = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.player.heroes) {
    throw new Error("No data");
  }

  if (context.gameState.player.heroes.length < 1) {
    throw new Error("Not enough heroes");
  }
  const heroes = context.gameState.player.heroes;
  const [startingIndex, setStartingIndex] = useState(0);

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

  const currentHeroes: IHero[] = new Array(HEROESPERPAGE)
    .fill(0)
    .map((x, i) => (startingIndex + i) % heroes.length)
    .map((n) => (n < 0 ? heroes.length + n : n))
    .map((n) => heroes[n]);

  return (
    <div className="TopSection">
      <ScrollButton
        onClick={() => setStartingIndex(startingIndex + 1)}
        direction="r"
      />
      <div className="HeroesList">
        {currentHeroes.map((c: IHero, i: number) => (
          <Hero key={i} hero={c} selectHero={selectHero} />
        ))}
      </div>
      <ScrollButton
        onClick={() => setStartingIndex(startingIndex - 1)}
        direction="l"
      />
    </div>
  );
};
