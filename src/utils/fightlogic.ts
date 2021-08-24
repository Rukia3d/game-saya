import { updateHeroDeck } from "./gamelogic";
import { removeFromArray } from "./helpers";
import { FightState, Spell, elementType } from "./types";
const getNextElement = (
  elements: elementType[],
  element: elementType
): elementType => {
  const index = elements.indexOf(element);
  if (index === -1)
    throw new Error("Can't find the element to give you the next one");
  if (index === elements.length - 1) {
    return elements[0];
  }
  return elements[index + 1];
};

const simpleDamage = (
  health: number,
  heroStrength: number,
  enemyStrength: number
) => {
  if (heroStrength < enemyStrength) {
    health = health - enemyStrength;
  }
  return health;
};

export const enemyAttack = (
  fightState: FightState,
  heroCard: Spell,
  enemyCard: Spell
): FightState => {
  // Update cards state
  const [newDeck, newDrop] = updateHeroDeck(fightState, heroCard);
  const newHeroHand = removeFromArray(fightState.heroHand, heroCard);
  const newCard = newDeck.shift();
  newHeroHand.push(newCard);
  const enemyDrop = fightState.enemyDrop.concat([enemyCard]);
  const enemyDeck = fightState.enemyDeck.splice(1);
  let newHeroHealth = fightState.hero.life;
  let newHeroMana = fightState.hero.mana;

  if (
    fightState.element &&
    (fightState.element === heroCard.element ||
      fightState.element === enemyCard.element)
  ) {
    // do nothing if hero has a trump  - they can't be damaged
    // if enemy has a trump but hero doesn't
    if (fightState.element === enemyCard.element) {
      newHeroHealth = newHeroHealth - enemyCard.strength;
    }

    // This is a trump attack for simple cards
  } else {
    // This is a simple attack with no trump
    newHeroHealth = simpleDamage(
      newHeroHealth,
      heroCard.strength,
      enemyCard.strength
    );
  }

  if (heroCard.mana > 0 && fightState.hero.mana >= heroCard.mana) {
    // additional effects apply
    newHeroMana = fightState.hero.mana - heroCard.mana;
  }

  const heroNew = {
    ...fightState.hero,
    life: newHeroHealth,
    mana: newHeroMana,
  };
  const nextElement = getNextElement(fightState.elements, fightState.element);

  return {
    ...fightState,
    heroDeck: newDeck,
    heroDrop: newDrop,
    enemyDeck: enemyDeck,
    enemyDrop: enemyDrop,
    heroHand: newHeroHand,
    hero: heroNew,
    element: nextElement,
  };
};
