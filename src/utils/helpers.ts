//@ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const unique = (arrArg: any[]) =>
  arrArg.filter(
    (elem: any, pos: number, arr: any) => arr.indexOf(elem) === pos
  );

export const removeFromArray = (arrArg: any[], item: any) => {
  const index = arrArg.indexOf(item);
  if (!item) console.warn("Array does not contain the element");
  if (index > -1) {
    arrArg.splice(index, 1);
  }
  return arrArg;
};

export const generateInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));

export const exists = (characters: any, { x, y }: { x: number; y: number }) => {
  const result = characters.some(
    (c: any) => c.position.x === x && c.position.y === y
  );
  return result;
};

export const shuffle = (array: any) => array.sort(() => Math.random() - 0.5);
