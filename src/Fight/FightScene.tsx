import React, { useState } from "react";
import { enemyAttack, getNextElement } from "../utils/fightlogic";
import { Enemy, FightState, Spell } from "../utils/types";
import { BigCard } from "./BigCard";
import { EnemyBlock } from "./EnemyBlock";
import "./Fight.css";
import { HeroBlock } from "./HeroBlock";
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
  const [commands, setComands] = useState<String[]>([
    "Assign enemy element",
    "Give player cards",
  ]);
  const enemyAct = () => {
    const spell = fightState.enemyDeck[0] || null;
    console.log("Enemy deck", fightState.enemyDeck.length);
    console.log("Enemy spell", spell);
    setComands(commands.concat(["Select enemy card"]));
    setfightState((newstate) => ({
      ...newstate,
      enemyCard: spell,
    }));
  };

  const selectCard = (card: Spell) => {
    console.log("selectCard");
    if (!fightState.enemyCardIndex) {
      console.warn("You are acting first");
      return;
    }
    setComands(commands.concat(["Select hero card"]));
    setfightState((newstate) => ({
      ...newstate,
      heroCard: card,
    }));
    setTimeout(() => {
      console.log("first timeout");
      setComands(commands.concat(["Hit hero"]));
      setfightState((newstate) => enemyAttack(newstate));
    }, 500);
    setTimeout(() => {
      console.log("second timeout");
      setComands(commands.concat(["Hit enemy"]));
      actionEnd();
    }, 1000);
  };

  const actionEnd = () => {
    console.log("actionEnd");
    setComands(commands.concat(["Act both cards"]));
    setfightState((newstate) => ({
      ...newstate,
      enemyCard: null,
      heroCard: null,
    }));
    setComands(commands.concat(["Change Element"]));
    setfightState((newstate) => ({
      ...newstate,
      element: getNextElement(fightState.elements, fightState.element),
    }));
    console.log("fightState.hero.life <= 0", fightState.hero.life <= 0);
    if (fightState.hero.life <= 0) {
      commands.push("Show player lost");
      setResult("Lost");
    }
    console.log(
      "fightState.enemyDrop.length === fightState.enemyDeck.length - 1",
      fightState.enemyDrop.length === fightState.enemyDeck.length - 1
    );
    if (fightState.enemyDrop.length === fightState.enemyDeck.length - 1) {
      commands.push("Show player Won");
      setResult("Won");
    }
    commands.push("Give player a card");
    console.log("Action end", commands);
    enemyAct();
  };
  return (
    <>
      {fightState.enemyCardIndex ? (
        <BigCard
          card={fightState.enemyDeck[fightState.enemyCardIndex]}
          setInfo={setInfo}
          element={fightState.element}
        />
      ) : null}
      {fightState.heroCardIndex ? (
        <BigCard
          card={fightState.heroHand[fightState.heroCardIndex]}
          setInfo={setInfo}
          element={fightState.element}
        />
      ) : null}
      <EnemyBlock
        fightState={fightState}
        enemyAct={enemyAct}
        setInfo={setInfo}
      />
      <HeroBlock
        fightState={fightState}
        selectCard={selectCard}
        setInfo={setInfo}
      />
    </>
  );
};
