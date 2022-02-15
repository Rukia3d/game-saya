import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../App";
import "./FightSelection.scss";
// Types
import {
  colorType,
  herosSelectionError,
  IEnemyFight,
  IFight,
  IHero,
  IPlayerHero,
  IPlayerSpell,
  ISpell,
  IStory,
} from "../utils/types";
// Utils
import { checkFightCharactersIds } from "../utils/helpers";
import { HeroSelection } from "../Heroes/HeroSelection";
import { findEnemy } from "../utils/fightlogic";
import { HeroesPreview } from "../Heroes/HeroesPreview";
import { HeroesSpells } from "../Heroes/HeroesSpells";
import { element, enemyCard } from "../utils/test_gameobjects";
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

const findRequiredCharacters = (
  elements: colorType[],
  heroes: IPlayerHero[]
): IPlayerHero[] => {
  const required: IPlayerHero[] = elements.map((e: colorType) => {
    const res = heroes.find((h: IPlayerHero) => h.element.color === e);
    if (!res) throw new Error("Can't find required characters");
    return res;
  });

  if (!required) throw new Error("Can't find required characters");
  return required;
};

const generateEnemy = (): IEnemyFight => {
  return {
    id: "test-dude",
    name: "Dude",
    element: element,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    spells: [
      {
        ...enemyCard,
        created_at: new Date(),
        owner: "enemy",
        copy: 1,
        selected: true,
        updates: [],
      },
    ],
  };
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
    fight.hero_elements,
    game.player.heroes
  );
  const [selected, setSelected] = useState(requiredCharacters);
  const enemy = generateEnemy();
  const spells = game.player.spells.filter((s: IPlayerSpell) => s.selected);
  const [error, setError] = useState(
    checkFightCharactersIds(
      fight.hero_elements,
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
  }, [context.gameState, fight.hero_elements]);

  const selectHero = (c: IPlayerHero) => {
    const i = game.player.heroes.indexOf(c);
    const currentlySelected = game.player.heroes.filter(
      (c: IPlayerHero) => c.selected
    );
    if (currentlySelected.length > 2) {
      const firstSelected = game.player.heroes.find(
        (c: IPlayerHero) => c.selected
      );
      if (!firstSelected)
        throw new Error("Can't find another selected character");
      const j = game.player.heroes.indexOf(firstSelected);
      game.player.heroes[j].selected = false;
    }
    game.player.heroes[i].selected = !game.player.heroes[i].selected;
    saveSelectionChanges(game.player.heroes);
  };

  const saveSelectionChanges = (heroes: IPlayerHero[]) => {
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
        characters={fight.hero_num}
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
  const selectedSpells = game.player.spells.filter(
    (s: IPlayerSpell) => s.selected
  );
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
