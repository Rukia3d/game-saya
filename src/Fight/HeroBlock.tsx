import React from "react";
import "./Fight.scss";
// Types
import { elementType, IEnemy, FightState, ISpell } from "../utils/types";
// Utils
// Components
import { Spell } from "../Spells/Spell";

const ElementInfo = ({ fightState }: { fightState: FightState }) => {
  const currentElement = fightState.element;
  return (
    <div className="ElementInfo">
      {fightState.elements.map((s: elementType, i: number) => (
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
  setInfo,
}: {
  fightState: FightState;
  selectSpell: (index: number) => void;
  setInfo: (s: ISpell | IEnemy | null) => void;
}) => {
  return (
    <div className="Deck" aria-label="Deck">
      {fightState.heroHand.map((h: ISpell, i: number) => (
        <Spell
          withBorder
          withName
          spell={h}
          selectSpell={() => selectSpell(i)}
          spellInfo={setInfo}
          key={i}
          index={i}
          currentElement={fightState.element}
        />
      ))}
    </div>
  );
};

export const HeroBlock = ({
  fightState,
  selectSpell,
  setInfo,
}: {
  fightState: FightState;
  selectSpell: (index: number) => void;
  setInfo: (s: ISpell | IEnemy | null) => void;
}) => {
  return (
    <div className="HeroBlock MulticoloredBackground">
      <ElementInfo fightState={fightState} />
      <HeroDeck
        fightState={fightState}
        selectSpell={selectSpell}
        setInfo={setInfo}
      />
    </div>
  );
};
