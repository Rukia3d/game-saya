import { Card, Enemy, FightState, Spell } from "./types";

export const generateDeck = (
  characters: string[],
  playerCards: Card[]
): Spell[] => {
  const heroSpells: Spell[] = [];
  playerCards.forEach((c: Card) => {
    for (let i = 0; i < c.quantity; i++) {
      if (c.character && characters.indexOf(c.character) === -1) {
        return;
      }
      heroSpells.push({
        id: c.id,
        name: c.name,
        strength: c.strength,
        character: c.character,
        element: c.element,
        owner: "hero",
      });
    }
  });
  return heroSpells;
};

export const generateEnemyDeck = (enemy: Enemy): Spell[] => {
  const enemySpells: Spell[] = [];
  enemy.cards.forEach((c: Card) => {
    for (let i = 0; i < c.quantity; i++) {
      enemySpells.push({
        id: c.id,
        name: c.name,
        strength: c.strength,
        character: c.character,
        element: c.element,
        owner: "enemy",
      });
    }
  });
  return enemySpells.splice(0, enemy.life);
};

export const updateHeroDeck = (fightState: FightState, heroCard: Spell) => {
  let newDeck = fightState.heroDeck;
  let newDrop = fightState.heroDrop;
  if (fightState.heroDeck.length <= 0) {
    newDeck = newDrop;
    newDrop = [heroCard];
  } else {
    newDrop.push(heroCard);
  }
  return [newDeck, newDrop];
};
