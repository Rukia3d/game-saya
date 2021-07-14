import React, { useContext, useState } from "react";
import "./CharacterSpells.css";

import { CloseButton } from "../UI/CloseButton";

import { Character, Spell } from "../utils/types";
import { InfoCard } from "../UI/InfoCard";
import { HeroSpellWithInfo } from "../Fight/HeroBlock";
import { GameContext } from "../App";
import { changeCardsInDeck } from "../utils/gamelogic";

export const CharacterSpells = ({
  hero,
  spells,
  setHero,
}: {
  hero: Character | "Base";
  spells: Spell[];
  setHero: (s: Character | null | "Base") => void;
}) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.setGameState ||
    !context.gameState.player ||
    !context.gameState.player.cards
  ) {
    throw new Error("No data");
  }
  const player = context.gameState.player;
  const playerCards = context.gameState.player.cards;
  const [info, setInfo] = useState<null | Spell>(null);

  const selectCard = (s: Spell) => {
    const newPlayerCards = changeCardsInDeck(playerCards, s);
    const newPlayer = { ...player, cards: newPlayerCards };
    const gameState = context.gameState;
    if (!gameState) throw new Error("Can't update the fight results");
    context.setGameState({ ...gameState, player: newPlayer });
  };
  return (
    <div className="CharacterSpells">
      <h1>{`${hero !== "Base" ? hero.name : "Basic"} spells`}</h1>
      <CloseButton onClick={() => setHero(null)} />
      {info ? <InfoCard item={info} setInfo={setInfo} /> : null}
      <div className="AllCharacterSpells" aria-label="character_spells">
        {spells.map((c: Spell, i: number) => (
          <HeroSpellWithInfo
            key={i}
            selectCard={selectCard}
            setInfo={setInfo}
            card={c}
          />
        ))}
      </div>
    </div>
  );
};
