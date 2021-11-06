import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import "./City.css";
// Types
import { IDialogue, INPC } from "../utils/types";
// Utils
import { findDialogue } from "../utils/helpers";
// Components
import { DialogueCity } from "../Dialogues/DialogueCity";

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
    <img
      className="IntroImage"
      src={`../img/NPCs/${hero.image}`}
      alt={`hero_${hero.id}`}
    />
  );
};

export const City = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }

  const [dialogue, setDialogue] = useState<IDialogue | null>(null);
  const characters = context.gameState.player.npcs;
  const activeHeroes = characters.filter((c: INPC) => c.dial !== "null");

  return (
    <div className="Intro">
      <div className="IntroBackgroundBorder">
        <img
          className="IntroBackground"
          src="../img/main_hall_background.png"
          alt="intro_background"
        />
      </div>
      <div className="IntroPresent">
        {characters.map((c: INPC, i: number) => (
          <NPC key={i} hero={c} />
        ))}
        <div className="IntroActive">
          {activeHeroes.map((c: INPC, i: number) => (
            <NPCIcon key={i} hero={c} setDialogue={setDialogue} />
          ))}
        </div>
      </div>
      {dialogue ? (
        <DialogueCity dialogue={dialogue} setDialogue={setDialogue} />
      ) : null}
    </div>
  );
};
