import React, { useContext, useEffect, useState } from "react";
import "./InfoCard.scss";
// Types
import { ISpell, ISpellUpdate } from "../utils/types";
// Utils
// Components
import { SpellUpdate } from "../Spells/SpellUpdate";
import { ResourceDatalist } from "../Spells/Resources";
import { GameContext } from "../App";
import { updatePlayerSpell } from "../utils/spellslogic";
import { removeResources } from "../utils/resourceLogic";
import { SpellWithInfo } from "../Spells/SpellWithInfo";
import { ItemsForCard } from "./InfoCard";

const ItemCard = ({ item }: { item: ISpell | ISpellUpdate }) => {
  //TODO Replace static img with animation
  const calculateItemMana = () => {
    let allMana = item.mana;
    if ("updates" in item) {
      item.updates.map((u: ISpellUpdate) => (allMana = allMana + u.mana));
    }
    return allMana;
  };

  return (
    <div className="ItemCard">
      <div className="ItemCardHeader">{item.name}</div>
      {"updates" in item ? (
        <img
          src={`../img/Spells/${item.element}/${item.image}.png`}
          alt="spell_image"
        />
      ) : (
        <img
          src={`../img/Spells/${item.element}/${item.id}.png`}
          alt="element_image"
        />
      )}
      <h3 aria-label="Mana">Mana: {calculateItemMana()}</h3>
      {"updates" in item ? (
        <h3 aria-label="Strength">Strength: {item.strength}</h3>
      ) : null}
    </div>
  );
};

const ItemDescription = ({ item }: { item: ISpell | ISpellUpdate }) => {
  return (
    <div className="ItemDescription">
      <div className="ItemDescriptionImage">
        {"selected" in item ? (
          <img src={"../img/Spells/equipped_item.png"} alt="selected_spell" />
        ) : null}
        {item.element}
      </div>
      <div className="ItemDescriptionText">{item.description}</div>
    </div>
  );
};

const ItemSpellUpdates = ({ item }: { item: ISpell }) => {
  const [updatesToDisplay, setupdatesToDisplay] = useState(item.updates);
  const [selection, setSelection] = useState("applied");

  const context = useContext(GameContext);
  if (!context || !context.gameState?.player) {
    throw new Error("No data in context");
  }
  const updates = context.gameState.player.spellUpdates;
  const resources = context.gameState.player.resources;
  const applicableUpdates = updates.filter(
    (s: ISpellUpdate) =>
      s.element === item.element && item.updates.indexOf(s) === -1
  );

  const select = (s: "applied" | "available") => {
    if (s === "applied") {
      setSelection("applied");
      setupdatesToDisplay(item.updates);
    } else {
      setSelection("available");
      setupdatesToDisplay(applicableUpdates);
    }
  };

  //TODO move into UpdateSpell screen with the confirmation
  const updateSpell = (update: ISpellUpdate) => {
    if (context.gameState && context.gameState.player) {
      const newPlayyerWithSpell = updatePlayerSpell(
        context.gameState.player,
        item,
        update
      );
      const newPlayerRemovedResources = {
        ...newPlayyerWithSpell,
        resources: removeResources(update.resource_base, resources),
      };

      context.setGameState({
        ...context.gameState,
        player: newPlayerRemovedResources,
      });
    }
  };

  return (
    <div className="ItemData">
      <div>
        <div className="ItemDataButtons">
          <button onClick={() => select("applied")}>Updated</button>
          <button onClick={() => select("available")}>Updates</button>
        </div>
        {updatesToDisplay.map((u: ISpellUpdate, i: number) => (
          <SpellUpdate
            key={i}
            update={u}
            canUpdate={selection === "available"}
            updateSpell={updateSpell}
          />
        ))}
      </div>
    </div>
  );
};

const ItemSpellResources = ({ item }: { item: ISpellUpdate }) => {
  return (
    <div className="ItemData">
      <div>
        <div className="ItemDataHeader">
          <h3>Resources</h3>
          <ResourceDatalist spellResources={item.resource_base} />
        </div>
      </div>
    </div>
  );
};

const TopCardItem = ({ item }: { item: ISpell | ISpellUpdate }) => {
  // Only Spells and Updates have mana
  const imgUrl = `/img/Spells/${item.element}/${item.element}_back.jpg`;
  return (
    <div
      className="TopCard"
      style={{
        height: "updates" in item ? "40%" : "30%",
      }}
    >
      <div className="TopLeftBorder">
        <div
          className="TopLeft"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        >
          <ItemCard item={item} />
        </div>
      </div>
      <div className="TopRightBorder">
        <div className="TopRight">
          <ItemDescription item={item} />
        </div>
      </div>
    </div>
  );
};

const BottomCardItem = ({ item }: { item: ISpell | ISpellUpdate }) => {
  return (
    <div className="BottomCard">
      {"updates" in item ? (
        <ItemSpellUpdates item={item as ISpell} />
      ) : (
        <ItemSpellResources item={item as ISpellUpdate} />
      )}
    </div>
  );
};

export const InfoItem = ({ item }: { item: ISpellUpdate | ISpell }) => {
  return (
    <div className="InfoCard">
      <TopCardItem item={item} />
      <BottomCardItem item={item} />
    </div>
  );
};
