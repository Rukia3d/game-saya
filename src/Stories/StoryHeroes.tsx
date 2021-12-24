import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../App";
import "../Heroes/Heroes.scss";
// Types
import { herosSelectionError, IFight, IHero, IStory } from "../utils/types";
// Utils
import {
  checkFightCharactersIds,
  filterActiveCharacters,
  findCharacter,
} from "../utils/helpers";
import { Heroes } from "../Heroes/Heroes";
import { HeroesActive, HeroesActiveData } from "../Heroes/HeroesActive";
import { findEnemy } from "../utils/fightlogic";
// Components

const getHeaderText = (error: herosSelectionError) => {
  "Select heroes";
  switch (error) {
    case "none":
      return "No heros selected";
    case "less":
      return "You need more heroes for this fight";
    case "more":
      return "Number of heroes for this fight is limited";
    case "incorrect":
      return "This fight is restricted";
    default:
      return "Select heroes";
  }
};

export const StoryHeroes = ({
  story,
  fight,
  setSelectionError,
}: {
  story: IStory;
  fight: IFight;
  setSelectionError: (s: herosSelectionError) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.adventure) {
    throw new Error("No data in context");
  }
  const game = context.gameState;
  const [selected, setSelected] = useState(
    filterActiveCharacters(game.player.heroes).map((c: IHero) => {
      return c.id;
    })
  );

  const characters = selected.map((s: string) =>
    findCharacter(game.player.heroes, s)
  );
  const enemy = findEnemy(game.player.enemies, fight.enemy);

  const [error, setError] = useState(
    checkFightCharactersIds(fight.characters, selected)
  );

  useEffect(() => {
    if (!context.gameState) return;
    const newActive = filterActiveCharacters(
      context.gameState.player.heroes
    ).map((c: IHero) => {
      return c.id;
    });
    setSelected(newActive);
    setError(checkFightCharactersIds(fight.characters, newActive));
  }, [context.gameState, fight.characters]);

  const checkSelection = () => {
    setSelectionError(null);
    context.setStory(story);
  };

  return (
    <div className="Heroes">
      <Heroes />
      <HeroesActive characters={characters} enemy={enemy} />
      {error === null ? (
        <button onClick={checkSelection}>Fight</button>
      ) : (
        <div>{getHeaderText(error)}</div>
      )}
      <HeroesActiveData characters={characters} />
    </div>
  );
};
