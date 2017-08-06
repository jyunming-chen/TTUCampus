// @ts-check

import { Vector3 } from 'three';

/**
 * @param {number[]} xyOrXyzArray
 */
export default function getVector3(xyOrXyzArray) {
  if (xyOrXyzArray.length === 2) {
    const [x, y] = xyOrXyzArray;
    return new Vector3(x, 0, -y);
  }
  const [x, y, z] = xyOrXyzArray;
  return new Vector3(x, y, z);
}
