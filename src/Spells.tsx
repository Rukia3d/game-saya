import axios from "axios";
import { useContext } from "react";
import {
  IMaterialQuant,
  ISpell,
  ISpellClosed,
  ISpellOpen,
} from "../api/engine/types";
import { GameContext } from "./App";
import { mainScreenState } from "./Main";
import { PopUp } from "./PopUp";
import { TopMenu } from "./TopMenu";
import { enoughToPay } from "./utils/helpers";

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

const Spell = ({ spell }: { spell: ISpellOpen | ISpellClosed | ISpell }) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const spellAction = async (
    arcanaId: number,
    spellId: number,
    action: "update" | "open"
  ) => {
    if (action === "open") {
      await axios.post(`/api/players/${context.player.id}/openSpell`, {
        arcana: arcanaId,
        spell: spellId,
      });
    } else {
      await axios.post(`/api/players/${context.player.id}/updateSpell`, {
        arcana: arcanaId,
        spell: spellId,
      });
    }
    context.mutate();
  };
  const materials = context.player.materials;

  if ("price" in spell) {
    const available = enoughToPay(materials, spell.price);
    return (
      <div>
        {`${spell.name}, arcana: ${spell.enemy}, strength: ${spell.strength}`}
        <br />
        <b>To open:</b>
        {spell.price.map((m: IMaterialQuant, i: number) => (
          <div key={i}>{`${m.name}: ${m.quantity} `}</div>
        ))}
        {available ? (
          <button onClick={() => spellAction(spell.arcanaId, spell.id, "open")}>
            Open
          </button>
        ) : (
          <div>Not enough materials to open</div>
        )}
      </div>
    );
  } else if ("updatePrice" in spell) {
    const updatable = canUpdateSpell(materials, spell.updatePrice);
    return (
      <div>
        {`${spell.name}, arcana: ${spell.enemy}, strength: ${spell.strength}`}
        <br />
        <b>To update:</b>
        {spell.updatePrice.map((m: IMaterialQuant, i: number) => (
          <div key={i}>{`${m.name}: ${m.quantity} `}</div>
        ))}
        {updatable ? (
          <button
            onClick={() => spellAction(spell.arcanaId, spell.id, "update")}
          >
            Update
          </button>
        ) : (
          <div>Not enough materials to update</div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        {`${spell.name}, arcana: ${spell.enemy}, strength: ${spell.strength}`}{" "}
        <br />
        Owned
      </div>
    );
  }
};

export const Spells = ({
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

  const spells = context.player.spells;
  return (
    <div className="Story">
      <TopMenu />
      <PopUp close={() => setScreen("menus")}>
        <div className="Stories">
          {spells.map((s: ISpellOpen | ISpellClosed | ISpell, n: number) => (
            <div className="StoryType" key={n}>
              <Spell spell={s} />
            </div>
          ))}
        </div>
      </PopUp>
    </div>
  );
};
