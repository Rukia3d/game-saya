import React, { useContext, useState } from "react";
import "./CharacterSpells.css";

import { CloseButton } from "../UI/CloseButton";

import { Character, Spell } from "../utils/types";
import { InfoCard } from "../UI/InfoCard";
import { HeroSpellWithInfo } from "../Fight/HeroSpellWithInfo";
import { GameContext } from "../App";
import { changeCardsInDeck } from "../utils/gamelogic";
import { ForgeCard } from "../UI/ForgeCard";

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
  const gameState = context.gameState;
  const [info, setInfo] = useState<null | Spell>(null);
  const [forge, setForge] = useState<null | Spell>(null);

  const selectCard = (s: Spell) => {
    const newPlayerCards = changeCardsInDeck(playerCards, s);
    const newPlayer = { ...player, cards: newPlayerCards };
    context.setGameState({ ...gameState, player: newPlayer });
  };
  return (
    <div className="CharacterSpells">
      <h1>{`${hero !== "Base" ? hero.name : "Basic"} spells`}</h1>
      <CloseButton onClick={() => setHero(null)} />
      {info ? <InfoCard item={info} setInfo={setInfo} /> : null}
      {forge ? <ForgeCard item={forge} setForge={setForge} /> : null}
      <div className="AllCharacterSpells" aria-label="character_spells">
        {spells.map((c: Spell, i: number) => (
          <HeroSpellWithInfo
            forge
            key={i}
            selectCard={selectCard}
            setInfo={setInfo}
            element={null}
            card={c}
            setForge={setForge}
          />
        ))}
      </div>
    </div>
  );
};
