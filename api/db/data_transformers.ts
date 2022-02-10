import {
  storyType,
  storyChangeType,
  IStory,
  IDialogue,
  dialogueLayout,
  dialogueCharacterPosition,
  IAdventure,
  adventureType,
  IFight,
  IResource,
  IHero,
  ISpell,
  ICharacter,
  ISpellUpdate,
  spellEffectType,
} from "../../src/utils/types";
import {
  findAction,
  findCharacter,
  findElement,
  findResources,
  findSchool,
  findStoryGroups,
} from "./helpers";
import {
  AdventureDB,
  AdventureGroups,
  StoryGroupDB,
  StoryGroupsById,
  StoryActionDB,
  StoryActionByID,
  DialogueDB,
  DialogueLines,
  FightDB,
  ResourceDB,
  HeroDB,
  ElementDB,
  SpellDB,
  CharacterDB,
  SpellUpdateDB,
  SpellUpdateResourceDB,
  ActionDB,
} from "./types";

export const transformAdventures = (aDB: AdventureDB[]) => {
  const advWithKey = aDB.reduce<{ [key: string]: AdventureGroups }>(
    (accum, element) => {
      if (!accum[element.id]) {
        accum[element.id] = {
          id: element.id,
          name: element.adventure_name,
          form: element.form,
          storyGroups: [],
        };
      }
      if (element.storygroup_id) {
        accum[element.id].storyGroups.push({
          id: element.storygroup_id,
          visual: element.visual,
          name: element.storygroup_name,
          stories: [],
        });
      }
      return accum;
    },
    {}
  );
  return Object.values(advWithKey);
};

export const transformStoryGroups = (sDB: StoryGroupDB[]) => {
  const stgWithKey = sDB.reduce<{
    [key: string]: StoryGroupsById;
  }>((accum, element) => {
    if (!accum[element.storygroup_id]) {
      accum[element.storygroup_id] = {
        id: element.storygroup_id,
        stories: [],
      };
    }

    accum[element.storygroup_id].stories.push({
      id: element.id,
      type: element.story_type as storyType,
      nextStory: element.next,
      name: element.name,
      image: element.image,
      actions: [],
    });

    return accum;
  }, {});
  return Object.values(stgWithKey);
};

export const transformStoriesAndActions = (
  groups: StoryGroupsById[],
  acDB: StoryActionDB[]
) => {
  const actWithKey = acDB.reduce<{
    [key: string]: StoryActionByID;
  }>((accum, element) => {
    if (!accum[element.story_id]) {
      accum[element.story_id] = {
        id: element.story_id,
        actions: [],
      };
    }

    accum[element.story_id].actions.push({
      id: element.id,
      type: element.type as storyChangeType,
      item: element.item,
      data: element.data,
    });

    return accum;
  }, {});

  groups.map((g: StoryGroupsById) => {
    g.stories.map((s: IStory) =>
      actWithKey[s.id] ? (s.actions = actWithKey[s.id].actions) : []
    );
    return g.stories;
  });

  return groups;
};

export const transformDialogueData = (вDB: DialogueDB[]): IDialogue[] => {
  const dialWithKey = вDB.reduce<{ [key: string]: DialogueLines }>(
    (accum, element) => {
      if (!accum[element.dialogue_id]) {
        accum[element.dialogue_id] = {
          id: element.dialogue_id,
          background: element.background,
          layout: element.layout as dialogueLayout,
          lines: [],
          character_ids: [],
        };
      }
      accum[element.dialogue_id].lines.push({
        id: element.line_id,
        image: element.image,
        character: element.character_id,
        position: element.position as dialogueCharacterPosition,
        text: element.text,
      });
      accum[element.dialogue_id].character_ids.push(element.character_id);
      return accum;
    },
    {}
  );
  return Object.values(dialWithKey);
};

export const trandformAdventuresData = (
  aDB: AdventureDB[],
  sDB: StoryGroupDB[],
  acDB: StoryActionDB[]
): IAdventure[] => {
  const adventures = transformAdventures(aDB);
  const groups = transformStoryGroups(sDB);
  const groupsWithStoriesAndActions = transformStoriesAndActions(groups, acDB);

  const combiledAdventures: IAdventure[] = adventures.map(
    (a: AdventureGroups) => {
      return {
        id: a.id as adventureType,
        type: a.form,
        name: a.name,
        image: a.id,
        storyGroups: findStoryGroups(
          a.storyGroups,
          groupsWithStoriesAndActions
        ),
      };
    }
  );

  return combiledAdventures;
};

export const transformFightsData = (
  fDB: FightDB[],
  eDB: ElementDB[],
  cDB: CharacterDB[]
): IFight[] => {
  const fightWithKey = fDB.reduce<{ [key: string]: IFight }>(
    (accum, element) => {
      if (!accum[element.fight_id]) {
        if (!accum[element.fight_id]) {
          accum[element.fight_id] = {
            id: element.fight_id,
            name: element.name,
            hero_num: element.hero_num,
            enemy: {
              ...findCharacter(cDB, element.enemy_id),
              element: findElement(eDB, element.enemy_element),
            },
            hero_elements: [],
          };
        }
      }
      accum[element.fight_id].hero_elements.push(element.hero_element);
      return accum;
    },
    {}
  );
  return Object.values(fightWithKey);
};

export const transformResourcesData = (
  rDB: ResourceDB[],
  eDB: ElementDB[]
): IResource[] => {
  const combinedResources: IResource[] = rDB.map((r: ResourceDB) => {
    return {
      id: r.id as adventureType,
      name: r.name,
      description: r.description,
      commonality: r.commonality,
      school: findSchool(eDB, r.school_id),
    };
  });
  return combinedResources;
};

export const transformHeroesData = (
  hDB: HeroDB[],
  eDB: ElementDB[]
): IHero[] => {
  const res = hDB.map((h: HeroDB) => {
    return {
      id: h.character_id,
      name: h.name,
      description: h.description,
      element: findElement(eDB, h.element_id),
    };
  });
  return Object.values(res);
};

export const transformSpellsData = (
  sDB: SpellDB[],
  eDB: ElementDB[]
): ISpell[] => {
  const combinedSpells: ISpell[] = sDB.map((s: SpellDB) => {
    return {
      id: s.id,
      name: s.name,
      strength: s.strength,
      description: s.description,
      element: findElement(eDB, s.element_id),
    };
  });
  return combinedSpells;
};

export const transformCharactersData = (cDB: CharacterDB[]): ICharacter[] => {
  return cDB;
};

export const transformUpdatesData = (
  uDB: SpellUpdateDB[],
  eDB: ElementDB[],
  sResDB: SpellUpdateResourceDB[],
  resDB: ResourceDB[],
  aDB: ActionDB[]
): ISpellUpdate[] => {
  const combinedUpdate: ISpellUpdate[] = uDB.map((u: SpellUpdateDB) => {
    const resources = sResDB.filter(
      (s: SpellUpdateResourceDB) => s.spellupdate_id === u.id
    );
    return {
      id: u.id,
      school: findSchool(eDB, u.school_id),
      mana: u.mana,
      effect: u.effect as spellEffectType,
      action: findAction(aDB, u.action_id),
      price: null,
      name: u.name,
      description: u.description,
      resource_base: findResources(resources, resDB, eDB),
    };
  });

  return combinedUpdate;
};
