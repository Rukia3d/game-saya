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
