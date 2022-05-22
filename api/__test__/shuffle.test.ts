import { shuffle } from "../engine/shuffle";

test("Shuffles and array on seed", () => {
  const ary = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const shuffledAry1 = shuffle("test-seed-1", ary);
  // shuffled array must not be the same as original
  expect(shuffledAry1).not.toEqual(ary);

  const shuffledAry2 = shuffle("test-seed-2", ary);
  // shuffled array must not be the same as original
  expect(shuffledAry2).not.toEqual(ary);

  // shuffled arrays must depend on seed
  expect(shuffledAry1).not.toEqual(shuffledAry2);

  // shuffled array must have all the same elements as the original
  shuffledAry1.sort();
  expect(shuffledAry1).toEqual(ary);
  shuffledAry2.sort();
  expect(shuffledAry2).toEqual(ary);
});
