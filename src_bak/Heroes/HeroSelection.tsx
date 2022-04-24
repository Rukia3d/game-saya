import React, { useContext, useState } from "react";
import "./Heroes.scss";
import { GameContext } from "../App";
// Types
import { IHero, IPlayerHero } from "../utils/types";
import { ScrollButton } from "../UI/ScrollButton";
import { Hero } from "./Hero";
// Utils
// Components

const HEROESPERPAGE = 3;

export const HeroSelection = ({
  selectHero,
  required,
}: {
  selectHero?: (c: IPlayerHero) => void;
  required?: IPlayerHero[];
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.player.heroes) {
    throw new Error("No data");
  }

  if (context.gameState.player.heroes.length < 1) {
    throw new Error("Not enough heroes");
  }
  const heroes = context.gameState.player.heroes;
  const [startingIndex, setStartingIndex] = useState(0);

  let currentHeroes: IPlayerHero[] = [];
  if (required) {
    currentHeroes = required;
  } else {
    currentHeroes = new Array(HEROESPERPAGE)
      .fill(0)
      .map((x, i) => (startingIndex + i) % heroes.length)
      .map((n) => (n < 0 ? heroes.length + n : n))
      .map((n) => heroes[n]);
  }

  return (
    <div className="HeroSelection">
      <ScrollButton
        onClick={() => setStartingIndex(startingIndex + 1)}
        direction="r"
      />
      <div className="HeroesList">
        {currentHeroes.map((c: IPlayerHero, i: number) => (
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
