import { updateHeroDeck } from "./gamelogic";
import { removePlayedCard } from "./helpers";
import { FightState, elementType, SpellUpdate, Hero } from "./types";
export const getNextElement = (
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
  if (fightState.heroCardIndex === null)
    throw new Error(
      `No hero card to play, heroCardIndex is ${fightState.heroCardIndex}`
    );
  if (fightState.enemyCardIndex === null)
    throw new Error(
      `No enemy card to play, enemyCardIndex is ${fightState.heroCardIndex}`
    );

  const heroCard = fightState.heroHand[fightState.heroCardIndex];
  const enemyCard = fightState.enemyDeck[fightState.enemyCardIndex];

  if (!heroCard) {
    throw new Error(
      `Fight state is missing a hero card, the received card index is ${fightState.heroCardIndex}`
    );
  }
  if (!enemyCard) {
    throw new Error(
      `Fight state is missing an enemy card, the received card index is ${fightState.enemyCardIndex}`
    );
  }
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
            // TODO
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
    hero: heroNew,
  };
};

export const updateDecks = (fightState: FightState): FightState => {
  if (fightState.heroCardIndex === null)
    throw new Error("No hero card to play");
  if (fightState.enemyCardIndex === null)
    throw new Error("No enemy card to play");
  const heroCard = fightState.heroHand[fightState.heroCardIndex];
  const enemyCard = fightState.enemyDeck[fightState.enemyCardIndex];
  const [newDeck, newDrop] = updateHeroDeck(fightState, heroCard);
  const newHeroHand = removePlayedCard(
    fightState.heroHand,
    fightState.heroCardIndex
  );
  const newCard = newDeck.shift();
  if (!newCard) {
    throw new Error("Can't find a new card to give to a player");
  }
  newHeroHand.push(newCard);
  return {
    ...fightState,
    heroDeck: newDeck,
    heroDrop: newDrop,
    enemyDrop: fightState.enemyDrop.concat([enemyCard]),
    heroHand: newHeroHand,
    enemyDeck: fightState.enemyDeck.slice(1),
  };
};
