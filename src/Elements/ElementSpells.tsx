import axios from "axios";
import { useContext } from "react";
import {
  IMaterialQuant,
  ISpell,
  ISpellClosed,
  ISpellOpen,
} from "../../api/engine/types";
import { GameContext } from "../App";
import { CloseButton } from "../UIElements/UIButtons";
import "./Elements";

const canBuySpell = (
  materials: IMaterialQuant[],
  price: IMaterialQuant[]
): boolean => {
  let canBuy = true;
  price.forEach((p: IMaterialQuant) => {
    const material = materials.find((m: IMaterialQuant) => m.id === p.id);
    if (!material)
      throw new Error("Price of an item contains non-existant material");
    if (p.quantity > material.quantity) {
      canBuy = false;
    }
  });

  return canBuy;
};

const canUpdateSpell = (
  materials: IMaterialQuant[],
  price: IMaterialQuant[]
): boolean => {
  let canBuy = true;
  price.forEach((p: IMaterialQuant) => {
    const material = materials.find((m: IMaterialQuant) => m.id === p.id);
    if (!material)
      throw new Error("Update Price of an item contains non-existant material");
    if (p.quantity > material.quantity) {
      canBuy = false;
    }
  });

  return canBuy;
};

export const SpellPurchase = ({
  spell,
  materials,
  spellAction,
}: {
  spell: ISpellOpen | ISpellClosed | ISpell;
  materials: IMaterialQuant[];
  spellAction: (i: number, action: "open" | "update") => void;
}) => {
  if ("price" in spell) {
    const available = canBuySpell(materials, spell.price);
    return (
      <div className="SpellPrice">
        <b>To open:</b>
        {spell.price.map((m: IMaterialQuant, i: number) => (
          <div key={i}>{`${m.name}: ${m.quantity} `}</div>
        ))}
        {available ? (
          <button onClick={() => spellAction(spell.id, "open")}>Open</button>
        ) : (
          <div>Not enough materials to open</div>
        )}
      </div>
    );
  } else if ("updatePrice" in spell) {
    const updatable = canUpdateSpell(materials, spell.updatePrice);
    return (
      <div className="SpellPrice">
        <b>To update:</b>
        {spell.updatePrice.map((m: IMaterialQuant, i: number) => (
          <div key={i}>{`${m.name}: ${m.quantity} `}</div>
        ))}
        {updatable ? (
          <button onClick={() => spellAction(spell.id, "update")}>
            Update
          </button>
        ) : (
          <div>Not enough materials to update</div>
        )}
      </div>
    );
  } else {
    return <div>Owned</div>;
  }
};
export const ElementSpells = () => {
  const context = useContext(GameContext);
  if (!context || !context.player || context.element === null) {
    throw new Error("No data in context");
  }
  const spells = context.player.spells.filter(
    (s: ISpellOpen | ISpellClosed | ISpell) => s.elementId == context.element
  );

  const spellAction = async (spellId: number, action: "update" | "open") => {
    console.log("spell action");
    if (action === "open") {
      await axios.post(`/api/players/${context.player.id}/openSpell`, {
        element: context.element,
        spell: spellId,
      });
    } else {
      await axios.post(`/api/players/${context.player.id}/updateSpell`, {
        element: context.element,
        spell: spellId,
      });
    }
    context.mutate();
  };

  return (
    <div>
      <CloseButton onClick={() => context.changeElementScreen("element")} />
      <div>
        <div>{context.player.elements[context.element].element}</div>
        {spells.map((s: ISpellOpen | ISpellClosed | ISpell, i: number) => (
          <div className="Spell" key={i}>
            {`${s.name}, element: ${s.enemy}, strength: ${s.strength}`}
            <SpellPurchase
              spell={s}
              materials={context.player.materials}
              spellAction={spellAction}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
