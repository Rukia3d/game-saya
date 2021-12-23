import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import "./City.scss";
// Types
import { IDialogue, INPC } from "../utils/types";
// Utils
import { findDialogue, generateInt } from "../utils/helpers";
// Components
import { Dialogue } from "../Dialogues/Dialogue";
import { AnimatedSpriteCycle } from "../Animations/AnimatedSpriteCycle";

const NPCIcon = ({
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
  const stateToImage = `../img/NPCs/${hero.id}_story.jpg`;
  return (
    <div
      className="IntroIconBorder"
      onClick={() => (hero.dial ? setDialogue(dialogue) : null)}
    >
      <div className="IntroIcon">
        <img src={stateToImage} alt={`${hero.id}_story`} />
      </div>
    </div>
  );
};

const NPC = ({ hero }: { hero: INPC }) => {
  return (
    <div className="IntroHeroImage" aria-label={`hero_${hero.id}`}>
      <AnimatedSpriteCycle
        width={500}
        height={500}
        img={`../img/NPCs/${hero.id}_idle.png`}
        frames={5}
        breakpoint={1}
      />
    </div>
    // <img
    //   className="IntroImage"
    //   src={`../img/NPCs/${hero.image}`}
    //   alt={`hero_${hero.id}`}
    // />
  );
};

export const City = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }

  const [dialogue, setDialogue] = useState<IDialogue | null>(null);
  const characters = context.gameState.player.npcs;
  const mainScreenChar = characters[generateInt(characters.length - 1)];
  const activeHeroes = characters.filter((c: INPC) => c.dial !== null);

  return (
    <div className="Intro">
      <div className="IntroPresent">
        <NPC hero={mainScreenChar} />
      </div>
      <div className="IntroActive">
        {activeHeroes.map((c: INPC, i: number) => (
          <NPCIcon key={i} hero={c} setDialogue={setDialogue} />
        ))}
      </div>
      {dialogue ? (
        <Dialogue dialogue={dialogue} setDialogue={setDialogue} />
      ) : null}
    </div>
  );
};
