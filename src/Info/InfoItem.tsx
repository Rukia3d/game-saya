import React from "react";
import "./InfoCard.scss";
// Types
import { ISpell, ISpellUpdate } from "../utils/types";
// Utils
// Components
import { SpellUpdate } from "../Spells/SpellUpdate";
import { ResourceDatalist } from "../Spells/Resources";

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

const ItemData = ({ item }: { item: ISpell | ISpellUpdate }) => {
  return (
    <div className="ItemData">
      {"updates" in item ? (
        <div>
          <div className="ItemDataHeader">
            <h3>Updates</h3>
          </div>
          {item.updates.map((u: ISpellUpdate, i: number) => (
            <SpellUpdate key={i} update={u} canUpdate={false} />
          ))}
        </div>
      ) : (
        <div>
          <div className="ItemDataHeader">
            <h3>Resources</h3>
            <ResourceDatalist spellResources={item.resource_base} />
          </div>
        </div>
      )}
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
      <ItemData item={item as ISpell | ISpellUpdate} />
    </div>
  );
};

export const InfoItem = ({ item }: { item: ISpellUpdate }) => {
  return (
    <div className="InfoCard">
      <TopCardItem item={item} />
      <BottomCardItem item={item} />
    </div>
  );
};
