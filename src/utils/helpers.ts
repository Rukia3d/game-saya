import { IInventoryQuant, ICell, IPoint } from "../../api/engine/types";

//@ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const unique = (arrArg: any[]) =>
  arrArg.filter(
    (elem: any, pos: number, arr: any) => arr.indexOf(elem) === pos
  );

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const removeFromArray = (arrArg: any[], item: any) => {
  const stringifiedArray = arrArg.map((a: any) => JSON.stringify(a));
  const index = stringifiedArray.indexOf(JSON.stringify(item));
  if (!item || index === -1)
    throw new Error("Can't find the item to remove from array");
  arrArg.splice(index, 1);
  return arrArg;
};

export const enoughToPay = (
  materials: IInventoryQuant[],
  price: IInventoryQuant[]
): boolean => {
  let canBuy = true;
  price.forEach((p: IInventoryQuant) => {
    const material = materials.find((m: IInventoryQuant) => m.id === p.id);
    if (!material) {
      throw new Error(
        `Price of an item contains non-existant material ${p.id} - ${p.name}`
      );
    }
    if (p.quantity > material.quantity) {
      canBuy = false;
    }
  });

  return canBuy;
};

export const shuffle = (array: any) => array.sort(() => Math.random() - 0.5);

// TODO: replace { x: number, y: number } with Point type
export const screenToMap = (
  s: IPoint,
  map: ICell[][]
): { x: number; y: number } => {
  const xP = Math.floor(s.x / 80);
  const yP = Math.ceil(map.length - 1 - s.y / 80);
  return { x: xP, y: yP };
};

export const mapToScreen = (
  m: IPoint,
  map: ICell[][]
): { x: number; y: number } => {
  const xS = m.x * 80; // left
  const yS = map.length * 80 - m.y * 80 - 1; // bottom
  return { x: xS, y: yS };
};

export const addPoints = (p1: IPoint, p2: IPoint, name?: string): IPoint => ({
  x: Math.floor(p1.x + p2.x),
  y: Math.floor(p1.y + p2.y),
  name: name || p1.name || p2.name,
});
