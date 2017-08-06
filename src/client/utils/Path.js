// @ts-check

import { Vector3 } from 'three';
import getVector3 from './getVector3';

export default class Path {
  /**
   * @param {number[][]} points
   */
  constructor(points) {
    this.points = points.map(point => getVector3(point));

    this.distance = 0;

    /** @type {number[]} */
    this.distances = [0];

    this.points.forEach((point, index) => {
      if (index > 0) {
        this.distance += this.points[index - 1].distanceTo(point);
        this.distances.push(this.distance);
      }
    });
  }

  /**
   * @param {number} ratio 0.0 ~ 1.0
   */
  getPoint(ratio) {
    const targetDistance = this.distance * ratio;

    let prevPointIndex = -1;
    let nextPointIndex = -1;

    for (let i = 1; i < this.distances.length; i += 1) {
      if (targetDistance < this.distances[i]) {
        prevPointIndex = i - 1;
        nextPointIndex = i;
        break;
      }
    }

    const prevPoint = this.points[prevPointIndex];
    const nextPoint = this.points[nextPointIndex];

    if (!prevPoint || !nextPoint) {
      return this.points[this.points.length - 1].clone();
    }

    return new Vector3().lerpVectors(
      prevPoint,
      nextPoint,
      (targetDistance - this.distances[prevPointIndex]) /
        (this.distances[nextPointIndex] - this.distances[prevPointIndex]),
    );
  }
}
