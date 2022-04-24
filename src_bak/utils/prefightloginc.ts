import { findEnemy, initFight } from "./fightlogic";
import { Player, IFight, FightState, IPlayerSpell, IPlayerHero } from "./types";

export const generateDeck = (
  characters: IPlayerHero[],
  playerSpells: IPlayerSpell[]
): IPlayerSpell[] => {
  const heroSpells: IPlayerSpell[] = [];
  playerSpells.forEach((c: IPlayerSpell) => {
    if (!c.selected) return;
    heroSpells.push({
      id: c.id,
      name: c.name,
      strength: c.strength,
      element: c.element,
      selected: c.selected,
      description: c.description,
      created_at: c.created_at,
      owner: "hero",
      updates: c.updates,
      copy: c.copy,
    });
  });
  return heroSpells;
};

export const generateEnemyDeck = (
  enemySpells: IPlayerSpell[]
): IPlayerSpell[] => {
  const DEFAULENEMYSPELLS = 5;
  const spells: IPlayerSpell[] = [];
  enemySpells.forEach((c: IPlayerSpell) => {
    enemySpells.push({
      id: c.id,
      name: c.name,
      strength: c.strength,
      element: c.element,
      owner: "enemy",
      selected: true,
      description: c.description,
      updates: c.updates,
      created_at: c.created_at,
      copy: 1,
    });
  });
  return spells.splice(0, DEFAULENEMYSPELLS);
};

export const initPreFight = (player: Player, fight: IFight) => {
  const storyCharacters = findStoryCharacters(
    fight.hero_elements,
    player.heroes
  );
  const enemy = findEnemy(player.enemies, fight.enemy);

  const [heroDeck, enemyDeck, elements] = initFight(
    storyCharacters,
    player.spells,
    enemy
  );

  const prefightState: FightState = {
    hero: {
      maxLife: player.data.maxLife,
      life: player.data.life,
      maxMana: player.data.maxMana,
      mana: player.data.mana,
    },
    heroes: storyCharacters,
    enemy: enemy,
    heroDeck: heroDeck,
    heroCardIndex: null,
    heroHand: heroDeck.splice(0, 5),
    heroDrop: [],
    enemyDeck: enemyDeck,
    enemyDrop: [],
    enemyCardIndex: null,
    elements: elements,
    element: elements[0],
  };
  return prefightState;
};
