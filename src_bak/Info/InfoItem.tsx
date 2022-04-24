import React, { useContext, useEffect, useState } from "react";
import "./InfoCard.scss";
// Types
import {
  IPlayerSpell,
  IPlayerSpellUpdate,
  ISpell,
  ISpellUpdate,
} from "../utils/types";
// Utils
// Components
import { SpellUpdate } from "../Spells/SpellUpdate";
import { ResourceDatalist } from "../Spells/Resources";
import { GameContext } from "../App";
import { calculateSpellMana, updatePlayerSpell } from "../utils/spellslogic";
import { removeResources } from "../utils/resourceLogic";
import { spellUpdates } from "../utils/test_gameobjects";

const ItemCard = ({ item }: { item: IPlayerSpell | ISpellUpdate }) => {
  //TODO Replace static img with animation
  const mana = "updates" in item ? calculateSpellMana(item) : 0;
  return (
    <div className="ItemCard">
      <div className="ItemCardHeader">{item.name}</div>
      {"updates" in item ? (
        <img
          src={`../img/Spells/${item.element.color}/${item.id}.png`}
          alt="spell_image"
        />
      ) : (
        <img
          src={`../img/Spells/${item.school}/update_${item.id}.png`}
          alt="element_image"
        />
      )}
      <h3 aria-label="Mana">Mana: {mana}</h3>
      {"updates" in item ? (
        <h3 aria-label="Strength">Strength: {item.strength}</h3>
      ) : null}
    </div>
  );
};

const ItemDescription = ({ item }: { item: IPlayerSpell | ISpellUpdate }) => {
  return (
    <div className="ItemDescription">
      <div className="ItemDescriptionImage">
        {"selected" in item ? (
          <img src={"../img/Spells/equipped_item.png"} alt="selected_spell" />
        ) : (
          item.school
        )}
      </div>
      <div className="ItemDescriptionText">{item.description}</div>
    </div>
  );
};

const ItemSpellUpdates = ({ item }: { item: IPlayerSpell }) => {
  const [updatesToDisplay, setupdatesToDisplay] = useState(item.updates);
  const [selection, setSelection] = useState("applied");

  const context = useContext(GameContext);
  if (!context || !context.gameState?.player) {
    throw new Error("No data in context");
  }
  const updates = context.gameState.player.updates;
  const resources = context.gameState.player.resources;
  const applicableUpdates = updates.filter(
    (s: ISpellUpdate) =>
      s.school === item.element.school &&
      item.updates.find((u: IPlayerSpellUpdate) => u.id === s.id)
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
  const updateSpell = (update: IPlayerSpellUpdate) => {
    if (context.gameState && context.gameState.player) {
      const newPlayyerWithSpell = updatePlayerSpell(
        context.gameState.player,
        item,
        update
      );
      const newPlayerRemovedResources = {
        ...newPlayyerWithSpell,
        //resources: removeResources(update.resource_base, resources),
      };

      context.setGameState({
        ...context.gameState,
        player: newPlayerRemovedResources,
      });
    }
  };

  return (
    <div className="ItemData">
      <div className="ItemDataInner">
        <div className="ItemDataButtons">
          <button
            className={selection === "applied" ? "active" : "inactive"}
            onClick={() => select("applied")}
          >
            Updated
          </button>
          <button
            className={selection === "available" ? "active" : "inactive"}
            onClick={() => select("available")}
          >
            Updates
          </button>
        </div>
        {updatesToDisplay.map((u: IPlayerSpellUpdate, i: number) => (
          <SpellUpdate key={i} update={u} />
        ))}
      </div>
    </div>
  );
};

const ItemSpellResources = ({ item }: { item: IPlayerSpellUpdate }) => {
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

const TopCardItem = ({ item }: { item: IPlayerSpell | IPlayerSpellUpdate }) => {
  // Only Spells and Updates have mana
  const imgUrl =
    "updates" in item
      ? `/img/Spells/${item.element.color}/${item.id}_back.jpg`
      : `/img/Spells/${item.school}/${item.id}_back.jpg`;
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

const BottomCardItem = ({
  item,
}: {
  item: IPlayerSpell | IPlayerSpellUpdate;
}) => {
  return (
    <div className="BottomCard">
      {"updates" in item ? (
        <ItemSpellUpdates item={item as IPlayerSpell} />
      ) : (
        <ItemSpellResources item={item as IPlayerSpellUpdate} />
      )}
    </div>
  );
};

export const InfoItem = ({
  item,
}: {
  item: IPlayerSpellUpdate | IPlayerSpell;
}) => {
  return (
    <div className="InfoCard">
      <TopCardItem item={item} />
      <BottomCardItem item={item} />
    </div>
  );
};
