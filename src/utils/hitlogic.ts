import { heroIsPresent, manaPriceOfUpdates } from "./fightlogic";
import { elementType, FightState, ISpell } from "./types";

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

const specialDamage = (
  element: elementType,
  heroCard: ISpell,
  enemyCard: ISpell,
  heroHealth: number
) => {
  if (element === enemyCard.element && element !== heroCard.element) {
    //console.log("special attack enemy trump");
    return heroHealth - enemyCard.strength;
  }

  if (
    element === enemyCard.element &&
    element === heroCard.element &&
    enemyCard.strength > heroCard.strength
  ) {
    //console.log("special attack both trump");
    return heroHealth - (enemyCard.strength - heroCard.strength);
  }
  return heroHealth;
};

const additionalEffects = (
  fightState: FightState,
  heroCard: ISpell,
  enemyCard: ISpell,
  heroHealth: number,
  heroMana: number
) => {
  // additional effects apply
  const price = manaPriceOfUpdates(heroCard.updates);
  if (manaPriceOfUpdates(heroCard.updates) < fightState.hero.mana) {
    const currentupdate = heroCard.updates[0];
    if (heroIsPresent(currentupdate, fightState.heroes)) {
      //console.log("Spell effect", currentupdate.effect);
      switch (currentupdate.effect) {
        case "h_heal":
          heroHealth = heroHealth + (currentupdate.action.strength as number);
          break;
        case "h_trumpremove":
          if (enemyCard.element === fightState.element) {
            heroHealth = heroHealth + enemyCard.strength;
            heroHealth = simpleDamage(
              heroHealth,
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
      heroMana = heroMana - price;
    } else {
      console.warn("Hero is not present to use this update");
    }
  } else {
    console.warn("Not enough mana to use");
  }
  return [heroHealth, heroMana];
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
    newHeroHealth = specialDamage(
      fightState.element,
      heroCard,
      enemyCard,
      newHeroHealth
    );
  } else {
    // This is a simple attack with no trump
    //console.log("simple attack");
    newHeroHealth = simpleDamage(
      newHeroHealth,
      heroCard.strength,
      enemyCard.strength
    );
  }

  if (heroCard.updates.length > 0) {
    // additional effects apply
    const additional = additionalEffects(
      fightState,
      heroCard,
      enemyCard,
      newHeroHealth,
      newHeroMana
    );
    newHeroHealth = additional[0];
    newHeroMana = additional[1];
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
