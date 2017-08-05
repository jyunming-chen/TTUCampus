// @ts-check

import getConfigVector3 from './getConfigVector3';

export default class ConfigPath {
  /**
   * @param {number[][]} points
   */
  constructor(points) {
    this.points = points.map(getConfigVector3);

    this.distance = 0;
    this.points.forEach((point, index) => {
      if (index > 0) {
        this.distance += this.points[index - 1].distanceTo(point);
      }
    });
  }
}
