import seedrandom from "seedrandom";

export const shuffle = <T>(seed: string, input: T[]): T[] => {
  const rng = seedrandom(seed);

  // copy input to shuffled
  const shuffled: T[] = [...input];

  // run shuffle algorithm on shuffled variable - go left to right
  // throw all items, pick a random item to the right (including the current item),
  // and swap current and randomly picked items
  for (let n = 0; n < input.length - 1; n++) {
    const randomPick = n + Math.round(rng() * (input.length - n - 1));
    const temp = shuffled[n];
    shuffled[n] = shuffled[randomPick];
    shuffled[randomPick] = temp;
  }

  return shuffled;
};
