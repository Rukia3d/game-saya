import React from "react";
import "./Heroes.scss";
// Types
import { IHero } from "../utils/types";
// Utils
// Components

export const Hero = ({
  hero,
  selectHero,
}: {
  hero: IHero;
  selectHero?: (h: IHero) => void;
}) => {
  const imgUrl = `../img/Heroes/${hero.image}.png`;
  const backImgUrl = `/img/Spells/${hero.element}/${hero.element}_back.jpg`;
  return (
    <div className="HeroImageBorder">
      <div
        className="HeroImageBack"
        style={{
          backgroundImage: `url(${backImgUrl})`,
        }}
      >
        <div
          className="HeroImage"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
          area-label={`hero_${hero.id}`}
          onClick={() => (selectHero ? selectHero(hero) : null)}
        ></div>
      </div>
    </div>
  );
};
