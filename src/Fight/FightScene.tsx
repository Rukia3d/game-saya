import React, { useCallback, useEffect, useState } from "react";
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

const steps = {
  loadFight: ["startFight", LONGANIMATION],
  startFight: ["enemyAct0", SHORTANIMATION],
  enemyAct0: [null, SHORTANIMATION],
  preMatchCards: ["matchCards", SHORTANIMATION],
  matchCards: ["actionEnd", SHORTANIMATION],
  actionEnd: ["clearCards", SHORTANIMATION],
  clearCards: ["startFight", SHORTANIMATION],

  giveCards: ["startFight", SHORTANIMATION],
  endWon: ["won", SHORTANIMATION],
  endLost: ["lost", SHORTANIMATION],
  lost: [null, SHORTANIMATION],
  won: [null, SHORTANIMATION],
};

const useFightScene = (
  prefightState: FightState,
  setResult: (r: null | String) => void
): [
  Spell | null,
  Spell | null,
  String | null,
  FightState,
  (index: number) => void,
  (index: number) => void
] => {
  const [fightState, setfightState] = useState<FightState>(prefightState);
  const [enemyCard, setEnemyCard] = useState<Spell | null>(null);
  const [heroCard, setHeroCard] = useState<Spell | null>(null);
  const [animation, setAnimation] = useState<String | null>(null);
  const [nextStep, setNextStep] = useState<keyof typeof steps | null>(
    "loadFight"
  );

  useEffect(() => {
    if (!nextStep) return;

    const [step, delay] = steps[nextStep];

    if (!step) return;
    const timer = setTimeout(
      () => setNextStep(step as keyof typeof steps),
      delay as number
    );

    return () => clearTimeout(timer);
  }, [nextStep]);

  const enemyAct = useCallback(
    (index: number) => {
      if (fightState.enemyDeck.length === index)
        throw new Error("Enemy Deck is empty");
      setEnemyCard(fightState.enemyDeck[index]);
      setAnimation(`ENEMYACT`);
      setfightState((newstate) => ({
        ...newstate,
        enemyCardIndex: 0,
      }));
    },
    [fightState.enemyDeck]
  );

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
    setNextStep("preMatchCards");
  };

  useEffect(() => {
    if (nextStep === "loadFight") {
      setAnimation("GIVECARDS");
    }

    if (nextStep === "startFight") {
      setfightState((newstate) => ({
        ...newstate,
        element: getNextElement(fightState.elements, fightState.element),
      }));
      setAnimation(`ELEMENT`);
    }

    if (nextStep === "enemyAct0") {
      enemyAct(0);
    }

    if (nextStep === "matchCards") {
      setfightState((newstate) => enemyAttack(newstate));
      setAnimation(`FIGHT`);
    }

    if (nextStep === "actionEnd") {
      setHeroCard(null);
      setEnemyCard(null);
      setfightState((newstate) => updateDecks(newstate));
      setAnimation(`ACTIONEND`);
    }

    if (nextStep === "clearCards") {
      setfightState((newstate) => ({
        ...newstate,
        enemyCardIndex: null,
        heroCardIndex: null,
      }));

      if (fightState.hero.life <= 0) {
        setAnimation("LOST");
        setNextStep("endLost");
      } else if (fightState.enemyDeck.length === 0) {
        setAnimation("WON");
        setNextStep("endWon");
      } else {
        setAnimation(`GIVECARD`);
        setNextStep("giveCards");
      }
    }

    if (nextStep === "lost") {
      setResult("Lost");
    }

    if (nextStep === "won") {
      setResult("Won");
    }
  }, [nextStep]);

  return [enemyCard, heroCard, animation, fightState, enemyAct, heroAct];
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
