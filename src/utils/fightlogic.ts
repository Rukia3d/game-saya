import { removePlayedCard, shuffle } from "./helpers";
import { generateDeck, generateEnemyDeck } from "./prefightloginc";
import {
  FightState,
  elementType,
  ISpellUpdate,
  IHero,
  ISpell,
  IEnemy,
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

export const manaPriceOfUpdates = (updates: ISpellUpdate[]) => {
  let res = 0;
  for (let i = 0; i < updates.length; i++) {
    res = res + updates[i].mana;
  }
  return res;
};

export const parseUpdateAction = (action: string) => {
  const res = action.split(",");
  return { parameter: res[0], change: res[1] };
};

export const heroIsPresent = (update: ISpellUpdate, heroes: IHero[]) => {
  return heroes.filter((h: IHero) => h.element === update.element).length > 0;
};

export const findEnemy = (enemies: IEnemy[], enemyId: string) => {
  const enemy = enemies.find((e: any) => e.id === enemyId);
  if (!enemy) {
    throw new Error("No enemy for this fight, something went very wrong");
  }
  return enemy;
};

export const initFight = (
  storyCharacters: IHero[],
  spells: ISpell[],
  enemy: IEnemy
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

export const changeCardsInDeck = (playerCards: ISpell[], i: number) => {
  const playerCard = playerCards[i];
  if (!playerCard) {
    throw new Error(
      "Can't find the card you're trying to select in player's cards"
    );
  }
  const currentlySelected = playerCards.filter((c: ISpell) => c.selected);

  if (currentlySelected.length >= 15) {
    const firstSelectedIndex = playerCards.indexOf(currentlySelected[0]);
    playerCards[firstSelectedIndex] = {
      ...playerCards[firstSelectedIndex],
      selected: false,
    };
  }
  playerCards[i] = { ...playerCard, selected: !playerCard.selected };
  return playerCards;
};

export const updateHeroDeck = (fightState: FightState, heroCard: ISpell) => {
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
