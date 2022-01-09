import React from "react";
import "./Fight.scss";
import "./FightWeather.scss";
import { useFight } from "../hooks/useFight";
// Types
import { IEnemy, FightState, ISpell } from "../utils/types";
// Utils
// Components
import { FightLevel } from "./FightLevel";
import { FightDeck } from "./FightDeck";
import { SpellsBig } from "./SpellsBig";

export const FightContent = ({
  prefightState,
  setInfo,
  setResult,
}: {
  prefightState: FightState;
  setInfo: (s: null | ISpell | IEnemy) => void;
  setResult: (r: null | string) => void;
}) => {
  const [enemyCard, heroCard, animation, fightState, enemyAct, heroAct] =
    useFight(prefightState, setResult);

  return (
    <div className="FightContent">
      <SpellsBig
        enemySpell={enemyCard}
        heroSpell={heroCard}
        element={fightState.element}
        setInfo={setInfo}
      />
      <FightLevel
        fightState={fightState}
        enemyAct={enemyAct}
        setInfo={setInfo}
        animation={animation}
      />
      <FightDeck
        fightState={fightState}
        selectSpell={heroAct}
        setInfo={setInfo}
      />
      {/* <div className="fireflies">
        {new Array(100).fill(0).map((x, n) => (
          <div key={n} className="firefly"></div>
        ))}
      </div> */}
      <div className="leaves">
        {new Array(10).fill(0).map((x, n) => (
          <div key={n} className="firefly"></div>
        ))}
      </div>
    </div>
  );
};
