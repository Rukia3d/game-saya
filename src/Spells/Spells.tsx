import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import "./Spells.scss";
// Types
import { colorType, IEnemy, IHero, ISpell, ISpellUpdate } from "../utils/types";
// Utils
import { changeCardsInDeck } from "../utils/fightlogic";
// Components
import { InfoCard } from "../Info/InfoCard";
import { ScrollButton } from "../UI/ScrollButton";
import { Spell } from "./Spell";

export const Spells = ({ spells }: { spells: ISpell[] }) => {
  const context = useContext(GameContext);
  if (
    !context ||
    !context.gameState ||
    !context.setGameState ||
    !context.gameState.player ||
    !context.gameState.player.spells
  ) {
    throw new Error("No data");
  }
  const player = context.gameState.player;
  const playerSpells = context.gameState.player.spells;
  const gameState = context.gameState;
  const [info, setInfo] = useState<
    null | ISpell | ISpellUpdate | IEnemy | IHero
  >(null);

  // const [forge, setForge] = useState<null | ISpell>(null);

  const selectSpell = (i: number) => {
    const newPlayerCards = changeCardsInDeck(playerSpells, i);
    const newPlayer = { ...player, cards: newPlayerCards };
    context.setGameState({ ...gameState, player: newPlayer });
  };

  const imgUrl = `/img/Backgrounds/spells_background.jpg`;
  return (
    <div className="SpellsSelection">
      {info ? <InfoCard item={info} setInfo={setInfo} /> : null}
      <ScrollButton onClick={() => {}} direction="t" />
      <div
        className="SpellsList"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        {spells.map((s: ISpell, i: number) => (
          <Spell
            spell={s}
            index={i}
            spellInfo={setInfo}
            selectSpell={selectSpell}
            withName
            withBorder
          />
        ))}
      </div>
      <ScrollButton onClick={() => {}} direction="d" />
    </div>
  );
};

export const SpellsSelection = ({ spells }: { spells: ISpell[] }) => {
  return (
    <div className="Spells">
      <h2>Spells selection</h2>
      <Spells spells={spells} />
    </div>
  );
};
