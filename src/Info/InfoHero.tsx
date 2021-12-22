import React from "react";
import "./InfoCard.scss";
// Types
import { IEnemy, IHero, ISpell } from "../utils/types";
import { Spell } from "../Spells/Spell";
// Utils
// Components

const HeroSkins = ({ item }: { item: IHero }) => {
  return (
    <div className="ItemData">
      <div className="ItemDataHeader">
        <h3>Skins</h3>
      </div>
    </div>
  );
};

const EnemySpells = ({ item }: { item: IEnemy }) => {
  return (
    <div className="ItemData">
      <div className="ItemDataHeader">
        <h3>Speels</h3>
        {item.spells.map((s: ISpell, i: number) => (
          <Spell element={item.element} spell={s} key={i} />
        ))}
      </div>
    </div>
  );
};

const HeroDescription = ({ item }: { item: IHero | IEnemy }) => {
  return (
    <div className="ItemDescription">
      <div className="ItemDescriptionElement">{item.element}</div>
      {"experience" in item ? (
        <div
          className="ItemDescriptionDifficulty"
          aria-label="enemy_experience"
        >
          Experience: {item.experience}
        </div>
      ) : null}
      <div className="ItemDescriptionText">{item.description}</div>
    </div>
  );
};

const HeroCard = ({ item }: { item: IHero | IEnemy }) => {
  return (
    <div className="ItemCard">
      <div className="ItemCardHeader">{item.name}</div>
      <img
        src={
          "life" in item
            ? `../img/Enemies/${item.element}/${item.id}.png`
            : `../img/Heroes/${item.id}.png`
        }
        alt="enemy_image"
      />
      {"life" in item ? <h3 aria-label="Spells">Spells: {item.life}</h3> : null}
    </div>
  );
};

const TopCardHero = ({ item }: { item: IHero | IEnemy }) => {
  // Only Enemy has life
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
          <HeroCard item={item} />
        </div>
      </div>
      <div className="TopRightBorder">
        <div className="TopRight">
          <HeroDescription item={item} />
        </div>
      </div>
    </div>
  );
};

const BottomCardHero = ({ item }: { item: IHero | IEnemy }) => {
  return (
    <div className="BottomCard">
      {"life" in item ? <EnemySpells item={item} /> : <HeroSkins item={item} />}
    </div>
  );
};

export const InfoHero = ({ item }: { item: IHero | IEnemy }) => {
  return (
    <div className="InfoCard">
      <TopCardHero item={item} />
      <BottomCardHero item={item} />
    </div>
  );
};
