import React from "react";
import { useFightScene } from "../hooks/useFightScene";
import { elementType, Enemy, FightState, Spell } from "../utils/types";
import { BigCard } from "./BigCard";
import { EnemyBlock } from "./EnemyBlock";
import "./Fight.css";
import { HeroBlock } from "./HeroBlock";

const BigCardsBlock = ({
  enemyCard,
  heroCard,
  element,
  setInfo,
}: {
  enemyCard: Spell | null;
  heroCard: Spell | null;
  element: elementType;
  setInfo: (s: null | Spell | Enemy) => void;
}) => {
  return (
    <>
      {enemyCard ? (
        <BigCard card={enemyCard} setInfo={setInfo} element={element} />
      ) : null}
      {enemyCard && heroCard ? (
        <BigCard card={heroCard} setInfo={setInfo} element={element} />
      ) : null}
    </>
  );
};

export const FightScene = ({
  prefightState,
  setInfo,
  setResult,
}: {
  prefightState: FightState;
  setInfo: (s: null | Spell | Enemy) => void;
  setResult: (r: null | String) => void;
}) => {
  const [enemyCard, heroCard, animation, fightState, enemyAct, heroAct] =
    useFightScene(prefightState, setResult);

  const tempStyle = {
    position: "absolute" as "absolute",
    top: "20px",
    left: "20px",
    zIndex: 50000,
  };
  // console.log("figtstate life", fightState.enemyDeck.length);
  return (
    <>
      <div
        className="Animation"
        style={tempStyle}
        aria-label={`animation-${animation}`}
      >
        <h1>{animation}</h1>
      </div>
      <BigCardsBlock
        enemyCard={enemyCard}
        heroCard={heroCard}
        element={fightState.element}
        setInfo={setInfo}
      />
      <EnemyBlock
        fightState={fightState}
        enemyAct={enemyAct}
        setInfo={setInfo}
      />
      <HeroBlock
        fightState={fightState}
        selectCard={heroAct}
        setInfo={setInfo}
      />
    </>
  );
};
