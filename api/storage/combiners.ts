import {
  DBAdventure,
  DBStory,
  DBAction,
  DBCharacter,
  DBElement,
  DBHero,
  DBSchool,
  DBSpell,
  DBResource,
  DBUpdate,
  DBUpdateResource,
  DBPSpell,
  DBPSpellUpdate,
} from "./db_types";
import {
  IStory,
  IAdventure,
  IAction,
  IElement,
  IHero,
  ISpell,
  IUpdate,
  IUpdateResource,
  IPUpdatedSpell,
  IResource,
} from "./types";

type IStoryForAdventure = IStory & { adventure_id: number };
export const combineAdventuresData = (
  adventures: DBAdventure[],
  stories: DBStory[],
  actions: DBAction[]
): IAdventure[] => {
  const updatedStories: IStoryForAdventure[] = stories.map((s: DBStory) => {
    const updatedActions: IAction[] | null = [];
    actions.map((a: DBAction) =>
      a.parent_id === s.id && a.parent_type === "story"
        ? updatedActions.push({
            id: a.id,
            type: a.type,
            item: a.item,
            data: a.data,
          })
        : null
    );

    return {
      id: s.id,
      adventure_id: s.adventure_id,
      type: s.type,
      name: s.name,
      next: s.next !== "NULL" ? s.next : null,
      open: false,
      actions: updatedActions,
    };
  });

  const updatedAdventures: IAdventure[] = adventures.map((a: DBAdventure) => {
    const stories: IStory[] = updatedStories
      .filter((s: IStoryForAdventure) => s.adventure_id === a.id)
      .map((i: IStoryForAdventure) => {
        return {
          id: i.id,
          type: i.type,
          name: i.name,
          next: i.next,
          actions: i.actions,
          open: false,
        };
      });
    return {
      id: a.id,
      type: a.type,
      name: a.name,
      description: a.description,
      stories: stories,
    };
  });
  return updatedAdventures;
};

export const combineHeroesData = (
  heroes: DBHero[],
  characters: DBCharacter[],
  elements: DBElement[],
  schools: DBSchool[]
): IHero[] => {
  const updatedElements: IElement[] = elements.map((e: DBElement) => {
    const school = schools.find((s: DBSchool) => s.id === e.school_id);
    if (!school) throw new Error(`Can't find a school for ${e.name}`);

    return {
      id: e.id,
      name: e.name,
      description: e.description,
      code: e.code,
      school: school,
    };
  });

  const updatedHeroes: IHero[] = heroes.map((h: DBHero) => {
    const element = updatedElements.find(
      (e: IElement) => e.id === h.element_id
    );
    if (!element)
      throw new Error(`Can't find an element for ${h.character_id}`);
    const character = characters.find(
      (c: DBCharacter) => c.id === h.character_id
    );
    if (!character)
      throw new Error(`Can't find an character for ${h.character_id}`);
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      element: element,
    };
  });
  return updatedHeroes;
};

export const combineSpellData = (
  spells: DBSpell[],
  elements: DBElement[],
  schools: DBSchool[]
): ISpell[] => {
  const updatedSpells: ISpell[] = spells.map((e: DBSpell) => {
    const element = elements.find((s: DBElement) => s.id === e.element_id);
    if (!element) throw new Error(`Can't find a school for ${e.name}`);
    const school = schools.find((s: DBSchool) => s.id === element.school_id);
    if (!school) throw new Error(`Can't find a school for ${element.name}`);

    return {
      id: e.id,
      name: e.name,
      description: e.description,
      base_strength: e.base_strength,
      element: { ...element, school: school },
    };
  });
  return updatedSpells;
};

export const combineUpdateData = (
  updates: DBUpdate[],
  update_resources: DBUpdateResource[],
  resources: DBResource[],
  actions: DBAction[],
  schools: DBSchool[]
): IUpdate[] => {
  const combinedUpdates = updates.map((u: DBUpdate) => {
    const school = schools.find((s: DBSchool) => s.id === u.school_id);
    if (!school) throw new Error(`Can't find a school for ${u.name}`);

    const updatedResources: IUpdateResource[] = update_resources.map(
      (ur: DBUpdateResource) => {
        const resource = resources.find(
          (r: DBResource) => r.id === ur.resource_id
        );
        if (!resource)
          throw new Error(`Can't find a resource for ${ur.resource_id}`);
        return {
          id: resource.id,
          school: school,
          name: resource.name,
          description: resource.description,
          commonality: resource.commonality,
          quantity: ur.quantity,
        };
      }
    );

    const updatedActions: IAction[] | null = [];
    actions.map((a: DBAction) =>
      a.parent_id === u.id && a.parent_type === "spell"
        ? updatedActions.push({
            id: a.id,
            type: a.type,
            item: a.item,
            data: a.data,
          })
        : null
    );

    return {
      id: u.id,
      name: u.name,
      description: u.description,
      effect: u.effect,
      base_mana: u.base_mana,
      school: school,
      resource_base: updatedResources,
      actions: updatedActions,
    };
  });
  return combinedUpdates;
};

export const combinePlayerspells = (
  player_spells: DBPSpell[],
  player_applied_updates: DBPSpellUpdate[]
): IPUpdatedSpell[] => {
  const combinedSpellUpdates = player_spells.map((s: DBPSpell) => {
    const updates = player_applied_updates.filter(
      (p: DBPSpellUpdate) =>
        p.spell_id === s.spell_id && s.copy_id === p.copy_id
    );
    return {
      spell: s,
      updates: updates ? updates : [],
    };
  });
  return combinedSpellUpdates;
};

export const combineResourceData = (
  updates: DBResource[],
  schools: DBSchool[]
): IResource[] => {
  const combinedUpdates = updates.map((u: DBResource) => {
    const school = schools.find((s: DBSchool) => s.id === u.school_id);
    if (!school) throw new Error(`Can't find a school for ${u.name}`);
    return {
      id: u.id,
      school: school,
      name: u.name,
      description: u.description,
      commonality: u.commonality,
    };
  });
  return combinedUpdates;
};
