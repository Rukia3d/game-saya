import React, { useState } from "react";
import { enemyAttack, getNextElement, updateDecks } from "../utils/fightlogic";
import { elementType, Enemy, FightState, Spell } from "../utils/types";
import { BigCard } from "./BigCard";
import { EnemyBlock } from "./EnemyBlock";
import "./Fight.css";
import { HeroBlock } from "./HeroBlock";

const SHORTANIMATION = 500;
const LONGANIMATION = 1500;

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
  const [fightState, setfightState] = useState<FightState>(prefightState);
  const [enemyCard, setEnemyCard] = useState<Spell | null>(null);
  const [heroCard, setHeroCard] = useState<Spell | null>(null);
  const [animation, setAnimation] = useState<String | null>(null);
  const [nextStep, setNextStep] = useState<String | null>("loadFight");

  const enemyAct = (index: number) => {
    if (fightState.enemyDeck.length === index)
      throw new Error("Enemy Deck is empty");
    setEnemyCard(fightState.enemyDeck[index]);
    setAnimation(`ENEMYACT`);
    setfightState((newstate) => ({
      ...newstate,
      enemyCardIndex: 0,
    }));
  };

  const heroAct = (index: number) => {
    if (fightState.enemyCardIndex === null) {
      console.warn("You are acting first");
      return;
    }
    if (fightState.heroCardIndex !== null) {
      console.warn("Card already selected");
      return;
    }
    setHeroCard(fightState.heroDeck[index]);
    setfightState((newstate) => ({
      ...newstate,
      heroCardIndex: index,
    }));
    setAnimation(`HEROACT`);
    setTimeout(() => {
      setNextStep("matchCards");
    }, SHORTANIMATION);
  };

  if (nextStep === "loadFight") {
    setNextStep(null);
    setAnimation(`GIVECARDS`);
    setTimeout(() => {
      setNextStep("startFight");
    }, LONGANIMATION);
  }

  if (nextStep === "startFight") {
    setNextStep(null);
    setfightState((newstate) => ({
      ...newstate,
      element: getNextElement(fightState.elements, fightState.element),
    }));
    setAnimation(`ELEMENT`);
    setTimeout(() => {
      setNextStep("enemyAct0");
    }, SHORTANIMATION);
  }

  if (nextStep === "enemyAct0") {
    setNextStep(null);
    enemyAct(0);
  }

  if (nextStep === "matchCards") {
    console.log("match cards");
    setNextStep(null);
    setfightState((newstate) => enemyAttack(newstate));
    setAnimation(`FIGHT`);
    setTimeout(() => {
      setNextStep("actionEnd");
    }, SHORTANIMATION);
  }

  if (nextStep === "actionEnd") {
    setNextStep(null);
    setHeroCard(null);
    setEnemyCard(null);
    console.log("actionEnd");
    setfightState((newstate) => updateDecks(newstate));
    setAnimation(`ACTIONEND`);
    setTimeout(() => {
      setNextStep("clearCards");
    }, SHORTANIMATION);
  }

  if (nextStep === "clearCards") {
    setNextStep(null);
    setfightState((newstate) => ({
      ...newstate,
      enemyCardIndex: null,
      heroCardIndex: null,
    }));

    if (fightState.hero.life <= 0) {
      setAnimation("LOST");
      setTimeout(() => {
        setResult("Lost");
      }, SHORTANIMATION);
    } else if (fightState.enemyDeck.length === 0) {
      setAnimation("WON");
      setTimeout(() => {
        setResult("Won");
      }, SHORTANIMATION);
    } else {
      setAnimation(`GIVECARD`);
      setTimeout(() => {
        setNextStep("startFight");
      }, SHORTANIMATION);
    }
  }

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
