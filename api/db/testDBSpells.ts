import { ISpellUpdate, ISpellPrice, ISpell } from "../engine/types";

export const spellUpdates: ISpellUpdate[] = [
  {
    spellId: 0,
    arcanaId: 0,
    updatePrice: [
      { id: 0, name: "money", quantity: 5 },
      { id: 3, name: "resource1", quantity: 1 },
    ],
    requiredStrength: 1,
  },
  {
    spellId: 0,
    arcanaId: 0,
    updatePrice: [
      { id: 0, name: "money", quantity: 50000 },
      { id: 3, name: "resource1", quantity: 5000 },
      { id: 1, name: "token", quantity: 500 },
    ],
    requiredStrength: 2,
  },
  {
    spellId: 1,
    arcanaId: 0,
    updatePrice: [
      { id: 0, name: "money", quantity: 5000 },
      { id: 3, name: "resource1", quantity: 500 },
      { id: 1, name: "token", quantity: 50 },
    ],
    requiredStrength: 1,
  },
  {
    spellId: 1,
    arcanaId: 0,
    updatePrice: [
      { id: 0, name: "money", quantity: 50000 },
      { id: 3, name: "resource1", quantity: 5000 },
      { id: 1, name: "token", quantity: 500 },
    ],
    requiredStrength: 2,
  },
];

export const spellPrices: ISpellPrice[] = [
  {
    spellId: 0,
    arcanaId: 0,
    price: [
      { id: 0, name: "money", quantity: 5 },
      { id: 3, name: "resource1", quantity: 1 },
    ],
  },
  {
    spellId: 1,
    arcanaId: 0,
    price: [
      { id: 0, name: "money", quantity: 500 },
      { id: 3, name: "resource1", quantity: 10 },
      { id: 1, name: "token", quantity: 1 },
    ],
  },
  {
    spellId: 2,
    arcanaId: 1,
    price: [
      { id: 0, name: "money", quantity: 10 },
      { id: 4, name: "resource2", quantity: 5 },
    ],
  },
  {
    spellId: 3,
    arcanaId: 1,
    price: [
      { id: 0, name: "money", quantity: 500 },
      { id: 4, name: "resource2", quantity: 10 },
      { id: 1, name: "token", quantity: 1 },
    ],
  },
];
export const spells: ISpell[] = [
  {
    id: 0,
    arcanaId: 0,
    enemy: "one",
    strength: 1,
    symbol: "some", // Unknown for now
    state: "closed",
    name: "Rings spell 1",
  },
  {
    id: 1,
    arcanaId: 0,
    enemy: "one",
    strength: 1,
    symbol: "some", // Unknown for now
    state: "closed",
    name: "Rings spell 2",
  },
  {
    id: 2,
    arcanaId: 1,
    enemy: "one",
    strength: 1,
    symbol: "some", // Unknown for now
    state: "closed",
    name: "Wands spell 1",
  },
  {
    id: 3,
    arcanaId: 1,
    enemy: "one",
    strength: 1,
    symbol: "some", // Unknown for now
    state: "closed",
    name: "Wands spell 2",
  },
];
