import axios from "axios";
import { useContext, useState } from "react";
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

const SpellCreateListing = ({
  spell,
  setSpell,
}: {
  spell: ISpellOpen | ISpellClosed | ISpell;
  setSpell: (s: null | ISpellOpen) => void;
}) => {
  const context = useContext(GameContext);
  if (!context || !context.player) {
    throw new Error("No data in context");
  }
  const [inputs, setInputs] = useState({ currency: "ETH", price: 0.01 });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await axios.post(`/api/players/${context.player.id}/listSpell`, {
      spell: spell.id,
      price: inputs.price,
      currency: inputs.currency,
    });
    await context.mutate();
    setSpell(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select currency:
        <select value={inputs.currency} onChange={handleChange} name="currency">
          <option value="ETH">ETH</option>
          <option value="USDC">USDC</option>
          <option value="TOKEN">TOKEN</option>
        </select>
      </label>
      <br />
      <label>
        Enter the price:
        <input
          type="number"
          name="price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <br />
      <input type="submit" />
    </form>
  );
};

const Spell = ({
  spell,
  setSpell,
}: {
  spell: ISpellOpen | ISpellClosed | ISpell;
  setSpell: (s: null | ISpellOpen) => void;
}) => {
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
        <button onClick={() => setSpell(spell)}>Sell</button>
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
  const [spell, setSpell] = useState<ISpellOpen | null>(null);

  const spells = context.player.spells;
  const close = () => {
    setSpell(null);
    setScreen("spells");
  };
  return (
    <div className="Story">
      <TopMenu />
      {spell ? (
        <PopUp close={close}>
          <div className="SellSpell">
            <SpellCreateListing spell={spell} setSpell={setSpell} />
          </div>
        </PopUp>
      ) : (
        <PopUp close={() => setScreen("menus")}>
          <div className="Stories">
            {spells.map((s: ISpellOpen | ISpellClosed | ISpell, n: number) => (
              <div className="StoryType" key={n}>
                <Spell spell={s} setSpell={setSpell} />
              </div>
            ))}
          </div>
        </PopUp>
      )}
    </div>
  );
};
