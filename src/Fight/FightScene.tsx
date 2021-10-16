import React, { useEffect, useState } from "react";
import { enemyAttack, getNextElement, updateDecks } from "../utils/fightlogic";
import { elementType, Enemy, FightState, Spell } from "../utils/types";
import { BigCard } from "./BigCard";
import { EnemyBlock } from "./EnemyBlock";
import "./Fight.css";
import { HeroBlock } from "./HeroBlock";

export const BigCardsBlock = ({
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
  const [firstAction, setFirstAction] = useState(true);
  const [enemyCard, setEnemyCard] = useState<Spell | null>(null);
  const [heroCard, setHeroCard] = useState<Spell | null>(null);
  const [commands, setComands] = useState<String[]>([
    "Assign enemy element",
    "Give player cards",
  ]);

  const startFight = () => {
    if (fightState.hero.life <= 0) {
      setResult("Lost");
      return;
    }
    if (fightState.enemyDeck.length <= 1) {
      setResult("Won");
      return;
    }
    setfightState((newstate) => ({
      ...newstate,
      element: getNextElement(fightState.elements, fightState.element),
    }));
    setTimeout(() => {
      enemyAct(0);
    }, 500);
  };

  const enemyAct = (index: number) => {
    if (fightState.enemyDeck.length === index)
      throw new Error("Enemy Deck is empty");
    setEnemyCard(fightState.enemyDeck[index]);
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
    setHeroCard(fightState.heroDeck[index]);
    setfightState((newstate) => ({
      ...newstate,
      heroCardIndex: index,
    }));
    setTimeout(() => {
      matchCards();
    }, 500);
  };

  const matchCards = () => {
    setfightState((newstate) => {
      return enemyAttack(newstate);
    });
    setTimeout(() => {
      actionEnd();
    }, 500);
  };

  const actionEnd = () => {
    setHeroCard(null);
    setEnemyCard(null);
    setfightState((newstate) => {
      return updateDecks(newstate);
    });
    setTimeout(() => {
      updateCards();
    }, 500);
  };

  const updateCards = () => {
    setfightState((newstate) => ({
      ...newstate,
      enemyCardIndex: null,
      heroCardIndex: null,
    }));

    setTimeout(() => {
      startFight();
    }, 500);
  };

  if (firstAction) {
    setTimeout(() => {
      startFight();
    }, 500);
    setFirstAction(false);
  }
  return (
    <>
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
