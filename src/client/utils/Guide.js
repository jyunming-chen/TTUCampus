// @ts-check

import Path from './Path';

/**
 * @typedef {Object} RawPath
 * @prop {string} from
 * @prop {string} to
 * @prop {string[]} points
 */

/**
 * @typedef {Object} RawPoint
 * @prop {string} id
 * @prop {string} name
 * @prop {number[]} position
 */

export default class Guide {
  /**
   * @param {RawPath[]} paths
   * @param {RawPoint[]} points
   */
  constructor(paths, points) {
    /**
     * @type {Record<string, Record<string, Path>>}
     */
    this.map = {};

    /**
     * @type {Record<string, RawPoint>}
     */
    this.points = points.reduce(
      (currentPoints, rawPoint) =>
        Object.assign(currentPoints, { [rawPoint.id]: rawPoint }),
      {},
    );

    this.paths = paths;

    paths.forEach(path => {
      const pathPoints = path.points.map(point => this.points[point].position);
      this.setPath(path.from, path.to, pathPoints);
      this.setPath(path.to, path.from, pathPoints.slice().reverse());
    });
  }

  /**
   * @param {string} from
   * @param {string} to
   * @param {number[][]} points
   */
  setPath(from, to, points) {
    if (!this.map[from]) {
      this.map[from] = {};
    }
    this.map[from][to] = new Path(points);
  }

  /**
   * @param {string} from
   * @param {string} to
   */
  getPath(from, to) {
    if (!this.map[from]) {
      return undefined;
    }
    return this.map[from][to];
  }
}
