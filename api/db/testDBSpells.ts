import { ISpellUpdate, ISpellPrice, ISpell } from "../engine/types";

export const spellUpdates: ISpellUpdate[] = [
  {
    spellId: 0,
    elementId: 0,
    updatePrice: [
      { id: 0, name: "Coin", quantity: 5000 },
      { id: 3, name: "Air essence", quantity: 500 },
      { id: 1, name: "Black Soul Stone", quantity: 50 },
      { id: 2, name: "White Soul Stone", quantity: 100 },
    ],
    requiredStrength: 1,
  },
  {
    spellId: 0,
    elementId: 0,
    updatePrice: [
      { id: 0, name: "Coin", quantity: 50000 },
      { id: 3, name: "Air essence", quantity: 5000 },
      { id: 1, name: "Black Soul Stone", quantity: 500 },
      { id: 2, name: "White Soul Stone", quantity: 1000 },
    ],
    requiredStrength: 2,
  },
  {
    spellId: 1,
    elementId: 0,
    updatePrice: [
      { id: 0, name: "Coin", quantity: 5000 },
      { id: 3, name: "Air essence", quantity: 500 },
      { id: 1, name: "Black Soul Stone", quantity: 50 },
      { id: 2, name: "White Soul Stone", quantity: 100 },
    ],
    requiredStrength: 1,
  },
  {
    spellId: 1,
    elementId: 0,
    updatePrice: [
      { id: 0, name: "Coin", quantity: 50000 },
      { id: 3, name: "Air essence", quantity: 5000 },
      { id: 1, name: "Black Soul Stone", quantity: 500 },
      { id: 2, name: "White Soul Stone", quantity: 1000 },
    ],
    requiredStrength: 2,
  },
];

export const spellPrices: ISpellPrice[] = [
  {
    spellId: 0,
    elementId: 0,
    price: [
      { id: 0, name: "Coin", quantity: 5 },
      { id: 3, name: "Air essence", quantity: 1 },
    ],
  },
  {
    spellId: 1,
    elementId: 0,
    price: [
      { id: 0, name: "Coin", quantity: 500 },
      { id: 3, name: "Air essence", quantity: 10 },
      { id: 1, name: "White Soul Stone", quantity: 1 },
    ],
  },
  {
    spellId: 2,
    elementId: 1,
    price: [
      { id: 0, name: "Coin", quantity: 10 },
      { id: 4, name: "Fire essence", quantity: 5 },
    ],
  },
  {
    spellId: 3,
    elementId: 1,
    price: [
      { id: 0, name: "Coin", quantity: 500 },
      { id: 4, name: "Fire essence", quantity: 10 },
      { id: 1, name: "White Soul Stone", quantity: 1 },
    ],
  },
];
export const spells: ISpell[] = [
  {
    id: 0,
    elementId: 0,
    enemy: "air",
    strength: 1,
    symbol: "some", // Unknown for now
    state: "closed",
    name: "Air spell 1",
  },
  {
    id: 1,
    elementId: 0,
    enemy: "fire",
    strength: 1,
    symbol: "some", // Unknown for now
    state: "closed",
    name: "Air spell 2",
  },
  {
    id: 2,
    elementId: 1,
    enemy: "fire",
    strength: 1,
    symbol: "some", // Unknown for now
    state: "closed",
    name: "Fire spell 1",
  },
  {
    id: 3,
    elementId: 1,
    enemy: "stone",
    strength: 1,
    symbol: "some", // Unknown for now
    state: "closed",
    name: "Fire spell 2",
  },
];
