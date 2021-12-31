import React from "react";
import "./Spells.scss";
// Types
import { elementType, ISpell, ISpellUpdate } from "../utils/types";
import useLongPress from "../hooks/useLongPress";
import {
  calculateSpellMana,
  calculateSpellStrength,
} from "../utils/spellslogic";
// Utils
// Components
export const Spell = ({
  spell,
  currentElement,
  index,
  withName,
  withBorder,
  selectSpell,
  spellInfo,
}: {
  spell: ISpell;
  currentElement?: elementType;
  index?: number;
  withName?: boolean;
  withBorder?: boolean;
  selectSpell?: (s: number) => void;
  spellInfo?: (s: ISpell) => void;
}) => {
  const onLongPress = () => {
    console.log("longpress is triggered - SetInfo");
    if (spellInfo) {
      spellInfo(spell);
    }
  };

  const onClick = () => {
    console.log("click is triggered - SelectSpell");
    if (selectSpell && index !== undefined) {
      selectSpell(index);
    }
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const mana = calculateSpellMana(spell);
  const strength = calculateSpellStrength(spell);
  const updates = spell.updates.length;
  const longPressEvent = useLongPress({ onLongPress, onClick }, defaultOptions);
  const imgUrl = `/img/Spells/${spell.element}/${spell.id}.png`;
  const backImgUrl =
    spell.element === currentElement
      ? `/img/Spells/${spell.element}/${spell.image}.png`
      : `/img/Spells/${spell.element}/${spell.image}_white.png`;
  return (
    <div
      className={`Spell ${spell.selected ? "active" : "inactive"} ${
        withBorder ? `border ${spell.element}` : "noborder"
      }`}
    >
      <div
        className={`SpellCard ${
          withBorder ? `border ${spell.element}` : "noborder"
        }`}
        style={{
          backgroundImage: `url(${backImgUrl})`,
          // backgroundColor: "white",
        }}
      >
        <div
          className="SpellCardImage"
          {...longPressEvent}
          onClick={onClick}
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        >
          {withName ? <h4>{spell.name}</h4> : null}
          {mana > 0 ? <Mana mana={mana} /> : null}
          {updates > 0 ? <Updates updates={spell.updates} /> : null}
          {strength > 0 ? <Strength strength={strength} /> : null}
        </div>
      </div>
    </div>
  );
};

const UpdateIcon = ({ update }: { update: ISpellUpdate }) => {
  const imgUrl = `../img/Spells/${update.element}/update_${update.id}.png`;
  return (
    <div
      className="UpdateIcon"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    ></div>
  );
};

export const Strength = ({ strength }: { strength: number }) => {
  const imgUrl = `/img/Spells/strength.png`;
  return (
    <div className="SpellStrength">
      <div
        className="StrengthIcon"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        {strength}
      </div>
    </div>
  );
};

export const Updates = ({ updates }: { updates: ISpellUpdate[] }) => {
  return (
    <div className="SpellUpdate">
      {updates.map((u: ISpellUpdate, i: number) => (
        <UpdateIcon update={u} key={i} />
      ))}
    </div>
  );
};

export const Mana = ({ mana }: { mana: number }) => {
  const imgUrl = `/img/Spells/mana.png`;
  return (
    <div className="SpellMana">
      <div
        className="ManaIcon"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        {mana}
      </div>
    </div>
  );
};

export const EmptySpell = () => {
  return (
    <div className="Spell">
      <div className={`SpellCard`}></div>
    </div>
  );
};
