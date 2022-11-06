import { useContext } from "react";
import { IMaterialQuant } from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { CloseButton } from "./PopUp";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
}

export const Inventory = ({
  setScreen,
}: {
  setScreen: (n: mainScreenState) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const items: InventoryItem[] = [
    {
      id: 0,
      name: "Energy",
      quantity: context.player.energy,
    },
    {
      id: 1,
      name: "Experience",
      quantity: context.player.exprience,
    },
  ];
  context.player.materials.map((m: IMaterialQuant, n: number) =>
    items.push({
      id: n + 2,
      name: m.name,
      quantity: m.quantity,
    })
  );
  return (
    <div className="InventoryContainer" data-testid="inventory-screen">
      <h3>Inventory</h3>
      <CloseButton close={() => setScreen("main")} />
      <div className="Inventory" data-testid="inventory-list">
        {items.map((i: InventoryItem, n: number) => (
          <div className="InventoryItem" key={n}>
            <div className="InventoryItemImage"></div>
            <div className="InventoryItemText">
              <h4>{i.name}</h4>
              Quantity: {i.quantity}
              <br />
              {n === 0 ? <button>Generate</button> : <div> </div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
