import React, { useContext } from "react";
import "./City.css";
import { CharacterNPC } from "../utils/types";
import { GameContext } from "../App";
import { findDialogue } from "../utils/helpers";

const CharacterIcon = ({ hero }: { hero: CharacterNPC }) => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }
  const dialogue = findDialogue(context.gameState.dialogues, hero.dial);
  const stateToImage = `../img/NPCs/${hero.id}_story.jpg`;
  return (
    <div
      className="IntroIconBorder"
      onClick={() => (hero.dial ? context.setDialogue(dialogue) : null)}
    >
      <div className="IntroIcon">
        <img src={stateToImage} alt={`${hero.id}_story`} />
      </div>
    </div>
  );
};

export const City = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState) {
    throw new Error("No data in context");
  }
  const characters = context.gameState.player.npcs;
  const activeHeroes = characters.filter(
    (c: CharacterNPC) => c.dial !== "null"
  );
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
        {characters.map((c: CharacterNPC, i: number) => (
          <img
            className="IntroImage"
            src={`../img/NPCs/${c.image}`}
            alt={`hero_${c.id}`}
            key={i}
          />
        ))}
        <div className="IntroActive">
          {activeHeroes.map((c: CharacterNPC, i: number) => (
            <CharacterIcon key={i} hero={c} />
          ))}
        </div>
      </div>
    </div>
  );
};
