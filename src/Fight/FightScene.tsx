import React from "react";
import "./Fight.scss";
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

  return (
    <div className="FightScene">
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
        animation={animation}
      />
      <HeroBlock
        fightState={fightState}
        selectSpell={heroAct}
        setInfo={setInfo}
      />
    </div>
  );
};
