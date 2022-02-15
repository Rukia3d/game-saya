import {
  DBPAdventure,
  DBPCharacter,
  DBPHero,
  DBPResource,
  DBPUpdate,
} from "./db_types";
import {
  IPAdventure,
  IPCharacter,
  IPHero,
  IPResource,
  IPUpdate,
} from "./types";

export const transformAdventures = (
  playerAdventures: DBPAdventure[]
): IPAdventure[] => {
  const transformed = playerAdventures.map((p: DBPAdventure) => {
    return {
      id: p.adventure_id,
      last_story_id: p.last_story_id === 0 ? null : p.last_story_id,
      open: p.state === 1 ? true : false,
      created_at: new Date(p.created_at),
      expires_at: new Date(p.expires_at),
    };
  });
  return transformed;
};

export const transformHeroes = (playerHeroes: DBPHero[]): IPHero[] => {
  const transformed = playerHeroes.map((p: DBPHero) => {
    return {
      id: p.hero_id,
      selected: p.selected === 1 ? true : false,
      created_at: new Date(p.created_at),
      expires_at: new Date(p.expires_at),
    };
  });
  return transformed;
};

export const transformCharacters = (
  playerCharacters: DBPCharacter[]
): IPCharacter[] => {
  const transformed = playerCharacters.map((p: DBPCharacter) => {
    return {
      id: p.character_id,
      image: p.image,
      dialogue_id: p.dialogue_id,
      created_at: new Date(p.created_at),
      expires_at: new Date(p.expires_at),
    };
  });
  return transformed;
};

export const transformPlayerUpdates = (
  playerUpdates: DBPUpdate[]
): IPUpdate[] => {
  const transformed = playerUpdates.map((p: DBPUpdate) => {
    return {
      id: p.update_id,
      created_at: new Date(p.created_at),
      expires_at: new Date(p.expires_at),
    };
  });
  return transformed;
};

export const transformPlayerResources = (
  playerResources: DBPResource[]
): IPResource[] => {
  const transformed = playerResources.map((p: DBPResource) => {
    return {
      id: p.resource_id,
      quantity: p.quantity,
      created_at: new Date(p.created_at),
    };
  });
  return transformed;
};
