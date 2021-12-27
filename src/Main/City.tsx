import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import "./City.scss";
// Types
import { IDialogue, IHero, INPC } from "../utils/types";
// Utils
import { findDialogue, generateInt } from "../utils/helpers";
// Components
import { Dialogue } from "../Dialogues/Dialogue";
import { AnimatedSpriteCycle } from "../Animations/AnimatedSpriteCycle";

const MainScreenIcon = ({
  hero,
  setDialogue,
}: {
  hero: INPC;
  setDialogue: (d: IDialogue | null) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }
  const dialogue = findDialogue(context.gameState.dialogues, hero.dial);
  const stateToImage = `../img/Dialogues/Main/${hero.id}_story.jpg`;
  return (
    <div
      className="CityIconBorder"
      onClick={() => (hero.dial ? setDialogue(dialogue) : null)}
    >
      <div className="CityIcon">
        <img src={stateToImage} alt={`${hero.id}_story`} />
      </div>
    </div>
  );
};

const MainScreenHero = ({ hero }: { hero: IHero }) => {
  return (
    <div className="CityHeroImage" aria-label={`hero_${hero.id}`}>
      <AnimatedSpriteCycle
        width={500}
        height={500}
        img={`../img/Heroes/Animations/${hero.id}_idle.png`}
        frames={9}
        breakpoint={1}
      />
    </div>
  );
};

export const City = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }

  const [dialogue, setDialogue] = useState<IDialogue | null>(null);
  const heroes = context.gameState.player.heroes;
  const characters = context.gameState.player.npcs;
  const mainScreenHero = heroes[generateInt(heroes.length - 1)];
  const activeHeroes = characters.filter((c: INPC) => c.dial !== null);
  const imgUrl = `/img/Backgrounds/main_background.jpg`;
  return (
    <div
      className="City"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="CityPresent">
        <MainScreenHero hero={mainScreenHero} />
      </div>
      <div className="CityActive">
        {activeHeroes.map((c: INPC, i: number) => (
          <MainScreenIcon key={i} hero={c} setDialogue={setDialogue} />
        ))}
      </div>
      {dialogue ? (
        <Dialogue dialogue={dialogue} setDialogue={setDialogue} />
      ) : null}
    </div>
  );
};
