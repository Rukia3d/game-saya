import React, { useContext, useState } from "react";
import { GameContext } from "../App";
import "./Spells.css";
// Types
import {
  elementType,
  IEnemy,
  IHero,
  ISpell,
  ISpellUpdate,
} from "../utils/types";
// Utils
import { changeCardsInDeck } from "../utils/fightlogic";
// Components
import { CloseButton } from "../UI/CloseButton";
import { InfoCard } from "../Info/InfoCard";
import { SpellWithInfo } from "./SpellWithInfo";
import { SpellLibrary } from "./SpellLibrary";

export const Spells = ({
  element,
  spells,
  setElement,
}: {
  element: elementType;
  spells: ISpell[];
  setElement: (s: elementType | null) => void;
}) => {
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
  const playerCards = context.gameState.player.spells;
  const gameState = context.gameState;
  const [info, setInfo] = useState<
    null | ISpell | ISpellUpdate | IEnemy | IHero
  >(null);
  const [forge, setForge] = useState<null | ISpell>(null);

  const selectSpell = (s: ISpell) => {
    const newPlayerCards = changeCardsInDeck(playerCards, s);
    const newPlayer = { ...player, cards: newPlayerCards };
    context.setGameState({ ...gameState, player: newPlayer });
  };
  return (
    <div className="ElementSpells">
      <h1>{`${element.charAt(0).toUpperCase() + element.slice(1)} spells`}</h1>
      <CloseButton onClick={() => setElement(null)} />
      {info ? <InfoCard item={info} setInfo={setInfo} /> : null}
      {forge ? <SpellLibrary item={forge} setForge={setForge} /> : null}
      <div className="ElementSpellsList" aria-label="character_spells">
        {spells.map((c: ISpell, i: number) => (
          <SpellWithInfo
            forge
            key={i}
            selectSpell={selectSpell}
            setInfo={setInfo}
            element={c.element}
            spell={c}
            setForge={setForge}
          />
        ))}
      </div>
    </div>
  );
};
