export interface PlayerDB {
  id: string;
  experience: number;
  maxlife: number;
  maxmana: number;
  life: number;
  mana: number;
}

export interface CharacterDB {
  id: string;
  name: string;
  image: string;
  dialogue_id: string;
}

export interface HeroDB {
  id: string;
  name: string;
  description: string;
  selected: number;
  code: string;
  element_id: string;
  school_id: string;
  school_name: string;
}

export interface SpellDB {
  id: string;
  copy_id: number;
  name: string;
  strength: number;
  description: string;
  selected: number;
  code: string;
  element_id: string;
  school_id: string;
  school_name: string;
  spellupdate_id: string;
}

export interface SpellAppliedDB {
  update_id: string;
  spell_id: string;
  copy_id: number;
  school_id: string;
  mana: number;
  name: string;
  effect: string;
  description: string;
  updateaction_id: string;
  updateaction_effect: string;
  updateaction_action: string;
  updateprice_id: string;
  updateprice_effect: string;
  updateprice_action: string;
}
