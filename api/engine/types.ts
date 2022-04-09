import {
  IAdventure,
  ICharacter,
  IDialogue,
  IDialogueCharacter,
  IHero,
  IResource,
  ISpell,
  IUpdate,
} from "../storage/types";

export type IEventPlayer = {
  player: IPlayer;
  adventures: IPlayerAdventure[] | null;
  heroes: IPlayerHero[] | null;
  spells: IPlayerSpell[] | null;
  resources: IPlayerResource[] | null;
  updates: null;
  npcs: IDialogueCharacter[] | null;
};

export type IGameData = {
  heroes: IHero[];
  adventures: IAdventure[];
  characters: ICharacter[];
  dialogues: IDialogue[];
  spells: ISpell[];
  resources: IResource[];
};

export type IPlayerAdventure = IAdventure & {
  open: boolean;
  created_at: Date;
  expires_at: Date | null;
};

export type IPlayerHero = IHero & {
  selected: boolean;
  created_at: Date;
  expires_at: Date | null;
};

export type IPlayerCharacter = {
  id: number;
  image: string;
  dialogue: IDialogue;
  created_at: Date;
  expires_at: Date | null;
};

export type IPlayerResource = IResource & {
  created_at: Date;
  quantity: number;
};

export type IPlayerSpell = ISpell & {
  selected: boolean;
  copy_id: number;
  created_at: Date;
  expires_at: Date | null;
  updates: IUpdate[] | [];
};

export type IPlayerUpdate = IUpdate & { created_at: Date; expires_at: Date };

export type IPlayer = {
  id: number;
  experience: number;
  life: number;
  maxlife: number;
  mana: number;
  maxmana: number;
  created_at: Date;
  updated_at: Date;
  rank: number;
};

export type IPCreateEvent = {
  id: number;
  event: string;
  player_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type IPFinishStoryEvent = {
  id: number;
  event: string;
  player_id: number;
  story_id: number;
  adventure_id: number;
  story_type: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type IPStartFightEvent = {
  id: number;
  event: string;
  player_id: number;
  fight_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type IPAttackSpellEvent = {
  id: number;
  event: string;
  player_id: number;
  spell_id: number;
  spell_index: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
export type IUserEvent =
  | IPAttackSpellEvent
  | IPStartFightEvent
  | IPFinishStoryEvent
  | IPCreateEvent;
