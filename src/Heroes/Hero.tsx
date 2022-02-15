import React from "react";
import "./Heroes.scss";
// Types
import { IPlayerHero } from "../utils/types";
// Utils
// Components

export const Hero = ({
  hero,
  selectHero,
}: {
  hero: IPlayerHero;
  selectHero?: (h: IPlayerHero) => void;
}) => {
  const imgUrl = `../img/Heroes/${hero.id}.png`;
  const backImgUrl = `/img/Spells/${hero.element.color}/back.jpg`;
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
