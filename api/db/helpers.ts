import {
  colorType,
  ICharacter,
  IElement,
  ISchool,
  ISpellUpdate,
  ISpellUpdateData,
  ISpellUpdateResource,
  IStory,
  IStoryGroup,
  IUpdateAction,
  schoolType,
  spellUpdateEffect,
} from "../../src/utils/types";
import {
  ActionDB,
  CharacterDB,
  ElementDB,
  PlayerSpellAppliedUpdateDB,
  ResourceDB,
  SpellUpdateResourceDB,
  StoryGroupsById,
  StoryGroupsForAdventure,
} from "./types";

export const findStoryGroups = (
  dbAdventureStoryGroups: StoryGroupsForAdventure[],
  dbStoryGroups: StoryGroupsById[]
): IStoryGroup[] => {
  const storyGroups: IStoryGroup[] = [];
  dbAdventureStoryGroups.forEach((a: StoryGroupsForAdventure) => {
    const groupWithData = dbStoryGroups.find(
      (g: { id: string; stories: IStory[] }) => g.id === a.id
    );
    if (groupWithData)
      storyGroups.push({
        id: a.id,
        name: a.name,
        group: a.visual,
        stories: groupWithData.stories,
      });
    else return null;
  });
  return storyGroups;
};

export const findSchool = (
  dbElements: ElementDB[],
  school: string
): ISchool => {
  const element = dbElements.find((d: ElementDB) => d.school_id === school);
  if (!element) throw new Error(`Can't find element for ${school}`);
  return {
    id: element.school_id as schoolType,
    description: element.school_description,
    name: element.school_name,
  };
};

export const findElement = (
  dbElements: ElementDB[],
  color: string
): IElement => {
  const element = dbElements.find((d: ElementDB) => d.id === color);
  if (!element) throw new Error(`Can't find element for ${color}`);
  return {
    code: element.code,
    color: element.id as colorType,
    description: element.description,
    school: {
      id: element.school_id as schoolType,
      description: element.school_description,
      name: element.school_name,
    },
  };
};

export const findCharacter = (
  dbCharacters: CharacterDB[],
  id: string
): ICharacter => {
  const character = dbCharacters.find((c: CharacterDB) => c.id === id);
  if (!character) throw new Error(`Can't find character for ${character}`);
  return character;
};

export const findAction = (
  dbActions: ActionDB[],
  id: string
): IUpdateAction => {
  const action = dbActions.find((c: ActionDB) => c.id === id);
  if (!action) throw new Error(`Can't find action for ${id}`);
  return {
    item: action.item as spellUpdateEffect,
    data: action.data,
  };
};

export const findUpdates = (
  pUpd: PlayerSpellAppliedUpdateDB[],
  updates: ISpellUpdate[],
  spell_id: string,
  copy: number
): ISpellUpdate[] => {
  const playerUpdates = pUpd.filter(
    (p: PlayerSpellAppliedUpdateDB) =>
      p.copy_id === copy && p.spell_id === spell_id
  );
  const res = playerUpdates.map((p: PlayerSpellAppliedUpdateDB) => {
    const upd = updates.find((u: ISpellUpdate) => u.id === p.spellupdate_id);
    if (!upd) throw new Error(`Can't find update for ${p.spellupdate_id}`);
    return upd;
  });

  return res;
};

export const findResources = (
  sResDB: SpellUpdateResourceDB[],
  resDB: ResourceDB[],
  eDB: ElementDB[]
): ISpellUpdateResource[] => {
  const res = sResDB.map((s: SpellUpdateResourceDB) => {
    const resource = resDB.find((r: ResourceDB) => r.id === s.resource_id);
    if (!resource)
      throw new Error(
        `Can't find resource ${s.resource_id} for ${s.spellupdate_id}`
      );
    return {
      id: resource.id,
      name: resource.name,
      school: findSchool(eDB, resource.school_id),
      description: resource.description,
      commonality: resource.commonality,
      quantity: s.quantity,
    };
  });

  return res;
};
