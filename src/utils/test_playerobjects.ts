import {
  adventures,
  baseCards15,
  characters,
  dialogue,
  heroes,
  mayaCard,
  resource,
  spellUpdates,
} from "./test_gameobjects";
import {
  IAdventure,
  ICharacter,
  IHero,
  INPC,
  IPlayerAdventure,
  IPlayerHero,
  IPlayerResource,
  IPlayerSpell,
  IPlayerSpellUpdate,
  ISpell,
  ISpellUpdate,
} from "./types";

export const playerNPCs: INPC[] = characters.map(
  (char: ICharacter, n: number) => {
    return {
      ...char,
      image: `${char.id}_happy`,
      dialogue: `dialogue${n}`,
      created_at: new Date(),
    };
  }
);

export const playerSpells: IPlayerSpell[] = baseCards15.map(
  (s: ISpell, n: number) => {
    return {
      ...s,
      copy: n,
      owner: "hero",
      created_at: new Date(),
      selected: true,
      updates: [],
    };
  }
);

export const playerSpell: IPlayerSpell = {
  ...mayaCard,
  created_at: new Date(),
  owner: "hero",
  copy: 1,
  selected: true,
  updates: [],
};

export const playerSpellUpdates: IPlayerSpellUpdate[] = spellUpdates.map(
  (u: ISpellUpdate) => {
    return { ...u, created_at: new Date() };
  }
);

export const playerHeroes: IPlayerHero[] = heroes.map((h: IHero) => {
  return { ...h, selected: true, created_at: new Date() };
});

export const playerAdventures: IPlayerAdventure[] = adventures.map(
  (a: IAdventure) => {
    return { ...a, open: true, created_at: new Date() };
  }
);

export const playerResources: IPlayerResource[] = [
  { ...resource, quantity: 5, created_at: new Date() },
];
