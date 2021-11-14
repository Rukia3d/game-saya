import React from "react";
import "./Fight.css";
import { useFightScene } from "../hooks/useFightScene";
// Types
import { IEnemy, FightState, ISpell } from "../utils/types";
// Utils
// Components
import { EnemyBlock } from "./EnemyBlock";
import { HeroBlock } from "./HeroBlock";
import { SpellsBig } from "./SpellsBig";

export const FightScene = ({
  prefightState,
  setInfo,
  setResult,
}: {
  prefightState: FightState;
  setInfo: (s: null | ISpell | IEnemy) => void;
  setResult: (r: null | string) => void;
}) => {
  const [enemyCard, heroCard, animation, fightState, enemyAct, heroAct] =
    useFightScene(prefightState, setResult);

  const tempStyle = {
    position: "absolute" as "absolute",
    top: "20px",
    left: "20px",
    zIndex: 50000,
  };

  return (
    <>
      <div
        className="Animation"
        style={tempStyle}
        aria-label={`animation-${animation}`}
      >
        <h1>{animation}</h1>
      </div>
      <SpellsBig
        enemySpell={enemyCard}
        heroSpell={heroCard}
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
        selectSpell={heroAct}
        setInfo={setInfo}
      />
    </>
  );
};
