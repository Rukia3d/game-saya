import React, { useContext } from "react";
import "./ForgeCard.css";
import { OwnedResource, Spell } from "../utils/types";
import { CloseButton } from "./CloseButton";
import { HeroSpell } from "../Fight/HeroSpellWithInfo";
import { findCardRequirements } from "../utils/helpers";
import { GameContext } from "../App";
const forge = require("../data/forge.json");
const TOPLEVEL = 3;

const achievedUpdate = (
  resources: OwnedResource[],
  required: [string, number][]
) => {
  const all = required.filter((e: [string, number]) =>
    achievedResource(resources, e)
  );
  return all.length === required.length;
};

const achievedResource = (resources: OwnedResource[], e: [string, number]) => {
  const resource = resources.find((o: OwnedResource) => o.id === e[0]);
  if (!resource || resource?.quantity < e[1]) {
    return false;
  } else {
    return true;
  }
};

const HeroSpellRequirements = ({
  card,
  resources,
}: {
  card: Spell;
  resources: OwnedResource[];
}) => {
  const cardRequirements = findCardRequirements(forge, card);
  const nextLevel = cardRequirements.updates[card.level];
  return (
    <div>
      <h3>Requirements</h3>
      {nextLevel.map((e: [string, number], i: number) => (
        <span
          key={i}
          style={{ color: achievedResource(resources, e) ? "green" : "red" }}
        >
          {e[0]}: {e[1]}{" "}
        </span>
      ))}
    </div>
  );
};

const HeroSpellDescription = ({ card }: { card: Spell }) => {
  return (
    <div>
      <h3 aria-label="card_name_header">{card.name}</h3>
      Strength: {card.strength}
      {card.element ? card.element : null}
      {card.selected ? "Equiped" : null}
      {card.mana ? "Special" : null}
    </div>
  );
};

const HeroSpellUpdate = ({
  card,
  resources,
}: {
  card: Spell;
  resources: OwnedResource[];
}) => {
  const nextLevelCard = { ...card, level: card.level + 1 };
  const cardRequirements = findCardRequirements(forge, card);
  if (card.level >= TOPLEVEL) {
    return (
      <div className="SpellNoUpdate">
        <HeroSpell card={card} selectCard={forge} element={card.element} />{" "}
      </div>
    );
  }
  return (
    <div className="SpellUpdate">
      <HeroSpell card={card} selectCard={forge} element={card.element} />
      <div className="SpellsBetween">
        {achievedUpdate(resources, cardRequirements.updates[card.level]) ? (
          <div className="Arrow" aria-label="spell_update_arrow" />
        ) : null}
      </div>
      <HeroSpell
        card={nextLevelCard}
        selectCard={() => {}}
        element={card.element}
      />
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
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.gameState.player ||
    !context.gameState.player.resources
  ) {
    throw new Error("No data");
  }
  const resources = context.gameState.player.resources;
  const forge = () => {};
  return (
    <div className="ForgeCard">
      <CloseButton onClick={() => setForge(null)} />
      <HeroSpellDescription card={item} />
      <HeroSpellRequirements card={item} resources={resources} />
      <HeroSpellUpdate card={item} resources={resources} />
    </div>
  );
};
