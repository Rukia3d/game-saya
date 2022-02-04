import { generateInt } from "../src/utils/helpers";
import {
  colorType,
  IHero,
  INPC,
  ISpell,
  ISpellUpdate,
  ISpellUpdateData,
  ISpellUpdateResource,
  IStoryAction,
  schoolType,
  spellEffectType,
  spellUpdateEffect,
  spellUpdatePrice,
  storyChangeType,
} from "../src/utils/types";
import { CharacterDB, HeroDB, SpellAppliedDB, SpellDB } from "./db_types";

export const parseCharacter = (row: CharacterDB): INPC => {
  return {
    id: row.id,
    name: row.name,
    image: row.image,
    dialogue: row.dialogue_id === "null" ? null : row.dialogue_id,
  };
};

export const parseHero = (row: HeroDB): IHero => {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    selected: row.selected === 1 ? true : false,
    element: {
      code: row.code,
      color: row.element_id as colorType,
      school: row.school_id as schoolType,
      school_name: row.school_name,
    },
  };
};

export const parseSpell = (row: SpellDB): ISpell => {
  return {
    id: row.id,
    copy: row.copy_id,
    name: row.name,
    strength: row.strength,
    selected: row.selected === 1 ? true : false,
    color: row.element_id as colorType,
    school: row.school_id as schoolType,
    owner: "hero",
    description: row.description,
    updates: [],
  };
};

export const applyUpdateToSpell = (
  row: SpellAppliedDB | undefined
): ISpellUpdateData | null => {
  if (!row) return null;
  return {
    id: row.spellupdate_id,
    school: row.school_id as schoolType,
    mana: row.mana,
    effect: row.effect as spellEffectType,
    action: {
      action: row.updateaction_action as spellUpdateEffect,
      strength: row.updateaction_effect,
    },
    price: row.updateprice_id
      ? {
          action: row.updateprice_action as spellUpdatePrice,
          strength: row.updateprice_effect,
        }
      : null,
    name: row.name,
    description: row.description,
  };
};

export const addUpdatesToSpell = (
  spell: ISpell,
  appliedUpdatesData: SpellAppliedDB[]
) => {
  const update = appliedUpdatesData.find(
    (a: SpellAppliedDB) => a.spell_id === spell.id && a.copy_id === spell.copy
  );
  const res = applyUpdateToSpell(update);
  if (res) {
    spell.updates.push(res);
  }
  return spell;
};
