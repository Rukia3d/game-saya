import React, { useContext } from "react";
import { GameContext } from "../App";
import { Hero, Spell, SpellUpdate } from "../utils/types";
import "./AdditionScreen.css";
import { ElementSpell } from "../Spells/ElementSpell";
import { ElementSpellUpdate } from "../Spells/ElementSpellUpdate";

const Update = ({ props }: { props: CurrentScreenProps }) => {
  const isUpdate = "resource_base" in props.item;
  if (!isUpdate) {
    throw new Error(
      "Update component should not be used to dsplay Hero screen"
    );
  }
  const spellUpdate = props.item;
  return (
    <div
      className="CharacterFull"
      aria-label="character_card"
      onClick={() => props.setAdditionScreen(null)}
    >
      <h1>New spell updates</h1>
      <div className="CharacterFullUpdates" aria-label="character_spells">
        <ElementSpellUpdate update={spellUpdate as SpellUpdate} />
      </div>
    </div>
  );
};

const Character = ({ props }: { props: CurrentScreenProps }) => {
  const character = props.item;
  const isUpdate = "resource_base" in character;
  if (isUpdate) {
    throw new Error(
      "Character component should not be used to dsplay Update screen"
    );
  }

  if (!character || !character.element) {
    throw new Error("Incorrectly formatted character");
  }

  const spells =
    props.playerSpells.filter((s: Spell) => s.element === character.element) ||
    [];
  const element = character.element;
  return (
    <div
      className="CharacterFull"
      aria-label="character_card"
      onClick={() => props.setAdditionScreen(null)}
    >
      <h1 aria-label="character_name">{character?.name} joined the party</h1>
      <h2>New spells</h2>
      <div className="CharacterFullSpells" aria-label="character_spells">
        {spells.map((c: Spell, i: number) => (
          <ElementSpell card={c} element={element} key={i} />
        ))}
      </div>
    </div>
  );
};

type additionScreenState = "character" | "update";

interface CurrentScreenProps {
  item: Hero | SpellUpdate;
  playerSpells: Spell[];
  setAdditionScreen: (s: null | Hero | SpellUpdate) => void;
}

type AdditionScreensType = {
  [key in additionScreenState]: ({
    props,
  }: {
    props: CurrentScreenProps;
  }) => JSX.Element;
};

export const AdditionScreen = () => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.addition ||
    !context.setAdditionScreen ||
    !context.gameState
  ) {
    throw new Error("No data");
  }
  const item = context.addition;
  const screen = "resource_base" in context.addition ? "update" : "character";

  const additionScreens: AdditionScreensType = {
    character: Character,
    update: Update,
  };
  const CurrentScreen = additionScreens[screen];

  const items: CurrentScreenProps = {
    item: item,
    playerSpells: context.gameState?.player.spells,
    setAdditionScreen: context.setAdditionScreen,
  };
  return <CurrentScreen props={items} />;
};
