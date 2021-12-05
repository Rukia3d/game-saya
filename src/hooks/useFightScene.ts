import { useCallback, useEffect, useState } from "react";
import { enemyAttack } from "../utils/hitlogic";
import { getNextElement, updateDecks } from "../utils/fightlogic";
import { FightState, ISpell } from "../utils/types";

const SHORTANIMATION = 500;
const LONGANIMATION = 1500;

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

export const useFightScene = (
  prefightState: FightState,
  setResult: (r: null | string) => void
): [
  ISpell | null,
  ISpell | null,
  string | null,
  FightState,
  (index: number) => void,
  (index: number) => void
] => {
  const [fightState, setfightState] = useState<FightState>(prefightState);
  const [enemyCard, setEnemyCard] = useState<ISpell | null>(null);
  const [heroCard, setHeroCard] = useState<ISpell | null>(null);
  const [animation, setAnimation] = useState<string | null>(null);
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
    setHeroCard(fightState.heroHand[index]);
    setfightState((newstate) => ({
      ...newstate,
      heroCardIndex: index,
    }));
    setAnimation(`HEROACT`);
    setNextStep("preMatchCards");
  };

  const canGameContinue = () => {
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

      canGameContinue();
    }

    if (nextStep === "lost") {
      setResult("Lost");
    }

    if (nextStep === "won") {
      setResult("Won");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextStep]);
  return [enemyCard, heroCard, animation, fightState, enemyAct, heroAct];
};
