import React from "react";
import "./HeroBlock.css";

import { elementType, Spell } from "../utils/types";

export const HeroCardLevelFrame = ({ card }: { card: Spell }) => {
  let frame: JSX.Element | null = null;
  switch (card.level) {
    case 1:
      frame = (
        <img
          className="SmallCardFrame"
          src={"../img/Spells/L1frame.png"}
          alt={`spellimage_frame${card.level}`}
        />
      );
      break;
    case 2:
      frame = (
        <img
          className="SmallCardFrame"
          src={"../img/Spells/L2frame.png"}
          alt={`spellimage_frame${card.level}`}
        />
      );
      break;
    default:
      frame = null;
  }
  return (
    <>
      {frame ? frame : null}
      <img
        className="SmallCardImage"
        src={card.image}
        alt={`spellimage_${card.id}`}
      />
    </>
  );
};

export const HeroSpellWithInfo = ({
  forge = false,
  card,
  element,
  setForge = () => {},
  selectCard,
  setInfo,
}: {
  forge?: boolean;
  card: Spell;
  element: elementType;
  setForge?: (s: Spell) => void;
  selectCard: (s: Spell) => void;
  setInfo: (s: any) => void;
}) => {
  return (
    <div className={`SpellCard ${card.selected ? "active" : "inactive"}`}>
      <button onClick={() => setInfo(card)} data-testid="hero_card_info">
        Info
      </button>
      <HeroSpell card={card} selectCard={selectCard} element={element} />
      {forge ? <button onClick={() => setForge(card)}>forge</button> : null}
    </div>
  );
};

export const HeroSpell = ({
  element,
  card,
  selectCard,
}: {
  element: elementType;
  card: Spell;
  selectCard?: (s: Spell) => void;
}) => {
  return (
    <div className="Spell">
      <div
        className={`SpellCard ${
          card.element === element ? "trump" : "standard"
        }`}
        aria-label="spell_card_border"
        onClick={() => (selectCard ? selectCard(card) : null)}
      >
        <p aria-label="spell_card">{card.name}</p>
        <HeroCardLevelFrame card={card} />
      </div>
    </div>
  );
};
