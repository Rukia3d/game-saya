import { useContext } from "react";
import { ICollection } from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { CloseButton } from "./PopUp";

export const Collections = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const collections = context.player.collections;
  return (
    <div className="CollectionsContainer" data-testid="collections-screen">
      <h3>Collections</h3>
      <CloseButton close={() => setScreen("main")} />
      <div className="Collections" data-testid="collections-list">
        {collections.map((i: ICollection, n: number) => (
          <button key={n}>{i.title}</button>
        ))}
      </div>
    </div>
  );
};
