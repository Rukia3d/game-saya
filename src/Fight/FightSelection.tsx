import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../App";
import "./FightSelection.scss";
// Types
import {
  herosSelectionError,
  IFight,
  IHero,
  ISpell,
  IStory,
} from "../utils/types";
// Utils
import { checkFightCharactersIds } from "../utils/helpers";
import { HeroSelection } from "../Heroes/HeroSelection";
import { findEnemy } from "../utils/fightlogic";
import { HeroesPreview } from "../Heroes/HeroesPreview";
import { HeroesSpells } from "../Heroes/HeroesSpells";
// Components

const getHeaderText = (error: herosSelectionError) => {
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
      return "Select Heroes";
  }
};

export const FightSelection = ({
  story,
  fight,
  setSelectionError,
  setSpellSelect,
}: {
  story: IStory;
  fight: IFight;
  setSelectionError: (s: herosSelectionError) => void;
  setSpellSelect: (b: boolean) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.adventure) {
    throw new Error("No data in context");
  }
  const game = context.gameState;
  const requiredCharacters = findRequiredCharacters(
    fight.characters,
    game.player.heroes
  );
  const [selected, setSelected] = useState(requiredCharacters);
  const enemy = findEnemy(game.player.enemies, fight.enemy);
  const spells = game.player.spells.filter((s: ISpell) => s.selected);
  const [error, setError] = useState(
    checkFightCharactersIds(
      fight.characters,
      selected.map((s: IHero) => s.id)
    )
  );

  // const characters = selected.map((s: string) =>
  //   findCharacter(game.player.heroes, s)
  // );
  // const enemy = findEnemy(game.player.enemies, fight.enemy);

  useEffect(() => {
    // if (!context.gameState) return;
    // const newActive = filterActiveCharacters(
    //   context.gameState.player.heroes
    // ).map((c: IHero) => {
    //   return c.id;
    // });
    // setSelected(newActive);
    // setError(checkFightCharactersIds(fight.characters, newActive));
  }, [context.gameState, fight.characters]);

  const selectHero = (c: IHero) => {
    const i = game.player.heroes.indexOf(c);
    const currentlySelected = game.player.heroes.filter(
      (c: IHero) => c.selected
    );
    if (currentlySelected.length > 2) {
      const firstSelected = game.player.heroes.find((c: IHero) => c.selected);
      if (!firstSelected)
        throw new Error("Can't find another selected character");
      const j = game.player.heroes.indexOf(firstSelected);
      game.player.heroes[j].selected = false;
    }
    game.player.heroes[i].selected = !game.player.heroes[i].selected;
    saveSelectionChanges(game.player.heroes);
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

  const checkSelection = () => {
    setSelectionError(null);
    context.setStory(story);
  };
  const imgUrl = `/img/Backgrounds/fightSelection_background.jpg`;
  return (
    <div
      className="FightSelection"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <h2>Select heroes</h2>
      <HeroSelection
        selectHero={requiredCharacters ? undefined : selectHero}
        required={requiredCharacters}
      />
      <HeroesPreview characters={selected} enemy={enemy} />
      <HeroesSpells spells={spells} />
      <ReadyToFight
        error={error}
        characters={fight.characters.length}
        checkSelection={checkSelection}
        setSpellSelect={setSpellSelect}
      />
    </div>
  );
};

export const ReadyToFight = ({
  error,
  characters,
  checkSelection,
  setSpellSelect,
}: {
  error: herosSelectionError;
  characters: number;
  checkSelection: () => void;
  setSpellSelect: (b: boolean) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.adventure) {
    throw new Error("No data in context");
  }
  const game = context.gameState;
  const selectedSpells = game.player.spells.filter((s: ISpell) => s.selected);
  if (error)
    return (
      <div className="StartFight">
        <div>{getHeaderText(error)}</div>
      </div>
    );
  if (characters * 5 !== selectedSpells.length)
    return (
      <div className="StartFight">
        <div>{`You need ${characters * 5} spells for a fight and you have ${
          selectedSpells.length
        }`}</div>
        <div>
          <button onClick={() => setSpellSelect(true)}>Select spells</button>
        </div>
      </div>
    );
  return (
    <div className="StartFight">
      <button onClick={checkSelection}>Fight</button>
    </div>
  );
};
