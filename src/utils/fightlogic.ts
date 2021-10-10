import { updateHeroDeck } from "./gamelogic";
import { removeFromArray } from "./helpers";
import { FightState, elementType, SpellUpdate, Hero } from "./types";
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

const manaPriceOfUpdates = (updates: SpellUpdate[]) => {
  let res = 0;
  for (let i = 0; i < updates.length; i++) {
    res = res + updates[i].mana;
  }
  return res;
};

const parseUpdateAction = (action: string) => {
  const res = action.split(",");
  return { parameter: res[0], change: res[1] };
};

const heroIsPresent = (update: SpellUpdate, heroes: Hero[]) => {
  return heroes.filter((h: Hero) => h.element === update.element).length > 0;
};

const simpleDamage = (
  health: number,
  heroStrength: number,
  enemyStrength: number
) => {
  //console.log(health, heroStrength, enemyStrength);
  if (heroStrength < enemyStrength) {
    health = health - (enemyStrength - heroStrength);
  }
  //console.log("new health", health);
  return health;
};

export const enemyAttack = (fightState: FightState): FightState => {
  const heroCard = fightState.heroCard;
  const enemyCard = fightState.enemyCard;
  if (heroCard === null || enemyCard === null) {
    throw new Error("Fight state is missing enemy or hero cards");
  }
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
    //console.log("special attack");
    if (
      fightState.element === enemyCard.element &&
      fightState.element !== heroCard.element
    ) {
      //console.log("special attack enemy trump");
      newHeroHealth = newHeroHealth - enemyCard.strength;
    }

    if (
      fightState.element === enemyCard.element &&
      fightState.element === heroCard.element &&
      enemyCard.strength > heroCard.strength
    ) {
      //console.log("special attack both trump");
      newHeroHealth = newHeroHealth - (enemyCard.strength - heroCard.strength);
    }
  } else {
    // This is a simple attack with no trump
    //console.log("simple attack");
    newHeroHealth = simpleDamage(
      newHeroHealth,
      heroCard.strength,
      enemyCard.strength
    );
  }
  let nextElement = getNextElement(fightState.elements, fightState.element);
  /* 
h_trumpset
h_redraw
h_mana
e_redraw
e_drop
e_reduice
h_enforce
*/
  if (heroCard.updates.length > 0) {
    // additional effects apply
    if (manaPriceOfUpdates(heroCard.updates) < fightState.hero.mana) {
      const currentupdate = heroCard.updates[0];
      if (heroIsPresent(currentupdate, fightState.heroes)) {
        const action = parseUpdateAction(currentupdate.action);
        //console.log("Spell effect", currentupdate.effect);
        switch (currentupdate.effect) {
          case "h_heal":
            newHeroHealth = newHeroHealth + parseInt(action.change);
            break;
          case "h_trumpremove":
            if (enemyCard.element === fightState.element) {
              newHeroHealth = newHeroHealth + enemyCard.strength;
              newHeroHealth = simpleDamage(
                newHeroHealth,
                heroCard.strength,
                enemyCard.strength
              );
            }
            break;
          case "h_trumpset":
            nextElement = action.change.replace(/\s/g, "") as elementType;
            break;
          default:
            break;
        }
      } else {
        console.warn("Hero is not present to use this update");
      }
    } else {
      console.warn("Not enough mana to use");
    }
  }

  const heroNew = {
    ...fightState.hero,
    life: newHeroHealth,
    mana: newHeroMana,
  };

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
