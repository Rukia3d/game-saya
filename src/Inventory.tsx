import { useContext } from "react";
import { IMaterialQuant } from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";

export const InventoryItem = ({ item }: { item: IMaterialQuant }) => {
  return (
    <div className="InventoryItem">
      {item.name}: {item.quantity}
    </div>
  );
};

export const Inventory = ({
  arcana,
  setArcana,
  setScreen,
}: {
  arcana: number | null;
  setArcana: (n: number | null) => void;
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }

  const inventory = context.player.materials;
  return (
    <div className="Inventory">
      <TopMenu />
      <PopUp close={() => setScreen("menus")}>
        <div className="InventoryItems">
          {inventory.map((m: IMaterialQuant, i: number) => (
            <InventoryItem item={m} key={i} />
          ))}
        </div>
      </PopUp>
    </div>
  );
};
