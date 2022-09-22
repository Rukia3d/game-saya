import { IMaterialQuant } from "../../api/engine/types";

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
  materials: IMaterialQuant[],
  price: IMaterialQuant[]
): boolean => {
  let canBuy = true;
  price.forEach((p: IMaterialQuant) => {
    const material = materials.find((m: IMaterialQuant) => m.id === p.id);
    if (!material) {
      throw new Error("Price of an item contains non-existant material");
    }
    if (p.quantity > material.quantity) {
      canBuy = false;
    }
  });

  return canBuy;
};

export const shuffle = (array: any) => array.sort(() => Math.random() - 0.5);
