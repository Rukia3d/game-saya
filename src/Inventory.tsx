import { useContext } from "react";
import { IInventoryQuant } from "../api/engine/types";
import { GameContext } from "./App";
import { CloseButton } from "./PopUp";

export const Inventory = () => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  return (
    <div className="InventoryContainer" data-testid="inventory-screen">
      <h3>Inventory</h3>
      <CloseButton close={() => context.setScreen({ screen: "main" })} />
      <div className="Inventory" data-testid="inventory-list">
        {context.player.materials.map((i: IInventoryQuant, n: number) => (
          <div className="InventoryItem" key={n}>
            <div className="InventoryItemImage"></div>
            <div className="InventoryItemText">
              <h4>{i.name}</h4>
              Quantity: {i.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
