import { generateDeck, generateEnemyDeck, updateHeroDeck } from "./gamelogic";
import { removePlayedCard, shuffle } from "./helpers";
import {
  FightState,
  elementType,
  SpellUpdate,
  Hero,
  Spell,
  Enemy,
} from "./types";

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

export const findEnemy = (enemies: Enemy[], enemyId: string | undefined) => {
  if (!enemyId) {
    throw new Error("No enemyId for this fight, something went very wrong");
  }
  const enemy = enemies.find((e: any) => e.id === enemyId);
  if (!enemy) {
    throw new Error("No enemy for this fight, something went very wrong");
  }
  return enemy;
};

export const initFight = (
  storyCharacters: Hero[],
  spells: Spell[],
  enemy: Enemy
) => {
  const heroDeck = shuffle(generateDeck(storyCharacters, spells));
  if (heroDeck.length === 0) {
    throw new Error(`Couldn't generate cards for player`);
  }
  const enemyDeck = shuffle(generateEnemyDeck(enemy));
  if (enemyDeck.length < 1) {
    throw new Error(`Couldn't generate cards for enemy`);
  }
  const elements: elementType[] = shuffle([
    "fire",
    "earth",
    "metal",
    "water",
    "air",
  ]);
  return [heroDeck, enemyDeck, elements];
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

const specialDamage = (
  element: elementType,
  heroCard: Spell,
  enemyCard: Spell,
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
  heroCard: Spell,
  enemyCard: Spell,
  heroHealth: number,
  heroMana: number
) => {
  // additional effects apply
  const price = manaPriceOfUpdates(heroCard.updates);
  if (manaPriceOfUpdates(heroCard.updates) < fightState.hero.mana) {
    const currentupdate = heroCard.updates[0];
    if (heroIsPresent(currentupdate, fightState.heroes)) {
      const action = parseUpdateAction(currentupdate.action);
      //console.log("Spell effect", currentupdate.effect);
      switch (currentupdate.effect) {
        case "h_heal":
          heroHealth = heroHealth + parseInt(action.change);
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
  const newState = {
    ...fightState,
    heroDeck: newDeck,
    heroDrop: newDrop,
    enemyDrop: fightState.enemyDrop.concat([enemyCard]),
    heroHand: newHeroHand,
    enemyDeck: fightState.enemyDeck.slice(1),
  };
  return newState;
};
