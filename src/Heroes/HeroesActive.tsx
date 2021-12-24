import React, { useContext } from "react";
import "./Heroes.scss";
// Types
import { IHero } from "../utils/types";
import { GameContext } from "../App";
import { findCharacter } from "../utils/helpers";
// Utils
// Components

const DoubleHeroesOne = ({ hero }: { hero: IHero | null }) => {
  return <div></div>;
};

const DoubleHeroesTwo = ({ hero }: { hero: IHero | null }) => {
  return <div></div>;
};

export const HeroesActive = ({
  selected,
  needed,
}: {
  selected: string[];
  needed: number;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.player.heroes) {
    throw new Error("No data in context");
  }
  const game = context.gameState;
  const characters = selected.map((s: string) =>
    findCharacter(game.player.heroes, s)
  );
  console.log("Charactes needed", needed);
  if (needed === 2) {
    return (
      <div className="HeroesActive">
        <DoubleHeroesOne hero={characters[0] ? characters[0] : null} />
        <DoubleHeroesTwo hero={characters[1] ? characters[1] : null} />
      </div>
    );
  }
  if (needed === 3) {
    return (
      <div className="HeroesActive">
        {/* <TripleHeroesOne />
        <TripleHeroesTwpo /> */}
      </div>
    );
  }
  return <div className="HeroesActive"></div>;
};
