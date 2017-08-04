// @ts-check

import { Vector2 } from 'three';
import constants from '../../constants';

/**
 * @param {[number, number]} xyArray
 */
export default function getConfigVector2(xyArray) {
  const [x, y] = xyArray;
  return new Vector2(x * constants.scale, y * constants.scale);
}
