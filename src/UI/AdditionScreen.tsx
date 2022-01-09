import React, { useContext } from "react";
import { GameContext } from "../App";
import { InfoCard } from "../Info/InfoCard";
import "./AdditionScreen.css";
// Types
// Utils
// Components

export const AdditionScreen = () => {
  const context = useContext(GameContext);
  if (!context || !context.setAdditionScreen) {
    throw new Error("No data in context");
  }

  const closeInfo = () => {
    context.setAdditionScreen(null);
  };

  return (
    <div>
      {context.addition ? (
        <InfoCard item={context.addition} setInfo={closeInfo} />
      ) : null}
    </div>
  );
};
