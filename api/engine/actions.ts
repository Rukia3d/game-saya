import {
  IAdventure,
  ICharacter,
  IDialogue,
  IDialogueCharacter,
  IHero,
  ISpell,
  IStory,
} from "../storage/types";
import { player } from "./engine";
import { IPlayerAdventure, IPlayerHero, IPlayerSpell } from "./types";
const MAXADVENTURES = 5;

export const addHero = (
  playerHeroes: IPlayerHero[] | null,
  allHeroes: IHero[],
  id: number,
  expDate?: Date
): IPlayerHero[] => {
  const heroToAdd = allHeroes.find((h: IHero) => h.id === id);
  if (!heroToAdd) {
    throw new Error(`Hero with id ${id} doesn't exist in all heroes database`);
  }
  if (!playerHeroes) {
    return [
      {
        ...heroToAdd,
        selected: false,
        created_at: new Date(),
        expires_at: expDate ? expDate : null,
      },
    ];
  }

  const heroExists = playerHeroes.find(
    (h: IPlayerHero) => h.id === heroToAdd.id
  );
  if (heroExists) {
    console.warn(`Trying to add hero with id ${id} that is already owned`);
    return playerHeroes;
  }

  return playerHeroes.concat([
    {
      ...heroToAdd,
      selected: false,
      created_at: new Date(),
      expires_at: expDate ? expDate : null,
    },
  ]);
};

// convert an array to a set
const arrayToSet = (arr: number[]) => {
  return new Set(arr);
};

const isUnique = (arr: number[]) => {
  return arrayToSet(arr).size === arr.length;
};

const validateSelectHeroesInput = (
  playerHeroes: IPlayerHero[] | null,
  select: number[]
) => {
  if (!playerHeroes || playerHeroes.length < 1) {
    throw new Error(`Can't select heroes, no heroes provided`);
  }
  if (select.length < 1) {
    throw new Error(`Can't select heroes, no select indexes provided`);
  }
  if (select.some((n: number) => n > playerHeroes.length)) {
    throw new Error(
      `Can't add hero with the index higher than all player heroes`
    );
  }
  return playerHeroes;
};

const validateSelectHeroesOutput = (
  playerHeroes: IPlayerHero[],
  select: number[],
  max: number
) => {
  const currentlySelected = playerHeroes.filter((h: IPlayerHero) => h.selected);
  const currentlySelectedIndexes = currentlySelected.map(
    (h: IPlayerHero) => h.id
  );
  if (!isUnique(select) || !isUnique(currentlySelectedIndexes)) {
    throw new Error(`Can't select the same hero twice`);
  }

  if (currentlySelected.length != max) {
    throw new Error(
      `Not enough heroes, ${currentlySelected.length} is selected, max is ${max} `
    );
  }
};
export const selectHeroes = (
  playerHeroes: IPlayerHero[] | null,
  indexes: number[],
  max: number
): IPlayerHero[] => {
  const newHeroes: IPlayerHero[] = validateSelectHeroesInput(
    playerHeroes,
    indexes
  );

  indexes.forEach((s: number) => (newHeroes[s].selected = true));

  while (newHeroes.filter((h: IPlayerHero) => h.selected).length > max) {
    newHeroes.forEach((p: IPlayerHero, i: number) => {
      if (p.selected && indexes.indexOf(i) == -1) {
        p.selected = false;
      }
    });
  }

  validateSelectHeroesOutput(newHeroes, indexes, max);
  return newHeroes;
};

export const openAdventure = (
  playerAdventures: IPlayerAdventure[] | null,
  adventures: IAdventure[],
  id: number,
  expDate?: Date
): IPlayerAdventure[] => {
  const adventureToAdd = adventures.find((a: IAdventure) => a.id === id);
  if (!adventureToAdd) {
    throw new Error(
      `Adventure with id ${id} doesn't exist in all adventures database`
    );
  }
  if (!playerAdventures) {
    return [
      {
        ...adventureToAdd,
        open: true,
        created_at: new Date(),
        expires_at: expDate ? expDate : null,
      },
    ];
  }
  if (playerAdventures.filter((p: IPlayerAdventure) => p.id == id).length > 0) {
    console.warn("Trying to add adventure that is already added");
    return playerAdventures;
  }
  const newAdventures = playerAdventures;
  if (newAdventures.length < MAXADVENTURES) {
    return playerAdventures.concat([
      {
        ...adventureToAdd,
        open: true,
        created_at: new Date(),
        expires_at: expDate ? expDate : null,
      },
    ]);
  } else {
    const oldestExpAdventure = newAdventures
      .filter(
        (a: IPlayerAdventure) =>
          a.expires_at &&
          new Date(a.expires_at).getTime() < new Date().getTime()
      )
      .sort(function (curr, next) {
        const d1 = new Date(curr.expires_at as Date).getTime();
        const d2 = new Date(next.expires_at as Date).getTime();

        if (d1 < d2) return -1;
        if (d2 > d1) return 1;

        return 0;
      });

    if (!oldestExpAdventure[0]) {
      throw new Error(
        `Can't add a new adventure with id ${id} - old adventures haven't expired`
      );
    }
    newAdventures.splice(newAdventures.indexOf(oldestExpAdventure[0]), 1);
    newAdventures.push({
      ...adventureToAdd,
      open: true,
      created_at: new Date(),
      expires_at: expDate ? expDate : null,
    });
    return newAdventures;
  }
};

export const openStory = (
  playerAdventures: IPlayerAdventure[] | null,
  adventureId: number,
  storyId: number
): IPlayerAdventure[] => {
  if (!playerAdventures || playerAdventures.length < 1) {
    throw new Error(`Can't open a story, no adventures provided`);
  }
  const newAdventures = playerAdventures;
  const adventureToEdit = newAdventures.findIndex(
    (p: IPlayerAdventure) => p.id === adventureId
  );

  if (adventureToEdit == -1) {
    throw new Error(
      `Adventure with id ${adventureId} doesn't exist in player adventures`
    );
  }
  const adventureWithAStory = newAdventures[adventureToEdit];

  if (!adventureWithAStory.stories || adventureWithAStory.stories.length < 1) {
    throw new Error(
      `Adventure with id ${adventureId} doesn't contain any stories`
    );
  }
  const storyToOpen = adventureWithAStory.stories.findIndex(
    (p: IStory) => p.id === storyId
  );

  if (storyToOpen === -1) {
    throw new Error(
      `Story with id ${storyId} doesn't exist in adventure ${adventureId}`
    );
  }
  adventureWithAStory.stories[storyToOpen].open = true;
  newAdventures[adventureToEdit] = adventureWithAStory;
  return newAdventures;
};

export const updateNPCs = (
  playerCharacters: IDialogueCharacter[] | null,
  characters: ICharacter[],
  dialogues: IDialogue[],
  npc_dialogues: { npc_id: number; dialogue_id: number }[]
): IDialogueCharacter[] => {
  let newCharacters = playerCharacters ? playerCharacters : [];

  npc_dialogues.forEach((dial: { npc_id: number; dialogue_id: number }) => {
    const dialogue = dialogues.find(
      (d: IDialogue) => d.id === dial.dialogue_id
    );
    if (!dialogue) {
      throw new Error(
        `Can't find dialogue ${dial.dialogue_id} in dialogue database`
      );
    }

    const character = characters.find((c: ICharacter) => c.id === dial.npc_id);
    if (!character) {
      throw new Error(
        `Can't find character ${dial.npc_id} in characters database`
      );
    }

    const existingCharacterIndex = newCharacters?.findIndex(
      (c: IDialogueCharacter) => c.id === dial.npc_id
    );
    if (existingCharacterIndex === -1) {
      // Need to add this character
      newCharacters.push({ ...character, dialogue: dialogue });
    } else {
      // need to replace this character
      newCharacters[existingCharacterIndex].dialogue = { ...dialogue };
    }
  });
  return newCharacters;
};

export const addSpells = (
  playerSpells: IPlayerSpell[] | null,
  spells: ISpell[],
  ids: number[],
  expDate?: Date
): IPlayerSpell[] => {
  let newSpells = playerSpells ? playerSpells : [];
  ids.forEach((id: number) => {
    const spellToAdd = spells.find((s: ISpell) => s.id === id);
    if (!spellToAdd) {
      throw new Error(`Can't find a spell ${id} in spells database`);
    }
    const existingSpellLatest = newSpells
      .filter((s: IPlayerSpell) => s.id === id)
      .sort(function (curr, next) {
        if (curr.copy_id > next.copy_id) return -1;
        if (curr.copy_id < next.copy_id) return 1;

        return 0;
      });
    const copy =
      existingSpellLatest.length < 1 ? 0 : existingSpellLatest[0].copy_id + 1;

    newSpells.push({
      ...spellToAdd,
      copy_id: copy,
      created_at: new Date(),
      expires_at: expDate ? new Date(expDate) : null,
      updates: [],
      selected: false,
    });
  });
  return newSpells;
};

export const selectSpells = (
  playerSpells: IPlayerSpell[] | null,
  indexes: number[],
  max: number
): IPlayerSpell[] => {
  if (!playerSpells || playerSpells.length < max) {
    throw new Error(`Can't select spells, not enough spells provided`);
  }
  if (indexes.length < 1) {
    throw new Error(`Can't select spells, no spells indexes provided`);
  }
  if (!isUnique(indexes)) {
    throw new Error(`Can't select the same spell twice`);
  }

  const newSpells: IPlayerSpell[] = playerSpells;
  newSpells.forEach((s: IPlayerSpell) => (s.selected = false));

  indexes.forEach((s: number) => (newSpells[s].selected = true));

  return newSpells;
};
