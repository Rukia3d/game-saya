import React from "react";
import "./Heroes.scss";
// Types
import { IEnemy, IHero } from "../utils/types";
// Utils
// Components
import { AnimatedSpriteCycle } from "../Animations/AnimatedSpriteCycle";

export const HeroesActive = ({
  characters,
  enemy,
}: {
  characters: IHero[];
  enemy: IEnemy;
}) => {
  console.log("enemy", enemy);
  return (
    <div className="MidSection">
      {characters.map((h: IHero, i: number) => (
        <div
          className="HeroActive"
          style={{ position: "absolute", left: 70 * i }}
        >
          <AnimatedSpriteCycle
            width={500}
            height={500}
            img={`../img/Heroes/Animations/${h.id}_idle.png`}
            frames={9}
            breakpoint={1}
          />
        </div>
      ))}
      <div className="HeroActive" style={{ position: "absolute", right: 0 }}>
        <AnimatedSpriteCycle
          width={500}
          height={500}
          img={`../img/Enemies/${enemy.element}/${enemy.id}_idle.png`}
          frames={10}
          breakpoint={1}
        />
      </div>
    </div>
  );
};

export const HeroesActiveData = ({ characters }: { characters: IHero[] }) => {
  return <div className="BottomSection"></div>;
};
