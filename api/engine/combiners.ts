import { DBCharacter, DBPSpellUpdate } from "../storage/db_types";
import {
  IAdventure,
  IStory,
  IHero,
  ISpell,
  IUpdate,
  IPUpdatedSpell,
  IResource,
  IPAdventure,
  IPHero,
  IPCharacter,
  IPUpdate,
  IPResource,
} from "../storage/types";
import {
  IPlayerAdventure,
  IPlayerHero,
  IPlayerCharacter,
  IPlayerSpell,
  IPlayerUpdate,
  IPlayerResource,
} from "./types";

export const combineAdventures = (
  adventures: IAdventure[],
  p_adventures: IPAdventure[]
): IPlayerAdventure[] => {
  const playerAdventures: IPlayerAdventure[] = p_adventures.map(
    (p: IPAdventure) => {
      const adventureData: IAdventure | undefined = adventures.find(
        (a: IAdventure) => a.id === p.id
      );
      if (!adventureData)
        throw new Error(`Can't find adventure data for ${p.id}`);
      const updatedStories: IStory[] | null = adventureData.stories
        ? adventureData.stories.map((s: IStory) => {
            if (p.last_story_id !== null && s.id <= p.last_story_id) {
              return { ...s, open: true };
            } else {
              return { ...s, open: false };
            }
          })
        : null;
      return {
        ...adventureData,
        stories: updatedStories,
        open: p.open,
        created_at: p.created_at,
        expires_at: p.expires_at,
      };
    }
  );
  return playerAdventures;
};

export const combineHeroes = (
  heroes: IHero[],
  p_heroes: IPHero[]
): IPlayerHero[] => {
  const playerHeroes: IPlayerHero[] = p_heroes.map((p: IPHero) => {
    const heroData = heroes.find((h: IHero) => h.id === p.id);
    if (!heroData) throw new Error(`Can't find hero data for ${p.id}`);
    return {
      ...heroData,
      selected: p.selected,
      created_at: p.created_at,
      expires_at: p.expires_at,
    };
  });
  return playerHeroes;
};

export const combineCharacters = (
  characters: DBCharacter[],
  p_characters: IPCharacter[]
): IPlayerCharacter[] => {
  const playerCharacters = p_characters.map((p: IPCharacter) => {
    const characterData = characters.find((c: DBCharacter) => c.id === p.id);
    if (!characterData) throw new Error(`Can't find hero data for ${p.id}`);
    return {
      ...characterData,
      image: p.image,
      dialogue_id: p.dialogue_id,
      created_at: p.created_at,
      expires_at: p.expires_at,
    };
  });
  return playerCharacters;
};

export const combineSpells = (
  spells: ISpell[],
  updates: IUpdate[],
  p_spells: IPUpdatedSpell[]
): IPlayerSpell[] => {
  const playerSpells: IPlayerSpell[] = p_spells.map((p: IPUpdatedSpell) => {
    const spellData = spells.find((s: ISpell) => s.id === p.spell.spell_id);
    if (!spellData)
      throw new Error(`Can't find spell data for ${p.spell.spell_id}`);
    const spellUpdates = p.updates.map((u: DBPSpellUpdate) => {
      const updateData = updates.find((a: IUpdate) => a.id === u.update_id);
      if (!updateData)
        throw new Error(`Can't find update data for ${p.spell.spell_id}`);
      return updateData;
    });
    return {
      ...spellData,
      copy_id: p.spell.copy_id,
      expires_at: new Date(p.spell.expires_at),
      created_at: new Date(p.spell.created_at),
      updates: spellUpdates,
    };
  });
  return playerSpells;
};

export const combineUpdates = (
  updates: IUpdate[],
  p_updates: IPUpdate[]
): IPlayerUpdate[] => {
  const playerUpdates: IPlayerUpdate[] = p_updates.map((p: IPUpdate) => {
    const updateData = updates.find((u: IUpdate) => u.id === p.id);
    if (!updateData) throw new Error(`Can't find update data for ${p.id}`);
    return {
      ...updateData,
      expires_at: p.expires_at,
      created_at: p.created_at,
    };
  });
  return playerUpdates;
};

export const combineResources = (
  resources: IResource[],
  p_resources: IPResource[]
): IPlayerResource[] => {
  const playerResources: IPlayerResource[] = p_resources.map(
    (p: IPResource) => {
      const resourceData = resources.find((u: IResource) => u.id === p.id);
      if (!resourceData)
        throw new Error(`Can't find resource data for ${p.id}`);
      return {
        ...resourceData,
        created_at: p.created_at,
        quantity: p.quantity,
      };
    }
  );
  return playerResources;
};
