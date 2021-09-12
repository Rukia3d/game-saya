import React, { useContext, useEffect, useState } from "react";
import { CloseButton } from "./CloseButton";
import "./Library.css";
import { HeroSpell } from "../Fight/HeroSpellWithInfo";
import {
  achievedResource,
  achievedUpdate,
  findCardRequirements,
} from "../utils/helpers";
import { GameContext } from "../App";
import { cardUpdateRaise, updatedCards } from "../utils/gamelogic";
import { removeResources } from "../utils/resourceLogic";
import { elementType, Spell, SpellUpdate } from "../utils/types";
const MAXUPGRADES = 5;

// const HeroSpellRequirements = ({ card }: { card: Spell }) => {
//   const context = useContext(GameContext);
//   if (
//     !context ||
//     !context.gameState ||
//     !context.gameState.player ||
//     !context.gameState.player.resources ||
//     !context.gameState.player.cardUpdates
//   ) {
//     throw new Error("No data");
//   }
//   const resources = context.gameState.player.resources;
//   const updates = context.gameState.player.cardUpdates;
//   const [cardRequirements, setCardRequirements] = useState<null | ForgeReq>(
//     null
//   );

//   useEffect(() => {
//     setCardRequirements(findCardRequirements(updates, card));
//   }, [card, updates, context]);
//   return (
//     <div>
//       <h3>Requirements</h3>
//       {cardRequirements &&
//         cardRequirements.updates.map((e: [resourceType, number], i: number) => (
//           <span
//             key={i}
//             style={{ color: achievedResource(resources, e) ? "green" : "red" }}
//           >
//             {e[0]}: <span aria-label={`resource_${e[0]}_value`}>{e[1]}</span>{" "}
//           </span>
//         ))}
//     </div>
//   );
// };

const HeroSpellDescription = ({ card }: { card: Spell }) => {
  return (
    <div>
      <h3 aria-label="card_name_header">{card.name}</h3>
      Strength: {card.strength}
      {card.element ? "Element " + card.element : null}
      {card.selected ? "Equiped" : null}
      {card.mana ? "Special" : null}
    </div>
  );
};

const HeroSpellOptions = ({
  spellUpgrades,
}: {
  spellUpgrades: SpellUpdate[];
}) => {
  return (
    <div>
      {spellUpgrades.map((s: SpellUpdate) => (
        <p>{s.name + " " + s.element + " " + s.resource_base}</p>
      ))}
    </div>
  );
};

// const HeroSpellUpdate = ({
//   card,
//   forge,
// }: {
//   card: Spell;
//   forge: (s: Spell) => void;
// }) => {
//   const nextLevelCard = { ...card, level: card.level + 1 };
//   const context = useContext(GameContext);
//   if (
//     !context ||
//     !context.gameState ||
//     !context.gameState.player ||
//     !context.gameState.player.resources
//   ) {
//     throw new Error("No data");
//   }
//   const resources = context.gameState.player.resources;
//   const updates = context.gameState.player.cardUpdates;
//   const cardRequirements = findCardRequirements(updates, card);
//   if (card.level >= TOPLEVEL) {
//     return (
//       <div className="SpellNoUpdate">
//         <HeroSpell card={card} selectCard={forge} element={card.element} />{" "}
//       </div>
//     );
//   }
//   const canUpdate = achievedUpdate(resources, cardRequirements.updates);
//   return (
//     <div className="SpellUpdate">
//       <div className="SpellUpdateStart" aria-label="card_to_update">
//         <HeroSpell card={card} selectCard={forge} element={card.element} />
//       </div>
//       <div className="SpellsBetween">
//         {canUpdate ? (
//           <div className="Arrow" aria-label="spell_update_arrow" />
//         ) : (
//           <div className="Cross" aria-label="spell_update_cross" />
//         )}
//       </div>
//       <div className={canUpdate ? "SpellUpdateEnd" : "SpellUpdateClosed"}>
//         <HeroSpell
//           card={nextLevelCard}
//           selectCard={() => {}}
//           element={card.element}
//         />
//       </div>
//     </div>
//   );
// };

export const Library = ({
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
    !context.gameState.player.spellUpdates ||
    !context.gameState.spellUpdates ||
    !context.gameState.resources
  ) {
    throw new Error("No data");
  }
  const updates = context.gameState.player.spellUpdates;
  const ownedResources = context.gameState.player.resources;
  const player = context.gameState.player;
  const gameState = context.gameState;
  const resources = context.gameState.resources;
  const forge = (s: Spell) => {
    console.log("Forge");
  };
  const applicableUpdates = updates.filter(
    (s: SpellUpdate) => s.element === item.element
  );
  return (
    <div className="ForgeCard">
      <CloseButton onClick={() => setForge(null)} />
      <HeroSpellDescription card={item} />
      <HeroSpellOptions spellUpgrades={applicableUpdates} />
      {/*       <HeroSpellRequirements card={item} />
      <HeroSpellUpdate card={item} forge={forge} /> */}
    </div>
  );
};
