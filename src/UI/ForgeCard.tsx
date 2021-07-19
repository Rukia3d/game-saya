import React from "react";
import "./ForgeCard.css";
import { Spell } from "../utils/types";
import { CloseButton } from "./CloseButton";
import { HeroSpell } from "../Fight/HeroBlock";
import { findCardRequirements } from "../utils/helpers";
const forge = require("../data/forge.json");

const HeroSpellRequirements = ({ card }: { card: Spell }) => {
  const cardRequirements = findCardRequirements(forge, card);
  return (
    <div>
      <h3>Requirements</h3>
    </div>
  );
};

const HeroSpellDescription = ({ card }: { card: Spell }) => {
  return (
    <div>
      <h3>{card.name}</h3>
      Strength: {card.strength}
      {card.element ? card.element : null}
      {card.selected ? "Equiped" : null}
      {card.mana ? "Special" : null}
    </div>
  );
};

export const ForgeCard = ({
  item,
  setForge,
}: {
  item: Spell;
  setForge: (s: null | Spell) => void;
}) => {
  const forge = () => {};
  return (
    <div className="ForgeCard">
      <CloseButton onClick={() => setForge(null)} />
      <HeroSpell card={item} selectCard={forge} element={item.element} />
      <HeroSpellDescription card={item} />
      <HeroSpellRequirements card={item} />
    </div>
  );
};
