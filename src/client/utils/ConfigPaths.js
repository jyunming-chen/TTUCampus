// @ts-check

import ConfigPath from './ConfigPath';

/**
 * @typedef {Object} Path
 * @prop {string} from
 * @prop {string} to
 * @prop {number[][]} points
 */

export default class ConfigPaths {
  /**
   * @param {Path[]} paths
   * @param {number=} scale
   */
  constructor(paths, scale) {
    /**
     * @type {Record<string, Record<string, ConfigPath>>}
     */
    this.map = {};
    this.scale = scale;
    paths.forEach(path => this.setPath(path.from, path.to, path.points));
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
    this.map[from][to] = new ConfigPath(points, this.scale);
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
