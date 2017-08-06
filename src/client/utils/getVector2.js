// @ts-check

import { Vector2 } from 'three';

/**
 * @param {number[]} xyArray
 */
export default function getVector2(xyArray) {
  const [x, y] = xyArray;
  return new Vector2(x, y);
}
