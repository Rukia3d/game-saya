import React from "react";
import "./Spells.scss";
// Types
import { ISpell, ISpellUpdate } from "../utils/types";
import useLongPress from "../hooks/useLongPress";
import {
  calculateSpellMana,
  calculateSpellStrength,
} from "../utils/spellslogic";
// Utils
// Components
export const Spell = ({
  spell,
  index,
  withName,
  withBorder,
  selectSpell,
  spellInfo,
}: {
  spell: ISpell;
  index?: number;
  withName?: boolean;
  withBorder?: boolean;
  selectSpell?: (s: number) => void;
  spellInfo?: (s: ISpell) => void;
}) => {
  const onLongPress = () => {
    if (spellInfo) {
      console.log("longpress is triggered - SetInfo");
      spellInfo(spell);
    }
  };

  const onClick = () => {
    console.log("Onclick");
    console.log("index", index);
    if (selectSpell && index) {
      console.log("click is triggered - SelectSpell");
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
  const imgUrl = `/img/Spells/${spell.element}/${spell.image}.png`;

  return (
    <div
      className={`Spell ${spell.selected ? "active" : "inactive"} ${
        withBorder ? "border" : "noborder"
      }`}
    >
      <div
        className={`SpellCard ${withBorder ? "border" : "noborder"}`}
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

const Strength = ({ strength }: { strength: number }) => {
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

const Updates = ({ updates }: { updates: ISpellUpdate[] }) => {
  return (
    <div className="SpellUpdate">
      {updates.map((u: ISpellUpdate, i: number) => (
        <UpdateIcon update={u} key={i} />
      ))}
    </div>
  );
};

const Mana = ({ mana }: { mana: number }) => {
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
