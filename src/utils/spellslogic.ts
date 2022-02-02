import { ISpell, ISpellUpdate, Player } from "./types";

export const updatePlayerSpell = (
  p: Player,
  s: ISpell,
  u: ISpellUpdate
): Player => {
  const spellToUpdateIndex = p.spells.indexOf(s);
  p.spells[spellToUpdateIndex].updates.push(u);
  return p;
};

export const calculateSpellMana = (spell: ISpell) => {
  let allMana = 0;
  if ("updates" in spell) {
    spell.updates.map((u: ISpellUpdate) => (allMana = allMana + u.mana));
  }
  return allMana;
};

export const calculateSpellStrength = (spell: ISpell) => {
  let allStrength = spell.strength;
  if ("updates" in spell) {
    spell.updates.map((u: ISpellUpdate) => {
      if (u.action.action === "strength") {
        allStrength = allStrength + u.mana;
      }
    });
  }
  return allStrength;
};
