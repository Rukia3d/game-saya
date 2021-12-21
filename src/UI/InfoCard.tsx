import React from "react";
import { SpellUpdate } from "../Spells/SpellUpdate";
import { IEnemy, IHero, ISpell, ISpellUpdate } from "../utils/types";
import { CloseButton } from "./CloseButton";
import "./InfoCard.scss";
// Types
// Utils
// Components

type ItemsForCard = ISpell | ISpellUpdate | IEnemy | IHero;

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
          </div>
        </div>
      )}
    </div>
  );
};

const HeroSpells = ({ item }: { item: IHero | IEnemy }) => {
  return (
    <div className="">
      <h3>HeroSpells</h3>
    </div>
  );
};

const HeroDescription = ({ item }: { item: IHero | IEnemy }) => {
  return (
    <div className="">
      <h3>HeroDescription</h3>
    </div>
  );
};

const HeroCard = ({ item }: { item: IHero | IEnemy }) => {
  return (
    <div className="">
      <h3>HeroCard</h3>
    </div>
  );
};

const TopCard = ({ item }: { item: ItemsForCard }) => {
  // Only Spells and Updates have mana
  const imgUrl = `/img/Spells/${item.element}/${item.element}_back.jpg`;
  return (
    <div className="TopCard">
      <div className="TopLeftBorder">
        <div
          className="TopLeft"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        >
          {"mana" in item ? (
            <ItemCard item={item as ISpell | ISpellUpdate} />
          ) : (
            <HeroCard item={item as IHero | IEnemy} />
          )}
        </div>
      </div>
      <div className="TopRightBorder">
        <div className="TopRight">
          {"mana" in item ? (
            <ItemDescription item={item as ISpell | ISpellUpdate} />
          ) : (
            <HeroSpells item={item as IHero | IEnemy} />
          )}
        </div>
      </div>
    </div>
  );
};

const BottomCard = ({ item }: { item: ItemsForCard }) => {
  return (
    <div className="BottomCard">
      {"mana" in item ? (
        <ItemData item={item as ISpell | ISpellUpdate} />
      ) : (
        <HeroDescription item={item as IHero | IEnemy} />
      )}
    </div>
  );
};

export const InfoCard = ({
  item,
  setInfo,
}: {
  item: ItemsForCard;
  setInfo: (s: ItemsForCard | null) => void;
}) => {
  console.log(item);
  return (
    <div className="Info" aria-label="info_card" onClick={() => setInfo(null)}>
      <div className="InfoCardBorder">
        <div className="InfoCard">
          <CloseButton onClick={setInfo} />
          <TopCard item={item} />
          <BottomCard item={item} />
        </div>
      </div>
    </div>
  );
};
