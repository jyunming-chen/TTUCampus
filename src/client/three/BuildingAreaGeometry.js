// @ts-check

import { ShapeGeometry, Shape } from 'three';
import getConfigVector2 from '../utils/getConfigVector2';

export default class BuildingAreaGeometry extends ShapeGeometry {
  /**
   * @param {[number, number][]} region
   */
  static createShape(region) {
    const shape = new Shape();

    /** @type {number} */ let initX;
    /** @type {number} */ let initY;
    region.forEach((point, index) => {
      const { x, y } = getConfigVector2(point);
      if (index === 0) {
        shape.moveTo(x, y);
        initX = x;
        initY = y;
      } else {
        shape.lineTo(x, y);
      }
      if (index === region.length - 1) {
        shape.lineTo(initX, initY);
      }
    });

    return shape;
  }

  constructor(data) {
    super(BuildingAreaGeometry.createShape(data.region));
    this.data = data;
  }
}
