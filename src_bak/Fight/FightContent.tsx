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
  setResult,
}: {
  prefightState: FightState;
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
      />
      <FightLevel
        fightState={fightState}
        enemyAct={enemyAct}
        animation={animation}
      />
      <FightDeck fightState={fightState} selectSpell={heroAct} />
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
