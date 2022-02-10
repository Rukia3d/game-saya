import {
  IAdventure,
  IHero,
  IPlayerResource,
  IPlayerAdventure,
  IPlayerHero,
  IResource,
  ISpell,
  IStory,
  IStoryGroup,
  PlayerData,
  IPlayerSpell,
  ISpellUpdate,
  INPC,
  ICharacter,
  IPlayerSpellUpdate,
} from "../../src/utils/types";
import { findPlayerUpdates, findUpdates } from "./helpers";
import {
  PlayerAdventureDB,
  PlayerDB,
  PlayerHeroDB,
  PlayerNpcDialogues,
  PlayerResourceDB,
  PlayerSpellAppliedUpdateDB,
  PlayerSpellDB,
  PlayerSpellUpdateDB,
  PlayerStoryDB,
} from "./types";

export const transformPlayer = (player: PlayerDB): PlayerData => {
  return {
    id: player.id,
    experience: player.experience,
    maxlife: player.maxlife,
    maxmana: player.maxmana,
    life: player.life,
    mana: player.mana,
    created_at: player.created_at,
    rank: player.rank,
  };
};

export const transformPlayerAdventures = (
  playerAdvDB: PlayerAdventureDB[],
  playerStoryDB: PlayerStoryDB[],
  adventures: IAdventure[]
): IPlayerAdventure[] => {
  const combinedAdventures: IPlayerAdventure[] = playerAdvDB.map(
    (p: PlayerAdventureDB) => {
      const adventure = adventures.find(
        (a: IAdventure) => a.id === p.adventure_id
      );

      if (!adventure)
        throw new Error(
          `Database does not contain adventure for  ${p.adventure_id}`
        );
      return {
        id: adventure.id,
        type: adventure.type,
        name: adventure.name,
        image: adventure.image,
        storyGroups: adventure.storyGroups ? adventure.storyGroups : null,
        open: p.state === 1 ? true : false,
        created_at: p.created_at,
      };
    }
  );
  const findOpenStory = (openStories: PlayerStoryDB[], id: string) => {
    const res = openStories.find((o: PlayerStoryDB) => o.story_id === id);
    return res ? true : false;
  };
  const advWithStories = combinedAdventures.map((p: IPlayerAdventure) => {
    if (p.storyGroups) {
      p.storyGroups.forEach((g: IStoryGroup) => {
        g.stories.forEach(
          (s: IStory) => (s.open = findOpenStory(playerStoryDB, s.id))
        );
      });
    }
    return p;
  });

  return advWithStories;
};

export const transformPlayerResources = (
  pRes: PlayerResourceDB[],
  res: IResource[]
): IPlayerResource[] => {
  const resources = pRes.map((r: PlayerResourceDB) => {
    const resource = res.find((a: IResource) => a.id === r.resource_id);

    if (!resource) throw new Error(`Can't find resource for  ${r.resource_id}`);
    return {
      id: resource.id,
      name: resource.name,
      school: resource.school,
      description: resource.description,
      commonality: resource.commonality,
      quantity: r.quantity,
      created_at: r.created_at,
    };
  });
  return resources;
};

export const transformPlayerHeroes = (
  playerHeroesDB: PlayerHeroDB[],
  heroes: IHero[]
): IPlayerHero[] => {
  const res = playerHeroesDB.map((r: PlayerHeroDB) => {
    const heroData = heroes.find((a: IHero) => a.id === r.hero_id);
    if (!heroData) throw new Error(`Can't find hero data for  ${r.hero_id}`);
    return {
      id: heroData.id,
      name: heroData.name,
      description: heroData.description,
      element: heroData.element,
      selected: r.selected === 1 ? true : false,
      created_at: r.created_at,
    };
  });
  return res;
};

export const transformPlayerSpells = (
  pS: PlayerSpellDB[],
  pUpd: PlayerSpellAppliedUpdateDB[],
  spells: ISpell[],
  updates: IPlayerSpellUpdate[]
): IPlayerSpell[] => {
  const res = pS.map((s: PlayerSpellDB) => {
    const spellData = spells.find((a: ISpell) => a.id === s.spell_id);
    if (!spellData) throw new Error(`Can't find spell data for  ${s.spell_id}`);

    return {
      id: spellData.id,
      name: spellData.name,
      strength: spellData.strength,
      element: spellData.element,
      description: spellData.description,
      copy: s.copy,
      created_at: s.created_at,
      selected: s.selected === 1 ? true : false,
      owner: "hero" as "hero",
      updates: findPlayerUpdates(pUpd, updates, s.spell_id, s.copy),
    };
  });

  return res;
};

export const transformPlayerUpdates = (
  pDB: PlayerSpellUpdateDB[],
  updates: ISpellUpdate[]
): IPlayerSpellUpdate[] => {
  const res = pDB.map((u: PlayerSpellUpdateDB) => {
    const updateData = updates.find(
      (up: ISpellUpdate) => u.spellupdate_id === up.id
    );
    if (!updateData)
      throw new Error(`Can't find update data for  ${u.spellupdate_id}`);
    return {
      id: updateData.id,
      school: updateData.school,
      mana: updateData.mana,
      effect: updateData.effect,
      action: updateData.action,
      price: updateData.price,
      name: updateData.name,
      description: updateData.description,
      resource_base: updateData.resource_base,
      created_at: u.created_at,
    };
  });
  return res;
};

export const transformPlayerNPCs = (
  pDB: PlayerNpcDialogues[],
  npcs: ICharacter[]
): INPC[] => {
  const res = pDB.map((p: PlayerNpcDialogues) => {
    const npc = npcs.find((n: ICharacter) => n.id === p.npc_id);
    if (!npc) throw new Error(`Can't find character data for  ${p.npc_id}`);
    return {
      id: npc.id,
      name: npc.name,
      description: npc.description,
      image: p.image,
      dialogue: p.dialogue_id,
      created_at: p.created_at,
    };
  });
  return res;
};
