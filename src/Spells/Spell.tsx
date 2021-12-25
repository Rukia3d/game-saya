import React from "react";
import "./Spells.scss";
// Types
import { elementType, ISpell } from "../utils/types";
import useLongPress from "../hooks/useLongPress";
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
  const longPressEvent = useLongPress({ onLongPress, onClick }, defaultOptions);

  return (
    <div className="Spell">
      <div
        className={`SpellCard ${spell.selected ? "active" : "inactive"}`}
        {...longPressEvent}
        onClick={onClick}
      >
        <p aria-label="spell_card">{spell.name}</p>
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
