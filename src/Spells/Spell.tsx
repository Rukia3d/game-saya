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
  selectSpell,
  spellInfo,
}: {
  spell: ISpell;
  index?: number;
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
  const mana = 3; //calculateSpellMana(spell);
  const strength = calculateSpellStrength(spell);
  const updates = spell.updates.length;
  const longPressEvent = useLongPress({ onLongPress, onClick }, defaultOptions);
  const imgUrl = `/img/Spells/${spell.element}/${spell.image}.png`;
  console.log("strength", strength);
  return (
    <div className={`Spell ${spell.selected ? "active" : "inactive"}`}>
      <div
        className={`SpellCard`}
        {...longPressEvent}
        onClick={onClick}
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        {mana > 0 ? <Mana mana={mana} /> : null}
        {updates > 0 ? <Updates updates={spell.updates} /> : null}
        {strength > 0 ? <Strength strength={strength} /> : null}
      </div>
    </div>
  );
};

const StrengthIcon = () => {
  const imgUrl = `/img/Spells/strength.png`;
  return (
    <div
      className="StrengthIcon"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    ></div>
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

const ManaIcon = () => {
  const imgUrl = `/img/Spells/mana.png`;
  return (
    <div
      className="ManaIcon"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    ></div>
  );
};

const Strength = ({ strength }: { strength: number }) => {
  return (
    <div className="SpellStrength">
      {new Array(strength).fill(0).map((x, i) => (
        <StrengthIcon key={i} />
      ))}
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
  return (
    <div className="SpellMana">
      {new Array(mana).fill(0).map((x, i) => (
        <ManaIcon key={i} />
      ))}
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
