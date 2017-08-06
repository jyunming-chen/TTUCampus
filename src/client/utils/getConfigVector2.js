// @ts-check

import { Vector2 } from 'three';
import constants from '../../constants';

/**
 * @param {number[]} xyArray
 */
export default function getConfigVector2(xyArray, scale = constants.scale) {
  const [x, y] = xyArray;
  return new Vector2(x * scale, y * scale);
}
