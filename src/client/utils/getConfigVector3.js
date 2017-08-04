// @ts-check

import { Vector3 } from 'three';
import constants from '../../constants';

/**
 * @param {number[]} xyOrXyzArray
 */
export default function getConfigVector3(xyOrXyzArray) {
  if (xyOrXyzArray.length === 2) {
    const [x, y] = xyOrXyzArray;
    return new Vector3(x * constants.scale, 0, y * -constants.scale);
  }
  const [x, y, z] = xyOrXyzArray;
  return new Vector3(
    x * constants.scale,
    y * constants.scale,
    z * constants.scale,
  );
}
