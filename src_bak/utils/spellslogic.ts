import {
  IPlayerSpell,
  IPlayerSpellUpdate,
  ISpell,
  ISpellUpdate,
  Player,
} from "./types";

export const updatePlayerSpell = (
  p: Player,
  s: IPlayerSpell,
  u: IPlayerSpellUpdate
): Player => {
  const spellToUpdateIndex = p.spells.indexOf(s);
  p.spells[spellToUpdateIndex].updates.push(u);
  return p;
};

export const calculateSpellMana = (spell: IPlayerSpell) => {
  let allMana = 0;
  if ("updates" in spell) {
    spell.updates.map((u: IPlayerSpellUpdate) => (allMana = allMana + u.mana));
  }
  return allMana;
};

export const calculateSpellStrength = (spell: IPlayerSpell) => {
  let allStrength = spell.strength;
  if ("updates" in spell) {
    spell.updates.map((u: IPlayerSpellUpdate) => {
      if (u.action.item === "strength") {
        allStrength = allStrength + u.mana;
      }
    });
  }
  return allStrength;
};
