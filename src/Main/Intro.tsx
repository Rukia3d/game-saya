import React, { useContext } from "react";
import "./Intro.css";
import { Character } from "../utils/types";
import { GameContext } from "../App";
import { findDialogue } from "../utils/helpers";

const CharacterIcon = ({ hero }: { hero: Character }) => {
  const context = useContext(GameContext);
  if (!context || !context.setDialogue || !context.gameState) {
    throw new Error("No data");
  }

  if (!hero.dial)
    throw new Error("Loading diaglogue for hero with no dialogue id");
  const dialogue = findDialogue(context.gameState.dialogues, hero.dial);

  const stateToImage = `../img/${hero.id}_${hero.state}.jpg`;
  return (
    <div
      className="IntroIconBorder"
      onClick={() => (hero.dial ? context.setDialogue(dialogue) : null)}
    >
      <div className="IntroIcon">
        <img src={stateToImage} alt={`${hero.id}_${hero.state}`} />
      </div>
    </div>
  );
};

export const Intro = () => {
  const context = useContext(GameContext);
  if (!context || !context.gameState || !context.gameState.player.npcs) {
    throw new Error("No data");
  }
  const characters = context.gameState.player.npcs;
  const activeHeroes = characters.filter((c: Character) => c.dial);
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
        {characters.map((c: Character, i: number) => (
          <img
            className="IntroImage"
            src={c.image}
            alt={`hero_${c.id}`}
            key={i}
          />
        ))}
        <div className="IntroActive">
          {activeHeroes.length > 0
            ? activeHeroes.map((c: Character, i: number) => (
                <CharacterIcon key={i} hero={c} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
