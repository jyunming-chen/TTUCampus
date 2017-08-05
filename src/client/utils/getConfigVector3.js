// @ts-check

import { Vector3 } from 'three';
import constants from '../../constants';

/**
 * @param {number[]} xyOrXyzArray
 */
export default function getConfigVector3(
  xyOrXyzArray,
  scale = constants.scale,
) {
  if (xyOrXyzArray.length === 2) {
    const [x, y] = xyOrXyzArray;
    return new Vector3(x * scale, 0, y * -scale);
  }
  const [x, y, z] = xyOrXyzArray;
  return new Vector3(x * scale, y * scale, z * scale);
}
