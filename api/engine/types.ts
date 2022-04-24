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
  adventures: IPlayerAdventure[];
  heroes: IPlayerHero[];
  spells: IPlayerSpell[];
  resources: IPlayerResource[];
  updates: null;
  npcs: IDialogueCharacter[];
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

export type IPCreatePlayerEvent = {
  id: number;
  player_id: number;
  event: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
};

export type IPFinishStoryEvent = IPCreatePlayerEvent & {
  adventure_id: number;
  story_id: number;
};

export type IPStartFightEvent = IPCreatePlayerEvent & {
  fight_id: number;
  heroes: number[];
  spells: { spell: number; copy: number }[];
};

export type IPAttackSpellEvent = IPCreatePlayerEvent & {
  spell_id: number;
  spell_copy: number;
};

export type IUserEvent =
  | IPCreatePlayerEvent
  | IPAttackSpellEvent
  | IPStartFightEvent
  | IPFinishStoryEvent;
