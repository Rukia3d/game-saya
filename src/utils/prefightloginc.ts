import { findEnemy, initFight } from "./fightlogic";
import { findStoryCharacters } from "./helpers";
import { IHero, ISpell, IEnemy, Player, IFight, FightState } from "./types";

export const generateDeck = (
  characters: IHero[],
  playerCards: ISpell[]
): ISpell[] => {
  const heroSpells: ISpell[] = [];
  playerCards.forEach((c: ISpell) => {
    //    if (!c.selected) return;
    heroSpells.push({
      id: c.id,
      name: c.name,
      strength: c.strength,
      color: c.color,
      owner: "hero",
      selected: c.selected,
      school: c.school,
      description: c.description,
      updates: c.updates,
    });
  });
  return heroSpells;
};

export const generateEnemyDeck = (enemy: IEnemy): ISpell[] => {
  const enemySpells: ISpell[] = [];
  enemy.spells.forEach((c: ISpell) => {
    enemySpells.push({
      id: c.id,
      name: c.name,
      strength: c.strength,
      color: c.color,
      owner: "enemy",
      selected: true,
      school: c.school,
      description: c.description,
      updates: c.updates,
    });
  });
  return enemySpells.splice(0, enemy.life);
};

export const initPreFight = (player: Player, fight: IFight) => {
  const storyCharacters = findStoryCharacters(fight.characters, player.heroes);
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
