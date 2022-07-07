import { ISpellUpdate, ISpellPrice, ISpell } from "../engine/types";

export const spellUpdates: ISpellUpdate[] = [
  {
    spellId: 0,
    arcanaId: 0,
    updatePrice: [
      { id: 0, name: "Coin", quantity: 5 },
      { id: 3, name: "Rings", quantity: 1 },
    ],
    requiredStrength: 1,
  },
  {
    spellId: 0,
    arcanaId: 0,
    updatePrice: [
      { id: 0, name: "Coin", quantity: 50000 },
      { id: 3, name: "Rings", quantity: 5000 },
      { id: 1, name: "Black Soul Stone", quantity: 500 },
      { id: 2, name: "White Soul Stone", quantity: 1000 },
    ],
    requiredStrength: 2,
  },
  {
    spellId: 1,
    arcanaId: 0,
    updatePrice: [
      { id: 0, name: "Coin", quantity: 5000 },
      { id: 3, name: "Rings", quantity: 500 },
      { id: 1, name: "Black Soul Stone", quantity: 50 },
      { id: 2, name: "White Soul Stone", quantity: 100 },
    ],
    requiredStrength: 1,
  },
  {
    spellId: 1,
    arcanaId: 0,
    updatePrice: [
      { id: 0, name: "Coin", quantity: 50000 },
      { id: 3, name: "Rings", quantity: 5000 },
      { id: 1, name: "Black Soul Stone", quantity: 500 },
      { id: 2, name: "White Soul Stone", quantity: 1000 },
    ],
    requiredStrength: 2,
  },
];

export const spellPrices: ISpellPrice[] = [
  {
    spellId: 0,
    arcanaId: 0,
    price: [
      { id: 0, name: "Coin", quantity: 5 },
      { id: 3, name: "Rings", quantity: 1 },
    ],
  },
  {
    spellId: 1,
    arcanaId: 0,
    price: [
      { id: 0, name: "Coin", quantity: 500 },
      { id: 3, name: "Rings", quantity: 10 },
      { id: 1, name: "White Soul Stone", quantity: 1 },
    ],
  },
  {
    spellId: 2,
    arcanaId: 1,
    price: [
      { id: 0, name: "Coin", quantity: 10 },
      { id: 4, name: "Wands", quantity: 5 },
    ],
  },
  {
    spellId: 3,
    arcanaId: 1,
    price: [
      { id: 0, name: "Coin", quantity: 500 },
      { id: 4, name: "Wands", quantity: 10 },
      { id: 1, name: "White Soul Stone", quantity: 1 },
    ],
  },
];
export const spells: ISpell[] = [
  {
    id: 0,
    arcanaId: 0,
    enemy: "rings",
    strength: 1,
    symbol: "some", // Unknown for now
    state: "closed",
    name: "Rings spell 1",
  },
  {
    id: 1,
    arcanaId: 0,
    enemy: "rings",
    strength: 1,
    symbol: "some", // Unknown for now
    state: "closed",
    name: "Rings spell 2",
  },
  {
    id: 2,
    arcanaId: 1,
    enemy: "wands",
    strength: 1,
    symbol: "some", // Unknown for now
    state: "closed",
    name: "Wands spell 1",
  },
  {
    id: 3,
    arcanaId: 1,
    enemy: "wands",
    strength: 1,
    symbol: "some", // Unknown for now
    state: "closed",
    name: "Wands spell 2",
  },
];
