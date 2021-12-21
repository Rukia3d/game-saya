import React from "react";
import "./InfoCard.scss";
// Types
import { IEnemy, IHero } from "../utils/types";
// Utils
// Components

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
          <HeroSpells item={item} />
        </div>
      </div>
    </div>
  );
};

const BottomCardHero = ({ item }: { item: IHero | IEnemy }) => {
  return (
    <div className="BottomCard">
      <HeroDescription item={item as IHero | IEnemy} />
    </div>
  );
};

export const InfoHero = ({ item }: { item: IHero }) => {
  return (
    <div className="InfoCard">
      <TopCardHero item={item} />
      <BottomCardHero item={item} />
    </div>
  );
};
