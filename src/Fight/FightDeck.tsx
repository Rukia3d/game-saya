import React, { useContext } from "react";
import "./Fight.scss";
// Types
import { colorType, FightState, IPlayerSpell, ISpell } from "../utils/types";
// Utils
// Components
import { Spell } from "../Spells/Spell";
import { GameContext } from "../App";

const ElementInfo = ({ fightState }: { fightState: FightState }) => {
  const currentElement = fightState.element;
  return (
    <div className="ElementInfo">
      {fightState.elements.map((s: colorType, i: number) => (
        <img
          src={
            currentElement === s
              ? `/img/Spells/${s}/${s}.png`
              : `/img/Spells/${s}/${s}_black.png`
          }
          alt="element"
          key={i}
        />
      ))}
    </div>
  );
};

const HeroDeck = ({
  fightState,
  selectSpell,
}: {
  fightState: FightState;
  selectSpell: (index: number) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.story || !context.setAdditionScreen) {
    throw new Error("No data in context");
  }
  return (
    <div className="Deck" aria-label="Deck">
      {fightState.heroHand.map((h: IPlayerSpell, i: number) => (
        <Spell
          withBorder
          withName
          spell={h}
          selectSpell={() => selectSpell(i)}
          spellInfo={context.setAdditionScreen}
          key={i}
          index={i}
          currentElement={fightState.element}
        />
      ))}
    </div>
  );
};

export const FightDeck = ({
  fightState,
  selectSpell,
}: {
  fightState: FightState;
  selectSpell: (index: number) => void;
}) => {
  return (
    <div className="FightDeck MulticoloredBackground">
      <ElementInfo fightState={fightState} />
      <HeroDeck fightState={fightState} selectSpell={selectSpell} />
    </div>
  );
};
