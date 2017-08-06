// @ts-check

import Path from './Path';

/**
 * @typedef {Object} ConfigPath
 * @prop {string} from
 * @prop {string} to
 * @prop {number[][]} points
 */

export default class Paths {
  /**
   * @param {ConfigPath[]} paths
   */
  constructor(paths) {
    /**
     * @type {Record<string, Record<string, Path>>}
     */
    this.map = {};
    paths.forEach(path => {
      this.setPath(path.from, path.to, path.points);
      this.setPath(path.to, path.from, path.points.slice().reverse());
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
