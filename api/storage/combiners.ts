import {
  IPAttackSpellEvent,
  IPCreatePlayerEvent,
  IPFinishStoryEvent,
  IPStartFightEvent,
  IUserEvent,
} from "../engine/types";
import {
  DBAdventure,
  DBStory,
  DBCharacter,
  DBElement,
  DBHero,
  DBSchool,
  DBSpell,
  DBResource,
  DBUpdate,
  DBUpdateResource,
  DBDialogue,
  DBLine,
  DBFightElement,
  DBFight,
  DBPCreateEvent,
  DBPFinishStoryEvent,
  DBPStartFightEvent,
  DBPAttackSpellEvent,
  DBPEvent,
} from "./db_types";
import { loadHeroes } from "./storage";
import {
  IStory,
  IAdventure,
  IAction,
  IElement,
  IHero,
  ISpell,
  IUpdate,
  IUpdateResource,
  IResource,
  IDialogue,
  ILine,
  IFight,
  IReel,
} from "./types";

export const combineEvents = (
  creationEvent: IPCreatePlayerEvent,
  finishStoryEvents: IPFinishStoryEvent[],
  startFightEvents: IPStartFightEvent[],
  attackSpellEvents: IPAttackSpellEvent[]
) => {
  let allEvents: IUserEvent[] = [];
  if (creationEvent) allEvents = [creationEvent];
  if (finishStoryEvents.length > 0)
    allEvents = allEvents.concat(finishStoryEvents);
  if (startFightEvents.length > 0)
    allEvents = allEvents.concat(startFightEvents);
  if (attackSpellEvents.length > 0)
    allEvents = allEvents.concat(attackSpellEvents);
  return allEvents;
};

export const combinedFightsData = (
  fights: DBFight[],
  fightElements: DBFightElement[],
  combinedElements: IElement[],
  combinedHeroes: IHero[]
): IFight[] => {
  const updatedFights: IFight[] = fights.map((f: DBFight) => {
    const enemy = combinedHeroes.find((c: IHero) => c.id === f.enemy_id);
    if (!enemy) throw new Error(`Can't find an enemy for ${f.enemy_id}`);
    const elements = fightElements.map((f: DBFightElement) => {
      const element = combinedElements.find(
        (e: IElement) => e.id === f.element_id
      );
      if (!element)
        throw new Error(`Can't find an element for ${f.element_id}`);
      return element;
    });
    return {
      id: f.id,
      story_id: f.story_id,
      base_hero_num: f.base_hero_num,
      enemy: enemy,
      background: f.background,
      base_elements: elements,
    };
  });
  return updatedFights;
};

export const combineDialoguesData = (
  dialogues: DBDialogue[],
  lines: DBLine[],
  characters: DBCharacter[]
): IDialogue[] => {
  const updatedDialogues: IDialogue[] = dialogues.map((d: DBDialogue) => {
    const updatedLines: ILine[] = lines
      .filter((l: DBLine) => l.dialogue_id === d.id)
      .map((l: DBLine) => {
        const character = characters.find(
          (c: DBCharacter) => c.id === l.character_id
        );
        if (!character)
          throw new Error(`Can't find a character for ${l.character_id}`);
        return {
          id: l.id,
          character: character,
          image: l.image,
          position: l.position,
          text: l.text,
        };
      });
    return {
      id: d.id,
      story_id: d.story_id,
      lines: updatedLines,
      background: d.background,
      layout: d.layout,
    };
  });

  return updatedDialogues;
};

export const combineStoriesData = (
  stories: DBStory[],
  combinedDialogues: IDialogue[],
  combinedFigths: IFight[]
): IStory[] => {
  const updatedStories = stories.map((s: DBStory) => {
    let item: IDialogue | IFight | IReel;
    if (s.type === "fight") {
      const res = combinedFigths.find((f: IFight) => f.story_id === s.id);
      if (!res) throw new Error(`Can't find a fight for ${s.id}`);
      item = res;
    } else if (s.type === "dialogue") {
      const res = combinedDialogues.find((d: IDialogue) => d.story_id === s.id);
      if (!res) throw new Error(`Can't find a dialogue for ${s.id}`);
      item = res;
    } else {
      throw new Error(`Unknown type for ${s.id}`);
    }
    return {
      id: s.id,
      type: s.type,
      name: s.name,
      next_id: s.next_id,
      open: false,
      actions: null,
      item: item,
      adventure_id: s.adventure_id,
    };
  });
  return updatedStories;
};

export const combineAdventuresData = (
  adventures: DBAdventure[],
  stories: IStory[]
): IAdventure[] => {
  const updatedAdventures: IAdventure[] = adventures.map((a: DBAdventure) => {
    const filteredStories: IStory[] = stories
      .filter((s: IStory) => s.adventure_id === a.id)
      .map((i: IStory, n: number) => {
        return {
          ...i,
          open: n === 0 ? true : false,
        };
      });
    return {
      id: a.id,
      type: a.type,
      name: a.name,
      description: a.description,
      stories: filteredStories,
    };
  });
  return updatedAdventures;
};

export const combineHeroesData = (
  heroes: DBHero[],
  characters: DBCharacter[],
  elements: IElement[]
): IHero[] => {
  const updatedHeroes: IHero[] = heroes.map((h: DBHero) => {
    const element = elements.find((e: IElement) => e.id === h.element_id);
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

export const combineElementData = (
  elements: DBElement[],
  schools: DBSchool[]
): IElement[] => {
  const updatedElements = elements.map((e: DBElement) => {
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
  return updatedElements;
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
          base_quantity: ur.quantity,
        };
      }
    );

    const updatedActions: IAction[] | null = [];

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

export const transformCreatePlayerEvent = (
  events: DBPCreateEvent[]
): IPCreatePlayerEvent => {
  if (events.length > 1)
    throw new Error(
      `More than one player creation events found for a player ${events[0].player_id}`
    );
  const e: DBPCreateEvent = events[0];
  if (!e)
    throw new Error(
      `Can't find the event player creation for ${events[0].player_id}`
    );
  return {
    ...e,
    created_at: new Date(parseInt(e.created_at) * 1000),
    updated_at: new Date(parseInt(e.updated_at) * 1000),
    deleted_at: e.deleted_at ? new Date(parseInt(e.deleted_at) * 1000) : null,
  };
};

export const transformFinishStoryEvents = (
  events: DBPFinishStoryEvent[]
): IPFinishStoryEvent[] => {
  const newEvents: IPFinishStoryEvent[] = [];
  events.forEach((e: DBPFinishStoryEvent) =>
    newEvents.push({
      ...e,
      created_at: new Date(parseInt(e.created_at) * 1000),
      updated_at: new Date(parseInt(e.updated_at) * 1000),
      deleted_at: e.deleted_at ? new Date(parseInt(e.deleted_at) * 1000) : null,
    })
  );
  return newEvents;
};
export const transformStartFightEvents = (
  events: DBPStartFightEvent[]
): IPStartFightEvent[] => {
  const newEvents: IPStartFightEvent[] = [];
  events.forEach((e: DBPStartFightEvent) => {
    const heroes = e.heroes.split(",");
    const spells = e.spells.split(",").map((s: string) => {
      const res = s.split("c");
      return { spell: parseInt(res[0]), copy: parseInt(res[1]) };
    });
    newEvents.push({
      ...e,
      heroes: heroes.map((h: string) => parseInt(h)),
      spells: spells,
      created_at: new Date(parseInt(e.created_at) * 1000),
      updated_at: new Date(parseInt(e.updated_at) * 1000),
      deleted_at: e.deleted_at ? new Date(parseInt(e.deleted_at) * 1000) : null,
    });
  });
  return newEvents;
};

export const transformAttackSpellEvents = (
  events: DBPAttackSpellEvent[]
): IPAttackSpellEvent[] => {
  const newEvents: IPAttackSpellEvent[] = [];
  events.forEach((e: DBPAttackSpellEvent) =>
    newEvents.push({
      ...e,
      created_at: new Date(parseInt(e.created_at) * 1000),
      updated_at: new Date(parseInt(e.updated_at) * 1000),
      deleted_at: e.deleted_at ? new Date(parseInt(e.deleted_at) * 1000) : null,
    })
  );
  return newEvents;
};
